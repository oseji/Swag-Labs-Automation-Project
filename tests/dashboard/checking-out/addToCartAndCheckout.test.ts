import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { NavigationBarPage } from "../../../pages/navigationBarPage";
import { cartPage } from "../../../pages/cartPage";
import { checkoutPage } from "../../../pages/checkoutPage";
import { WebDriver } from "selenium-webdriver";

const addToCartAndCheckout = async () => {
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
		const cartPageData = new cartPage(driver, timeout);
		const checkoutPageData = new checkoutPage(driver, timeout);

		await dashboardPageData.clickAddToCartButtonOnProduct(randomProducts);
		await navigationPageData.verifyCartBadgeCount(randomProducts.length);

		await navigationPageData.openCart();
		await cartPageData.waitForCartPageToOpen();
		await cartPageData.verifyProductInCart(randomProducts);
		await cartPageData.clickCheckoutButton();
		await checkoutPageData.completeCheckOutSteps(
			"ose",
			"oziegbe",
			"0701995",
			randomProducts,
		);
		await driver.sleep(3000);
	} catch (error) {
		console.error(error);
	} finally {
		console.log("completed test");
		if (driver) await driver.quit();
	}
};

addToCartAndCheckout();
