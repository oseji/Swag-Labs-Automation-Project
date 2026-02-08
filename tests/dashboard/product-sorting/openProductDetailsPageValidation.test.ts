/*verifies that clicking a product on the dashboard opens its product details page.*/
import { expect } from "chai";
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { WebDriver } from "selenium-webdriver";
import { DashboardPage } from "../../../pages/dashboardPage";

const openProductDetailsPage = async () => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT!);

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		const dashboardPageData = new DashboardPage(driver, timeout);

		await dashboardPageData.clickOnProductToViewDetails("sauce labs backpack");

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.include(
			"inventory-item.html",
			"Clicking a product should open its details page",
		);
		expect(currentUrl).to.include("id=", "Details page URL should include product id");

		console.log("✅ Open product details page validation completed.");
	} catch (error) {
		console.error("❌ Open product details page validation failed:", error);
		throw error;
	} finally {
		if (driver) await driver.quit();
	}
};

openProductDetailsPage();
