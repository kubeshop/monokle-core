import {Location, RuleMetadata, ValidationResult} from '@monokle/validation';
import React from 'react';

export type ProblemInfoType = {
  problem: ValidationResult;
  rule: RuleMetadata;
  onHelpURLClick: (url: string) => void;
  onSettingsClick: () => void;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onLocationClick?: (location: Location) => void;
};
