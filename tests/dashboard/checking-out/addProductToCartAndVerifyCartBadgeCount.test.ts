/*Verifies that adding random products to the cart updates the cart badge count to match the number of items added.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";
import { describe } from "mocha";
import { uiTest } from "../../../utils/uiTest";
import { step } from "allure-js-commons";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";
import { PRODUCTS } from "../../../types/products";

describe("Add product to cart and verify cart badge count", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    const randomProducts = [...PRODUCTS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    uiTest(
        "should verify that adding random products to the cart updates the cart badge count to match the number of items added",
        async () => {
            await setAllureLabels({
                severity: "normal",
                tag: "regression",
                epic: "product",
                feature: "cart",
                story: "User adds products to cart",
            });

            await step("Launch browser and log in", async () => {
                driver = await createDriverAndLogin(
                    process.env.USER_NAME!,
                    process.env.PASSWORD!,
                );
            });

            const dashboardPageData = new DashboardPage(driver!, timeout);
            const navigationPageData = new NavigationBarPage(driver!, timeout);

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
        },
    );
});
