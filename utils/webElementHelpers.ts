import { WebDriver, until, By, WebElement } from "selenium-webdriver";

const getTimeout = () => parseInt(process.env.TIMEOUT || "20000");

export const waitAndClick = async (
	driver: WebDriver,
	locator: By,
	elementDescription: string
): Promise<void> => {
	try {
		const element = await driver.wait(
			until.elementLocated(locator),
			getTimeout()
		);
		await element.click();
		console.log(`Clicked ${elementDescription}`);
	} catch (error) {
		throw new Error(`Failed to click ${elementDescription}: ${error}`);
	}
};

export const waitAndInput = async (
	driver: WebDriver,
	locator: By,
	value: string,
	fieldDescription: string
): Promise<void> => {
	try {
		const element = await driver.wait(
			until.elementLocated(locator),
			getTimeout()
		);
		await element.sendKeys(value);
		console.log(`${fieldDescription}: ${value}`);
	} catch (error) {
		throw new Error(`Failed to input ${fieldDescription}: ${error}`);
	}
};

export const waitForElement = async (
	driver: WebDriver,
	locator: By,
	description: string
): Promise<WebElement> => {
	try {
		const element = await driver.wait(
			until.elementLocated(locator),
			getTimeout()
		);

		console.log(`✅ Found element: ${description}`);

		return element;
	} catch (error) {
		throw new Error(
			`❌ Could not find ${description} after ${getTimeout()}ms: ${error}`
		);
	}
};
