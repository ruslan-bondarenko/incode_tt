import React from "react";
import { RepoInfo, Search } from "@/components";
import { Flex } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = () => {
  const { repoInfo, isLoading } = useSelector(
    (state: RootState) => state.issues
  );

  return (
    <div
      data-testid="header"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem 0 2rem",
      }}
    >
      <Flex vertical gap={8}>
        <Search />
        {!isLoading && repoInfo && <RepoInfo info={repoInfo} />}
      </Flex>
    </div>
  );
};

export default Header;
