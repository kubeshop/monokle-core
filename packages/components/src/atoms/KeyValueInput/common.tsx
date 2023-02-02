import {Colors} from '@/styles/Colors';
import {Divider as RawDivider} from 'antd';
import styled from 'styled-components';

export function Divider() {
  return <RawDivider type="vertical" style={{margin: 0, height: 14}} />;
}

export function renderKey(key: string | undefined): any {
  if (!key) return key;

  const split = key.split('/');
  const hasPrefix = split.length !== 1;

  return hasPrefix
    ? {
        value: key,
        label: (
          <Box>
            <Name>{split[1]}</Name>
            <Prefix>{split[0]}</Prefix>
          </Box>
        ),
      }
    : {
        value: key,
        label: <Name>{key}</Name>,
      };
}

const Box = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled.span`
  font-size: 12px;
`;

const Prefix = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 9px;
  margin-left: 3px;
  margin-right: 2px;
  color: ${Colors.grey7};
`;
