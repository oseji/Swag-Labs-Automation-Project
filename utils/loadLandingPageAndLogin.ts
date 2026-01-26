import dotenv from "dotenv";
dotenv.config();

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../pages/landingPage";

export const loadLandingPageAndLogin = async (
	testType: "happy path" | "negative path" | "no username",
	username: string,
	password: string,
) => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT! || "20000");

	try {
		driver = await new Builder().forBrowser("chrome").build();
		const landingPageData = new LandingPage(driver, timeout);

		if (testType === "happy path") {
			await landingPageData.waitForLandingPageAndLogin(username, password);
			await landingPageData.waitForDashboardToLoad();

			console.log(`completed happy path test for load landing page and login`);
		}

		if (testType === "negative path") {
			await landingPageData.waitForLandingPageAndLogin("username", password);
			await landingPageData.waitForNegativePathErrorMessage();

			console.log(
				`completed negative path test for load landing page and login`,
			);
		}

		if (testType === "no username") {
			await landingPageData.waitForLandingPageAndLogin("", password);
			await landingPageData.waitForNoUsernameErrorMessage();

			console.log(`completed no username test for load landing page and login`);
		}
	} catch (error) {
		console.error(error);
	} finally {
		if (driver) await driver.quit();
	}
};
