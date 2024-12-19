import { render, screen } from "@testing-library/react";
import { WheelContext } from "./wheelContext";
import React from "react";

describe("WheelContext", () => {
  it("should have a default value of undefined", () => {
    const TestComponent = () => {
      const context = React.useContext(WheelContext);
      return <div>{context === undefined ? "undefined" : "defined"}</div>;
    };

    render(<TestComponent />);
    expect(screen.getByText("undefined")).toBeInTheDocument();
  });
});