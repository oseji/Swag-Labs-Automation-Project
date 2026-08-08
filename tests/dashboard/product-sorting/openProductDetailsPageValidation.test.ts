/*verifies that clicking a product on the dashboard opens its product details page.*/
import { expect } from "chai";
import { describe, it } from "mocha";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { WebDriver } from "selenium-webdriver";
import { step } from "allure-js-commons";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Open product details page", () => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    it("should verify that clicking a product on the dashboard opens its details page with the correct URL", async () => {
        await setAllureLabels({
            severity: "high",
            tag: "regression",
            epic: "product",
            feature: "product viewing",
            story: "User opens product details page to view details",
        });

        await step("launch browser and log in", async () => {
            driver = await createDriverAndLogin(
                process.env.USER_NAME!,
                process.env.PASSWORD!,
            );
        });

        const dashboardPageData = new DashboardPage(driver!, timeout);

        await step("click on Sauce Labs Backpack to view details", async () => {
            await dashboardPageData.clickOnProductToViewDetails(
                "sauce labs backpack",
            );
        });

        await step(
            "verify product details page is loaded with correct URL",
            async () => {
                const currentUrl = await driver!.getCurrentUrl();
                expect(currentUrl).to.include(
                    "inventory-item.html",
                    "Clicking a product should open its details page",
                );
                expect(currentUrl).to.include(
                    "id=",
                    "Details page URL should include product id",
                );
            },
        );
    });
});
