import { describe, it } from "mocha";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Protected route access without login", () => {
    it("should verify that the user is redirected to the login page when trying to access a protected route without being logged in", async () => {
        await setAllureLabels({
            severity: "high",
            tag: "regression",
            epic: "Authentication",
            feature: "Login",
            story: "User logs out and attempts to use the back button to log back in",
        });

        await loadLandingPageAndLogin(
            "protected route access without login",
            "",
            "",
        );
    });
});
