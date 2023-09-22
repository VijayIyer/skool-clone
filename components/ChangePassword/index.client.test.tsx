import { ReactElement } from "react";
import { render, waitFor, cleanup, screen } from "@testing-library/react";
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

// mock fetch api
global.fetch = jest.fn().mockImplementation(() => {
  json: () =>
    Promise.resolve({
      data: {
        success: true,
        data: null,
        errorMessage: "",
      },
    });
});
const fetchMock = jest.spyOn(global, "fetch");
describe("ChangePasswordForm component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/",
      query: {},
      pathname: "settings",
      push: jest.fn(),
    }));
  });
  afterEach(jest.restoreAllMocks);

  it("should render change password form with password fields for old password, new password and confirm new password and header `Change password` and button `CHANGE PASSWORD`", () => {
    const wrapper = render(<ChangePasswordForm />);
    const formHeader = wrapper.getByText("Change password");
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    expect(oldPasswordInput).toBeInTheDocument();
    expect(oldPasswordInput).toBeVisible();
    expect(oldPasswordInput.tagName).toBe("INPUT");
    expect(oldPasswordInput).toHaveAttribute("type", "password");

    expect(newPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeVisible();
    expect(newPasswordInput.tagName).toBe("INPUT");
    expect(newPasswordInput).toHaveAttribute("type", "password");

    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeVisible();
    expect(confirmNewPasswordInput.tagName).toBe("INPUT");
    expect(confirmNewPasswordInput).toHaveAttribute("type", "password");

    expect(formHeader.tagName).toBe("P");
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toBeVisible();
  });

  it("should disable change password button when any input is empty", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByTestId("change-password-btn");
    expect(changePasswordButton).toBeDisabled();
    // test button when one field is empty
    await user.type(newPasswordInput, "Jane");
    await user.type(confirmNewPasswordInput, "Jane");
    expect(changePasswordButton).toBeDisabled();
    // test button on filling all fields
    await user.type(oldPasswordInput, "old password");
    expect(changePasswordButton).not.toBeDisabled();

    // clear new password field and check button is disabled
    await user.clear(newPasswordInput);
    await user.clear(confirmNewPasswordInput);
    expect(changePasswordButton).toBeDisabled();

    await user.type(newPasswordInput, "new password");
    await user.type(confirmNewPasswordInput, "new password");
    expect(changePasswordButton).not.toBeDisabled();

    // clear confirm new password field and check button is disabled
    await user.clear(confirmNewPasswordInput);
    expect(changePasswordButton).toBeDisabled();

    await user.type(confirmNewPasswordInput, "new password");
    expect(changePasswordButton).not.toBeDisabled();
  });

  it("password length should be longer than 5", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByTestId("change-password-btn");
    // button disabled at the start
    expect(changePasswordButton).toBeDisabled();
    await user.type(oldPasswordInput, "ABCD");
    await user.type(newPasswordInput, "Doe");
    await user.type(confirmNewPasswordInput, "Doe");

    expect(changePasswordButton).not.toBeDisabled();
    // clicks submit to verify validation error of length of password input
    await user.click(changePasswordButton);
    await waitFor(() => {
      expect(newPasswordInput).toHaveAccessibleDescription(
        "Password must be atleast 5 characters"
      );
      expect(newPasswordInput).toBeInvalid();
    });
  });

  it("password inputs should be within length limits", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByTestId("change-password-btn");

    await user.type(oldPasswordInput, "hello");
    await user.type(newPasswordInput, "hello".repeat(15));
    await user.type(confirmNewPasswordInput, "hello".repeat(15));
    await waitFor(async () => {
      expect(changePasswordButton).not.toBeDisabled();
      await user.click(changePasswordButton);
      expect(newPasswordInput).toHaveAccessibleDescription(
        "Password can be up to 72 characters"
      );
      expect(newPasswordInput).toBeInvalid();
      await user.clear(newPasswordInput);
      await user.type(newPasswordInput, "hello");
      expect(newPasswordInput).not.toHaveAccessibleDescription(
        "Password can be up to 72 characters"
      );
      expect(newPasswordInput).not.toBeInvalid();
    });
  });

  it("should handle submit correctly", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const submitButton = wrapper.getByTestId("change-password-btn");
    await user.type(oldPasswordInput, "abcde");
    await user.type(newPasswordInput, "abcde");
    await user.type(confirmNewPasswordInput, "abcde");
    await waitFor(() => {
      expect(submitButton).not.toHaveAttribute("disabled");
    });
    await user.click(submitButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("should clear password fields after submit", async () => {
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const submitButton = wrapper.getByTestId("change-password-btn");
    await user.type(oldPasswordInput, "abcde");
    await user.type(newPasswordInput, "abcde");
    await user.type(confirmNewPasswordInput, "abcde");
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    await user.click(submitButton);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(oldPasswordInput).toHaveValue("");
      expect(newPasswordInput).toHaveValue("");
      expect(confirmNewPasswordInput).toHaveValue("");
      expect(submitButton).toBeDisabled();
    });
  });
  it("should show error message when old password is not same as the one saved by user", async () => {
    jest
      .mock("global.fetch")
      .fn()
      .mockReturnValueOnce(() => {
        return {
          status: 401,
          ok: false,
          data: {
            sucess: false,
            errorMessage: "Password does not match",
            data: null,
          },
        };
      });
    const { user, wrapper } = setup(<ChangePasswordForm />);
    const oldPasswordInput = wrapper.getByLabelText("Old password");
    const newPasswordInput = wrapper.getByLabelText("New password");
    const confirmNewPasswordInput = wrapper.getByLabelText(
      "Confirm new password"
    );
    const changePasswordButton = wrapper.getByTestId("change-password-btn");

    await user.type(oldPasswordInput, "hello");
    await user.type(newPasswordInput, "hello");
    await user.type(confirmNewPasswordInput, "hello");
    await waitFor(async () => {
      expect(changePasswordButton).not.toBeDisabled();
      await user.click(changePasswordButton);
      expect(oldPasswordInput).toHaveAccessibleDescription(
        "Password does not match"
      );
      expect(oldPasswordInput).toBeInvalid();
      expect(changePasswordButton).not.toBeDisabled();

      await user.clear(oldPasswordInput);
      await user.type(oldPasswordInput, "hello");
      expect(newPasswordInput).not.toHaveAccessibleDescription(
        "Password does not match"
      );
      expect(oldPasswordInput).not.toBeInvalid();
    });
  });
});
