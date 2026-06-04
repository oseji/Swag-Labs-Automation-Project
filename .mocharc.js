module.exports = {
    require: ["ts-node/register"],
    reporter: "allure-mocha",
    reporterOptions: {
        resultsDir: "allure-results",
    },
    timeout: 60000,
};
