/*verifies that login fails with invalid credentials and the correct error message is displayed.*/
import { describe, it } from "mocha";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Login with invalid credentials", () => {
    it("should verify that the user is not able to login with invalid credentials and the correct error message is displayed", async () => {
        await loadLandingPageAndLogin(
            "negative path",
            "wrong_username",
            process.env.PASSWORD!,
        );
    });
});
