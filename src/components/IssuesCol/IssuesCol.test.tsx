import { render, screen } from "@testing-library/react";
import React from "react";

import IssuesCol from "./IssuesCol";
import { describe, it } from "@jest/globals";
import { capitalizeWords } from "@/shared";
import { Provider } from "react-redux";
import * as reduxHooks from "react-redux";
import { createReduxStore, store } from "@/store";
import "react-beautiful-dnd";

declare const expect: jest.Expect;

jest.mock("react-redux");
jest.mock("react-beautiful-dnd");

const mockedData = {
  data: [],
  colKey: "test",
};
describe("IssuesCol component", () => {
  it("IssuesCol renders", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(createReduxStore());

    render(
      <Provider store={store}>
        <IssuesCol data={mockedData.data} colKey={mockedData.colKey} />
      </Provider>
    );

    setTimeout(() => {
      expect(
        screen.getByText(
          capitalizeWords(mockedData.colKey.split("_").join(" "))
        )
      ).toBeInTheDocument();
    }, 0);
  });

  it("IssuesCol snapshot", () => {
    const view = render(
      <IssuesCol data={mockedData.data} colKey={mockedData.colKey} />
    );

    expect(view).toMatchSnapshot();
  });
});
