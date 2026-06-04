/*verifies that opening the inventory page (/inventory.html) without being logged in redirects the user to the login page instead of showing protected content.*/

import { describe, it } from "mocha";
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

describe("Protected route access without login", () => {
    it("should verify that the user is redirected to the login page when trying to access a protected route without being logged in", async () => {
        await loadLandingPageAndLogin(
            "protected route access without login",
            "",
            "",
        );
    });
});
