import {Taxonomy, reportingDescriptorRelationship} from '../common/sarif.js';

type CIS_TAXA_NAMES = 'general';

export const CIS_RELATIONS: Record<CIS_TAXA_NAMES, reportingDescriptorRelationship> = {
  general: {
    target: {
      id: 'CIS000',
      index: 0,
      toolComponent: {name: 'CIS'},
    },
  },
};

export const CIS_TAXONOMY: Taxonomy = {
  name: 'CIS',
  version: 'v0.1',
  organization: 'CIS',
  shortDescription: {text: 'CIS is something.'},
  taxa: [
    {
      id: 'CIS000',
      name: 'general',
      shortDescription: {
        text: 'General misconfigurations',
      },
    },
  ],
};
