import {ValidationResult} from '@monokle/validation';
import React from 'react';

export type ErrorInfoType = {
  error: ValidationResult;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
};
