import React from "react";
import { render, screen } from "@testing-library/react";
import StatusDisplay from "@/components/ProfileAvatar/TimeStamp/StatusDisplay";
import "@testing-library/jest-dom";

describe("StatusDisplay Component", () => {
  it("renders correctly when isAccountOwner is true", () => {
    const activeTime = "2 hours ago";
    render(<StatusDisplay isAccountOwner={true} activeTime={activeTime} />);

    // Check if the CircleIcon is rendered with the correct color
    const circleIcon = screen.getByTestId("CircleIcon");
    expect(circleIcon).toBeInTheDocument();
    expect(circleIcon).toHaveStyle("color: rgb(0, 158, 93)");

    // Check if the "Online now" text is rendered
    const onlineNowText = screen.getByText("Online now");
    expect(onlineNowText).toBeInTheDocument();
  });

  it("renders correctly when isAccountOwner is false", () => {
    const activeTime = "2 hours ago";
    render(<StatusDisplay isAccountOwner={false} activeTime={activeTime} />);

    // Check if the QueryBuilder icon is rendered with the correct color
    const queryBuilderIcon = screen.getByTestId("QueryBuilderIcon");
    expect(queryBuilderIcon).toBeInTheDocument();
    expect(queryBuilderIcon).toHaveStyle("color: rgb(0, 158, 93)");

    // Check if the activeTime text is rendered
    const activeTimeText = screen.getByText(activeTime);
    expect(activeTimeText).toBeInTheDocument();
  });
});
