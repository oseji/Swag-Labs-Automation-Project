import { describe, it } from "mocha";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Login with no username", () => {
    it("should verify that the user is not able to login with an empty username and the correct error message is displayed", async () => {
        await setAllureLabels({
            severity: "high",
            tag: "regression",
            epic: "Authentication",
            feature: "Login",
            story: "User attempts to login without inputting a username",
        });

        await loadLandingPageAndLogin("no username", "", process.env.PASSWORD!);
    });
});
