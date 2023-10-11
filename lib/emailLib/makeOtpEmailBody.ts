export default function makeOtpEmailBody(
  name: string,
  emailAddress: string,
  otp: string
): string {
  return `<h3>Confirm your email address</h3>
  <p>Hey ${name}</p>
  <br />
  <p>There’s one quick step you need to complete before creating your Skool account. Please enter this verification code to confirm this is your email.
  </p>
  <br />
  <h2>${otp}</h2>`;
}
