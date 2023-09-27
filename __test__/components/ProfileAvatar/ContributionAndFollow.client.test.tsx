import React from "react";
import { render, screen } from "@testing-library/react";
import ContributionAndFollow from "@/components/ProfileAvatar/ContributionAndFollow";
import "@testing-library/jest-dom";

describe("ContributionAndFollow Component", () => {
  it("renders correctly with given contributions, followers, and following", () => {
    const contributions = 10;
    const followers = 20;
    const following = 30;

    render(
      <ContributionAndFollow
        contributions={contributions}
        followers={followers}
        following={following}
      />
    );

    // Check if the contributions, followers, and following numbers are rendered
    const contributionsText = screen.getByText(contributions.toString());
    const followersText = screen.getByText(followers.toString());
    const followingText = screen.getByText(following.toString());

    expect(contributionsText).toBeInTheDocument();
    expect(followersText).toBeInTheDocument();
    expect(followingText).toBeInTheDocument();

    // Check if the "Contributions," "Followers," and "Following" texts are rendered
    const contributionsLabel = screen.getByText("Contributions");
    const followersLabel = screen.getByText("Followers");
    const followingLabel = screen.getByText("Following");

    expect(contributionsLabel).toBeInTheDocument();
    expect(followersLabel).toBeInTheDocument();
    expect(followingLabel).toBeInTheDocument();
  });
});
