import { ValidationResult } from "@monokle/validation";

export type ValidationOverviewType = {
  validationResults: ValidationResult[];
  containerStyle?: React.CSSProperties;
  height?: number;
};
