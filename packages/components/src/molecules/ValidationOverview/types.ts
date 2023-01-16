import { RuleMetadata, ValidationResult } from "@monokle/validation";

export type ValidationOverviewType = {
  rules: RuleMetadata<{ entrypoint: string; path: string }>[];
  validationResults: ValidationResult[];
  containerStyle?: React.CSSProperties;
  height?: number;
  selectedError?: ValidationResult;
  onErrorSelect?: (error: ValidationResult) => void;
};
