const { defaultsESM } = require("ts-jest/presets");

module.exports = {
  ...defaultsESM,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {
    ...defaultsESM.transform,
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
        diagnostics: {
          ignoreCodes: ["TS151002"]
        }
      }
    ]
  }
};
