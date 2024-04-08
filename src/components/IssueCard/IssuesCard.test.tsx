import { render, screen } from "@testing-library/react";
import React from "react";

import IssueCard from "./IssueCard";
import { describe, it } from "@jest/globals";
import { Provider } from "react-redux";
import * as reduxHooks from "react-redux";
import { createReduxStore, store } from "@/store";
import "react-beautiful-dnd";

declare const expect: jest.Expect;

jest.mock("react-redux");
jest.mock("react-beautiful-dnd");

const mockedData = {
  issue: {
    url: "https://api.github.com/repos/facebook/react/issues/28779",
    repository_url: "https://api.github.com/repos/facebook/react",
    labels_url:
      "https://api.github.com/repos/facebook/react/issues/28779/labels{/name}",
    comments_url:
      "https://api.github.com/repos/facebook/react/issues/28779/comments",
    events_url:
      "https://api.github.com/repos/facebook/react/issues/28779/events",
    html_url: "https://github.com/facebook/react/issues/28779",
    id: 2230987002,
    node_id: "I_kwDOAJy2Ks6E-ij6",
    number: 28779,
    title: "Bug: SetState with same value, rerenders one more time",
    user: {
      login: "leadq",
      id: 16306521,
      node_id: "MDQ6VXNlcjE2MzA2NTIx",
      avatar_url: "https://avatars.githubusercontent.com/u/16306521?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/leadq",
      html_url: "https://github.com/leadq",
      followers_url: "https://api.github.com/users/leadq/followers",
      following_url:
        "https://api.github.com/users/leadq/following{/other_user}",
      gists_url: "https://api.github.com/users/leadq/gists{/gist_id}",
      starred_url: "https://api.github.com/users/leadq/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/leadq/subscriptions",
      organizations_url: "https://api.github.com/users/leadq/orgs",
      repos_url: "https://api.github.com/users/leadq/repos",
      events_url: "https://api.github.com/users/leadq/events{/privacy}",
      received_events_url: "https://api.github.com/users/leadq/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [
      {
        id: 155984160,
        node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
        url: "https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed",
        name: "Status: Unconfirmed",
        color: "d4c5f9",
        default: false,
        description: "A potential issue that we haven't yet confirmed as a bug",
      },
    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: "2024-04-08T11:49:15Z",
    updated_at: "2024-04-08T11:53:36Z",
    closed_at: null,
    author_association: "NONE",
    active_lock_reason: null,
    body: 'As far as I know, react\'s update machanism somehow checks the new value and old value of states to optimize rerenders. And I can see this behaviour after second time.\r\n\r\nI tried 2 scenario. I put "console.log" just above return().\r\n\r\nThe first one is, I defined a state with initial value String "1". Then I tried to set the same value on button click. It never rerendered as expected.\r\n\r\nThe second scenerio is, I defined a state with initial value String "1". Then I tried to set another value String "2" on every button click. My expectation is it will rerender to set the value "2". But after setting the value "2" once, it should never rerender for value "2". However it does one more time. After then, it wont rerender.  Is it expected behaviour ?\r\n\r\nReact version: 18.2.15\r\n\r\n## Steps To Reproduce\r\n\r\n1. By using my code sandbox below:\r\n1.1. Enter the url\r\n1.2 run the code\r\n1.3 click the button twice or more\r\n1.4 you will see the "count 1" on the logs twice\r\n\r\n<img width="330" alt="Screenshot 2024-04-08 at 14 44 07" src="https://github.com/facebook/react/assets/16306521/943bff4c-ebf2-4465-8b6f-d999a2a97067">\r\n\r\n\r\n2. By using your code:\r\n2.1. Create a simple react project starter.\r\n2.2 define a state of immutable value like number or string\r\n2.3 define a trigger for updating state with new value by using button click event etc. for example if initial value is string "initial" then set this state to "second" on each click. \r\n2.4 add "console.log" above your return. \r\n2.5 click the button on the browser few times\r\n\r\n\r\nhttps://codesandbox.io/p/sandbox/nervous-albattani-vl3mnm?file=%2Fsrc%2FApp.js%3A12%2C31\r\n\r\n## The current behavior\r\nit rerenders one more time with same old value. After one extra rerender, It won\'t rerender with same value.\r\n\r\n## The expected behavior\r\nit never rerender with same old value after the first updating time ',
    reactions: {
      url: "https://api.github.com/repos/facebook/react/issues/28779/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    timeline_url:
      "https://api.github.com/repos/facebook/react/issues/28779/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
  index: 1,
};
describe("IssueCard component", () => {
  it("IssueCard renders", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(createReduxStore());

    render(
      <Provider store={store}>
        <IssueCard issue={mockedData.issue} index={mockedData.index} />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByText(mockedData.issue.title)).toBeInTheDocument();
    }, 0);
  });

  it("IssueCard snapshot", () => {
    const view = render(
      <IssueCard issue={mockedData.issue} index={mockedData.index} />
    );

    expect(view).toMatchSnapshot();
  });
});
