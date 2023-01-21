import {ValidationResponse, ValidationResult} from '@monokle/validation';
import {useEffect, useMemo, useState} from 'react';
import {NewProblemsType, ProblemsType, ShowByFilterOptionType} from './types';
import {
  extractNewProblems,
  filterBySearchValue,
  selectProblemsByFilePath,
  selectProblemsByResource,
  selectProblemsByRule,
} from './utils';

let baseValidationResults: ValidationResult[] = [
  {
    ruleId: 'KSV001',
    rule: {
      index: 0,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Disallow the process from elevating its privileges on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV003',
    rule: {
      index: 2,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require default capabilities to be dropped on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV011',
    rule: {
      index: 8,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require the CPU to be limited on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV012',
    rule: {
      index: 9,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Requires the container to runs as non root user on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV013',
    rule: {
      index: 10,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Disallow images with the latest tag on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV014',
    rule: {
      index: 11,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require a read-only root file system on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV018',
    rule: {
      index: 15,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require the memory to be limited on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV020',
    rule: {
      index: 16,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Disallow running with a low user ID on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'KSV021',
    rule: {
      index: 17,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Disallow running with a low group ID on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
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
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'K8S001',
    rule: {
      index: 0,
      toolComponent: {
        name: 'kubernetes-schema',
      },
    },
    level: 'error',
    message: {
      text: 'Value at /spec/template/spec/containers/0/ports/0/name should be string',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
          },
          region: {
            startLine: 19,
            startColumn: 21,
            endLine: 19,
            endColumn: 23,
          },
        },
      },
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
          },
          region: {
            startLine: 19,
            startColumn: 21,
            endLine: 19,
            endColumn: 23,
          },
        },
        logicalLocations: [
          {
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
  {
    ruleId: 'K8S001',
    rule: {
      index: 0,
      toolComponent: {
        name: 'kubernetes-schema',
      },
    },
    level: 'error',
    message: {
      text: 'Value at /spec/selector/matchLabels should be string',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/service.yaml',
          },
          region: {
            startLine: 9,
            startColumn: 7,
            endLine: 10,
            endColumn: 1,
          },
        },
      },
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d1',
          },
          region: {
            startLine: 9,
            startColumn: 7,
            endLine: 10,
            endColumn: 1,
          },
        },
        logicalLocations: [
          {
            kind: 'resource',
            fullyQualifiedName:
              'panda-blog.service@vanilla-panda-blog/service.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
];

export function useGetCurrentAndNewProblems(
  showByFilterValue: ShowByFilterOptionType,
  validationResponse: ValidationResponse
) {
  const [newProblems, setNewProblems] = useState<NewProblemsType>({
    data: {},
    resultsCount: 0,
  });
  const [problems, setProblems] = useState<ProblemsType>({});

  const validationResults = useMemo(
    () => validationResponse.runs.flatMap(r => r.results) ?? [],
    [validationResponse]
  );

  useEffect(() => {
    let currentProblems: ProblemsType = {};
    let baseProblems: ProblemsType = {};

    if (showByFilterValue === 'show-by-resource') {
      console.log('Resource base VR:', baseValidationResults);
      baseProblems = selectProblemsByResource(baseValidationResults, 'error');
      currentProblems = selectProblemsByResource(validationResults, 'error');
    } else if (showByFilterValue === 'show-by-file') {
      console.log('File base VR:', baseValidationResults);
      baseProblems = selectProblemsByFilePath(baseValidationResults, 'error');
      currentProblems = selectProblemsByFilePath(validationResults, 'error');
    } else if (showByFilterValue === 'show-by-rule') {
      baseProblems = selectProblemsByRule(
        validationResponse,
        baseValidationResults,
        'error'
      );
      currentProblems = selectProblemsByRule(
        validationResponse,
        validationResults,
        'error'
      );
    }

    if (baseValidationResults.length) {
      const foundNewProblems = extractNewProblems(
        baseProblems,
        currentProblems,
        showByFilterValue
      );

      setNewProblems({
        data: foundNewProblems.newProblems,
        resultsCount: foundNewProblems.resultsCounter,
      });
    }

    setProblems(currentProblems);
  }, [showByFilterValue, validationResults]);

  // useEffect(() => {
  //   console.log('Here!!!');
  //   baseValidationResults = [...validationResults];
  //   console.log('use effect VR:', baseValidationResults);
  // }, [validationResults]);

  return {newProblems, problems};
}

export function useGetFilteredProblems(
  problems: ProblemsType,
  newProblems: NewProblemsType,
  showNewErrors: boolean,
  searchValue: string
) {
  const [filteredProblems, setFilteredProblems] = useState<ProblemsType>({});

  useEffect(() => {
    let showingProblems: ProblemsType = {};

    if (showNewErrors) {
      showingProblems = newProblems.data;
    } else {
      showingProblems = problems;
    }

    const currentFilteredProblems = filterBySearchValue(
      showingProblems,
      searchValue
    );
    setFilteredProblems(currentFilteredProblems);
  }, [problems, newProblems, showNewErrors, searchValue]);

  return filteredProblems;
}
