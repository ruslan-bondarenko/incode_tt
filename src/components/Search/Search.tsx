import { urlRegex } from "@/shared";
import {
  RootState,
  fetchIssues,
  updateFilteredIssues,
  updatePrevUrl,
  updateRepoInfo,
} from "@/store";
import { Form, Input, Button, Flex } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();
  const { filteredIssues, prevUrl, isLoading } = useSelector(
    (state: RootState) => state.issues
  );

  const handleLoad = (url: string) => {
    if (
      Object.values(filteredIssues).some((field) => field.length > 0) &&
      prevUrl
    ) {
      const prevData = localStorage.getItem("boardData");
      const parsedPrevData = prevData ? JSON.parse(prevData) : {};
      const newData = { [prevUrl]: filteredIssues };

      localStorage.setItem(
        "boardData",
        JSON.stringify({ ...parsedPrevData, ...newData })
      );
    }

    const currentData = localStorage.getItem("boardData");
    const parsedCurrData = currentData ? JSON.parse(currentData) : {};

    if (Object.keys(parsedCurrData).includes(url)) {
      dispatch(updateFilteredIssues(parsedCurrData[url]));
    } else {
      dispatch(fetchIssues({ url }) as any);
    }

    const [owner, repo] = url.split("https://github.com/")[1]?.split("/");

    dispatch(
      updateRepoInfo({
        name: owner,
        repo: {
          name: repo,
          url,
        },
      })
    );
    dispatch(updatePrevUrl(url));
  };

  const isValidUrl = urlRegex.test(value);

  return (
    <div style={{ width: "100%" }}>
      <Form>
        <Flex gap="middle" style={{ padding: "0 2rem" }}>
          <Input
            type="text"
            placeholder="Enter repo URL"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
          />
          <Button
            type="primary"
            onClick={() => handleLoad(value)}
            disabled={!isValidUrl || isLoading}
          >
            Load issues
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default Search;
