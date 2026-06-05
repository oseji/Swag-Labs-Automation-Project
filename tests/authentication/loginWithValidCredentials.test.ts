import { describe, it } from "mocha";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

/*verifies that a user can log in with valid credentials and is redirected to the dashboard.*/

describe("Login with valid credentials", () => {
    it("should verify that the user is redirected to the dashboard after a successful login", async () => {
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
    });
});
