import {ValidationResponse, ValidationResult} from '@monokle/validation';

export type ValidationOverviewType = {
  validationResponse: ValidationResponse;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  customMessage?: string;
  height?: number;
  newProblemsIntroducedType?: string;
  selectedProblem?: ValidationResult;
  onProblemSelect?: (payload: {problem: ValidationResult; selectedFrom: 'resource' | 'file'}) => void;
};

export type ProblemsType = {
  [k: string]: ValidationResult[];
};

export type NewProblemsType = {data: ProblemsType; resultsCount: number};

export type ShowByFilterOptionType = 'show-by-file' | 'show-by-resource' | 'show-by-rule';
