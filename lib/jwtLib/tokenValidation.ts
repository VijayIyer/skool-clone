type User = {
  passwordChangedAt: string;
  id: string;
};
export const isTokenIssuedBeforePasswordChange = (
  passwordChangedAt: string,
  tokenIssuedAt: string
) => {
  return new Date(passwordChangedAt) > new Date(tokenIssuedAt);
};
