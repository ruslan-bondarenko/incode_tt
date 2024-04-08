import { render, screen } from "@testing-library/react";
import React from "react";

import ErrorMsg from "./ErrorMsg";
import { describe, it } from "@jest/globals";

declare const expect: jest.Expect;

const error = "Server error!";

describe("ErrorMsg component", () => {
  it("ErrorMsg renders", () => {
    render(<ErrorMsg error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("ErrorMsg snapshot", () => {
    const view = render(<ErrorMsg error={error} />);

    expect(view).toMatchSnapshot();
  });
});
