import { Panel } from 'reactflow';
import styled from 'styled-components';
import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { Select, Space, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Resource, ResourceMapType } from '@monokle/validation';
import { Colors } from '@/styles/Colors';
import { isDefined } from './helpers'

const ALL_NAMESPACES = { key: 0, label: 'All', value: '' };
const ALL_KINDS = { key: 0, label: 'All resource types', value: '' };

const VIEW_DEPTHS = [
  { key: 1, label: 'Max 1 link deep', value: 1 },
  { key: 2, label: 'Max 2 links deep', value: 2 },
  { key: 3, label: 'Max 3 links deep', value: 3 },
  { key: 4, label: 'Max 4 links deep', value: 4 },
  { key: 5, label: 'Max 5 links deep', value: 5 },
  { key: 6, label: 'Max 6 links deep', value: 6 },
  { key: 7, label: 'Max 7 links deep', value: 7 },
  { key: 8, label: 'Max 8 links deep', value: 8 },
  { key: 9, label: 'Max 9 links deep', value: 9 },
  { key: 10, label: 'Max 10 links deep', value: 10 },
];

type FilterBarProps = {
  graphRef: React.RefObject<HTMLDivElement>;
  resources?: Resource[];
  resourceMap: ResourceMapType;
  setFilters: (filters: {
    namespaces: string[];
    kinds: string[];
    maxDepth: number;
  }) => void;
};

export function FilterBar({
  graphRef,
  resources,
  resourceMap,
  setFilters,
}: FilterBarProps) {
  const filterBarRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [kind, setKind] = useState();
  const [namespace, setNamespace] = useState();
  const [maxDepth, setMaxDepth] = useState(5);

  const kinds = useMemo(() => (kind ? [kind] : []), [kind]);
  const namespaces = useMemo(() => (namespace ? [namespace] : []), [namespace]);

  useEffect(() => {
    setFilters({ namespaces, kinds, maxDepth });
  }, [namespaces, kinds, maxDepth]);

  const imageName = useMemo(() => resources?.map(r => r.name).join('--') || 'graph', [resources]);

  const getGraphPng = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      import('html-to-image').then(({ toPng }) => {
        if (!graphRef.current) {
          return reject();
        }
  
        toPng(graphRef.current, {
          cacheBust: true,
          filter: node =>
            !(
              node?.classList?.contains('react-flow__minimap') ||
              node?.classList?.contains('react-flow__controls') ||
              node === filterBarRef.current
            ),
        }).then(resolve);
      });
    });
  }, [graphRef.current, filterBarRef.current]);

  const downloadPNG = useCallback(() => {
    setIsDownloading(true);
    getGraphPng()
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = imageName;
        link.href = dataUrl;
        link.click();
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsDownloading(false));
  }, [getGraphPng, imageName]);

  const downloadPDF = useCallback(() => {
    setIsDownloading(true);
    import('jspdf').then(({ jsPDF: JsPDF }) => {
      getGraphPng()
        .then(dataUrl => {
          const pdf = new JsPDF();
  
          const imgProperties = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;
  
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(imageName);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
        })
        .finally(() => setIsDownloading(false));
    });
  }, [getGraphPng, imageName]);

  const kindList = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(resourceMap)
            .map(r => r?.kind)
            .filter(isDefined)
        )
      ).map((k, i) => ({ key: i + 1, label: k, value: k })),
    [resourceMap]
  );

  const namespaceList = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(resourceMap)
            .map(r => r?.namespace)
            .filter(isDefined)
        )
      ).map((ns, i) => ({ key: i + 1, label: ns, value: ns })),
    [resourceMap]
  );

  return (
    <Panel
      position="top-center"
      style={{ width: 'calc(100% - 32px)', margin: '15px 0' }}
    >
      <Bar ref={filterBarRef}>
        <Space size="middle" style={{ flexWrap: 'wrap', rowGap: 0 }}>
          <Filter
            label="Namespace"
            menuItems={[ALL_NAMESPACES, ...namespaceList]}
            defaultValue={ALL_NAMESPACES.value}
            onChange={setNamespace}
          />
          <Filter
            label="Show"
            menuItems={[ALL_KINDS, ...kindList]}
            defaultValue={ALL_KINDS.value}
            onChange={setKind}
          />
          <Filter
            label="View"
            menuItems={VIEW_DEPTHS}
            defaultValue={maxDepth}
            onChange={setMaxDepth}
          />
        </Space>
        {isDownloading ? (
          <Space style={{ paddingTop: '4px', justifyContent: 'center' }}>
            <Spin />
          </Space>
          ) : (
          <Space style={{ flexWrap: 'wrap', alignContent: 'center' }}>
            <a onClick={downloadPDF}>
              <Space>
                <DownloadOutlined /> PDF
              </Space>
            </a>
            <a onClick={downloadPNG}>
              <Space>
                <DownloadOutlined /> PNG
              </Space>
            </a>
          </Space>
        )}
      </Bar>
    </Panel>
  );
}

type FilterProps = {
  label: string;
  menuItems: { key: number; label: string; value?: string | number }[];
  onChange: (value: any) => void;
  defaultValue?: string | number;
};

function Filter({ label, menuItems, onChange, defaultValue }: FilterProps) {
  return (
    <Space size={0}>
      <FilterLabel>{label}</FilterLabel>
      <FilterSelect
        defaultValue={defaultValue}
        options={menuItems}
        dropdownMatchSelectWidth={200}
        onChange={onChange}
        bordered={false}
      />
    </Space>
  );
}

const FilterLabel = styled.div`
  color: ${Colors.grey8};
`;

const FilterSelect = styled(Select)`
  .ant-select-selector {
    padding: 0 8px !important;
  }
`;

const Bar = styled.div`
  background-color: ${Colors.grey1000};
  border: 1px solid ${Colors.grey3};
  border-radius: 4px;
  padding: 14px 22px;
  display: flex;
  justify-content: space-between;
`;

