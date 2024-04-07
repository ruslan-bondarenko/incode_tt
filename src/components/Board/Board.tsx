import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, updateFilteredIssues } from "@/store";
import { Flex, Row } from "antd";
import { IFilteredIssues, groupIssues } from "@/shared";
import { IssuesCol, ErrorMsg, Loader } from "@/components";
import { useDispatch } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Board = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error, filteredIssues } = useSelector(
    (state: RootState) => state.issues
  );

  useEffect(() => {
    if (data) {
      dispatch(updateFilteredIssues(groupIssues(data)));
    }
  }, [data, dispatch]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColKey = source.droppableId as keyof IFilteredIssues;
    const destColKey = destination.droppableId as keyof IFilteredIssues;

    if (sourceColKey === destColKey) {
      const updatedCol = Array.from(filteredIssues[sourceColKey]);
      const [movedItem] = updatedCol.splice(source.index, 1);
      updatedCol.splice(destination.index, 0, movedItem);

      const updatedFilteredIssues = {
        ...filteredIssues,
        [sourceColKey]: updatedCol,
      };

      dispatch(updateFilteredIssues(updatedFilteredIssues));
      return;
    }

    const movedItem = filteredIssues[sourceColKey][source.index];

    const updatedSourceCol = [...filteredIssues[sourceColKey]];
    updatedSourceCol.splice(source.index, 1);

    const updatedDestCol = [...filteredIssues[destColKey]];
    updatedDestCol.splice(destination.index, 0, movedItem);

    const updatedFilteredIssues = {
      ...filteredIssues,
      [sourceColKey]: updatedSourceCol,
      [destColKey]: updatedDestCol,
    };

    dispatch(updateFilteredIssues(updatedFilteredIssues));
  };

  return (
    <Flex gap="middle" style={{ padding: "0 2rem" }} vertical>
      {isLoading && <Loader />}

      {!isLoading &&
      Object.values(filteredIssues).some((field) => field.length > 0) ? (
        <Row gutter={16}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {Object.keys(filteredIssues).map((colKey) => {
              return (
                <IssuesCol
                  key={colKey}
                  data={filteredIssues[colKey as keyof IFilteredIssues]}
                  colKey={colKey}
                />
              );
            })}
          </DragDropContext>
        </Row>
      ) : null}

      {!!error &&
        Object.values(filteredIssues).some((field) => field.length === 0) && (
          <ErrorMsg error={error} />
        )}
    </Flex>
  );
};

export default Board;
