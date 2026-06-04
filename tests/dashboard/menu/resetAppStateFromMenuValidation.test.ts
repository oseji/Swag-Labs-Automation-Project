/*verifies that "Reset App State" in the menu clears the cart and the cart badge count returns to zero.*/
import { describe, it, after } from "mocha";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";
import { step } from "allure-js-commons";

describe("Reset app state from menu", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT!);

    const products = [
        "sauce labs backpack",
        "sauce labs bike light",
        "sauce labs bolt t-shirt",
        "sauce labs fleece jacket",
        "sauce labs onesie",
        "test all the things t-shirt red",
    ] as const;

    const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    after("Quit browser", async () => {
        if (driver) await driver.quit();
    });

    it("should verify that resetting app state from the menu clears the cart and resets the badge count to zero", async () => {
        try {
            await step("launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            const dashboardPageData = new DashboardPage(driver!, timeout);
            const navigationPageData = new NavigationBarPage(driver!, timeout);

            await step("add random products to cart", async () => {
                await dashboardPageData.clickAddToCartButtonOnProduct(randomProducts);
            });

            await step(`verify cart badge shows ${randomProducts.length} items`, async () => {
                await navigationPageData.verifyCartBadgeCount(randomProducts.length);
            });

            await step("reset app state from side menu", async () => {
                await navigationPageData.clickResetAppStateMenuButton();
            });

            await step("verify cart badge is cleared", async () => {
                await navigationPageData.verifyCartBadgeCount(0);
            });
        } catch (error) {
            console.error("❌ Reset app state from menu validation failed:", error);
            throw error;
        }
    });
});
