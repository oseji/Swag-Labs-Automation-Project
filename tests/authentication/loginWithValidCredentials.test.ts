import { describe, it } from "mocha";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

/*verifies that a user can log in with valid credentials and is redirected to the dashboard.*/

describe("Login with valid credentials", () => {
    it("should verify that the user is redirected to the dashboard after a successful login", async () => {
        await loadLandingPageAndLogin(
            "happy path",
            process.env.USER_NAME!,
            process.env.PASSWORD!,
        );
    });
});
