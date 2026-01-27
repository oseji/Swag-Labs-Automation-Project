import dotenv from "dotenv";
dotenv.config();

import { WebDriver, Builder } from "selenium-webdriver";
import { LandingPage } from "../pages/landingPage";
import { DashboardPage } from "../pages/dashboardPage";

export const sortProducts = async (
	sortType: "a to z" | "z to a" | "low to high" | "high to low",
) => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT! || "20000");

	try {
		driver = await new Builder().forBrowser("chrome").build();
		const landingPageData = new LandingPage(driver, timeout);
		const dashboardPageData = new DashboardPage(driver, timeout);

		await landingPageData.waitForLandingPageAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		await landingPageData.waitForDashboardToLoad();

		if (sortType === "a to z") {
			await dashboardPageData.selectAProductFilterOption(
				"sort names from a to z",
			);
		}

		if (sortType === "z to a") {
			await dashboardPageData.selectAProductFilterOption(
				"sort names from z to a",
			);
		}

		if (sortType === "low to high") {
			await dashboardPageData.selectAProductFilterOption(
				"sort price low to high",
			);
		}

		if (sortType === "high to low") {
			await dashboardPageData.selectAProductFilterOption(
				"sort price high to low",
			);
		}

		console.log("completed sorting products by " + sortType);
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		if (driver) {
			await driver.quit();
		}
	}
};
