//  https://blog.logrocket.com/testing-next-js-apps-jest/#setting-up-jest
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);
