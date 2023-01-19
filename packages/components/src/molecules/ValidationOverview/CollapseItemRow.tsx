import Colors from "@/styles/Colors";
import { getFileLocation, RuleMetadata, ValidationResult } from "@monokle/validation";
import { useMemo } from "react";
import styled from "styled-components";
import { iconMap } from "./constants";
import { ShowByFilterOptionType } from "./types";
import { isProblemSelected, renderSeverityIcon } from "./utils";

type IProps = {
  result: ValidationResult;
  rule: RuleMetadata;
  showByFilterValue: ShowByFilterOptionType;
  selectedError?: ValidationResult;
  onClick: () => void;
};

export const CollapseItemRow: React.FC<IProps> = (props) => {
  const { result, rule, showByFilterValue, selectedError, onClick } = props;

  const isSelected = useMemo(
    () => (selectedError ? isProblemSelected(selectedError, result, showByFilterValue) : false),
    [selectedError, result, showByFilterValue]
  );

  return (
    <Row $isSelected={isSelected} $secondary={showByFilterValue === "show-by-rule"} onClick={onClick}>
      {showByFilterValue === "show-by-rule" ? (
        getFileLocation(result).physicalLocation?.artifactLocation.uri
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {iconMap[result.rule.toolComponent.name]}
            {rule && renderSeverityIcon(rule.properties?.["security-severity"] ?? 1, isSelected)}
          </div>
          <ErrorStartLine $isSelected={isSelected}>
            {result.locations[0].physicalLocation?.region?.startLine}
          </ErrorStartLine>
          {result.message.text}
        </>
      )}
    </Row>
  );
};

// Styled Components

const ErrorStartLine = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  font-weight: 400;
`;

const Row = styled.div<{ $isSelected: boolean; $secondary: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 8px 40px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "400")};
  color: ${({ $isSelected, $secondary }) =>
    $isSelected ? Colors.grey1 : $secondary ? Colors.grey8 : Colors.whitePure};
  background-color: ${({ $isSelected }) => ($isSelected ? Colors.blue9 : "transparent")};
  transition: all 0.15s ease-in;

  & .anticon {
    color: ${({ $isSelected }) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ $isSelected }) => ($isSelected ? Colors.blue8 : "rgba(141, 207, 248, 0.15)")};
  }
`;
