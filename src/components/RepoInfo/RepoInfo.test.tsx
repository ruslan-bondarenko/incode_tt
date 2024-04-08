import { render, screen } from "@testing-library/react";
import React from "react";

import RepoInfo from "./RepoInfo";
import { describe, it } from "@jest/globals";

declare const expect: jest.Expect;

const mockedInfo = {
  name: "owner",
  repo: {
    name: "repo",
    url: "https://github.com/owner/repo",
  },
};
describe("RepoInfo component", () => {
  it("RepoInfo renders", () => {
    render(<RepoInfo info={mockedInfo} />);

    setTimeout(() => {
      expect(screen.getByTestId("repoinfo")).toBeInTheDocument();
    }, 0);
  });

  it("RepoInfo snapshot", () => {
    const view = render(<RepoInfo info={mockedInfo} />);

    expect(view).toMatchSnapshot();
  });
});
