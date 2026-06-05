import { expect } from "chai";
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
			until.urlIs(process.env.CHECKOUT_STEP_ONE_URL!),
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
			until.urlIs(process.env.CHECKOUT_STEP_TWO_URL!),
			this.timeout,
		);

		await waitForElement(
			this.driver,
			this.checkoutPageStepTwoLocators.checkoutStepTwoHeading,
			"check out page heading",
		);
	}

	private itemPricesLocator = By.css('[data-test="inventory-item-price"]');

	private verifyValues(actual: number, expected: number, label: string) {
		expect(
			actual,
			`${label} should match calculated value`,
		).to.equal(expected);
		console.log(`✅ ${label} verified: ${actual}`);
	}

	async calculateAndVerifyPricesDisplayed(): Promise<void> {
		const getPriceValue = async (locator: any) => {
			const text = await this.driver.findElement(locator).getText();
			return parseFloat(text.replace(/[^0-9.]/g, ""));
		};

		const priceElements = await this.driver.findElements(
			this.itemPricesLocator,
		);
		const itemTexts = await Promise.all(
			priceElements.map((el) => el.getText()),
		);
		const calculatedSum = itemTexts.reduce(
			(acc, text) => acc + parseFloat(text.replace("$", "")),
			0,
		);
		const roundedSum = Math.round(calculatedSum * 100) / 100;

		const subtotal = await getPriceValue(
			By.css('[data-test="subtotal-label"]'),
		);
		const tax = await getPriceValue(By.css('[data-test="tax-label"]'));
		const total = await getPriceValue(By.css('[data-test="total-label"]'));

		const expectedTax = Math.round(subtotal * 0.08 * 100) / 100;
		const expectedTotal = Math.round((subtotal + tax) * 100) / 100;

		this.verifyValues(roundedSum, subtotal, "Subtotal");
		this.verifyValues(tax, expectedTax, "Tax");
		this.verifyValues(total, expectedTotal, "Grand Total");

		console.log("✅ All price verifications completed successfully");
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
			until.urlIs(process.env.CHECKOUT_COMPLETE_URL!),
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

	async validateAndInputField(
		field: "first name" | "last name" | "postal code",
		value: string,
		inputMethod: (value: string) => Promise<void>,
	) {
		await inputMethod("");
		await this.clickContinueButton();
		await this.verifyCorrectErrorMessageDisplayed(field);
		await this.closeErrorMessage();
		await inputMethod(value);
	}

	async checkoutStepOne(
		firstName: string,
		lastName: string,
		postalCode: string,
	): Promise<void> {
		await this.waitForCheckoutStepOneToLoad();
		await this.validateAndInputField(
			"first name",
			firstName,
			this.inputFirstName.bind(this),
		);
		await this.validateAndInputField(
			"last name",
			lastName,
			this.inputLastName.bind(this),
		);
		await this.validateAndInputField(
			"postal code",
			postalCode,
			this.inputPostalCode.bind(this),
		);
		await this.clickContinueButton();
	}

	async checkoutStepTwo(
		productName: Array<
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red"
		>,
	): Promise<void> {
		await this.waitForCheckoutStepTwoToLoad();
		await this.cartPageData.verifyProductInCart(productName);
		await this.calculateAndVerifyPricesDisplayed();
		await this.clickFinishButton();
	}

	async lastCheckOutStep(): Promise<void> {
		await this.waitForCheckoutCompletePageToLoad();
		await this.clickBackToHomeButton();
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

		await this.validateAndInputField(
			"first name",
			firstName,
			this.inputFirstName.bind(this),
		);
		await this.validateAndInputField(
			"last name",
			lastName,
			this.inputLastName.bind(this),
		);
		await this.validateAndInputField(
			"postal code",
			postalCode,
			this.inputPostalCode.bind(this),
		);
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
