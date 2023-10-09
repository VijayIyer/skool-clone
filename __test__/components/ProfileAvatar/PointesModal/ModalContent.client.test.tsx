import React from "react";
import { render, screen } from "@testing-library/react";
import ModalContent from "@/components/ProfileAvatar/PointsModal/ModalContent";
import "@testing-library/jest-dom";

describe("ModalContent Component", () => {
  it("renders with the correct headings and paragraphs", () => {
    render(<ModalContent />);

    // Check if the modal header is rendered with the correct text
    const modalHeader = screen.getByText("Skool points");
    expect(modalHeader).toBeInTheDocument();

    // Check if the first modal subheader is rendered with the correct text
    const firstModalSubHeader = screen.getByText("Points");
    expect(firstModalSubHeader).toBeInTheDocument();

    // Check if the first modal paragraph is rendered with the correct text
    const firstModalParagraph = screen.getByText(
      "You earn points when other members like your posts or comments. 1 like = 1 point. This encourages users to produce quality content and interact with other members in their community."
    );
    expect(firstModalParagraph).toBeInTheDocument();

    // Check if the second modal subheader is rendered with the correct text
    const secondModalSubHeader = screen.getByText("Levels");
    expect(secondModalSubHeader).toBeInTheDocument();

    // Check if the second modal paragraph is rendered with the correct text
    const secondModalParagraph = screen.getByText(
      "As you gain points, you level up. Your level is shown at the bottom right of your avatar. The number of points required to get to the next level is shown under your avatar on your profile page."
    );
    expect(secondModalParagraph).toBeInTheDocument();

    // Check if the levels are rendered with the correct text
    const level1Text = screen.getByText("Level 1 - 0 points");
    const level9Text = screen.getByText("Level 9 - 33,015 points");
    expect(level1Text).toBeInTheDocument();
    expect(level9Text).toBeInTheDocument();
  });
});
