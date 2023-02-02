import {Input} from 'antd';
import {AnimatePresence, motion} from 'framer-motion';
import styled from 'styled-components';
import {SearchOutlined} from '@ant-design/icons';

import {PropsWithChildren, useEffect, useState} from 'react';
import useDebouncedEffect from 'use-debounced-effect';
import {FILTER_HEADER_HEIGHT} from '@/constants';
import {FilterButton} from './FilterButton';
import {FilterHeader} from './FilterHeader';
import {FilterForm} from './FilterForm';
import {Colors} from '@/styles/Colors';

type Props = PropsWithChildren<{
  height?: number;
  active?: boolean;
  onToggle?: () => void;
  header?: JSX.Element;
  onClear?: () => void;
  search?: string;
  disabled?: boolean;
  onSearch?: (search: string) => void;
  hasActiveFilters?: boolean;
}>;

// eslint-disable-next-line
const NOOP = () => {};

export function Filter({
  height = 0,
  onClear = NOOP,
  search,
  onSearch = NOOP,
  active = false,
  onToggle = NOOP,
  header,
  disabled,
  children,
  hasActiveFilters,
}: Props) {
  const [internalSearch, setInternalSearch] = useState<string>(search ?? '');

  useEffect(() => {
    setInternalSearch(search ?? '');
  }, [search]);

  useDebouncedEffect(
    () => {
      if (internalSearch === search) return;
      onSearch?.(internalSearch);
    },
    250,
    [onSearch, search, internalSearch]
  );

  return (
    <Box>
      <Header>
        <InputBox>
          <StyledInput
            prefix={<SearchIcon />}
            bordered={false}
            disabled={disabled}
            value={internalSearch}
            onChange={e => setInternalSearch(e.target.value)}
          />
        </InputBox>

        {Boolean(children) && (
          <ButtonBox>
            <FilterButton disabled={disabled} active={active} iconHighlight={hasActiveFilters} onClick={onToggle} />
          </ButtonBox>
        )}
      </Header>

      {Boolean(children) && (
        <AnimatePresence>
          {Boolean(active && height > 0) && (
            <Menu
              initial={{height: 0}}
              animate={{height}}
              exit={{height: 0}}
              transition={{
                duration: 0.8,
                type: 'spring',
                bounce: 0,
              }}
            >
              <HeaderSpace>{header ?? <FilterHeader onClear={onClear} />}</HeaderSpace>

              <BodySpace $height={height}>
                <FilterForm>{children}</FilterForm>
              </BodySpace>
            </Menu>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: ${FILTER_HEADER_HEIGHT}px;
  gap: 8px;
  width: 100%;
`;

const InputBox = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

const StyledInput = styled(Input)`
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  height: 32px;
  border-radius: 4px;
  :hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const ButtonBox = styled.div`
  flex: 0 0 32px;
`;

const Menu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.cyan2};
  border-radius: 4px 0px 4px 4px;
  overflow-y: hidden;
`;

const HeaderSpace = styled.div`
  height: 45px;
  border-bottom: 1px solid ${Colors.cyan3};
`;

const BodySpace = styled.div<{$height: number}>`
  display: flex;
  flex-direction: column;
  height: ${({$height}) => $height - 45}px;
  overflow: hidden;
  padding: 12px 0;
  & > ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  & > ::-webkit-scrollbar-track {
    background: ${Colors.cyan2};
    border-radius: 3px;
  }
  & > ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

export const SearchIcon = styled(SearchOutlined)`
  color: ${Colors.grey7};
`;
