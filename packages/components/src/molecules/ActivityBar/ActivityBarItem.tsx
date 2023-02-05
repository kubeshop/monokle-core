import {Colors} from '@/styles/Colors';
import {Tooltip} from 'antd';
import {ActivityBarItemProps} from './types';
import {Badge as RawBadge, Button as RawButton} from 'antd';
import {TOOLTIP_DELAY} from '@/constants';
import styled from 'styled-components';

interface GetColorParams {
  isSelected: boolean;
  isActive?: boolean;
  isHighlighted?: boolean;
}

/**
 * ActivityBarItem renders one of the icons in the ActivityBar and handles it's events.
 */
function ActivityBarItem<ActivityName, ExtraActivityName>(
  props: ActivityBarItemProps<ActivityName, ExtraActivityName>
) {
  const {activity, isActivityBarActive, isSelected, onChange} = props;

  const badge = activity.useBadge();
  const isVisible = activity.isVisible ? activity.isVisible() : true;

  return (
    <ItemBox $isActive={isActivityBarActive} $isSelected={isSelected} $isVisible={isVisible}>
      <Tooltip title={activity.tooltip} mouseEnterDelay={TOOLTIP_DELAY} placement="right">
        <Button $isSelected={isSelected} onClick={() => onChange(activity.name)}>
          <Badge count={badge?.count ?? 0} color={Colors.blue6} size={badge?.size} dot={badge?.dot ?? false}>
            {activity.icon(isSelected)}
          </Badge>
        </Button>
      </Tooltip>

      {activity.walkthrough}
    </ItemBox>
  );
}

export default ActivityBarItem;

// Styled Components

const ItemBox = styled.div<{
  $isActive: boolean;
  $isSelected: boolean;
  $isVisible: boolean;
}>`
  background-color: ${({$isSelected, $isActive}) =>
    $isSelected ? Colors.grey10 : $isActive ? Colors.blackPure : Colors.grey10};
  display: ${({$isVisible}) => ($isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const Badge = styled(RawBadge)`
  & .ant-badge-dot {
    z-index: 100;
    background-color: ${Colors.geekblue6} !important;
    box-shadow: none;
  }

  & .ant-badge-count {
    top: 1px;
    right: -2px;
    z-index: 100;
    padding: 0px 4px;
    background-color: ${Colors.geekblue6} !important;
    box-shadow: none;
  }

  & .ant-badge-count-sm {
    min-width: 12px;
    height: 12px;
    font-size: 8px;
    line-height: 12px;
    box-shadow: none;
  }
`;

const getButtonBackground = ({isSelected}: GetColorParams): string =>
  isSelected ? Colors.highlightBlue : 'rgba(51, 60, 63, 0.5)';

const getButtonForeground = ({isSelected, isHighlighted}: GetColorParams): string =>
  isSelected ? Colors.highlightCyan : isHighlighted ? Colors.highlightBlue : 'currentColor';

const Button = styled(RawButton)<{$isSelected: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  will-change: background;
  transition: background 500ms linear;
  focus: none;

  .anticon > svg {
    will-change: color;
    transition: color 500ms linear;
  }

  ${({$isSelected: isSelected}) => `
      background: ${getButtonBackground({isSelected})};

      .anticon > svg {
        color: ${getButtonForeground({isSelected, isHighlighted: false})};
      }

      &:hover, &:focus {
        background: ${getButtonBackground({isSelected})};
        
        .anticon > svg {
          color: ${getButtonForeground({isSelected, isHighlighted: true})};
        }
      }
    `}
`;
