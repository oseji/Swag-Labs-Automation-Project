/*verifies the full checkout flow: add products, open cart, complete checkout steps, and validate cart items and pricing.*/
import { expect } from "chai";
import { describe, it, after } from "mocha";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { cartPage } from "../../../pages/cartPage";
import { checkoutPage } from "../../../pages/checkoutPage";
import { WebDriver } from "selenium-webdriver";
import { step } from "allure-js-commons";

describe("Checkout flow with form error and price validation", () => {
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

    it("should verify the full checkout flow: add products, open cart, complete checkout steps, and validate cart items and pricing", async () => {
        try {
            await step("launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            const dashboardPageData = new DashboardPage(driver!, timeout);
            const navigationPageData = new NavigationBarPage(driver!, timeout);
            const cartPageData = new cartPage(driver!, timeout);
            const checkoutPageData = new checkoutPage(driver!, timeout);

            await step("add random products to cart", async () => {
                await dashboardPageData.clickAddToCartButtonOnProduct(randomProducts);
            });

            await step("verify cart badge count matches number of added products", async () => {
                await navigationPageData.verifyCartBadgeCount(randomProducts.length);
            });

            await step("open cart", async () => {
                await navigationPageData.openCart();
            });

            await step("verify cart page loaded and all added products are present", async () => {
                await cartPageData.waitForCartPageToOpen();
                await cartPageData.verifyProductInCart(randomProducts);
            });

            await step("proceed to checkout", async () => {
                await cartPageData.clickCheckoutButton();
            });

            await step("complete checkout step one: enter customer information", async () => {
                await checkoutPageData.checkoutStepOne("ose", "oziegbe", "0701995");
            });

            await step("complete checkout step two: review order and verify pricing", async () => {
                await checkoutPageData.checkoutStepTwo(randomProducts);
            });

            await step("complete checkout and return to dashboard", async () => {
                await checkoutPageData.lastCheckOutStep();
            });

            await step("verify user is redirected to dashboard after checkout", async () => {
                await driver!.sleep(2000);
                expect(await driver!.getCurrentUrl()).to.equal(
                    process.env.DASHBOARD_URL,
                    "After checkout complete and Back Home, user should be on dashboard",
                );
            });
        } catch (error) {
            console.error("❌ Checkout flow with form error and price validation failed:", error);
            throw error;
        }
    });
});
