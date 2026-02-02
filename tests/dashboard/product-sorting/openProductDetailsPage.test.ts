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
	} catch (error) {
		console.error(error);
	} finally {
		console.log("completed test");
		if (driver) await driver.quit();
	}
};

openProductDetailsPage();
