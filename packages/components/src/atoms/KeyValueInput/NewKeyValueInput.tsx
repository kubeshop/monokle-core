import {useCallback, useMemo, useRef, useState} from 'react';

import {Button, Input, InputRef, Select} from 'antd';
import type {BaseSelectRef} from 'rc-select';

import {PlusOutlined} from '@ant-design/icons';

import {groupBy} from 'lodash';
import * as S from './KeyValueInput.styled';
import {OperationSelect, Operation} from './OperationSelect';
import {Divider, renderKey} from './common';

const {Option, OptGroup} = Select;

type Props = {
  onAddKeyValue: ([key, value]: [string, string | undefined]) => void;
  keyOptions?: {value: string}[];
};

export function NewKeyValueInput({onAddKeyValue, keyOptions = []}: Props) {
  const [key, setKey] = useState<string | undefined>();
  const [value, setValue] = useState<string | undefined>();
  const [operation, setOperation] = useState<Operation>(Operation.EXISTS);
  const keyRef = useRef<BaseSelectRef | null>(null);
  const valueRef = useRef<InputRef | null>(null);

  const handleOperationChange = useCallback(
    (newOperation: Operation) => {
      setOperation(newOperation);
      if (newOperation === Operation.EXISTS) {
        setValue(undefined);
      }
    },
    [setValue, operation, setOperation]
  );

  const handleAddKey = useCallback(() => {
    if (!key) return;
    onAddKeyValue([key, value]);
    setKey(undefined);
    setValue(undefined);
    setOperation(Operation.EXISTS);
    keyRef.current?.focus();
  }, [key, onAddKeyValue, value]);

  const handleEnter = useCallback(
    (e: any) => {
      if (e?.key !== 'Enter') return;
      handleAddKey();
    },
    [handleAddKey]
  );

  const GroupedOptions = useMemo(() => {
    const values = keyOptions.map(option => option.value);
    const labels = values
      .map(label => label.split('/'))
      .map(split => (split.length === 1 ? {prefix: undefined, name: split[0]} : {prefix: split[0], name: split[1]}));

    const labelsWithoutPrefix = labels.filter(l => !l.prefix);
    const groupedLabels = groupBy(
      labels.filter(l => l.prefix),
      'prefix'
    );

    return (
      <>
        {labelsWithoutPrefix.map(label => (
          <Option key={label.name}>{label.name}</Option>
        ))}

        {Object.entries(groupedLabels).map(([prefix, groupLabels]) => {
          return (
            <OptGroup key={prefix} label={prefix}>
              {groupLabels.map(label => {
                return (
                  <Option
                    key={`${label.prefix!}/${label.name}`}
                    label={label.name}
                    value={`${label.prefix!}/${label.name}`}
                  >
                    {label.name}
                  </Option>
                );
              })}
            </OptGroup>
          );
        })}
      </>
    );
  }, [keyOptions]);

  return (
    <S.Box>
      <S.KeySpacer>
        <Select
          style={{width: '100%', minWidth: 0}}
          ref={keyRef}
          showSearch
          allowClear
          optionLabelProp="label"
          dropdownMatchSelectWidth={false}
          showArrow={false}
          placeholder="Key"
          size="small"
          bordered={false}
          value={renderKey(key)}
          onChange={setKey}
          onKeyDown={operation === 'exists' ? handleEnter : undefined}
        >
          {GroupedOptions}
        </Select>
      </S.KeySpacer>

      <Divider />

      <S.OperationSpacer>
        <OperationSelect value={operation} onChange={handleOperationChange} />
      </S.OperationSpacer>

      <Divider />

      {operation === 'is' && (
        <>
          <S.ValueSpacer>
            <Input
              ref={valueRef}
              style={{fontSize: 12}}
              placeholder="Value"
              size="small"
              bordered={false}
              value={value}
              onKeyDown={handleEnter}
              onChange={e => setValue(e.target.value)}
            />
          </S.ValueSpacer>
          <Divider />
        </>
      )}

      <S.ActionSpacer>
        <Button type="link" size="small" icon={<PlusOutlined />} onClick={handleAddKey} />
      </S.ActionSpacer>
    </S.Box>
  );
}
