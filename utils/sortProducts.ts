import { expect } from "chai";
import { createDriverAndLogin } from "./createDriverAndLogin";

import { WebDriver } from "selenium-webdriver";
import { DashboardPage } from "../pages/dashboardPage";

export const sortProducts = async (
	sortType: "a to z" | "z to a" | "low to high" | "high to low",
) => {
	let driver: WebDriver | undefined;
	const timeout = parseInt(process.env.TIMEOUT! || "20000");

	try {
		driver = await createDriverAndLogin(
			process.env.USER_NAME!,
			process.env.PASSWORD!,
		);
		const dashboardPageData = new DashboardPage(driver, timeout);

		if (sortType === "a to z") {
			await dashboardPageData.selectAProductFilterOption(
				"sort names from a to z",
			);
			const products = await dashboardPageData.getAllProductsData();
			const names = products.map((p) => p.name);
			const sortedAsc = [...names].sort((a, b) => a.localeCompare(b));
			expect(names).to.deep.equal(
				sortedAsc,
				"Product names should be sorted A to Z",
			);
		}

		if (sortType === "z to a") {
			await dashboardPageData.selectAProductFilterOption(
				"sort names from z to a",
			);
			const products = await dashboardPageData.getAllProductsData();
			const names = products.map((p) => p.name);
			const sortedDesc = [...names].sort((a, b) => b.localeCompare(a));
			expect(names).to.deep.equal(
				sortedDesc,
				"Product names should be sorted Z to A",
			);
		}

		if (sortType === "low to high") {
			await dashboardPageData.selectAProductFilterOption(
				"sort price low to high",
			);
			const products = await dashboardPageData.getAllProductsData();
			const prices = products.map((p) => p.price);
			const sortedAsc = [...prices].sort((a, b) => a - b);
			expect(prices).to.deep.equal(
				sortedAsc,
				"Product prices should be sorted low to high",
			);
		}

		if (sortType === "high to low") {
			await dashboardPageData.selectAProductFilterOption(
				"sort price high to low",
			);
			const products = await dashboardPageData.getAllProductsData();
			const prices = products.map((p) => p.price);
			const sortedDesc = [...prices].sort((a, b) => b - a);
			expect(prices).to.deep.equal(
				sortedDesc,
				"Product prices should be sorted high to low",
			);
		}

		console.log(`✅ completed filter products by ${sortType} test`);
	} catch (error) {
		console.error(`❌ filter products by ${sortType} test failed:`, error);
		throw error;
	} finally {
		if (driver) await driver.quit();
	}
};
