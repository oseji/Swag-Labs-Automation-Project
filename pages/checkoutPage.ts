import { WebDriver, By, until } from "selenium-webdriver";
import {
	waitAndClick,
	waitAndInput,
	waitForElement,
} from "../utils/webElementHelpers";

export class checkoutPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	checkoutGeneralLocators = {
		cancelButton: By.id("cancel"),
	};

	checkoutPageStepOneLocators = {
		checkoutStepOneHeading: By.xpath("//span[text()='Checkout: Overview]"),
		firstNameInput: By.id("first-name"),
		lastNameInput: By.id("last-name"),
		postalCodeInput: By.id("postal-code"),
		continueButton: By.id("continue"),
		errorMessage: By.xpath("//h3[text()='Error: First Name is required']"),
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
		);

		await waitForElement(
			this.driver,
			this.checkoutPageStepTwoLocators.checkoutStepTwoHeading,
			"check out page heading",
		);
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
		);

		await waitForElement(
			this.driver,
			this.checkoutPageStepTwoLocators.checkoutStepTwoHeading,
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
}
