import { describe, it } from "mocha";
import { WebDriver } from "selenium-webdriver";
import { clickOnAMenuButton } from "../../../utils/clickOnAMenuButton";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { step } from "allure-js-commons";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";
import { attachScreenshotOnFailure } from "../../../utils/allure/attachScreenShotOnFailure.helper";

describe("Navigate to About page from menu", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    after("Quit browser", async () => {
        if (driver) await driver.quit();
    });

    it("should verify that clicking the About option in the side menu navigates to the Sauce Labs site", async () => {
        await setAllureLabels({
            severity: "high",
            tag: "regression",
            epic: "navigation",
            feature: "menu",
            story: "User opens menu and navigates to about page",
        });

        try {
            await clickOnAMenuButton("about");
        } catch (error) {
            console.error(
                "❌ Navigate to About page from menu test failed:",
                error,
            );

            if (driver) {
                await attachScreenshotOnFailure(
                    driver,
                    "failed navigate to about page",
                );
            }

            throw error;
        }
    });
});
