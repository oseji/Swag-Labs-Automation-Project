import { WebDriver, until, By, WebElement } from "selenium-webdriver";

const getTimeout = () => parseInt(process.env.TIMEOUT || "20000");

const waitForVisibleElement = async (
	driver: WebDriver,
	locator: By
): Promise<WebElement> => {
	const timeout = getTimeout();

	const element = await driver.wait(until.elementLocated(locator), timeout);
	await driver.wait(until.elementIsVisible(element), timeout);

	return element;
};

export const waitAndClick = async (
	driver: WebDriver,
	locator: By,
	elementDescription: string
): Promise<void> => {
	try {
		const element = await waitForVisibleElement(driver, locator);
		await driver.wait(until.elementIsEnabled(element), getTimeout());

		await element.click();
		console.log(`Clicked ${elementDescription}`);
	} catch (error) {
		throw new Error(`Failed to click ${elementDescription}: ${error}`, {
			cause: error,
		});
	}
};

export const waitAndInput = async (
	driver: WebDriver,
	locator: By,
	value: string,
	fieldDescription: string
): Promise<void> => {
	try {
		const element = await waitForVisibleElement(driver, locator);
		await driver.wait(until.elementIsEnabled(element), getTimeout());

		await element.sendKeys(value);
		console.log(`${fieldDescription}: ${value}`);
	} catch (error) {
		throw new Error(`Failed to input ${fieldDescription}: ${error}`, {
			cause: error,
		});
	}
};

export const waitForElement = async (
	driver: WebDriver,
	locator: By,
	description: string
): Promise<WebElement> => {
	try {
		const element = await waitForVisibleElement(driver, locator);

		console.log(`✅ Found element: ${description}`);

		return element;
	} catch (error) {
		throw new Error(
			`❌ Could not find ${description} after ${getTimeout()}ms: ${error}`,
			{ cause: error }
		);
	}
};
