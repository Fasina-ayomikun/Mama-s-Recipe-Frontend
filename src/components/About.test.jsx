import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About.jsx tests", () => {
  it("Should do render the elements properly", () => {
    render(<About />);
    const headingElement = screen.getByRole("heading");
    const bodyElement = screen.getByTestId("about");
    expect(headingElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });
});
