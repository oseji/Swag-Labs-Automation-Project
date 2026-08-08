import { describe } from "mocha";
import { uiTest } from "../../utils/uiTest";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Login with valid credentials", () => {
    uiTest(
        "should verify that the user is redirected to the dashboard after a successful login",
        async () => {
            await setAllureLabels({
                severity: "critical",
                tag: "regression",
                epic: "Authentication",
                feature: "Login",
                story: "User attempts to login with invalid credentials",
            });

            await loadLandingPageAndLogin(
                "happy path",
                process.env.USER_NAME!,
                process.env.PASSWORD!,
            );
        },
    );
});
