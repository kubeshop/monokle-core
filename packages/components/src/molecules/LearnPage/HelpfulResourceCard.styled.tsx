import {rgba} from 'polished';
import styled from 'styled-components';

import {AnimationDurations} from '@/styles/Animations';
import {Colors} from '@/styles/Colors';

export const Description = styled.div`
  color: ${Colors.grey8};
`;

export const HelpfulResourceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #191f21;
  border-radius: 4px;
  padding: 0px 20px;
  transition: background ${AnimationDurations.base};
  cursor: pointer;

  &:hover {
    background-color: ${rgba('#191f21', 0.75)};
  }
`;

export const Title = styled.div`
  margin-bottom: 4px;
  color: ${Colors.blue7};
`;
