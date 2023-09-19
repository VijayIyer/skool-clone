import { ReactElement } from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ChangePasswordForm from "./index";

// setup userEvent
function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    wrapper: render(jsx),
  };
}
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
describe("ChangePasswordForm", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/",
      query: {},
      pathname: "settings",
      push: jest.fn(),
    }));
  });

  it("should render change password form with password fields for old password, new password and confirm new password and header `Change password` and button `CHANGE PASSWORD`", () => {
    const wrapper = render(<ChangePasswordForm />);
    const formHeader = wrapper.getByText("Change password");
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );

    expect(oldPasswordInput.tagName).toBe("INPUT");
    expect(oldPasswordInput).toHaveAttribute("type", "password");
    expect(newPasswordInput.tagName).toBe("INPUT");
    expect(newPasswordInput).toHaveAttribute("type", "password");
    expect(confirmNewPasswordInput.tagName).toBe("INPUT");
    expect(confirmNewPasswordInput).toHaveAttribute("type", "password");
    expect(formHeader.tagName).toBe("P");
  });

  it("change password button should be disabled when any input is empty", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const formHeader = wrapper.getByText("Change password");
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByRole("button");
    expect(changePasswordButton).toHaveAttribute("disabled");
    await user.type(newPasswordInput, "Jane");
    await user.type(confirmNewPasswordInput, "Jane");
    expect(changePasswordButton).toHaveAttribute("disabled");
    await user.type(oldPasswordInput, "old password");
    expect(changePasswordButton).toHaveAttribute("disabled");
  });

  it("password length should be longer than 5", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByRole("button");

    await user.type(oldPasswordInput, "ABCD");
    await user.type(newPasswordInput, "Doe");
    await user.type(confirmNewPasswordInput, "Doe");

    expect(changePasswordButton).not.toHaveAttribute("disabled");
    await user.click(changePasswordButton);

    await waitFor(() =>
      expect(newPasswordInput).toHaveAccessibleErrorMessage(
        "Password must be at least 5 characters"
      )
    );
  });

  it("password inputs should be within length limits", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText("New password");
    const changePasswordButton = wrapper.getByRole("button");

    await user.type(oldPasswordInput, "hello");
    // making password inputs equal
    await user.type(newPasswordInput, "hello".repeat(15));
    await user.type(confirmNewPasswordInput, "hello".repeat(15));
    expect(changePasswordButton).not.toHaveAttribute("disabled");
    await user.click(changePasswordButton);
    expect(newPasswordInput).toHaveAccessibleErrorMessage(
      "Password can be up to 72 characters"
    );
  });

  it("inputs should be not contain invalid characters", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");

    await user.type(firstNameInput, "*&*(&*(");
    await user.type(lastNameInput, "*<>SLDKKS>");
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "test");
    await user.click(submitButton);
    expect(firstNameInput).toHaveAccessibleErrorMessage(
      "Please use a valid name"
    );
    expect(lastNameInput).toHaveAccessibleErrorMessage(
      "Please use a valid name"
    );
  });

  it("should handle submit correctly", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      } as Response)
    );
    let fetchMock = jest.spyOn(global, "fetch");

    const { user, wrapper } = setup(<ChangePasswordForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");
    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "testing");
    await user.click(submitButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
