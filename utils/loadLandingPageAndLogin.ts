import dotenv from "dotenv";
dotenv.config();
import { Options } from "selenium-webdriver/chrome";

import { WebDriver, Builder, until } from "selenium-webdriver";
import { LandingPage } from "../pages/landingPage";

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
		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(chromeOptions)
			.build();
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

		if (testType === "protected route access without login") {
			await landingPageData.openLandingPageAndWaitForItToLoad();

			await driver.get(process.env.DASHBOARD_URL!);

			await driver.sleep(3000);
			await landingPageData.waitForProtectedRouteErrorMessage();

			console.log("Protected route access without login validation completed.");
		}
	} catch (error) {
		console.error(`${testType} test failed:`, error);
		throw error;
	} finally {
		if (driver) await driver.quit();
	}
};
