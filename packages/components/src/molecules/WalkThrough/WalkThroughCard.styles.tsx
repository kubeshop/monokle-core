import {Colors} from '@/styles/Colors';
import {Button, Typography} from 'antd';
import {motion} from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 64px;
  padding: 24px 32px 32px 32px;

  height: 450px;
`;

export const CardMedia = styled.div`
  position: relative;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Slide = styled.div`
  position: relative;
`;

export const Heading = styled(Typography.Title)`
  color: ${Colors.geekblue8} !important;
  font-weight: 700 !important;
  font-size: 28px !important;
  line-height: 36px !important;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const NextButton = styled(Button).attrs({
  size: 'large',
})`
  min-width: 72px !important;
  background-color: ${Colors.grey3};
  color: ${Colors.whitePure};

  :hover {
    color: ${Colors.blue6};
  }
`;

export const BackButton = styled(Button).attrs({
  type: 'text',
})`
  padding: 0;
  color: ${Colors.blue6} !important;

  :hover:not(:disabled),
  :focus:not(:disabled) {
    background-color: unset !important;
    color: ${Colors.grey3} !important;
  }
`;

export const AnimatedImg = styled(motion.img)`
  position: absolute;
  background: ${Colors.gradientBackground};
  border-radius: 4px;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  max-width: 390px;
  height: auto;
  object-fit: contain;
`;
