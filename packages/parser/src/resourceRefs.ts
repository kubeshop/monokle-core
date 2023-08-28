import {Scalar} from 'yaml';

export type RefNode = {scalar: Scalar; key: string; parentKeyPath: string};

export enum ResourceRefType {
  Incoming = 'incoming',
  Outgoing = 'outgoing',
  Unsatisfied = 'unsatisfied-outgoing',
  IncomingOwner = 'incoming-owner',
  OutgoingOwner = 'outgoing-owner',
  UnsatisfiedOwner = 'unsatisfied-outgoing-owner',
}

export type RefTargetResource = {
  type: 'resource';
  resourceId?: string;
  resourceKind?: string;
  isOptional?: boolean; // set true for satisfied refs that were optional
};

export type RefTargetFile = {
  type: 'file';
  filePath: string;
};

export type RefTargetImage = {
  type: 'image';
  tag: string;
};

export type RefTarget = RefTargetResource | RefTargetFile | RefTargetImage;

export interface ResourceRef<TRefTarget extends RefTarget = RefTarget> {
  /** the type of ref (see enum) */
  type: ResourceRefType;
  /** the ref value - for example the name of a configmap */
  name: string;
  /** the target resource or file this is referring to (empty for unsatisfied refs) */
  target?: TRefTarget;
  /** the position in the document of the refName (undefined for incoming file refs) */
  position?: RefPosition;
}

export interface RefPosition {
  line: number;
  column: number;
  length: number;
  endLine?: number;
  endColumn?: number;
}
