import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";

export class cartPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	cartPageLocators = {
		checkoutButton: By.id("checkout"),
		continueShoppingButton: By.id("continue-shopping"),
		yourCartHeading: By.xpath("//span[text()='Your Cart']"),
	};

	async waitForCartPageToOpen(): Promise<void> {
		await this.driver.wait(
			until.urlIs("https://www.saucedemo.com/cart.html"),
			this.timeout,
		);

		await waitForElement(
			this.driver,
			this.cartPageLocators.yourCartHeading,
			"cart page heading",
		);
	}

	async clickCheckoutButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.cartPageLocators.checkoutButton,
			"checkout button",
		);
	}

	async clickContinueShoppingButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.cartPageLocators.continueShoppingButton,
			"continue shopping",
		);
	}
}
