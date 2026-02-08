/*verifies adding products to the cart, that the cart badge count updates correctly, and that removing a product updates the count.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";

const addProductToCartAndRemove = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);

		const dashboardPageData = new DashboardPage(driver, timeout);
		const navigationPageData = new NavigationBarPage(driver, timeout);

		await dashboardPageData.clickAddToCartButtonOnProduct([
			"sauce labs backpack",
			"sauce labs bike light",
		]);
		await navigationPageData.verifyCartBadgeCount(2);

		await dashboardPageData.clickRemoveFromCartButtonOnProduct([
			"sauce labs backpack",
		]);
		await navigationPageData.verifyCartBadgeCount(1);

		console.log("✅ Add and remove products from cart validation completed.");
	} catch (error) {
		console.error(
			"❌ Add and remove products from cart validation failed:",
			error,
		);
	} finally {
		if (driver) await driver.quit();
	}
};

addProductToCartAndRemove();
