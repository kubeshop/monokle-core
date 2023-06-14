import {Filter, FilterButton, FilterField, ProblemIcon} from '@/atoms';
import {Select} from 'antd';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import {DEFAULT_FILTERS_VALUE} from './constants';
import {ValidationOverviewFiltersType} from './types';
import {getDefaultPluginsFilterOptions, uppercaseFirstLetter} from './utils';

const ValidationOverviewFilters: React.FC<ValidationOverviewFiltersType> = props => {
  const {onSearch, onFiltersChange, filtersValue, searchValue, activePlugins} = props;

  const [active, setActive] = useState(false);

  const activePluginsOptions = useMemo(() => {
    if (!activePlugins) {
      return getDefaultPluginsFilterOptions();
    }

    return activePlugins.map(plugin => {
      return {name: plugin, label: uppercaseFirstLetter(plugin).replaceAll('-', ' ')};
    });
  }, [activePlugins]);

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
          {activePluginsOptions.map(option => (
            <Select.Option key={option.name} value={option.name}>
              {option.label}
            </Select.Option>
          ))}
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
