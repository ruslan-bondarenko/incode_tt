import { render, screen } from "@testing-library/react";
import React from "react";

import Header from "./Header";
import { describe, it } from "@jest/globals";
import { Provider } from "react-redux";
import { createReduxStore, store } from "@/store";
import * as reduxHooks from "react-redux";

declare const expect: jest.Expect;

jest.mock("react-redux");

describe("Header component", () => {
  it("Header renders", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(createReduxStore());
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    }, 0);
  });

  it("Header snapshot", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(createReduxStore());
    const view = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(view).toMatchSnapshot();
  });
});
