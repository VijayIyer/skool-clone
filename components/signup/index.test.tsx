import { ReactElement } from "react";
import { render } from "@testing-library/react";
import SignUpForm from "./index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
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
    }));
  });

  it("should render sign up form with input fields for first name, last name, email and password", () => {
    const wrapper = render(<SignUpForm />);
    const inputElements = wrapper.getAllByTestId("input-component");
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    expect(inputElements.length).toBe(4);
    expect(firstNameInput.tagName).toBe("INPUT");
    expect(lastNameInput.tagName).toBe("INPUT");
    expect(emailInput.tagName).toBe("INPUT");
    expect(passwordInput.tagName).toBe("INPUT");
  });

  it("sign up button should be disabled when any input is empty", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");
    expect(submitButton).toHaveAttribute("disabled");

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "testing");
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  it("email address should be valid", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test");
    await user.type(passwordInput, "testing");
    await user.click(submitButton);
    expect(emailInput).toHaveAccessibleErrorMessage("Invalid email");
  });

  it("password length should be longer than 5", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "test");
    await user.click(submitButton);
    expect(passwordInput).toHaveAccessibleErrorMessage(
      "Password must be at least 5 characters"
    );
  });

  it("password field should be able to toggle password visibility", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
    const passwordInput = wrapper.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    await user.type(passwordInput, "testing");
    const toggleVisibilityButton = wrapper.getByTestId("toggle-visibility");
    expect(passwordInput).toHaveAttribute("type", "password");
    await user.click(toggleVisibilityButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    await user.click(toggleVisibilityButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("inputs should be within length limits", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");

    await user.type(firstNameInput, "hello".repeat(5));
    await user.type(lastNameInput, "hello".repeat(5));
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "hello".repeat(15));
    await user.click(submitButton);
    expect(firstNameInput).toHaveAccessibleErrorMessage(
      "First name can be up to 20 characters"
    );
    expect(lastNameInput).toHaveAccessibleErrorMessage(
      "Last name can be up to 20 characters"
    );
    expect(passwordInput).toHaveAccessibleErrorMessage(
      "Password can be up to 72 characters"
    );
  });

  it("inputs should be not contain invalid characters", async () => {
    const { user, wrapper } = setup(<SignUpForm />);
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

    const { user, wrapper } = setup(<SignUpForm />);
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
