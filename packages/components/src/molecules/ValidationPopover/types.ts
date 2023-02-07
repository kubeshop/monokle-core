import {RuleLevel, ValidationResult} from '@monokle/validation';

export type ValidationPopoverProps = {
  level: RuleLevel | 'both' | 'none';
  results: ValidationResult[];
  disabled?: boolean;
  popoverIconStyle?: React.CSSProperties;
  popoverRenderItem?: JSX.Element;
  style?: React.CSSProperties;
  onMessageClickHandler: ((result: ValidationResult) => void) | undefined;
};
