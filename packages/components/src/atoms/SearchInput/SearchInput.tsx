import Colors from "@/styles/Colors";
import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";
import React from "react";
import styled from "styled-components";

export const SearchInput: React.FC<InputProps> = (props) => {
  return <Search prefix={<SearchOutlined />} {...props} />;
};

// Styled components

const Search = styled(Input)`
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;

  .anticon-search {
    color: ${Colors.grey6};
    font-size: 16px;
  }

  .ant-input-prefix {
    margin-right: 8px;
  }

  .ant-input {
    background-color: transparent;
    color: ${Colors.grey8};
  }
`;
