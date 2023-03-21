import {Select, Skeleton} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {elementScroll, useVirtualizer} from '@tanstack/react-virtual';
import {DEFAULT_FILTERS_VALUE, newErrorsTextMap} from './constants';
import {useCurrentAndNewProblems, useFilteredProblems} from './hooks';
import {BaseDataType, FiltersValueType, ShowByFilterOptionType, ValidationOverviewType} from './types';
import {getValidationList} from './utils';
import HeaderRenderer from './HeaderRenderer';
import ValidationOverviewFilters from './ValidationOverviewFilters';
import {Colors} from '@/styles/Colors';

let baseData: BaseDataType = {
  baseActiveKeys: [],
  baseShowByFilterValue: 'show-by-file',
  baseShowOnlyByResource: false,
};

const VirtualizedValidation: React.FC<ValidationOverviewType> = props => {
  const {status, validationResponse} = props;
  const {containerClassName = '', containerStyle = {}, height, skeletonStyle = {}} = props;
  const {customMessage, newProblemsIntroducedType, showOnlyByResource} = props;

  const [filtersValue, setFiltersValue] = useState<FiltersValueType>(DEFAULT_FILTERS_VALUE);
  const [searchValue, setSearchValue] = useState('');
  const [showByFilterValue, setShowByFilterValue] = useState<ShowByFilterOptionType>(baseData.baseShowByFilterValue);
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);

  const {newProblems, problems} = useCurrentAndNewProblems(showByFilterValue, validationResponse);
  const filteredProblems = useFilteredProblems(problems, newProblems, showNewErrors, searchValue, filtersValue);

  const validationList = useMemo(() => getValidationList(filteredProblems), [filteredProblems]);
  const ref = useRef<HTMLUListElement>(null);

  console.log('List:', validationList);

  const showByFilterOptions = useMemo(
    () => [
      {value: 'show-by-file', label: 'Show by file', disabled: showOnlyByResource},
      {value: 'show-by-resource', label: 'Show by resource'},
      {value: 'show-by-rule', label: 'Show by rule', disabled: showOnlyByResource},
    ],
    [showOnlyByResource]
  );

  const rowVirtualizer = useVirtualizer({
    count: validationList.length,
    estimateSize: () => 28,
    getScrollElement: () => ref.current,
    scrollToFn: elementScroll,
  });

  // useScroll({
  //   scrollTo: index =>
  //     rowVirtualizer.scrollToIndex(index, {
  //       align: 'center',
  //       smoothScroll: false,
  //     }),
  // });

  useEffect(() => {
    if (searchValue) {
      setSearchValue('');
    }
  }, [problems]);

  if (status === 'loading') {
    return <Skeleton active style={skeletonStyle} />;
  }

  return (
    <MainContainer $height={height} className={containerClassName} style={containerStyle}>
      <ValidationOverviewFilters
        filtersValue={filtersValue}
        searchValue={searchValue}
        onFiltersChange={filters => setFiltersValue(filters)}
        onSearch={value => setSearchValue(value)}
      />

      <ActionsContainer $secondary>
        {Object.keys(newProblems.data).length && showNewErrorsMessage && newProblemsIntroducedType !== 'initial' ? (
          <>
            {showNewErrors ? (
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            ) : (
              <NewErrorsMessage>
                {newProblemsIntroducedType ? newErrorsTextMap[newProblemsIntroducedType] : customMessage ?? ''}{' '}
                <b>{newProblems.resultsCount} errors</b> introduced.{' '}
                <ShowNewErrorsButton onClick={() => setShowNewErrors(true)}>Show only those</ShowNewErrorsButton>
                <CloseIcon onClick={() => setShowNewErrorsMessage(false)} />
              </NewErrorsMessage>
            )}
          </>
        ) : (
          <div />
        )}

        <ShowByFilter
          value={showByFilterValue}
          dropdownMatchSelectWidth={false}
          bordered={false}
          options={showByFilterOptions}
          onSelect={(value: any) => {
            setShowByFilterValue(value);
            baseData.baseShowByFilterValue = value;
            baseData.baseActiveKeys = [];
          }}
        />
      </ActionsContainer>

      {validationList.length ? (
        <>
          <ValidationList>
            <div style={{height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative'}}>
              {rowVirtualizer.getVirtualItems().map(virtualItem => {
                const node = validationList[virtualItem.index];

                if (!node) {
                  return null;
                }

                return (
                  <VirtualItem
                    key={virtualItem.key}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    {node.type === 'header' ? (
                      <HeaderRenderer
                        node={node}
                        showByFilterValue={showByFilterValue}
                        toggleCollapse={node => {
                          console.log('Node:', node);
                        }}
                      />
                    ) : null}
                  </VirtualItem>
                );
              })}
            </div>
          </ValidationList>

          {showNewErrors && (
            <ActionsContainer>
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            </ActionsContainer>
          )}
        </>
      ) : (
        <NoErrorsMessage>No problems found.</NoErrorsMessage>
      )}
    </MainContainer>
  );
};

export default VirtualizedValidation;

// Styled Components

const ActionsContainer = styled.div<{$secondary?: boolean}>`
  display: grid;
  grid-template-columns: ${({$secondary}) => ($secondary ? 'max-content max-content' : '1fr max-content')};
  /* grid-gap: 16px; */

  ${({$secondary}) => {
    if ($secondary) {
      return 'margin-top: 16px; justify-content: space-between; align-items: center;';
    }
  }}
`;

const CloseIcon = styled(CloseOutlined)`
  transform: translateY(1px);
  color: ${Colors.grey8};
  cursor: pointer;
  margin-left: 12px;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.grey7};
  }
`;

const MainContainer = styled.div<{$height?: number; $width?: number}>`
  background-color: #191f21;
  height: ${({$height}) => ($height ? `${$height}px` : '100%')};
  width: ${({$width}) => ($width ? `${$width}px` : '100%')};
  display: flex;
  flex-direction: column;
`;

const NewErrorsMessage = styled.div`
  background-color: rgba(222, 68, 81, 0.15);
  border-radius: 2px;
  padding: 1px 8px;
  color: ${Colors.red7};
`;

const NoErrorsMessage = styled.div`
  color: ${Colors.grey9};
  padding: 16px;
  font-weight: 700;
`;

const ShowByFilter = styled(Select)`
  margin-right: -10px;

  & .ant-select-arrow {
    color: ${Colors.blue7};
  }

  & .ant-select-selection-item {
    color: ${Colors.blue7} !important;
  }
`;

const ShowNewErrorsButton = styled.span`
  width: max-content;
  padding: 1px 0px;
  color: ${Colors.blue7};
  margin-left: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.blue6};
  }
`;

const ValidationList = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;
