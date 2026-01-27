import dotenv from "dotenv";
dotenv.config();

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../../pages/landingPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { NavigationBarPage } from "../../pages/navigationBarPage";
import { cartPage } from "../../pages/cartPage";
import { checkoutPage } from "../../pages/checkoutPage";

const addToCartAndCheckout = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await new Builder().forBrowser("chrome").build();
		const landingPageData = new LandingPage(driver, timeout);
		const dashboardPageData = new DashboardPage(driver, timeout);
		const navigationPageData = new NavigationBarPage(driver, timeout);
		const cartPageData = new cartPage(driver, timeout);
		const checkoutPageData = new checkoutPage(driver, timeout);

		await landingPageData.waitForLandingPageAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);

		await dashboardPageData.clickAddToCartButtonOnProduct(
			"sauce labs backpack",
		);

		await navigationPageData.openCart();
		await cartPageData.clickCheckoutButton();
		await checkoutPageData.completeCheckOutSteps("ose", "oziegbe", "0701995");
		await driver.sleep(3000);
	} catch (error) {
		console.error(error);
	} finally {
		console.log("completed test");
		if (driver) await driver.quit();
	}
};

addToCartAndCheckout();
