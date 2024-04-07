import { IRepoInfo, capitalizeWords } from "@/shared";
import { Breadcrumb } from "antd";
import React, { FC } from "react";

type Props = {
  info: IRepoInfo;
};

const RepoInfo: FC<Props> = ({ info }) => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Breadcrumb
        items={[
          {
            title: (
              <a
                href={`https://github.com/${info.name}`}
                target="_blank"
                rel="noreferrer"
              >
                {capitalizeWords(info.name)}
              </a>
            ),
          },
          {
            title: (
              <a href={info.repo.url} target="_blank" rel="noreferrer">
                {capitalizeWords(info.repo.name)}
              </a>
            ),
          },
        ]}
      />
    </div>
  );
};

export default RepoInfo;
