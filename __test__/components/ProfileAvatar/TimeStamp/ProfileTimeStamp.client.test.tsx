import React from "react";
import { render, screen } from "@testing-library/react";
// import moment from "moment";
import ProfileTimeStamp from "@/components/ProfileAvatar/TimeStamp/ProfileTimeStamp";
import "@testing-library/jest-dom";

// Mocking the moment library to always return a fixed date for testing
// jest.mock("moment", () => {
//   const moment = require.requireActual("moment");
//   return (date) => moment(date || "2022-01-01T00:00:00.000Z");
// });

describe("ProfileTimeStamp Component", () => {
  it("renders correctly when isAccountOwner is true", () => {
    const activeTime = "2022-01-01T12:34:56.789Z";
    const createdTime = "2022-01-01T00:00:00.000Z";

    render(
      <ProfileTimeStamp
        isAccountOwner={true}
        activeTime={activeTime}
        createdTime={createdTime}
      />
    );

    // Check if the StatusDisplay component is rendered correctly
    const statusDisplay = screen.getByTestId("status-display");
    expect(statusDisplay).toBeInTheDocument();

    // Check if the CalendarTodayIcon is rendered
    const calendarIcon = screen.getByTestId("CircleIcon");
    expect(calendarIcon).toBeInTheDocument();
  });

  it("renders correctly when isAccountOwner is false", () => {
    const activeTime = "2022-01-01T12:34:56.789Z";
    const createdTime = "2022-01-01T00:00:00.000Z";

    render(
      <ProfileTimeStamp
        isAccountOwner={false}
        activeTime={activeTime}
        createdTime={createdTime}
      />
    );

    // Check if the StatusDisplay component is rendered correctly
    const statusDisplay = screen.getByTestId("status-display");
    expect(statusDisplay).toBeInTheDocument();

    // Check if the CalendarTodayIcon is rendered
    const calendarIcon = screen.getByTestId("QueryBuilderIcon");
    expect(calendarIcon).toBeInTheDocument();
  });
});
