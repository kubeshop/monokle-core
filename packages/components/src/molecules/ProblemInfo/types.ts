import {Location, RuleMetadata, ValidationResult} from '@monokle/validation';
import React from 'react';
import {SuppressionBindings} from '../ValidationOverview/types';

export type ProblemInfoType = {
  problem: ValidationResult;
  rule: RuleMetadata;
  onHelpURLClick: (url: string) => void;
  onConfigureRule: () => void;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onLocationClick?: (location: Location) => void;
  suppressionBindings?: SuppressionBindings;
};
