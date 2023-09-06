import {Colors} from '@/styles/Colors';
import {PropsWithChildren} from 'react';
import styled from 'styled-components';

export const FilterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  overflow-y: auto;
  gap: 6px;
  padding: 0 10px;
`;

type FieldProps = PropsWithChildren<{
  name: string;
}>;

export function FilterField({name, children}: FieldProps) {
  return (
    <FieldItem>
      <strong>{name}</strong>
      {children}
    </FieldItem>
  );
}

const FieldItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  color: ${Colors.grey9};
  margin-bottom: 8px;

  & .ant-select-clear {
    border-radius: 50% !important;
  }
`;
