/*verifies that "Reset App State" in the menu clears the cart and the cart badge count returns to zero.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { WebDriver } from "selenium-webdriver";

const resetAppState = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	const products = [
		"sauce labs backpack",
		"sauce labs bike light",
		"sauce labs bolt t-shirt",
		"sauce labs fleece jacket",
		"sauce labs onesie",
		"test all the things t-shirt red",
	] as const;

	const randomProducts = [...products]
		.sort(() => 0.5 - Math.random())
		.slice(0, 3);

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);

		const dashboardPageData = new DashboardPage(driver, timeout);
		const navigationPageData = new NavigationBarPage(driver, timeout);

		await dashboardPageData.clickAddToCartButtonOnProduct(randomProducts);

		await navigationPageData.verifyCartBadgeCount(randomProducts.length);

		await navigationPageData.clickResetAppStateMenuButton();

		await navigationPageData.verifyCartBadgeCount(0);

		console.log("Reset app state from menu validation completed.");
	} catch (error) {
		console.error("Reset app state from menu validation failed:", error);
	} finally {
		if (driver) await driver.quit();
	}
};

resetAppState();
