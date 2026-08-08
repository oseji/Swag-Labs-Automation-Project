module.exports = {
    require: ["ts-node/register", "dotenv/config"],
    reporter: "allure-mocha",
    reporterOptions: {
        resultsDir: "allure-results",
    },
    timeout: 60000,
};
