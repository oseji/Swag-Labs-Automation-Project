import { WebDriver, By, until } from "selenium-webdriver";
import {
	waitAndClick,
	waitAndInput,
	waitForElement,
} from "../utils/webElementHelpers";
import { cartPage } from "./cartPage";

export class checkoutPage {
	private driver: WebDriver;
	private timeout: number;
	cartPageData: cartPage;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
		this.cartPageData = new cartPage(driver, timeout);
	}

	checkoutGeneralLocators = {
		cancelButton: By.id("cancel"),
	};

	checkoutPageStepOneLocators = {
		checkoutStepOneHeading: By.xpath(
			"//span[text()='Checkout: Your Information']",
		),
		firstNameInput: By.id("first-name"),
		lastNameInput: By.id("last-name"),
		postalCodeInput: By.id("postal-code"),
		continueButton: By.id("continue"),
		firstNameErrorMessage: By.xpath(
			"//h3[text()='Error: First Name is required']",
		),
		lastNameErrorMessage: By.xpath(
			"//h3[text()='Error: Last Name is required']",
		),
		postalCodeErrorMessage: By.xpath(
			"//h3[text()='Error: Postal Code is required']",
		),
		closeErrorMessageButton: By.xpath("//button[@data-test='error-button']"),
	};

	checkoutPageStepTwoLocators = {
		checkoutStepTwoHeading: By.xpath("//span[text()='Checkout: Overview']"),
		finishButton: By.id("finish"),
	};

	checkoutCompleteLocators = {
		checkoutComletePageHeading: By.xpath(
			"//span[text()='Checkout: Complete!']",
		),
		backHomeButton: By.id("back-to-products"),
		orderConfirmationMessage: By.xpath(
			"//div[text()='Your order has been dispatched, and will arrive just as fast as the pony can get there!']",
		),
	};

	// GENERAL ACTIONS
	async clickCancelButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.checkoutGeneralLocators.cancelButton,
			"cancel button",
		);
	}

	//STEP 1 ACTIONS
	async waitForCheckoutStepOneToLoad(): Promise<void> {
		await this.driver.wait(
			until.urlIs("https://www.saucedemo.com/checkout-step-one.html"),
			this.timeout,
		);

		await waitForElement(
			this.driver,
			this.checkoutPageStepOneLocators.checkoutStepOneHeading,
			"check out page heading",
		);
	}

	async inputFirstName(firstName: string): Promise<void> {
		await waitAndInput(
			this.driver,
			this.checkoutPageStepOneLocators.firstNameInput,
			firstName,
			"first name",
		);
	}

	async inputLastName(lastName: string): Promise<void> {
		await waitAndInput(
			this.driver,
			this.checkoutPageStepOneLocators.lastNameInput,
			lastName,
			"last name",
		);
	}

	async inputPostalCode(postalCode: string): Promise<void> {
		await waitAndInput(
			this.driver,
			this.checkoutPageStepOneLocators.postalCodeInput,
			postalCode,
			"postal code",
		);
	}

	async clickContinueButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.checkoutPageStepOneLocators.continueButton,
			"continue button",
		);
	}

	async verifyCorrectErrorMessageDisplayed(
		expectedErrorMessage: string,
	): Promise<void> {
		if (expectedErrorMessage === "first name") {
			await waitForElement(
				this.driver,
				this.checkoutPageStepOneLocators.firstNameErrorMessage,
				"first name error message",
			);
		}

		if (expectedErrorMessage === "last name") {
			await waitForElement(
				this.driver,
				this.checkoutPageStepOneLocators.lastNameErrorMessage,
				"last name error message",
			);
		}

		if (expectedErrorMessage === "postal code") {
			await waitForElement(
				this.driver,
				this.checkoutPageStepOneLocators.postalCodeErrorMessage,
				"postal code error message",
			);
		}
	}

	async closeErrorMessage(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.checkoutPageStepOneLocators.closeErrorMessageButton,
			"close error message button",
		);
	}

	// STEP 2 ACTIONS
	async waitForCheckoutStepTwoToLoad(): Promise<void> {
		await this.driver.wait(
			until.urlIs("https://www.saucedemo.com/checkout-step-two.html"),
			this.timeout,
		);

		await waitForElement(
			this.driver,
			this.checkoutPageStepTwoLocators.checkoutStepTwoHeading,
			"check out page heading",
		);
	}

	private itemPricesLocator = By.css('[data-test="inventory-item-price"]');

	async calculateAndVerifyPricesDisplayed(): Promise<void> {
		const priceOfElements = await this.driver.findElements(
			this.itemPricesLocator,
		);

		let calculatedItemTotal = 0;
		for (const priceElement of priceOfElements) {
			const priceText = await priceElement.getText();
			const priceValue = parseFloat(priceText.replace("$", ""));
			calculatedItemTotal += priceValue;
		}

		// round the sum to 2 decimal places to prevent floating point issues
		calculatedItemTotal = Math.round(calculatedItemTotal * 100) / 100;

		// get UI values
		const subtotalText = await this.driver
			.findElement(By.css('[data-test="subtotal-label"]'))
			.getText();
		const subtotalValue = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));

		const taxText = await this.driver
			.findElement(By.css('[data-test="tax-label"]'))
			.getText();
		const taxValue = parseFloat(taxText.replace(/[^0-9.]/g, ""));

		const totalText = await this.driver
			.findElement(By.css('[data-test="total-label"]'))
			.getText();
		const totalValue = parseFloat(totalText.replace(/[^0-9.]/g, ""));

		//verify sum of items equals the displayed subtotal
		if (calculatedItemTotal !== subtotalValue) {
			throw new Error(
				`Subtotal Mismatch: Calculated sum of items is ${calculatedItemTotal}, but UI shows ${subtotalValue}`,
			);
		} else {
			console.log(`✅ Subtotal verified: ${subtotalValue}`);
		}

		// verify tax is 8% of subtotal
		if (taxValue !== Math.round(subtotalValue * 0.08 * 100) / 100) {
			throw new Error(
				`Tax Mismatch: Expected tax to be ${Math.round(subtotalValue * 0.08 * 100) / 100}, but UI shows ${taxValue}`,
			);
		} else {
			console.log(`✅ Tax verified: ${taxValue}`);
		}

		// verify subtotal + tax equals the displayed total
		const expectedTotal = Math.round((subtotalValue + taxValue) * 100) / 100;
		if (totalValue !== expectedTotal) {
			throw new Error(
				`Grand Total Mismatch: ${subtotalValue} + ${taxValue} should be ${expectedTotal}, but UI shows ${totalValue}`,
			);
		} else {
			console.log(`✅ Total verified: ${totalValue}`);
		}

		console.log("✅ Price verification completed successful");
	}

	async clickFinishButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.checkoutPageStepTwoLocators.finishButton,
			"finish button",
		);
	}

	// CHECK OUT COMPLETE ACTIONS
	async waitForCheckoutCompletePageToLoad(): Promise<void> {
		await this.driver.wait(
			until.urlIs("https://www.saucedemo.com/checkout-complete.html"),
			this.timeout,
		);

		await waitForElement(
			this.driver,
			this.checkoutCompleteLocators.checkoutComletePageHeading,
			"check out page heading",
		);

		await waitForElement(
			this.driver,
			this.checkoutCompleteLocators.orderConfirmationMessage,
			"order confirmation message",
		);
	}

	async clickBackToHomeButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.checkoutCompleteLocators.backHomeButton,
			" back to home button",
		);
	}

	async completeCheckOutSteps(
		firstName: string,
		lastName: string,
		postalCode: string,
		productName: Array<
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red"
		>,
	): Promise<void> {
		//step 1
		await this.waitForCheckoutStepOneToLoad();
		//put empty first name to test error handling
		await this.inputFirstName("");
		await this.clickContinueButton();
		await this.verifyCorrectErrorMessageDisplayed("first name");
		await this.closeErrorMessage();
		await this.inputFirstName(firstName);

		// put empty last name to test error handling
		await this.inputLastName("");
		await this.clickContinueButton();
		await this.verifyCorrectErrorMessageDisplayed("last name");
		await this.closeErrorMessage();
		await this.inputLastName(lastName);

		// put empty postal code to test error handling
		await this.inputPostalCode("");
		await this.clickContinueButton();
		await this.verifyCorrectErrorMessageDisplayed("postal code");
		await this.closeErrorMessage();
		await this.inputPostalCode(postalCode);
		await this.clickContinueButton();

		//step 2
		await this.waitForCheckoutStepTwoToLoad();
		await this.cartPageData.verifyProductInCart(productName);
		await this.calculateAndVerifyPricesDisplayed();
		await this.clickFinishButton();

		//checkout completion validation
		await this.waitForCheckoutCompletePageToLoad();
		await this.clickBackToHomeButton();
	}
}
