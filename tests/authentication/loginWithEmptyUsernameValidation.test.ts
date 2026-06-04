import { describe, it } from "mocha";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

/*verifies that login is blocked when the username field is empty and the correct error message is shown.*/

describe("Login with no username", () => {
    it("should verify that the user is not able to login with an empty username and the correct error message is displayed", async () => {
        await loadLandingPageAndLogin("no username", "", process.env.PASSWORD!);
    });
});
