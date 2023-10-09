import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditButton from "@/components/ProfileAvatar/EditOrFollowButton/EditButton";
import "@testing-library/jest-dom";

describe("EditButton Component", () => {
  it("renders correctly", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing

    render(<EditButton handleClickEditProfile={handleClickEditProfile} />);

    // Check if the button text is rendered
    const buttonText = screen.getByText("EDIT PROFILE");
    expect(buttonText).toBeInTheDocument();
  });

  it("calls handleClickEditProfile when clicked", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing

    render(<EditButton handleClickEditProfile={handleClickEditProfile} />);

    // Click the edit button
    const editButton = screen.getByText("EDIT PROFILE");
    fireEvent.click(editButton);

    // Check if handleClickEditProfile is called
    expect(handleClickEditProfile).toHaveBeenCalled();
  });
});
