import { IIssue, formatUpdateDate } from "@/shared";
import { Flex, Typography } from "antd";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  issue: IIssue;
  index: number;
};

const IssueCard: FC<Props> = ({ issue, index }) => {
  return (
    <Draggable draggableId={`${issue.id}`} index={index}>
      {(provided) => (
        <Flex
          vertical
          gap={4}
          className="issue-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Typography.Text ellipsis strong>
            {issue.title}
          </Typography.Text>
          <Typography.Text ellipsis>{`#${issue.number} ${formatUpdateDate(
            issue.updated_at
          )}`}</Typography.Text>
          <Flex gap={8}>
            <div>{issue.user.type}</div>
            <div>|</div>
            <div>Comments : {issue.comments}</div>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export default IssueCard;
