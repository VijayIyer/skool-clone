import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonContainer from "@/components/ProfileAvatar/EditOrFollowButton/ButtonContainer";
import "@testing-library/jest-dom";

describe("ButtonContainer Component", () => {
  it("renders EditButton when isAccountOwner is true", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(
      <ButtonContainer
        isAccountOwner={true}
        handleClickEditProfile={handleClickEditProfile}
        handleClickFollow={handleClickFollow}
      />
    );

    // Check if EditButton is rendered
    const editButton = screen.getByText("EDIT PROFILE");
    expect(editButton).toBeInTheDocument();
  });

  it("renders FollowButton when isAccountOwner is false", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(
      <ButtonContainer
        isAccountOwner={false}
        handleClickEditProfile={handleClickEditProfile}
        handleClickFollow={handleClickFollow}
      />
    );

    // Check if FollowButton is rendered
    const followButton = screen.getByText("FOLLOW");
    expect(followButton).toBeInTheDocument();
  });

  it("calls handleClickEditProfile when EditButton is clicked", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(
      <ButtonContainer
        isAccountOwner={true}
        handleClickEditProfile={handleClickEditProfile}
        handleClickFollow={handleClickFollow}
      />
    );

    // Click the EditButton
    const editButton = screen.getByText("EDIT PROFILE");
    fireEvent.click(editButton);

    // Check if handleClickEditProfile is called
    expect(handleClickEditProfile).toHaveBeenCalled();
  });

  it("calls handleClickFollow when FollowButton is clicked", () => {
    const handleClickEditProfile = jest.fn(); // Mock function for testing
    const handleClickFollow = jest.fn(); // Mock function for testing

    render(
      <ButtonContainer
        isAccountOwner={false}
        handleClickEditProfile={handleClickEditProfile}
        handleClickFollow={handleClickFollow}
      />
    );

    // Click the FollowButton
    const followButton = screen.getByText("FOLLOW");
    fireEvent.click(followButton);

    // Check if handleClickFollow is called
    expect(handleClickFollow).toHaveBeenCalled();
  });
});
