import { Flex, Spin, Typography } from "antd";
import React from "react";

const Loader = () => {
  return (
    <Flex gap="middle" align="center" justify="center">
      <Spin />
      <Typography.Text>Loading...</Typography.Text>
    </Flex>
  );
};

export default Loader;
