import {Colors, PanelColors} from '@/styles/Colors';
import styled from 'styled-components';
import {TitleBarType} from '..';
import {DownOutlined as RawDownOutlined, RightOutlined as RawRightOutlined} from '@ant-design/icons';

const TitleBar: React.FC<TitleBarType> = props => {
  const {actions, description, expandable = false, isOpen = false, title, type = 'primary', onExpand} = props;
  const {descriptionStyle = {}, headerStyle = {}} = props;

  return (
    <>
      <HeaderContainer style={headerStyle} $expandable={expandable} $isOpen={isOpen} $type={type}>
        {expandable && (isOpen ? <DownOutlined onClick={onExpand} /> : <RightOulined onClick={onExpand} />)}

        <Title $expandable={expandable} $isOpen={isOpen}>
          {title}
        </Title>

        <ActionsContainer>{actions}</ActionsContainer>
      </HeaderContainer>

      {description && (!expandable || (expandable && isOpen)) && (
        <DescriptionContainer style={descriptionStyle} $type={type}>
          {description}
        </DescriptionContainer>
      )}
    </>
  );
};

export default TitleBar;

// Styled Components

const ActionsContainer = styled.div`
  margin-left: auto;
`;

const DescriptionContainer = styled.div<{
  $type: 'primary' | 'secondary';
}>`
  background-color: ${({$type}) => ($type === 'secondary' ? 'rgba(25, 31, 33, 0.7)' : 'rgba(82, 115, 224, 0.3)')};
  min-height: 35px;
  padding: 3px 10px 0px 10px;
  border-radius: 4px;
  transform: translateY(-4px);
  display: flex;
  align-items: center;
`;

const DownOutlined = styled(RawDownOutlined)`
  color: ${Colors.whitePure};
  font-size: 12px;
  margin-left: 3px;
  cursor: pointer;
`;

const HeaderContainer = styled.div<{
  $expandable: boolean;
  $isOpen: boolean;
  $type: 'primary' | 'secondary';
}>`
  background-color: ${({$expandable, $isOpen, $type}) =>
    $type === 'secondary' ? PanelColors.toolBar : !$expandable || $isOpen ? Colors.geekblue7 : Colors.blue2};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px;
  min-height: 32px;
`;

const RightOulined = styled(RawRightOutlined)`
  color: ${Colors.grey9};
  font-size: 12px;
  margin-left: 3px;
  cursor: pointer;
`;

const Title = styled.div<{$expandable: boolean; $isOpen: boolean}>`
  font-weight: 600;
  color: ${({$expandable, $isOpen}) => (!$expandable || $isOpen ? Colors.whitePure : Colors.grey9)};
  font-size: 14px;
`;
