import { ValidationResult } from "@monokle/validation";
import styled from "styled-components";
import { iconMap, severityMap } from "./constants";
import { ShowByFilterOptionType } from "./types";
import { getRuleInfo } from "./utils";

type IProps = {
  id: string;
  results: ValidationResult[];
  showByFilterValue: ShowByFilterOptionType;
};

export const ValidationCollapsePanelHeader: React.FC<IProps> = (props) => {
  const { id, results, showByFilterValue } = props;

  if (showByFilterValue === "show-by-rule") {
    const { ruleId, severity, toolComponentName } = getRuleInfo(id);

    return (
      <Container>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {iconMap[toolComponentName]}
          {severityMap(severity, false)}
        </div>
        {ruleId} <ResultsCount>{results.length}</ResultsCount>
      </Container>
    );
  }

  return (
    <>
      {id} <ResultsCount>{results.length}</ResultsCount>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
`;
