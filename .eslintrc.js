module.exports = {
  extends: ["plugin:jest/recommended", "marlint"],
  plugins: ["jest"],
  env: {
    "jest/globals": true
  }
};
