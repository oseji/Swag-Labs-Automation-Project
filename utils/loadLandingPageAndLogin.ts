import dotenv from "dotenv";
dotenv.config();
import { expect } from "chai";
import { Options } from "selenium-webdriver/chrome";

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../pages/landingPage";

import { step } from "allure-js-commons";

export const loadLandingPageAndLogin = async (
    testType:
        | "happy path"
        | "negative path"
        | "no username"
        | "protected route access without login",
    username: string,
    password: string,
) => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");
    const chromeOptions = new Options();

    chromeOptions.setUserPreferences({
        credentials_enable_service: false,
        "profile.password_manager_enabled": false,
    });

    try {
        await step("launch chrome browser", async () => {
            driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chromeOptions)
                .build();
        });

        const landingPageData = new LandingPage(driver!, timeout);

        if (testType === "happy path") {
            await step("navigate to landing page and loq", async () => {
                await landingPageData.waitForLandingPageAndLogin(
                    username,
                    password,
                );
            });

            await step("wait for dashboard to load", async () => {
                await landingPageData.waitForDashboardToLoad();
            });

            await step("verify user is redirected to dashboard", async () => {
                const currentUrl = await driver!.getCurrentUrl();
                expect(currentUrl).to.equal(
                    process.env.DASHBOARD_URL,
                    "User should be redirected to dashboard after valid login",
                );
            });
        }

        if (testType === "negative path") {
            await step("navigate to landing page and login", async () => {
                await landingPageData.waitForLandingPageAndLogin(
                    "username",
                    password,
                );
            });

            await step(
                "wait for negative path error message to load",
                async () => {
                    await landingPageData.waitForNegativePathErrorMessage();
                },
            );

            await step(
                "verify negative path error message is displayed",
                async () => {
                    const errorEl = await driver!.findElement(
                        landingPageData.locators.negativePathErrorMessage,
                    );
                    const errorText = await errorEl.getText();
                    expect(errorText).to.include(
                        "do not match any user",
                        "Invalid credentials should show matching error message",
                    );
                },
            );

            console.log(
                `✅ completed negative path test for load landing page and login`,
            );
        }

        if (testType === "no username") {
            await step(
                "navigate to landing page and login with no username",
                async () => {
                    await landingPageData.waitForLandingPageAndLogin(
                        "",
                        password,
                    );
                },
            );

            await step(
                "wait for no username error message to load",
                async () => {
                    await landingPageData.waitForNoUsernameErrorMessage();
                },
            );

            await step(
                "verify no username error message is displayed",
                async () => {
                    const errorEl = await driver!.findElement(
                        landingPageData.locators.noUserNameErrorMessage,
                    );
                    const errorText = await errorEl.getText();
                    expect(errorText).to.include(
                        "Username is required",
                        "Empty username should show required-username error",
                    );
                },
            );
        }

        if (testType === "protected route access without login") {
            await step("navigate to landing page and login", async () => {
                await landingPageData.openLandingPageAndWaitForItToLoad();
            });

            await step("navigate to dashboard", async () => {
                await driver!.get(process.env.DASHBOARD_URL!);
            });

            await step(
                "wait for protected route error message to load",
                async () => {
                    await landingPageData.waitForProtectedRouteErrorMessage();
                },
            );

            console.log(
                `✅ completed protected route access without login test for load landing page and login`,
            );
        }
    } catch (error) {
        console.error(`❌ ${testType} test failed:`, error);
        throw error;
    } finally {
        if (driver) await driver.quit();
    }
};
