import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { DashboardPage } from "../../../pages/dashboardPage";
import { WebDriver } from "selenium-webdriver";

const addProductToCart = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);

		const dashboardPageData = new DashboardPage(driver, timeout);

		await dashboardPageData.clickAddToCartButtonOnProduct(
			"sauce labs backpack",
		);
	} catch (error) {
		console.error(error);
	} finally {
		console.log("completed test");
		if (driver) await driver.quit();
	}
};

addProductToCart();
