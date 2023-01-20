import {SearchInput} from '@/atoms';
import {Colors} from '@/styles/Colors';
import {CloseOutlined, FilterOutlined} from '@ant-design/icons';
import {getRuleForResult} from '@monokle/validation';
import {Button, Collapse, Select} from 'antd';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {CollapseItemRow} from './CollapseItemRow';
import {newErrorsTextMap, showByFilterOptions} from './constants';
import {useGetCurrentAndNewProblems, useGetFilteredProblems} from './hooks';
import {ShowByFilterOptionType, ValidationOverviewType} from './types';

import {ValidationCollapsePanelHeader} from './ValidationCollapsePanelHeader';

export const ValidationOverview: React.FC<ValidationOverviewType> = props => {
  const {
    containerClassName = '',
    containerStyle = {},
    height,
    selectedError,
    validationResponse,
  } = props;
  const {newErrorsIntroducedType, onErrorSelect} = props;

  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showByFilterValue, setShowByFilterValue] =
    useState<ShowByFilterOptionType>('show-by-file');
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);

  const {newProblems, problems} = useGetCurrentAndNewProblems(
    showByFilterValue,
    validationResponse
  );
  const filteredProblems = useGetFilteredProblems(
    problems,
    newProblems,
    showNewErrors,
    searchValue
  );

  useEffect(() => {
    if (!showNewErrorsMessage) {
      setShowNewErrorsMessage(true);
    }
  }, [newProblems]);

  useEffect(() => {
    setActiveKeys(Object.keys(filteredProblems));
  }, [filteredProblems]);

  useEffect(() => {
    if (searchValue) {
      setSearchValue('');
    }
  }, [problems]);

  return (
    <MainContainer
      style={containerStyle}
      $height={height}
      className={containerClassName}
    >
      <ActionsContainer>
        <SearchInput
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />

        <FiltersButton icon={<FilterOutlined />} />
      </ActionsContainer>

      <ActionsContainer $secondary>
        {Object.keys(newProblems.data).length && showNewErrorsMessage ? (
          <>
            {showNewErrors ? (
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>
                Show all
              </ShowNewErrorsButton>
            ) : (
              <NewErrorsMessage>
                {newErrorsIntroducedType
                  ? newErrorsTextMap[newErrorsIntroducedType]
                  : ''}{' '}
                <b>{newProblems.resultsCount} errors</b> introduced.{' '}
                <ShowNewErrorsButton onClick={() => setShowNewErrors(true)}>
                  Show only those
                </ShowNewErrorsButton>
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
          onSelect={(value: any) => setShowByFilterValue(value)}
        />
      </ActionsContainer>

      {Object.keys(filteredProblems).length ? (
        <>
          <ValidationsCollapse
            activeKey={activeKeys}
            ghost
            onChange={keys => {
              setActiveKeys(typeof keys === 'string' ? [keys] : keys);
            }}
          >
            {Object.entries(filteredProblems).map(([id, results]) => (
              <Collapse.Panel
                header={
                  <ValidationCollapsePanelHeader
                    id={id}
                    results={results}
                    showByFilterValue={showByFilterValue}
                  />
                }
                key={id}
              >
                {results.map(result => {
                  const rule = getRuleForResult(validationResponse, result);

                  return (
                    <CollapseItemRow
                      key={result.ruleId}
                      result={result}
                      rule={rule}
                      showByFilterValue={showByFilterValue}
                      selectedError={selectedError}
                      onClick={() => {
                        if (onErrorSelect) {
                          onErrorSelect({
                            error: result,
                            selectedFrom:
                              showByFilterValue === 'show-by-resource'
                                ? 'resource'
                                : 'file',
                          });
                        }
                      }}
                    />
                  );
                })}
              </Collapse.Panel>
            ))}
          </ValidationsCollapse>

          {showNewErrors && (
            <ActionsContainer>
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>
                Show all
              </ShowNewErrorsButton>
            </ActionsContainer>
          )}
        </>
      ) : (
        <NoErrorsMessage>No errors found.</NoErrorsMessage>
      )}
    </MainContainer>
  );
};

// Styled components

const ActionsContainer = styled.div<{$secondary?: boolean}>`
  display: grid;
  grid-template-columns: ${({$secondary}) =>
    $secondary ? 'max-content max-content' : '1fr max-content'};
  grid-gap: 16px;
  padding: 0 16px;

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

const FiltersButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${Colors.blue7};
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    color: ${Colors.blue7};
  }
`;

const MainContainer = styled.div<{$height?: number}>`
  background-color: #191f21;
  height: ${({$height}) => ($height ? `${$height}px` : '100%')};
  width: 100%;
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

const ValidationsCollapse = styled(Collapse)`
  max-height: calc(100% - 100px);
  overflow-y: auto;
  margin-top: 24px;

  & .ant-collapse-header {
    color: ${Colors.grey8} !important;
    width: max-content;

    &:first-child {
      padding-top: 0px;
    }
  }

  & .ant-collapse-content-box {
    padding: 10px 0px 20px 0px !important;
  }
`;
