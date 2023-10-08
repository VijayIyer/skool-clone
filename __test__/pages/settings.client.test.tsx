import { render, waitFor, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Settings from "@/pages/settings";
const pushMock = jest.fn();
describe("Settings page", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((key) => key);
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/",
      query: {},
      pathname: "settings",
      push: pushMock,
    }));
  });
  it("Should render component based on selected tab", () => {
    render(<Settings />);
    expect(screen.getByText("Change password")).toBeInTheDocument();
    expect(screen.getByText("Change password")).toBeVisible();
    expect(pushMock).toBeCalled();
  });
  it("Should add query parameters based on selected tab", () => {
    render(<Settings />);
    expect(pushMock).toBeCalled();
    expect(pushMock).toHaveBeenCalledWith({ t: "password" });
  });
});
