/*verifies that clicking a product on the dashboard opens its product details page.*/
import { createDriverAndLogin } from "../../../utils/createDriverAndLogin";
import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../../../pages/landingPage";
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

		console.log("Open product details page validation completed.");
	} catch (error) {
		console.error("Open product details page validation failed:", error);
	} finally {
		if (driver) await driver.quit();
	}
};

openProductDetailsPage();
