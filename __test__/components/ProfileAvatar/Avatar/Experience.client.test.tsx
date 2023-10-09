import React from "react";
import { render, screen } from "@testing-library/react";
import Experience from "@/components/ProfileAvatar/Avatar/Experience";
import "@testing-library/jest-dom";

describe("Experience Component", () => {
  it("renders with the given curPointsPercentage", () => {
    const curPointsPercentage = 50;

    render(<Experience curPointsPercentage={curPointsPercentage} />);

    // Check if the BlueTextTypography component renders with the correct percentage
    const blueText = screen.getByText(curPointsPercentage.toString());
    expect(blueText).toBeInTheDocument();

    // Check if the GrayTextTypography component renders with the expected text
    const grayText = screen.getByText("points to level up");
    expect(grayText).toBeInTheDocument();
  });

  it("renders IconAndModal component", () => {
    render(<Experience curPointsPercentage={50} />);

    // Check if the IconAndModal component is rendered
    const iconAndModal = screen.getByTestId("modal-icon");
    expect(iconAndModal).toBeInTheDocument();
  });
});
