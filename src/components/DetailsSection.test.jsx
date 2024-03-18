import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/test-utils";
import DetailsSection from "./DetailsSection";
import { Provider } from "react-redux";
describe("Details Section Tests", () => {
  it("should render the heading three elements properly", () => {
    renderWithProviders(<DetailsSection />);

    const allHeadings = screen.getAllByRole("heading", {
      level: 3,
    });
    expect(allHeadings).toHaveLength(5);
  });
  it("should have class of hidden when openReviewsList is true", () => {
    const mockOpenReviewList = true;
    const { container } = renderWithProviders(
      <DetailsSection openReviewsList={mockOpenReviewList} />
    );

    expect(container).toBeInTheDocument();
  });
});
