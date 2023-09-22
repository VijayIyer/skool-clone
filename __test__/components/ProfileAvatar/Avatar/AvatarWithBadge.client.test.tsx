import React from "react";
import { render, screen } from "@testing-library/react";
import AvatarWithBadge from "@/components/ProfileAvatar/Avatar/AvatarWithBadge";
import "@testing-library/jest-dom";

describe("AvatarWithBadge Component", () => {
  const props = {
    curPointsPercentage: 100,
    level: 4,
    fullName: "John Doe",
    avatarUrl: "/johnWick_avatar.avif",
  };

  beforeEach(() => {
    render(<AvatarWithBadge {...props} />);
  });

  it("renders an avatar image with the correct src and alt", () => {
    const avatar = screen.getByRole("img");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", props.avatarUrl);
    expect(avatar).toHaveAttribute("alt", props.fullName);
  });

  it("renders the level badge with the correct level number", () => {
    const levelBadge = screen.getByText(props.level.toString());

    expect(levelBadge).toBeInTheDocument();
  });

  it("renders two CircularProgress component for curPointsPercentage", () => {
    const circularProgress = screen.getAllByRole("progressbar");

    expect(circularProgress).toHaveLength(2);

    expect(circularProgress[0]).toBeInTheDocument();
    expect(circularProgress[0]).toHaveAttribute("aria-valuenow", "100");

    expect(circularProgress[1]).toBeInTheDocument();
    expect(circularProgress[1]).toHaveAttribute(
      "aria-valuenow",
      props.curPointsPercentage.toString()
    );
  });
});
