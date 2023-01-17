import { Icon, SearchInput } from "@/atoms";
import Colors from "@/styles/Colors";
import { CloseOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProblemsType, ValidationOverviewType } from "./types";
import { extractNewProblems, filterBySearchValue, selectProblemsByFilePaths } from "./utils";

let baseProblems: ProblemsType = {
  "vanilla-panda-blog/deployment.yaml": [
    {
      ruleId: "KSV012",
      rule: {
        index: 9,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: "Requires the container to runs as non root user on container panda-blog.",
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV013",
      rule: {
        index: 10,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: "Disallow images with the latest tag on container panda-blog.",
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 17,
              startColumn: 18,
              endLine: 17,
              endColumn: 35,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 17,
              startColumn: 18,
              endLine: 17,
              endColumn: 35,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV014",
      rule: {
        index: 11,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: "Require a read-only root file system on container panda-blog.",
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV015",
      rule: {
        index: 12,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the CPU to be requested on container "panda-blog"',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV016",
      rule: {
        index: 13,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the memory to be requested on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV018",
      rule: {
        index: 15,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the memory to be limited on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV020",
      rule: {
        index: 16,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow running with a low user ID on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV021",
      rule: {
        index: 17,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow running with a low group ID on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 16,
              startColumn: 11,
              endLine: 28,
              endColumn: 1,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
  ],
};

const iconMap: Record<string, JSX.Element> = {
  "kubernetes-schema": <Icon name="validation-k8s-schema" />,
  "open-policy-agent": <Icon name="validation-opa" />,
};

const newErrorsTextMap = {
  "k8s-schema": "K8s Schema changed.",
  rule: "Rule changed.",
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
  const { containerStyle = {}, height, rules, validationResults, selectedError, newErrorsIntroducedType } = props;
  const { onErrorSelect } = props;

  const [filteredProblems, setFilteredProblems] = useState<ProblemsType>({});
  const [newProblems, setNewProblems] = useState<{ data: ProblemsType; resultsCount: number }>({
    data: {},
    resultsCount: 0,
  });
  const [problems, setProblems] = useState<ProblemsType>({});
  const [searchValue, setSearchValue] = useState("");
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);

  useEffect(() => {
    const currentProblems = selectProblemsByFilePaths(validationResults, "all");

    if (Object.keys(baseProblems).length) {
      const foundNewProblems = extractNewProblems(baseProblems, currentProblems);
      setNewProblems({ data: foundNewProblems.newProblems, resultsCount: foundNewProblems.resultsCounter });
    }

    baseProblems = { ...currentProblems };
    setProblems(currentProblems);
  }, [validationResults]);

  useEffect(() => {
    setFilteredProblems(filterBySearchValue(problems, searchValue));
  }, [searchValue, problems]);

  useEffect(() => {
    if (!showNewErrorsMessage) {
      setShowNewErrorsMessage(true);
    }
  }, [newProblems]);

  useEffect(() => {
    let showingProblems: ProblemsType = {};

    if (showNewErrors) {
      showingProblems = newProblems.data;
    } else {
      showingProblems = problems;
    }

    setFilteredProblems(filterBySearchValue(showingProblems, searchValue));
  }, [showNewErrors, searchValue]);

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

      <ActionsContainer $secondary>
        {Object.keys(newProblems).length && showNewErrorsMessage && (
          <>
            {showNewErrors ? (
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            ) : (
              <NewErrorsMessage>
                {newErrorsIntroducedType ? newErrorsTextMap[newErrorsIntroducedType] : ""}{" "}
                <b>{newProblems.resultsCount} errors</b> introduced.{" "}
                <ShowNewErrorsButton onClick={() => setShowNewErrors(true)}>Show only those</ShowNewErrorsButton>
                <CloseIcon onClick={() => setShowNewErrorsMessage(false)} />
              </NewErrorsMessage>
            )}
          </>
        )}
      </ActionsContainer>

      {Object.keys(filteredProblems).length ? (
        <ValidationsCollapse defaultActiveKey={Object.keys(filteredProblems)} ghost>
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
                    key={result.ruleId}
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
      ) : (
        <NoErrorsMessage>No errors found.</NoErrorsMessage>
      )}
    </MainContainer>
  );
};

// Styled components

const ActionsContainer = styled.div<{ $secondary?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $secondary }) => ($secondary ? "max-content 1fr" : "1fr max-content")};
  grid-gap: 16px;
  padding: 0 16px;

  ${({ $secondary }) => {
    if ($secondary) {
      return "margin-top: 16px;";
    }
  }}
`;

const CloseIcon = styled(CloseOutlined)`
  transform: translateY(1px);
  color: ${Colors.grey8};
  cursor: pointer;
  margin-left: 12px;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.grey7};
  }
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

const NewErrorsMessage = styled.div`
  background-color: rgba(222, 68, 81, 0.15);
  border-radius: 2px;
  padding: 1px 8px;
  color: ${Colors.red7};
`;

const NoErrorsMessage = styled.div`
  color: ${Colors.grey9};
  padding: 16px;
  font-weight: 700;
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

const ShowNewErrorsButton = styled.span`
  padding: 1px 0px;
  color: ${Colors.blue7};
  margin-left: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.blue6};
  }
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
