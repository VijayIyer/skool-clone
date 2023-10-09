import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FollowButton from "@/components/ProfileAvatar/EditOrFollowButton/FollowButton";
import "@testing-library/jest-dom";

describe("FollowButton Component", () => {
  it("renders correctly", () => {
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(<FollowButton handleClickFollow={handleClickFollow} />);

    // Check if the button text is rendered
    const buttonText = screen.getByText("FOLLOW");
    expect(buttonText).toBeInTheDocument();
  });

  it("calls handleClickFollow when clicked", () => {
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(<FollowButton handleClickFollow={handleClickFollow} />);

    // Click the follow button
    const followButton = screen.getByText("FOLLOW");
    fireEvent.click(followButton);

    // Check if handleClickFollow is called
    expect(handleClickFollow).toHaveBeenCalled();
  });
});
