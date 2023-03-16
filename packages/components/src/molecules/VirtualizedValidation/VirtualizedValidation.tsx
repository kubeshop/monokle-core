import {Skeleton} from 'antd';
import {useEffect, useState} from 'react';
import {DEFAULT_FILTERS_VALUE} from './constants';
import {useCurrentAndNewProblems, useFilteredProblems} from './hooks';
import {BaseDataType, FiltersValueType, ShowByFilterOptionType, ValidationOverviewType} from './types';

let baseData: BaseDataType = {
  baseActiveKeys: [],
  baseShowByFilterValue: 'show-by-file',
  baseShowOnlyByResource: false,
};

const VirtualizedValidation: React.FC<ValidationOverviewType> = props => {
  const {status, validationResponse} = props;
  const {height, skeletonStyle = {}} = props;

  const [filtersValue, setFiltersValue] = useState<FiltersValueType>(DEFAULT_FILTERS_VALUE);
  const [searchValue, setSearchValue] = useState('');
  const [showByFilterValue, setShowByFilterValue] = useState<ShowByFilterOptionType>(baseData.baseShowByFilterValue);
  const [showNewErrors, setShowNewErrors] = useState(false);

  const {newProblems, problems} = useCurrentAndNewProblems(showByFilterValue, validationResponse);
  const filteredProblems = useFilteredProblems(problems, newProblems, showNewErrors, searchValue, filtersValue);

  useEffect(() => {
    if (searchValue) {
      setSearchValue('');
    }
  }, [problems]);

  if (status === 'loading') {
    return <Skeleton active style={skeletonStyle} />;
  }

  return null;
};

export default VirtualizedValidation;
