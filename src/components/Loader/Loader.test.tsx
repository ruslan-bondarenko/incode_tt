import { render, screen } from "@testing-library/react";
import React from "react";

import Loader from "./Loader";
import { describe, it } from "@jest/globals";

declare const expect: jest.Expect;

describe("Loader component", () => {
  it("Loader renders", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Loader snapshot", () => {
    const view = render(<Loader />);

    expect(view).toMatchSnapshot();
  });
});
