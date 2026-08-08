import { describe } from "mocha";
import { uiTest } from "../../utils/uiTest";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Login with invalid credentials", () => {
    uiTest(
        "should verify that the user is not able to login with invalid credentials and the correct error message is displayed",
        async () => {
            await setAllureLabels({
                severity: "high",
                tag: "regression",
                epic: "Authentication",
                feature: "Login",
                story: "User attempts to login with invalid credentials",
            });

            await loadLandingPageAndLogin(
                "negative path",
                "wrong_username",
                process.env.PASSWORD!,
            );
        },
    );
});
