import {Location, ValidationResult} from '@monokle/validation';
import React from 'react';

export type ProblemInfoType = {
  problem: ValidationResult;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onLocationClick?: (location: Location) => void;
};
