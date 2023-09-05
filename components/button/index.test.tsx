import { fireEvent, render, screen } from "@testing-library/react";
import TestButton from "./index";
import "@testing-library/jest-dom";

describe("test button component should render", () => {
  test("should have the passed text prop", () => {
    const onClick = jest.fn(() => {});
    render(
      <TestButton size='large' onClick={onClick}>
        Test Button
      </TestButton>
    );

    const heading = screen.getByText("Test Button");
    expect(onClick).toHaveBeenCalledTimes(0);
    fireEvent.click(heading);
    expect(heading).toBeInTheDocument();
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
