const NoImplementationError = () => {
  throw Error("test not implemented!");
};
it("should return 401 Unauthorized when no jwt token is sent in the request", () =>
  NoImplementationError());
it("should return 401 Unauthroized when invalid credentials, like wrong email or old password are sent", () =>
  NoImplementationError());
it("should make a call to modify user's saved password", () =>
  NoImplementationError());
it("should send back a new jwt token", () => NoImplementationError());
