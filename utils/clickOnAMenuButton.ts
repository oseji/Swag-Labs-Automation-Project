import { expect } from "chai";
import { createDriverAndLogin } from "./createDriverAndLogin";

import { WebDriver, until } from "selenium-webdriver";
import { NavigationBarPage } from "../pages/navigationBarPage";
import { LandingPage } from "../pages/landingPage";

export const clickOnAMenuButton = async (
	buttonName: "all items" | "about" | "logout" | "reset app state",
) => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT! || "20000");

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		const navigationBarPageData = new NavigationBarPage(driver, timeout);

		await navigationBarPageData.openSideMenu();

		if (buttonName === "all items") {
			await navigationBarPageData.clickOnAllItemsMenuButton();
		}

		if (buttonName === "about") {
			await navigationBarPageData.clickOnAboutMenuButton();
			expect(await driver.getCurrentUrl()).to.include(
				"saucelabs.com",
				"About menu should navigate to Sauce Labs site",
			);
		}
		if (buttonName === "logout") {
			await navigationBarPageData.clickOnLogoutMenuButton();

			await driver.wait(until.urlIs(process.env.LANDING_PAGE_URL!), timeout);
			expect(await driver.getCurrentUrl()).to.equal(
				process.env.LANDING_PAGE_URL,
				"After logout user should be on landing page",
			);

			await driver.navigate().back();

			await driver.wait(until.urlIs(process.env.LANDING_PAGE_URL!), timeout);
			expect(await driver.getCurrentUrl()).to.equal(
				process.env.LANDING_PAGE_URL,
				"Back button should not restore dashboard session",
			);
		}
		if (buttonName === "reset app state") {
			await driver.sleep(1000);
			await navigationBarPageData.clickResetAppStateMenuButton();
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
