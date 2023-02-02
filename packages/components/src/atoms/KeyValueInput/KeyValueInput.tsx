import {useCallback, useState} from 'react';

import {Button, Input} from 'antd';

import {CloseOutlined} from '@ant-design/icons';

import * as S from './KeyValueInput.styled';
import {OperationSelect, Operation} from './OperationSelect';
import {Divider, renderKey} from './common';

type Props = {
  pair: [string, string];
  onChange: ([key, value]: [string, string]) => void;
  onDelete: (key: string) => void;
};

export function KeyValueInput({pair, onChange, onDelete}: Props) {
  const [operation, setOperation] = useState<Operation>(pair[1] ? Operation.IS : Operation.EXISTS);
  const key = pair[0];
  const [value, setValue] = useState<string>(pair[1]);

  const handleChange = useCallback(() => {
    onChange([key, value]);
  }, [onChange, key, value]);

  return (
    <S.Box>
      <S.KeySpacer>
        <div style={{marginLeft: 8}}>{renderKey(key).label}</div>
      </S.KeySpacer>

      <Divider />

      <S.OperationSpacer>
        <OperationSelect noFocus value={operation} onChange={setOperation} />
      </S.OperationSpacer>

      <Divider />

      {operation === 'is' ? (
        <>
          <S.ValueSpacer>
            <Input
              style={{fontSize: 12}}
              value={value}
              size="small"
              bordered={false}
              onBlur={handleChange}
              onChange={e => setValue(e.target.value)}
            />
          </S.ValueSpacer>

          <Divider />
        </>
      ) : null}

      <S.ActionSpacer>
        <Button type="link" size="small" icon={<CloseOutlined />} onClick={() => onDelete(key)} />
      </S.ActionSpacer>
    </S.Box>
  );
}
