/*verifies that the side menu opens and displays the expected menu items and content.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";

import { WebDriver, Builder } from "selenium-webdriver";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { LandingPage } from "../../../pages/landingPage";

export const openMenuAndVerifyContent = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT! || "20000");

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		const navigationBarPageData = new NavigationBarPage(driver, timeout);

		await navigationBarPageData.openMenuAndVerifyContent();

		console.log("Menu visibility and content validation completed.");
	} catch (error) {
		console.error("Menu visibility and content validation failed:", error);
		throw error;
	} finally {
		if (driver) {
			await driver.quit();
		}
	}
};

openMenuAndVerifyContent();
