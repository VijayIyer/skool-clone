import React from "react";
import { render, screen } from "@testing-library/react";
import NameAndBio from "@/components/ProfileAvatar/NameAndBio";
import "@testing-library/jest-dom";

describe("NameAndBio Component", () => {
  it("renders correctly with given fullName, url, and bio", () => {
    const fullName = "John Doe";
    const url = "https://example.com";
    const bio = "A short bio about John Doe.";

    render(<NameAndBio fullName={fullName} url={url} bio={bio} />);

    // Check if the fullName, url, and bio texts are rendered
    const fullNameText = screen.getByText(fullName);
    const urlText = screen.getByText(url);
    const bioText = screen.getByText(bio);

    expect(fullNameText).toBeInTheDocument();
    expect(urlText).toBeInTheDocument();
    expect(bioText).toBeInTheDocument();

    // Check if the "fullName" is rendered
    const fullNameElement = screen.getByText(fullName);

    // Check if the "url" is rendered
    const urlElement = screen.getByText(url);

    // Check if the "bio" is rendered
    const bioElement = screen.getByText(bio);
    expect(bioElement).toBeInTheDocument();
  });
});
