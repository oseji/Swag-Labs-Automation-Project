/*verifies that the side menu opens and displays the expected menu items and content.*/
import { expect } from "chai";
import { describe, it, after } from "mocha";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";
import { step } from "allure-js-commons";

describe("Menu visibility and content validation", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    after("Quit browser", async () => {
        if (driver) await driver.quit();
    });

    it("should verify that the side menu opens and displays all expected menu items", async () => {
        try {
            await step("launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            const navigationBarPageData = new NavigationBarPage(driver!, timeout);

            await step("open side menu and verify all menu items are visible", async () => {
                await navigationBarPageData.openMenuAndVerifyContent();
            });

            await step("verify current url is the dashboard", async () => {
                expect(await driver!.getCurrentUrl()).to.equal(
                    process.env.DASHBOARD_URL,
                    "Menu test should start from dashboard",
                );
            });
        } catch (error) {
            console.error("❌ Menu visibility and content validation failed:", error);
            throw error;
        }
    });
});
