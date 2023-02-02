import {Colors} from '@/styles/Colors';
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  border: solid ${Colors.grey5b} 1px;
  border-radius: 1px;
  align-items: center;
`;

export const KeySpacer = styled.div`
  flex: 1 1 50%;
  min-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
`;

export const OperationSpacer = styled.div`
  color: ${Colors.grey7};
  flex: 0 0 auto;
  padding: 0 4px;
  font-size: 12px;
`;

export const ValueSpacer = styled.div`
  flex: 1 3 120px;
`;

export const ActionSpacer = styled.div`
  flex: 0 0 20px;
`;
