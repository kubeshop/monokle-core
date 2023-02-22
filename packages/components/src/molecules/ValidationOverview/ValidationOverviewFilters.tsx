import {Filter, FilterButton, FilterField, ProblemIcon} from '@/atoms';
import {Select} from 'antd';
import {useState} from 'react';
import styled from 'styled-components';
import {DEFAULT_FILTERS_VALUE} from './constants';
import {ValidationOverviewFiltersType} from './types';

const ValidationOverviewFilters: React.FC<ValidationOverviewFiltersType> = props => {
  const {onSearch, onFiltersChange, filtersValue, searchValue} = props;

  const [active, setActive] = useState(false);

  return (
    <Filter
      onClear={() => onFiltersChange(DEFAULT_FILTERS_VALUE)}
      height={200}
      active={active}
      style={{padding: 0}}
      search={searchValue}
      onSearch={value => onSearch(value)}
      filterButton={<FilterButton active={active} onClick={() => setActive(!active)} />}
      onToggle={() => setActive(!active)}
    >
      <FilterField name="Tool component">
        <Select
          mode="multiple"
          value={filtersValue['tool-component']}
          onChange={value => onFiltersChange({...filtersValue, 'tool-component': value})}
          placeholder="Select tool component"
        >
          <Select.Option key="open-policy-agent" value="open-policy-agent">
            Open policy agent
          </Select.Option>
          <Select.Option key="kubernetes-schema" value="kubernetes-schema">
            Kubernetes schema
          </Select.Option>
          <Select.Option key="resource-links" value="resource-links">
            Resource links
          </Select.Option>
          <Select.Option key="yaml-syntax" value="yaml-syntax">
            Yaml syntax
          </Select.Option>
        </Select>
      </FilterField>

      <FilterField name="Type">
        <Select
          allowClear
          placeholder="Select type"
          value={filtersValue['type']}
          onChange={value => onFiltersChange({...filtersValue, type: value})}
        >
          <Select.Option key="error" value="error">
            <TypeFilterContainer>
              <ProblemIcon level="error" /> Error
            </TypeFilterContainer>
          </Select.Option>

          <Select.Option key="warning" value="warning">
            <TypeFilterContainer>
              <ProblemIcon level="warning" /> Warning
            </TypeFilterContainer>
          </Select.Option>
        </Select>
      </FilterField>
    </Filter>
  );
};

// Styled Components

const TypeFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default ValidationOverviewFilters;
