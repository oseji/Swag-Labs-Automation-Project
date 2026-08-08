module.exports = {
    require: ["ts-node/register", "dotenv/config", "./utils/rootHooks.ts"],
    reporter: "allure-mocha",
    reporterOptions: {
        resultsDir: "allure-results",
    },
    timeout: 60000,
};
