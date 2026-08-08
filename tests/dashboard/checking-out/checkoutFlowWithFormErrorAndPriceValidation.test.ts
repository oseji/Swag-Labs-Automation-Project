/*verifies the full checkout flow: add products, open cart, complete checkout steps, and validate cart items and pricing.*/
import { expect } from "chai";
import { describe, it } from "mocha";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { CartPage } from "../../../pages/cartPage";
import { CheckoutPage } from "../../../pages/checkoutPage";
import { WebDriver, until } from "selenium-webdriver";
import { step } from "allure-js-commons";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";
import { PRODUCTS } from "../../../types/products";

describe("Checkout flow with form error and price validation", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    const randomProducts = [...PRODUCTS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    it("should verify the full checkout flow: add products, open cart, complete checkout steps, and validate cart items and pricing", async () => {
        await setAllureLabels({
            severity: "blocker",
            tag: "regression",
            epic: "product",
            feature: "checkout",
            story: "User adds products to cart and proceeds to complete checkout",
        });

        await step("launch browser and log in", async () => {
            driver = await createDriverAndLogin(
                process.env.USER_NAME!,
                process.env.PASSWORD!,
            );
        });

        const dashboardPageData = new DashboardPage(driver!, timeout);
        const navigationPageData = new NavigationBarPage(driver!, timeout);
        const cartPageData = new CartPage(driver!, timeout);
        const checkoutPageData = new CheckoutPage(driver!, timeout);

        await step("add random products to cart", async () => {
            await dashboardPageData.clickAddToCartButtonOnProduct(
                randomProducts,
            );
        });

        await step(
            "verify cart badge count matches number of added products",
            async () => {
                await navigationPageData.verifyCartBadgeCount(
                    randomProducts.length,
                );
            },
        );

        await step("open cart", async () => {
            await navigationPageData.openCart();
        });

        await step(
            "verify cart page loaded and all added products are present",
            async () => {
                await cartPageData.waitForCartPageToOpen();
                await cartPageData.verifyProductInCart(randomProducts);
            },
        );

        await step("proceed to checkout", async () => {
            await cartPageData.clickCheckoutButton();
        });

        await step(
            "complete checkout step one: enter customer information",
            async () => {
                await checkoutPageData.checkoutStepOne(
                    process.env.CHECKOUT_FIRST_NAME!,
                    process.env.CHECKOUT_LAST_NAME!,
                    process.env.CHECKOUT_POSTAL_CODE!,
                );
            },
        );

        await step(
            "complete checkout step two: review order and verify pricing",
            async () => {
                await checkoutPageData.checkoutStepTwo(randomProducts);
            },
        );

        await step("complete checkout and return to dashboard", async () => {
            await checkoutPageData.lastCheckOutStep();
        });

        await step(
            "verify user is redirected to dashboard after checkout",
            async () => {
                await driver!.wait(
                    until.urlIs(process.env.DASHBOARD_URL!),
                    timeout,
                );
                expect(await driver!.getCurrentUrl()).to.equal(
                    process.env.DASHBOARD_URL,
                    "After checkout complete and Back Home, user should be on dashboard",
                );
            },
        );
    });
});
