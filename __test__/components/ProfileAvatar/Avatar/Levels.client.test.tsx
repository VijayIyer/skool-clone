import React from "react";
import { render, screen } from "@testing-library/react";
import Levels from "@/components/ProfileAvatar/Avatar/Levels";
import "@testing-library/jest-dom";

describe("Levels Component", () => {
  it("renders with the given level and levelPageLink", () => {
    const level = 3; // Replace with your desired level
    const levelPageLink = "/level/3";

    render(<Levels level={level} levelPageLink={levelPageLink} />);

    // Check if the link text contains the correct level
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(`Level ${level}`);

    // Check if the link has the correct href attribute
    expect(link).toHaveAttribute("href", levelPageLink);
  });

  it("navigates to the correct level page when clicked", () => {
    const level = 3; // Replace with your desired level
    const levelPageLink = "/level/3"; // Replace with your desired link

    render(<Levels level={level} levelPageLink={levelPageLink} />);
  });
});
