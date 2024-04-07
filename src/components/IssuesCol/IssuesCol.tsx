import { IIssue, capitalizeWords } from "@/shared";
import React, { FC } from "react";
import { IssueCard } from "../IssueCard";
import { Col, Typography } from "antd";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  data: IIssue[];
  colKey: string;
};

const IssuesCol: FC<Props> = ({ data, colKey }) => {
  return (
    <Col span={8}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", margin: "0 0 1rem" }}
      >
        {capitalizeWords(colKey.split("_").join(" "))}
      </Typography.Title>
      <Droppable droppableId={`${colKey}`}>
        {(provided) => (
          <div
            style={{
              backgroundColor: "lightgrey",
              height: "100%",
              minHeight: "50vh",
              padding: "1rem",
            }}
            className="issue-column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.map((issue, index) => (
              <IssueCard
                issue={issue}
                index={index}
                key={`${issue.id}-${index}`}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default IssuesCol;
