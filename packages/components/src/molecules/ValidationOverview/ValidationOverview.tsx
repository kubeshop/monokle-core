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

const severityMap = (severity: number, isSelected: boolean) => {
  if (severity < 4) {
    return <Icon name="severity-low" style={{ color: isSelected ? Colors.grey1 : Colors.green7 }} />;
  } else if (severity < 7) {
    return <Icon name="severity-medium" style={{ color: isSelected ? Colors.grey1 : Colors.red7 }} />;
  } else {
    return <Icon name="severity-high" style={{ color: isSelected ? Colors.grey1 : Colors.red7 }} />;
  }
};

export const ValidationOverview: React.FC<ValidationOverviewType> = (props) => {
  const { containerStyle = {}, height, rules, validationResults, selectedError } = props;
  const { onErrorSelect } = props;

  const [filteredProblems, setFilteredProblems] = useState<{ [k: string]: ValidationResult[] }>({});
  const [problems, setProblems] = useState<{ [k: string]: ValidationResult[] }>({});
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // const errors = selectProblemsByFilePaths(validationResults, "error");
    // const warnings = selectProblemsByFilePaths(validationResults, "warning");
    const problems = selectProblemsByFilePaths(validationResults, "all");
    setProblems(problems);
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setFilteredProblems(problems);
      return;
    }

    setFilteredProblems(
      Object.fromEntries(
        Object.entries(problems).filter(([filePath, _]) => filePath.toLowerCase().includes(searchValue.toLowerCase()))
      )
    );
  }, [searchValue]);

  return (
    <MainContainer style={containerStyle} $height={height}>
      <ActionsContainer>
        <SearchInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <FiltersButton icon={<FilterOutlined />} />
      </ActionsContainer>

      <ValidationsCollapse defaultActiveKey={Object.keys(problems)} ghost>
        {Object.entries(filteredProblems).map(([filePath, results]) => (
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
              const isFoundInFile = selectedError?.locations.find(
                (loc) => loc.physicalLocation?.artifactLocation.uri === filePath
              );
              const isSelected = Boolean(isFoundInFile && rule?.id === selectedError?.ruleId);

              return (
                <ResultLine
                  $isSelected={isSelected}
                  className="collapse-item"
                  onClick={() => {
                    if (onErrorSelect) {
                      onErrorSelect(result);
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {iconMap[result.rule.toolComponent.name]}
                    {rule && severityMap(rule.properties?.["security-severity"] ?? 1, isSelected)}
                  </div>

                  <ErrorRow $isSelected={isSelected}>
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

const ErrorRow = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? Colors.grey1 : Colors.grey8)};
  font-weight: 400;
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

const ResultLine = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 8px 40px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "400")};
  color: ${({ $isSelected }) => ($isSelected ? Colors.grey1 : Colors.whitePure)};
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

  & .ant-collapse-content-box {
    padding: 10px 0px 20px 0px !important;
  }
`;
