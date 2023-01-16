import { Icon, SearchInput } from "@/atoms";
import Colors from "@/styles/Colors";
import { FilterOutlined } from "@ant-design/icons";
import { ValidationResult } from "@monokle/validation";
import { Button, Collapse } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ValidationOverviewType } from "./types";
import { selectProblemsByFilePaths } from "./utils";

const iconMap: Record<string, JSX.Element> = {
  "kubernetes-schema": <Icon name="validation-k8s-schema" />,
  "open-policy-agent": <Icon name="validation-opa" />,
};

const severityMap = (severity: number) => {
  if (severity < 4) {
    return <Icon name="severity-low" style={{ color: Colors.green7 }} />;
  } else if (severity < 7) {
    return <Icon name="severity-medium" style={{ color: Colors.red7 }} />;
  } else {
    return <Icon name="severity-high" style={{ color: Colors.red7 }} />;
  }
};

export const ValidationOverview: React.FC<ValidationOverviewType> = (props) => {
  const { containerStyle = {}, height, rules, validationResults } = props;

  const [problems, setProblems] = useState<{ [k: string]: ValidationResult[] }>({});

  useEffect(() => {
    // const errors = selectProblemsByFilePaths(validationResults, "error");
    // const warnings = selectProblemsByFilePaths(validationResults, "warning");
    const problems = selectProblemsByFilePaths(validationResults, "all");
    setProblems(problems);
  }, []);

  console.log(problems);

  return (
    <MainContainer style={containerStyle} $height={height}>
      <ActionsContainer>
        <SearchInput />

        <FiltersButton icon={<FilterOutlined />} />
      </ActionsContainer>

      <ValidationsCollapse defaultActiveKey={Object.keys(problems)} ghost>
        {Object.entries(problems).map(([filePath, results]) => (
          <>
            <Collapse.Panel
              header={
                <>
                  {filePath} <ResultsCount>{results.length}</ResultsCount>
                </>
              }
              key={filePath}
            >
              {results.map((result) => {
                const rule = rules.find((r) => r.id === result.ruleId);

                return (
                  <ResultLine>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {iconMap[result.rule.toolComponent.name]}
                      {rule && severityMap(rule.properties?.["security-severity"] ?? 1)}
                    </div>

                    <ErrorRow>
                      {
                        result.locations.find((loc) => loc.physicalLocation?.artifactLocation.uri === filePath)
                          ?.physicalLocation?.region?.startLine
                      }
                    </ErrorRow>
                    {result.message.text}
                  </ResultLine>
                );
              })}
            </Collapse.Panel>
          </>
        ))}
      </ValidationsCollapse>
    </MainContainer>
  );
};

// Styled components

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 16px;
  padding: 0 16px;
`;

const ErrorRow = styled.div`
  color: ${Colors.grey8};
`;

const FiltersButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${Colors.blue7};
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    color: ${Colors.blue7};
  }
`;

const MainContainer = styled.div<{ $height?: number }>`
  background-color: #191f21;
  height: ${({ $height }) => ($height ? `${$height}px` : "100%")};
  width: 100%;
`;

const ResultLine = styled.div`
  color: ${Colors.whitePure};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 16px;

  & .anticon {
    color: ${Colors.grey8};
  }
`;

const ResultsCount = styled.span`
  font-weight: 700;
  margin-left: 6px;
`;

const ValidationsCollapse = styled(Collapse)`
  height: calc(100% - 48px);
  overflow-y: auto;
  margin-top: 24px;

  & .ant-collapse-header {
    color: ${Colors.grey8} !important;

    &:first-child {
      padding-top: 0px;
    }
  }
`;
