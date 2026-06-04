import { expect } from "chai";
import { createDriverAndLogin } from "./createDriverAndLogin";

import { WebDriver, until } from "selenium-webdriver";
import { NavigationBarPage } from "../pages/navigationBarPage";
import { step } from "allure-js-commons";

export const clickOnAMenuButton = async (
    buttonName: "all items" | "about" | "logout" | "reset app state",
) => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    try {
        await step("launch browser and log in", async () => {
            driver = await createDriverAndLogin(
                process.env.USER_NAME!,
                process.env.PASSWORD!,
            );
        });

        const navigationBarPageData = new NavigationBarPage(driver!, timeout);

        await step("open side menu", async () => {
            await navigationBarPageData.openSideMenu();
        });

        if (buttonName === "all items") {
            await step("click all items menu button", async () => {
                await navigationBarPageData.clickOnAllItemsMenuButton();
            });
        }

        if (buttonName === "about") {
            await step("click about menu button", async () => {
                await navigationBarPageData.clickOnAboutMenuButton();
            });

            await step("verify navigation to Sauce Labs site", async () => {
                expect(await driver!.getCurrentUrl()).to.include(
                    "saucelabs.com",
                    "About menu should navigate to Sauce Labs site",
                );
            });
        }

        if (buttonName === "logout") {
            await step("click logout menu button", async () => {
                await navigationBarPageData.clickOnLogoutMenuButton();
            });

            await step("verify user is redirected to landing page", async () => {
                await driver!.wait(until.urlIs(process.env.LANDING_PAGE_URL!), timeout);
                expect(await driver!.getCurrentUrl()).to.equal(
                    process.env.LANDING_PAGE_URL,
                    "After logout user should be on landing page",
                );
            });

            await step("press back button and verify session is not restored", async () => {
                await driver!.navigate().back();
                await driver!.wait(until.urlIs(process.env.LANDING_PAGE_URL!), timeout);
                expect(await driver!.getCurrentUrl()).to.equal(
                    process.env.LANDING_PAGE_URL,
                    "Back button should not restore dashboard session",
                );
            });
        }

        if (buttonName === "reset app state") {
            await step("click reset app state menu button", async () => {
                await driver!.sleep(1000);
                await navigationBarPageData.clickResetAppStateMenuButton();
            });
        }

        console.log(
            `✅ completed clicking on ${buttonName.toLocaleUpperCase()} menu button test`,
        );
    } catch (error) {
        console.error(`❌ ${buttonName} menu button test failed:`, error);
        throw error;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
};
