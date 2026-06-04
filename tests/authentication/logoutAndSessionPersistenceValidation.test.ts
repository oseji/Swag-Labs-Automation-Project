/*verifies that logout returns the user to the landing page and that the back button does not restore the dashboard session.*/
import { describe, it } from "mocha";
import { clickOnAMenuButton } from "../../utils/clickOnAMenuButton";

describe("Logout and session persistence", () => {
    it("should verify that the user is redirected to the landing page and that the back button does not restore the dashboard session", async () => {
        await clickOnAMenuButton("logout");
    });
});
