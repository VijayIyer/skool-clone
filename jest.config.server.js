const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "node",
  testMatch: ["**/*.server.test.ts"],
};

module.exports = createJestConfig(customJestConfig);
