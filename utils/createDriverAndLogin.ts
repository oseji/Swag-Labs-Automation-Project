import { WebDriver } from "selenium-webdriver";
import { LandingPage } from "../pages/landingPage";
import { buildDriver } from "./driverFactory";

export const createDriverAndLogin = async (
    username: string,
    password: string,
): Promise<WebDriver> => {
    let driver: WebDriver | undefined;
    const timeout = parseInt(process.env.TIMEOUT! || "20000");

    try {
        driver = await buildDriver();

        const landingPageData = new LandingPage(driver, timeout);

        await landingPageData.waitForLandingPageAndLogin(username, password);
        await landingPageData.waitForDashboardToLoad();

        return driver;
    } catch (error) {
        console.error(`❌ Script failed:`, error);
        throw error;
    }
};
