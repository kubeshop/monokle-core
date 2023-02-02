import {Colors} from '@/styles/Colors';
import {Select} from 'antd';

export enum Operation {
  IS = 'is',
  EXISTS = 'exists',
}

type Props = {
  value: Operation;
  onChange: (newOperation: Operation) => void;
  noFocus?: boolean;
};

export function OperationSelect({value, onChange, noFocus = false}: Props) {
  return (
    <Select
      style={{
        fontSize: 12,
        color: Colors.grey7,
      }}
      showAction={noFocus ? ['click'] : ['click']}
      size="small"
      dropdownMatchSelectWidth={false}
      bordered={false}
      showArrow={false}
      value={value}
      onChange={onChange}
    >
      <Select.Option value={Operation.EXISTS}>exists</Select.Option>
      <Select.Option value={Operation.IS}>is</Select.Option>
    </Select>
  );
}
