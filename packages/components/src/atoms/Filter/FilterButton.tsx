import styled from 'styled-components';
import {Button as RawButton, ButtonProps, Tooltip} from 'antd';
import {CaretUpOutlined, FilterOutlined} from '@ant-design/icons';
import {Colors} from '@/styles/Colors';

type Props = {
  active?: boolean;
  iconHighlight?: boolean;
  disabled?: boolean;
  onClick?: ButtonProps['onClick'];
};

export function FilterButton({active = false, iconHighlight, onClick, disabled}: Props) {
  return (
    <Button onClick={onClick} disabled={disabled} $highlight={iconHighlight} $active={active}>
      <Tooltip title="Filter">
        <Box $active={active}>{active ? <CaretUpOutlined /> : <FilterOutlined />}</Box>
      </Tooltip>
    </Button>
  );
}

const Box = styled.div<{$active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition-delay: ${({$active}) => ($active ? '0s' : '0.8s')};
  transition-property: border-radius, background-color;
  height: 32px;
  width: 32px;

  &:after {
    display: block;
    content: ' ';
    position: absolute;
    margin-top: ${({$active}) => ($active ? '41px' : '10px')};
    transition: margin-top ${({$active}) => ($active ? '0s' : '0.3s')} linear;
    height: ${({$active}) => ($active ? '12px' : '0px')};
    transition-delay: ${({$active}) => ($active ? '0s' : '0.6s')};
    transition-property: margin-top, height;
    width: 32px;
    padding-bottom: auto;
    padding-top: 0;
    background-color: ${Colors.cyan2};
  }
`;

const Button = styled(RawButton)<{$active: boolean; $highlight?: boolean}>`
  border-radius: ${({$active}) => ($active ? '4px 4px 0 0' : '4px')};
  border: none;
  padding: 0px;
  width: 100%;
  height: 100%;
  color: ${Colors.grey9};
  background-color: ${({$active}) => ($active ? Colors.cyan2 : Colors.grey3b)};
  ${({$highlight}) => ($highlight ? `color: ${Colors.lightSeaGreen};` : ``)};

  :hover,
  :focus {
    color: ${Colors.lightSeaGreen};
    background-color: ${({$active}) => ($active ? Colors.cyan2 : Colors.grey3b)};
  }
  :after {
    animation: none !important;
  }
`;
