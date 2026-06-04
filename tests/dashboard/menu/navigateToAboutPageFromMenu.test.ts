/*verifies that the "About" option in the side menu navigates to the About page.*/
import { describe, it } from "mocha";
import { clickOnAMenuButton } from "../../../utils/clickOnAMenuButton";

describe("Navigate to About page from menu", () => {
    it("should verify that clicking the About option in the side menu navigates to the Sauce Labs site", async () => {
        try {
            await clickOnAMenuButton("about");
        } catch (error) {
            console.error("❌ Navigate to About page from menu test failed:", error);
            throw error;
        }
    });
});
