import {Select, Skeleton} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {elementScroll, useVirtualizer} from '@tanstack/react-virtual';
import {DEFAULT_FILTERS_VALUE, newErrorsTextMap} from './constants';
import {useCurrentAndNewProblems, useFilteredProblems} from './hooks';
import {BaseDataType, ValidationFiltersValueType, ShowByFilterOptionType, ValidationOverviewType} from './types';
import {getValidationList} from './utils';
import HeaderRenderer from './HeaderRenderer';
import ValidationOverviewFilters from './ValidationOverviewFilters';
import {Colors} from '@/styles/Colors';
import ProblemRenderer from './ProblemRenderer';
import {getRuleForResult} from '@monokle/validation';
import {useScroll} from './useScroll';
import isEqual from 'lodash.isequal';

let baseData: BaseDataType = {
  baseCollapsedKeys: [],
  baseShowByFilterValue: 'show-by-file',
  baseShowOnlyByResource: false,
};

const ValidationOverview: React.FC<ValidationOverviewType> = props => {
  const {status, validationResponse} = props;
  const {containerClassName = '', containerStyle = {}, height, skeletonStyle = {}} = props;
  const {customMessage, newProblemsIntroducedType, selectedProblem, showOnlyByResource, filters} = props;
  const {onFiltersChange, onProblemSelect} = props;

  const [collapsedHeadersKey, setCollapsedHeadersKey] = useState<string[]>(baseData.baseCollapsedKeys);
  const [filtersValue, setFiltersValue] = useState<ValidationFiltersValueType>(filters || DEFAULT_FILTERS_VALUE);
  const [searchValue, setSearchValue] = useState('');
  const [showByFilterValue, setShowByFilterValue] = useState<ShowByFilterOptionType>(baseData.baseShowByFilterValue);
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);

  const {newProblems, problems} = useCurrentAndNewProblems(showByFilterValue, validationResponse);
  const filteredProblems = useFilteredProblems(problems, newProblems, showNewErrors, searchValue, filtersValue);

  const validationList = useMemo(
    () => getValidationList(filteredProblems, collapsedHeadersKey),
    [collapsedHeadersKey, filteredProblems]
  );
  const ref = useRef<HTMLUListElement>(null);

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
    estimateSize: () => 36,
    getScrollElement: () => ref.current,
    scrollToFn: elementScroll,
  });

  useScroll({
    list: validationList,
    showByFilterValue,
    selectedProblem,
    scrollTo: index =>
      rowVirtualizer.scrollToIndex(index, {
        align: 'center',
        behavior: 'smooth',
      }),
  });

  useEffect(() => {
    if (typeof showOnlyByResource === 'undefined') {
      return;
    }

    if (showOnlyByResource === true) {
      if (showByFilterValue !== 'show-by-resource') {
        setShowByFilterValue('show-by-resource');
      }

      if (baseData.baseShowOnlyByResource === false) {
        baseData.baseCollapsedKeys = [];
      }
    } else if (!showOnlyByResource) {
      setShowByFilterValue(baseData.baseShowByFilterValue);

      if (baseData.baseShowOnlyByResource === true) {
        baseData.baseCollapsedKeys = [];
      }
    }

    baseData.baseShowOnlyByResource = showOnlyByResource;
  }, [showOnlyByResource]);

  useEffect(() => {
    if (!showNewErrorsMessage) {
      setShowNewErrorsMessage(true);
    }
  }, [newProblems]);

  useEffect(() => {
    if (!filters) {
      return;
    }

    if (!isEqual(filters, filtersValue)) {
      setFiltersValue(filters);
      setCollapsedHeadersKey([]);
      baseData.baseCollapsedKeys = [];
    }
  }, [filters]);

  useEffect(() => {
    const keys = baseData.baseCollapsedKeys ? baseData.baseCollapsedKeys : [];
    setCollapsedHeadersKey(keys);
    baseData.baseCollapsedKeys = keys;
  }, [filteredProblems]);

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
        onFiltersChange={filters => {
          setFiltersValue(filters);
          setCollapsedHeadersKey([]);
          baseData.baseCollapsedKeys = [];
          if (onFiltersChange) {
            onFiltersChange(filters);
          }
        }}
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
            baseData.baseCollapsedKeys = [];
          }}
        />
      </ActionsContainer>

      {validationList.length ? (
        <>
          <ValidationList ref={ref}>
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
                      padding: node.type === 'header' ? '8px 0px' : '0px',
                    }}
                  >
                    {node.type === 'header' ? (
                      <HeaderRenderer
                        node={node}
                        showByFilterValue={showByFilterValue}
                        toggleCollapse={node => {
                          if (collapsedHeadersKey.includes(node.label)) {
                            const collapsedKeys = collapsedHeadersKey.filter(item => item !== node.label);
                            setCollapsedHeadersKey(collapsedKeys);
                            baseData.baseCollapsedKeys = collapsedKeys;
                          } else {
                            const collapsedKeys = [...collapsedHeadersKey, node.label];
                            setCollapsedHeadersKey(collapsedKeys);
                            baseData.baseCollapsedKeys = collapsedKeys;
                          }
                        }}
                      />
                    ) : (
                      <ProblemRenderer
                        node={node}
                        rule={getRuleForResult(validationResponse, node.problem)}
                        selectedProblem={selectedProblem}
                        showByFilterValue={showByFilterValue}
                        onClick={() => {
                          if (onProblemSelect) {
                            onProblemSelect({
                              problem: node.problem,
                              selectedFrom: showByFilterValue === 'show-by-resource' ? 'resource' : 'file',
                            });
                          }
                        }}
                      />
                    )}
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

export default ValidationOverview;

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
  padding-left: 0px;
  margin-top: 16px;
`;

const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;
