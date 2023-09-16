import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { render, screen, waitFor } from "@testing-library/react";
import ChangePasswordForm from ".";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
describe("ChangePassword form should render correctly in different states", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      isReady: true,
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  test("it should have text `Change password` above the password fields", () => {
    const { container } = render(<ChangePasswordForm />);
    expect(screen.getByText("Change password")).toBeInTheDocument();
    expect(screen.getByText("Change password")).toBeVisible();
  });
  it("Should be rendered inside the Settings page", () => {
    const component = render(<ChangePasswordForm />);
    expect(false).toEqual(true);
  });
  it("Should have query parameters added after rendering", async () => {
    const component = render(<ChangePasswordForm />);
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalled();
      expect(useRouter().push).toHaveBeenCalledTimes(1);
    });
  });
  it("Should render 3 input fields for entering passwords with correct names", () => {
    const component = render(<ChangePasswordForm />);
    expect(false).toEqual(true);
  });
  it("Should render a button with text `CHANGE PASSWORD`", () => {
    const component = render(<ChangePasswordForm />);
    expect(false).toEqual(true);
  });
  it("Should be possible to enter text in the password fields", () => {});
  it("Should enable `CHANGE PASSWORD` button when all password fields are filled and `new password` and `confirm new password` fields have the same value", () => {});
  it("Should disable `CHANGE PASSWORD` button again if `new password` and `confirm new password` fields do not have same values", () => {});
  it("Should display error messages below `New Password` field on clicking `CHANGE PASSWORD` button, if the value does not conform to minimum and maximum length rules", () => {});
  it("Should error message below `Old Password` field on clicking `CHANGE PASSWORD` button, if the value is not same as the old password", () => {});
  it("Should send a request to change password on clicking `CHANGE PASSWORD` button once it is enabled", () => {});
  it("Should clear all password fields if `CHANGE PASSWORD` action was successful", () => {});
});
