import React from "react";
import { render, screen } from "@testing-library/react";
import AvatarWithBadge from "@/AvatarWithBadge";

describe("AvatarWithBadge Component", () => {
  it("renders with the given props", () => {
    const props = {
      curPointsPercentage: 75,
      level: 3,
      fullName: "John Doe",
      avatarUrl: "/johnWick_avatar.avif",
    };

    render(<AvatarWithBadge {...props} />);

    // Check if the component renders
    const avatar = screen.getByAltText(props.fullName);
    expect(avatar).toBeInTheDocument();

    // Check if the level badge renders
    const levelBadge = screen.getByText(props.level.toString());
    expect(levelBadge).toBeInTheDocument();

    // You can add more specific tests based on your component's behavior
  });
});
