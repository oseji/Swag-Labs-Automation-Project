import dotenv from "dotenv";
dotenv.config();

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../../pages/landingPage";

const loadLandingPageAndLogin = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await new Builder().forBrowser("chrome").build();
		const landingPageData = new LandingPage(driver, timeout);

		await landingPageData.waitForLandingPageAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!
		);

		console.log(`completed load landing page and login test`);
	} catch (error) {
		console.error(error);
	} finally {
		if (driver) await driver.quit();
	}
};

loadLandingPageAndLogin();
