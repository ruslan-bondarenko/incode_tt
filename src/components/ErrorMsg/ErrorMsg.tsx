import { CloseCircleTwoTone } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import React, { FC } from "react";

type Props = {
  error: string;
};

const ErrorMsg: FC<Props> = ({ error }) => {
  return (
    <Flex gap="middle" align="center" justify="center">
      <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "22px" }} />
      <Typography.Text type="danger">{error}</Typography.Text>
    </Flex>
  );
};

export default ErrorMsg;
