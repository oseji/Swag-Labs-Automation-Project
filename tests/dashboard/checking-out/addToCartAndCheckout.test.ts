import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { cartPage } from "../../../pages/cartPage";
import { checkoutPage } from "../../../pages/checkoutPage";
import { WebDriver } from "selenium-webdriver";

const addToCartAndCheckout = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		const dashboardPageData = new DashboardPage(driver, timeout);
		const navigationPageData = new NavigationBarPage(driver, timeout);
		const cartPageData = new cartPage(driver, timeout);
		const checkoutPageData = new checkoutPage(driver, timeout);

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
