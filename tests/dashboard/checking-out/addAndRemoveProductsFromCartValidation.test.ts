import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";
import { describe, it, after } from "mocha";
import { step } from "allure-js-commons";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";
import { attachScreenshotOnFailure } from "../../../utils/allure/attachScreenShotOnFailure.helper";

describe("Add and remove products from cart", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT!);

    after("Quit browser", async () => {
        if (driver) await driver.quit();
    });

    it("should verify that adding and removing products from the cart updates the cart badge count correctly", async () => {
        await setAllureLabels({
            severity: "normal",
            tag: "regression",
            epic: "product",
            feature: "cart",
            story: "User adds and removes products from cart",
        });

        try {
            await step("Launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            const dashboardPageData = new DashboardPage(driver!, timeout);
            const navigationPageData = new NavigationBarPage(driver!, timeout);

            await step(
                "Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to the cart",
                async () => {
                    await dashboardPageData.clickAddToCartButtonOnProduct([
                        "sauce labs backpack",
                        "sauce labs bike light",
                    ]);
                },
            );

            await step("Verify cart badge shows 2 items", async () => {
                await navigationPageData.verifyCartBadgeCount(2);
            });

            await step(
                "Remove 'Sauce Labs Backpack' from the cart",
                async () => {
                    await dashboardPageData.clickRemoveFromCartButtonOnProduct([
                        "sauce labs backpack",
                    ]);
                },
            );

            await step("Verify cart badge updates to 1 item", async () => {
                await navigationPageData.verifyCartBadgeCount(1);
            });
        } catch (error) {
            console.error(
                "❌ Add and remove products from cart test failed:",
                error,
            );

            if (driver) {
                await attachScreenshotOnFailure(
                    driver,
                    "failed add & remove products from cart",
                );
            }

            throw error;
        }
    });
});
