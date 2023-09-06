import {Filter, FilterButton, FilterField, ProblemIcon} from '@/atoms';
import {Badge, Checkbox, Select, Space, Switch} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {DEFAULT_FILTERS_VALUE} from './constants';
import {ValidationOverviewFiltersType} from './types';
import {uppercaseFirstLetter} from './utils';
import {Colors} from '@/styles/Colors';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

const ValidationOverviewFilters: React.FC<ValidationOverviewFiltersType> = props => {
  const {onSearch, onFiltersChange, filtersValue, searchValue, activePlugins} = props;

  const [active, setActive] = useState(false);

  const activePluginsOptions = useMemo(
    () => activePlugins.map(plugin => ({name: plugin, label: uppercaseFirstLetter(plugin).replaceAll('-', ' ')})),
    [activePlugins]
  );

  const appliedFiltersCount = useMemo(
    () =>
      Object.entries(filtersValue)
        .map(([key, value]) => {
          return {filterName: key, filterValue: value};
        })
        .filter(filter => filter.filterValue && Object.values(filter.filterValue).length).length,
    [filtersValue]
  );

  const [hideSuppressed, setHideSuppressed] = useState(!filtersValue['showSuppressed']);
  const [showSuppressedOnly, setShowSuppressedOnly] = useState(!filtersValue['showUnsuppressed'] && !hideSuppressed);

  const onChangeHideSuppressed = (e: CheckboxChangeEvent) => {
    const value = e.target.checked;
    setHideSuppressed(value);
    if (value) {
      setShowSuppressedOnly(!value);
    }
  };

  const onChangeShowSuppressedOnly = (e: CheckboxChangeEvent) => {
    const value = e.target.checked;
    setShowSuppressedOnly(value);
    if (value) {
      setHideSuppressed(!value);
    }
  };

  useEffect(() => {
    onFiltersChange({
      ...filtersValue,
      showSuppressed: !hideSuppressed,
      showUnsuppressed: !showSuppressedOnly,
    });
  }, [hideSuppressed, showSuppressedOnly]);

  return (
    <Filter
      hasActiveFilters={appliedFiltersCount > 0}
      onClear={() => onFiltersChange(DEFAULT_FILTERS_VALUE)}
      height={200}
      active={active}
      style={{padding: 0}}
      search={searchValue}
      onSearch={value => onSearch(value)}
      filterButton={
        <CountBadge count={appliedFiltersCount} size="small" offset={[-4, 4]}>
          <FilterButton active={active} onClick={() => setActive(!active)} />
        </CountBadge>
      }
      onToggle={() => setActive(!active)}
    >
      <FilterField name="Suppressions">
        <span>
          <Checkbox checked={hideSuppressed} onChange={onChangeHideSuppressed}>
            Hide suppressed misconfigurations
          </Checkbox>
        </span>
        <span>
          <Checkbox checked={showSuppressedOnly} onChange={onChangeShowSuppressedOnly}>
            Show suppressed misconfigurations only
          </Checkbox>
        </span>
      </FilterField>

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
const CountBadge = styled(Badge)`
  .ant-badge-count-sm {
    font-size: 8px;
    line-height: 12px;
    color: ${Colors.grey2};
    background-color: ${Colors.greenOkay};
    border: unset;
    height: 12px;
    min-width: 12px;
    border-radius: 6px;
    box-shadow: none;
  }
`;

const TypeFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default ValidationOverviewFilters;
