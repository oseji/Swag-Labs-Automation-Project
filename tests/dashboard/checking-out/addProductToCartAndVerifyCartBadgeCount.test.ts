/*Verifies that adding random products to the cart updates the cart badge count to match the number of items added.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";
import { describe, it, after } from "mocha";
import { step } from "allure-js-commons";

describe("Add product to cart and verify cart badge count", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT!);
    const dashboardPageData = new DashboardPage(driver!, timeout);
    const navigationPageData = new NavigationBarPage(driver!, timeout);

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
        if (driver) await driver.quit;
    });

    it("should verify that adding random products to the cart updates the cart badge count to match the number of items added", async () => {
        try {
            await step("Launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            await step("add random products to cart", async () => {
                await dashboardPageData.clickAddToCartButtonOnProduct(
                    randomProducts,
                );
            });

            await step("verify cart badge count", async () => {
                await navigationPageData.verifyCartBadgeCount(
                    randomProducts.length,
                );
            });
        } catch (error) {
            console.error(
                "❌ Checkout flow with form error and price validation failed:",
                error,
            );
            throw error;
        }
    });
});
