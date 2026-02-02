import { WebDriver, Builder } from "selenium-webdriver";
require("dotenv").config();
import { Options } from "selenium-webdriver/chrome";
import { LandingPage } from "../pages/landingPage";

export const createDriverAndLogin = async (
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
		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(chromeOptions)
			.build();

		const landingPageData = new LandingPage(driver, timeout);

		await landingPageData.waitForLandingPageAndLogin(username, password);
		await landingPageData.waitForDashboardToLoad();

		return driver;
	} catch (error) {
		console.error(`Script failed: ${error}`);
		throw error;
	}
};
