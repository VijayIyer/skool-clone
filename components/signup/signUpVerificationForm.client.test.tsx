import { ReactElement } from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpVerificationForm from "./signUpVerificationForm";
import SignUpForm from ".";
import userEvent from "@testing-library/user-event";
import { generateOtpService } from "../../lib/signUpService/generateOtp";
import { signUpService } from "@/lib/signUpService/signUp";
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
jest.mock("../../lib/signUpService/generateOtp", () => {
  const original = jest.requireActual("../../lib/signUpService/generateOtp");
  return {
    ...original,
    generateOtpService: jest.fn(),
  };
});
jest.mock("../../lib/signUpService/signUp", () => {
  const original = jest.requireActual("../../lib/signUpService/signUp");
  return {
    ...original,
    signUpService: jest.fn(),
  };
});

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
describe("signUpVertificationForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render all the fields as required", () => {
    const email = "email@gmail.com";
    const resend = jest.fn();
    const signUp = jest.fn();
    const setAwaitingVerification = jest.fn();
    const wrapper = render(
      <SignUpVerificationForm
        email={email}
        resend={resend}
        signUp={signUp}
        setAwaitingVerification={setAwaitingVerification}
      />
    );
    expect(wrapper.getByLabelText("Verification code")).toBeInTheDocument();
    expect(wrapper.getByLabelText("Verification code")).toBeVisible();
    expect(screen.getByText("We sent you a code")).toBeInTheDocument();
    expect(screen.getByText("We sent you a code")).toBeVisible();
    expect(
      screen.getByText(`Enter it below to verify ${email}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Enter it below to verify ${email}`)).toBeVisible();
    expect(screen.getByText(`Resend it`)).toBeInTheDocument();
    expect(screen.getByText(`Resend it`)).toBeVisible();
  });

  it("should go back to displaying signUpForm and no longer render signUpVerificationForm when user clicks `Use a different email` link", async () => {
    const email = "test@test.com";
    const wrapper = render(<SignUpForm />);
    const firstNameInput = wrapper.getByLabelText("First name");
    const lastNameInput = wrapper.getByLabelText("Last name");
    const emailInput = wrapper.getByLabelText("Email");
    const passwordInput = wrapper.getByLabelText("Password");
    const submitButton = wrapper.getByTestId("sign-up-btn");
    generateOtpService.mockResolvedValueOnce({ success: true });

    expect(submitButton).toHaveAttribute("disabled");
    expect(firstNameInput.tagName).toBe("INPUT");
    expect(lastNameInput.tagName).toBe("INPUT");
    expect(emailInput.tagName).toBe("INPUT");
    expect(passwordInput.tagName).toBe("INPUT");

    await userEvent.type(firstNameInput, "Jane");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, "testing");
    expect(submitButton).not.toHaveAttribute("disabled");
    await userEvent.click(submitButton);

    // signup verification form should be visible

    expect(await screen.findByText("We sent you a code")).toBeInTheDocument();
    expect(await screen.findByText("We sent you a code")).toBeVisible();
    expect(
      (await screen.findAllByText("Verification code"))[0]
    ).toBeInTheDocument();
    expect((await screen.findAllByText("Verification code"))[0]).toBeVisible();
    expect(
      (await screen.findAllByText(`Enter it below to verify ${email}`))[0]
    ).toBeInTheDocument();
    expect(
      (await screen.findAllByText(`Enter it below to verify ${email}`))[0]
    ).toBeVisible();
    expect(
      (await screen.findAllByText(`Use a different email`))[0]
    ).toBeInTheDocument();
    expect(
      (await screen.findAllByText(`Use a different email`))[0]
    ).toBeVisible();

    // click on different email link
    const differentEmailLink = await screen.findByText("Use a different email");
    await userEvent.click(differentEmailLink);
    // signup form should be visible again
    expect(
      (await screen.findAllByLabelText("First name"))[0]
    ).toBeInTheDocument();
    expect((await screen.findAllByLabelText("First name"))[0]).toBeVisible();
    expect(
      (await screen.findAllByLabelText("Last name"))[0]
    ).toBeInTheDocument();
    expect((await screen.findAllByLabelText("Last name"))[0]).toBeVisible();
    expect((await screen.findAllByLabelText("Email"))[0]).toBeInTheDocument();
    expect((await screen.findAllByLabelText("Email"))[0]).toBeVisible();
    expect(
      (await screen.findAllByLabelText("Password"))[0]
    ).toBeInTheDocument();
    expect((await screen.findAllByLabelText("Password"))[0]).toBeVisible();
    // check that input fields have retained their value
    expect((await screen.findAllByLabelText("First name"))[0]).toHaveValue(
      "Jane"
    );

    expect((await screen.findAllByLabelText("Last name"))[0]).toHaveValue(
      "Doe"
    );

    expect((await screen.findAllByLabelText("Email"))[0]).toHaveValue(
      "test@test.com"
    );

    expect((await screen.findAllByLabelText("Password"))[0]).toHaveValue(
      "testing"
    );
  });
  it("should submit otp verification when user clicks submit button after entering otp", async () => {
    const email = "email@gmail.com";
    const resend = jest.fn();
    const signUp = jest.fn().mockImplementation(async (data, e) => {
      const result = await signUpService(data);
      return result.success;
    });
    const setAwaitingVerification = jest.fn();
    signUpService.mockResolvedValueOnce({ success: true });

    const wrapper = render(
      <SignUpVerificationForm
        email={email}
        resend={resend}
        signUp={signUp}
        setAwaitingVerification={setAwaitingVerification}
      />
    );

    expect(wrapper.getByLabelText("Verification code")).toBeInTheDocument();
    expect(wrapper.getByLabelText("Verification code")).toBeVisible();
    expect(screen.getByText("We sent you a code")).toBeInTheDocument();
    expect(screen.getByText("We sent you a code")).toBeVisible();
    expect(
      screen.getByText(`Enter it below to verify ${email}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Enter it below to verify ${email}`)).toBeVisible();
    expect(screen.getByText(`Resend it`)).toBeInTheDocument();
    expect(screen.getByText(`Resend it`)).toBeVisible();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeVisible();
    expect(screen.getByText("Submit")).not.toHaveAttribute("disabled");
    expect(signUpService).toBeCalledTimes(0);
    const otpTextBox = screen.getByLabelText("Verification code");
    await userEvent.type(otpTextBox, "1234");
    await userEvent.click(screen.getByText("Submit"));
    expect(signUpService).toBeCalledTimes(1);
  });
  it("should display message 'Invalid code' when user clicks submit button without entering otp", async () => {
    const email = "email@gmail.com";
    const resend = jest.fn();
    const signUp = jest.fn().mockImplementation(async (data, e) => {
      const result = await signUpService(data);
      return result.success;
    });
    const setAwaitingVerification = jest.fn();
    signUpService.mockResolvedValueOnce({ success: true });

    const wrapper = render(
      <SignUpVerificationForm
        email={email}
        resend={resend}
        signUp={signUp}
        setAwaitingVerification={setAwaitingVerification}
      />
    );

    expect(wrapper.getByLabelText("Verification code")).toBeInTheDocument();
    expect(wrapper.getByLabelText("Verification code")).toBeVisible();
    expect(screen.getByText("We sent you a code")).toBeInTheDocument();
    expect(screen.getByText("We sent you a code")).toBeVisible();
    expect(
      screen.getByText(`Enter it below to verify ${email}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Enter it below to verify ${email}`)).toBeVisible();
    expect(screen.getByText(`Resend it`)).toBeInTheDocument();
    expect(screen.getByText(`Resend it`)).toBeVisible();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeVisible();
    expect(screen.getByText("Submit")).not.toHaveAttribute("disabled");
    expect(signUpService).toBeCalledTimes(0);
    const otpTextBox = screen.getByLabelText("Verification code");

    await userEvent.click(screen.getByText("Submit"));
    // check signup service method is not called
    expect(signUpService).toBeCalledTimes(0);
    // check 'Invalid code' message
    expect((await screen.findAllByText("Invalid code"))[0]).toBeInTheDocument();
    expect((await screen.findAllByText("Invalid code"))[0]).toBeVisible();
  });
});

describe("Resend it link", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should request to send another otp for submitted email when user clicks link", async () => {
    const email = "email@gmail.com";
    const resend = jest.fn().mockResolvedValueOnce(true);
    const signUp = jest.fn();
    const setAwaitingVerification = jest.fn();
    const wrapper = render(
      <SignUpVerificationForm
        email={email}
        resend={resend}
        signUp={signUp}
        setAwaitingVerification={setAwaitingVerification}
      />
    );
    generateOtpService.mockResolvedValueOnce({ success: true });
    expect(wrapper.getByLabelText("Verification code")).toBeInTheDocument();
    expect(wrapper.getByLabelText("Verification code")).toBeVisible();
    expect(screen.getByText("We sent you a code")).toBeInTheDocument();
    expect(screen.getByText("We sent you a code")).toBeVisible();
    expect(
      screen.getByText(`Enter it below to verify ${email}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Enter it below to verify ${email}`)).toBeVisible();
    expect(screen.getByText(`Resend it`)).toBeInTheDocument();
    expect(screen.getByText(`Resend it`)).toBeVisible();
    await userEvent.click(screen.getByText(`Resend it`));
    expect(generateOtpService).toHaveBeenCalledTimes(1);
  });
  it("should display a message saying `Email resent` when link is clicked and resend was successful", async () => {
    const email = "email@gmail.com";
    const resend = jest.fn().mockResolvedValueOnce(true);
    const signUp = jest.fn();
    const setAwaitingVerification = jest.fn();
    const wrapper = render(
      <SignUpVerificationForm
        email={email}
        resend={resend}
        signUp={signUp}
        setAwaitingVerification={setAwaitingVerification}
      />
    );
    generateOtpService.mockResolvedValueOnce({ success: true });
    expect(screen.getByLabelText("Verification code")).toBeInTheDocument();
    expect(screen.getByLabelText("Verification code")).toBeVisible();
    expect(screen.getByText("We sent you a code")).toBeInTheDocument();
    expect(screen.getByText("We sent you a code")).toBeVisible();
    expect(
      screen.getByText(`Enter it below to verify ${email}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Enter it below to verify ${email}`)).toBeVisible();
    expect(screen.getByText(`Resend it`)).toBeInTheDocument();
    expect(screen.getByText(`Resend it`)).toBeVisible();
    expect((await screen.getAllByText("Email resent"))[0]).not.toBeVisible();
    await userEvent.click(screen.getByText(`Resend it`));
    expect((await screen.getAllByText("Email resent"))[0]).toBeVisible();
  });
});
