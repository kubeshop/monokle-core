import {Colors} from '@/styles/Colors';
import {ArrowsAltOutlined, CloseOutlined, DownloadOutlined, ShrinkOutlined} from '@ant-design/icons';
import {CORE_PLUGINS, getRuleForResultV2} from '@monokle/validation';
import {elementScroll, useVirtualizer} from '@tanstack/react-virtual';
import {Select, Skeleton, Tooltip} from 'antd';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';
import HeaderRenderer from './HeaderRenderer';
import ProblemRenderer from './ProblemRenderer';
import ValidationOverviewFilters from './ValidationOverviewFilters';
import {DEFAULT_FILTERS_VALUE, newErrorsTextMap} from './constants';
import {useCurrentAndNewProblems, useFilteredProblems} from './hooks';
import {
  BaseDataType,
  GroupByFilterOptionType,
  HeaderNode,
  ValidationFiltersValueType,
  ValidationOverviewType,
} from './types';
import {useScroll} from './useScroll';
import {getValidationList, uppercaseFirstLetter} from './utils';
import {TOOLTIP_DELAY} from '@/constants';
import {Icon} from '@/atoms';
import {useHotkeys} from 'react-hotkeys-hook';

let baseData: BaseDataType = {
  baseCollapsedKeys: [],
  baseGroupByFilterValue: 'group-by-file',
  baseGroupOnlyByResource: false,
  baseSecurityFrameworkFilter: 'all',
};

const ValidationOverview: React.FC<ValidationOverviewType> = ({
  status,
  validationResponse,
  activePlugins = [...CORE_PLUGINS],
  containerClassName = '',
  containerStyle = {},
  height,
  skeletonStyle = {},
  defaultSelectError = false,
  customMessage,
  newProblemsIntroducedType,
  selectedProblem,
  groupOnlyByResource,
  filters,
  onFiltersChange,
  onProblemSelect,
  downloadSarifResponseCallback,
  triggerValidationSettingsRedirectCallback,
  onSearchCallback,
  onSecurityFrameworkFilterChange,
  onGroupByFilterChange,
  suppressionBindings,
  onConfigureRule,
  onProblemAutofix,
  onProblemShare,
  hotkeysDisabled = false,
  isPreviewing = false,
}) => {
  const [collapsedHeadersKey, setCollapsedHeadersKey] = useState<string[]>(baseData.baseCollapsedKeys);
  const [filtersValue, setFiltersValue] = useState<ValidationFiltersValueType>(filters || DEFAULT_FILTERS_VALUE);
  const [searchValue, setSearchValue] = useState('');
  const [groupByFilterValue, setGroupByFilterValue] = useState<GroupByFilterOptionType>(
    baseData.baseGroupByFilterValue
  );
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);
  const [securityFrameworkFilter, setSecurityFrameworkFilter] = useState(baseData.baseSecurityFrameworkFilter);

  const {newProblems, problems} = useCurrentAndNewProblems(groupByFilterValue, validationResponse);

  const filteredProblems = useFilteredProblems(
    problems,
    newProblems,
    showNewErrors,
    searchValue,
    filtersValue,
    securityFrameworkFilter
  );

  const foundSecurityFrameworks = useMemo(() => {
    const securityFrameworks = new Set<string>();

    Object.values(problems).forEach(value => {
      Object.values(value).forEach(validationResult => {
        if (validationResult.taxa) {
          validationResult.taxa.forEach(securityFramework => {
            if (securityFramework) {
              securityFrameworks.add(securityFramework.toolComponent.name);
            }
          });
        }
      });
    });

    return [...securityFrameworks];
  }, [problems]);

  const validationList = useMemo(
    () => getValidationList(filteredProblems, collapsedHeadersKey),
    [collapsedHeadersKey, filteredProblems]
  );

  useHotkeys(
    'j',
    () => {
      if (!selectedProblem) {
        const next = validationList.at(1);
        const secondNext = validationList.at(2);
        const nextProblem =
          next?.type === 'problem' ? next.problem : secondNext?.type === 'problem' ? secondNext.problem : undefined;
        if (nextProblem) {
          onProblemSelect?.({problem: nextProblem, selectedFrom: 'hotkey'});
        }
        return;
      }

      const currentIndex = validationList.findIndex(
        p =>
          p.type === 'problem' &&
          p.problem.fingerprints?.['monokleHash/v1'] === selectedProblem?.fingerprints?.['monokleHash/v1']
      );

      if (currentIndex === 0) {
        return;
      }

      const next = validationList.at(currentIndex + 1);
      const secondNext = validationList.at(currentIndex + 2);
      const nextProblem =
        next?.type === 'problem' ? next.problem : secondNext?.type === 'problem' ? secondNext.problem : undefined;

      if (nextProblem) {
        onProblemSelect?.({problem: nextProblem, selectedFrom: 'hotkey'});
      }
    },
    {enabled: !hotkeysDisabled},
    [validationList, selectedProblem]
  );

  useHotkeys(
    'k',
    () => {
      if (!selectedProblem) {
        return;
      }

      const currentIndex = validationList.findIndex(
        p =>
          p.type === 'problem' &&
          p.problem.fingerprints?.['monokleHash/v1'] === selectedProblem?.fingerprints?.['monokleHash/v1']
      );

      const previousIndex = currentIndex - 1;
      if (previousIndex <= 0) return;
      const previous = validationList.at(currentIndex - 1);
      if (previous?.type === 'problem') {
        return onProblemSelect?.({problem: previous.problem, selectedFrom: 'hotkey'});
      }

      const secondPreviousIndex = currentIndex - 2;
      if (previousIndex <= 0) return;
      const secondPrevious = validationList.at(secondPreviousIndex);
      if (secondPrevious?.type === 'problem') {
        return onProblemSelect?.({problem: secondPrevious.problem, selectedFrom: 'hotkey'});
      }
    },
    {enabled: !hotkeysDisabled},
    [validationList, selectedProblem]
  );

  useHotkeys(
    'f',
    () => {
      if (!selectedProblem || selectedProblem?.baselineState === 'absent') {
        return;
      }
      onProblemAutofix?.(selectedProblem);
    },
    {enabled: !hotkeysDisabled},
    [selectedProblem, onProblemAutofix]
  );

  useHotkeys(
    's',
    () => {
      if (!selectedProblem) return;
      suppressionBindings?.onToggleSuppression?.(selectedProblem);
    },
    {enabled: !hotkeysDisabled},
    [selectedProblem, suppressionBindings]
  );

  const ref = useRef<HTMLUListElement>(null);

  const isCollapsed = useMemo(
    () => collapsedHeadersKey.length === validationList.filter(i => i.type === 'header').length,
    [collapsedHeadersKey, validationList]
  );

  const groupByFilterOptions = useMemo(
    () => [
      {value: 'group-by-file', label: 'Group by file', disabled: groupOnlyByResource},
      {value: 'group-by-resource', label: 'Group by resource'},
      {value: 'group-by-rule', label: 'Group by rule', disabled: groupOnlyByResource},
    ],
    [groupOnlyByResource]
  );

  const securityFrameworksOptions = useMemo(
    () => [{value: 'all', label: 'All'}, ...foundSecurityFrameworks.map(f => ({value: f, label: f}))],
    [foundSecurityFrameworks]
  );

  const newProblemsIntroducedText = useMemo(
    () => (
      <>
        {newProblemsIntroducedType ? newErrorsTextMap[newProblemsIntroducedType] : customMessage ?? ''}{' '}
        <b>{newProblems.resultsCount} errors</b> introduced.{' '}
      </>
    ),
    [newProblemsIntroducedType, newProblems.resultsCount, customMessage]
  );

  const CollapseExpandHandler = useCallback(() => {
    if (isCollapsed) {
      setCollapsedHeadersKey([]);
      baseData.baseCollapsedKeys = [];
    } else {
      const keys = (validationList.filter(i => i.type === 'header') as HeaderNode[]).map(i => i.label);

      setCollapsedHeadersKey(keys);
      baseData.baseCollapsedKeys = [...keys];
    }
  }, [isCollapsed, validationList]);

  const rowVirtualizer = useVirtualizer({
    count: validationList.length,
    estimateSize: () => 36,
    getScrollElement: () => ref.current,
    scrollToFn: elementScroll,
  });

  useScroll({
    list: validationList,
    groupByFilterValue,
    selectedProblem,
    scrollTo: index =>
      rowVirtualizer.scrollToIndex(index, {
        align: 'center',
        behavior: 'smooth',
      }),
  });

  useEffect(() => {
    if (typeof groupOnlyByResource === 'undefined') {
      return;
    }

    if (groupOnlyByResource === true) {
      if (groupByFilterValue !== 'group-by-resource') {
        setGroupByFilterValue('group-by-resource');
      }

      if (baseData.baseGroupOnlyByResource === false) {
        baseData.baseCollapsedKeys = [];
      }
    } else if (!groupOnlyByResource) {
      setGroupByFilterValue(baseData.baseGroupByFilterValue);

      if (baseData.baseGroupOnlyByResource === true) {
        baseData.baseCollapsedKeys = [];
      }
    }

    baseData.baseGroupOnlyByResource = groupOnlyByResource;
  }, [groupOnlyByResource]);

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

  useEffect(() => {
    if (!validationList.length || !defaultSelectError || !onProblemSelect) {
      return;
    }

    const firstErrorFound = validationList.find(item => item.type === 'problem');

    if (!firstErrorFound || firstErrorFound.type !== 'problem') {
      return;
    }

    onProblemSelect({problem: firstErrorFound.problem, selectedFrom: 'file'});
  }, [validationList, defaultSelectError, onProblemSelect]);

  if (status === 'loading' && !validationList?.length) {
    return <Skeleton active style={skeletonStyle} />;
  }

  return (
    <MainContainer $height={height} className={containerClassName} style={containerStyle}>
      <ValidationOverviewFilters
        activePlugins={activePlugins}
        filtersValue={filtersValue}
        searchValue={searchValue}
        onFiltersChange={filters => {
          setFiltersValue(filters);
          baseData.baseCollapsedKeys = [];
          setCollapsedHeadersKey([]);

          if (onFiltersChange) {
            onFiltersChange(filters);
          }
        }}
        onSearch={value => {
          setSearchValue(value);

          if (onSearchCallback) {
            onSearchCallback(value);
          }
        }}
      />

      <ActionsContainer $secondary>
        <ActionButtonsContainer>
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Go to Validation Settings">
            <ActionButton onClick={triggerValidationSettingsRedirectCallback}>
              <Icon name="validation-settings" />
            </ActionButton>
          </Tooltip>

          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={`${isCollapsed ? 'Expand' : 'Collapse'} all`}>
            <ActionButton onClick={CollapseExpandHandler}>
              {isCollapsed ? <ArrowsAltOutlined /> : <ShrinkOutlined />}
            </ActionButton>
          </Tooltip>

          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="Download the SARIF response of your validation">
            <ActionButton onClick={downloadSarifResponseCallback}>
              <DownloadOutlined />
            </ActionButton>
          </Tooltip>
        </ActionButtonsContainer>

        <div>
          <SecurityFrameworkFilter
            optionLabelProp="label"
            labelInValue
            value={{
              value: securityFrameworkFilter,
              label: `Frameworks: ${uppercaseFirstLetter(securityFrameworkFilter)}`,
            }}
            options={securityFrameworksOptions}
            bordered={false}
            onSelect={(value: any) => {
              setSecurityFrameworkFilter(value.value);
              baseData.baseSecurityFrameworkFilter = value.value;
              baseData.baseCollapsedKeys = [];
              setCollapsedHeadersKey([]);

              if (onSecurityFrameworkFilterChange) {
                onSecurityFrameworkFilterChange(value.value, 'dropdown');
              }
            }}
          />

          <GroupByFilter
            value={groupByFilterValue}
            dropdownMatchSelectWidth={false}
            bordered={false}
            options={groupByFilterOptions}
            onSelect={(value: any) => {
              baseData.baseCollapsedKeys = [];
              setCollapsedHeadersKey([]);
              setGroupByFilterValue(value);
              baseData.baseGroupByFilterValue = value;

              if (onGroupByFilterChange) {
                onGroupByFilterChange(value);
              }
            }}
          />
        </div>
      </ActionsContainer>

      {Object.keys(newProblems.data).length && showNewErrorsMessage && newProblemsIntroducedType !== 'initial' ? (
        <>
          {showNewErrors ? (
            <div style={{marginBottom: '8px'}}>
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            </div>
          ) : (
            <NewErrorsMessage>
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={newProblemsIntroducedText}>
                <EllipsisSpan>{newProblemsIntroducedText}</EllipsisSpan>
              </Tooltip>

              <ShowNewErrorsButton onClick={() => setShowNewErrors(true)}>Show only those</ShowNewErrorsButton>
              <CloseIcon onClick={() => setShowNewErrorsMessage(false)} />
            </NewErrorsMessage>
          )}
        </>
      ) : (
        <div />
      )}

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
                        groupByFilterValue={groupByFilterValue}
                        isPreviewing={isPreviewing}
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
                        isPreviewing={isPreviewing}
                        rule={getRuleForResultV2(validationResponse.runs[0], node.problem)}
                        selectedProblem={selectedProblem}
                        groupByFilterValue={groupByFilterValue}
                        onClick={() => {
                          if (onProblemSelect) {
                            onProblemSelect({
                              problem: node.problem,
                              selectedFrom: groupByFilterValue === 'group-by-resource' ? 'resource' : 'file',
                            });
                          }
                        }}
                        setSecurityFrameworkFilter={(securityFramework: string) => {
                          baseData.baseCollapsedKeys = [];
                          setCollapsedHeadersKey([]);
                          setSecurityFrameworkFilter(securityFramework);
                          baseData.baseSecurityFrameworkFilter = securityFramework;

                          if (onSecurityFrameworkFilterChange) {
                            onSecurityFrameworkFilterChange(securityFramework, 'tag');
                          }
                        }}
                        onConfigureRuleHandler={onConfigureRule}
                        suppressionBindings={suppressionBindings}
                        onAutofixHandler={onProblemAutofix}
                        onShareHandler={onProblemShare}
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

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${Colors.blue7};

  &:hover {
    & .anticon {
      color: ${Colors.blue6};
    }
  }

  & .anticon {
    transition: all 0.2s ease-in;
    color: ${Colors.blue7};
    font-size: 16px;
  }
`;

const ActionsContainer = styled.div<{$secondary?: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({$secondary}) => {
    if ($secondary) {
      return `
        margin-top: 16px;
        margin-bottom: 16px;
      `;
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

const EllipsisSpan = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const MainContainer = styled.div<{$height?: number; $width?: number}>`
  background-color: #191f21;
  height: ${({$height}) => ($height ? `${$height}px` : '100%')};
  width: ${({$width}) => ($width ? `${$width}px` : '100%')};
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
`;

const NewErrorsMessage = styled.div`
  background-color: rgba(222, 68, 81, 0.15);
  border-radius: 2px;
  padding: 1px 8px;
  color: ${Colors.red7};
  display: flex;
  align-items: center;
  overflow: hidden;
  width: max-content;
  margin: 4px 0px 8px 0px;
`;

const NoErrorsMessage = styled.div`
  color: ${Colors.grey9};
  padding: 16px;
  font-weight: 700;
`;

const SecurityFrameworkFilter = styled(Select)`
  & .ant-select-arrow {
    color: ${Colors.blue7};
  }

  & .ant-select-selection-item {
    color: ${Colors.blue7} !important;
  }
`;

const GroupByFilter = styled(Select)`
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
  white-space: nowrap;

  &:hover {
    color: ${Colors.blue6};
  }
`;

const ValidationList = styled.ul`
  height: 100%;
  overflow-y: auto;
  padding-left: 0px;
`;

const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;
