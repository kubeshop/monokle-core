import { RuleMetadata, ValidationResult } from "@monokle/validation";

export type ValidationOverviewType = {
  rules: RuleMetadata<{ entrypoint: string; path: string }>[];
  validationResults: ValidationResult[];
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  height?: number;
  newErrorsIntroducedType?: "k8s-schema" | "rule";
  selectedError?: ValidationResult;
  onErrorSelect?: (error: ValidationResult) => void;
};

export type ProblemsType = {
  [k: string]: ValidationResult[];
};
