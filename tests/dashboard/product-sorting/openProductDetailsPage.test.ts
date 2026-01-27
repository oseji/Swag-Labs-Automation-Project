import dotenv from "dotenv";
dotenv.config();

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../../pages/landingPage";
import { DashboardPage } from "../../pages/dashboardPage";

const openProductDetailsPage = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await new Builder().forBrowser("chrome").build();
		const landingPageData = new LandingPage(driver, timeout);
		const dashboardPageData = new DashboardPage(driver, timeout);

		await landingPageData.waitForLandingPageAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);

		await dashboardPageData.clickOnProductToViewDetails("sauce labs backpack");
	} catch (error) {
		console.error(error);
	} finally {
		console.log("completed test");
		if (driver) await driver.quit();
	}
};

openProductDetailsPage();
