import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";

export class NavigationBarPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	locators = {
		cartButton: By.css('[data-test="shopping-cart-link"]'),
		menuButton: By.id("react-burger-menu-btn"),
		closeMenuButton: By.id("react-burger-cross-btn"),
		allItemsButton: By.id("inventory_sidebar_link"),
		aboutButton: By.id("about_sidebar_link"),
		logoutButton: By.id("logout_sidebar_link"),
		resetAppStateButton: By.id("reset_sidebar_link"),
	};

	async openCart(): Promise<void> {
		await this.driver.sleep(1000);
		await waitAndClick(
			this.driver,
			this.locators.cartButton,
			"cart icon and opened cart page",
		);
	}

	async openSideMenu(): Promise<void> {
		await waitAndClick(this.driver, this.locators.menuButton, "menu button");
	}

	async closeSideMenu(): Promise<void> {
		await this.driver.sleep(1000);

		await waitAndClick(
			this.driver,
			this.locators.closeMenuButton,
			"close menu button",
		);
	}

	async clickOnAllItemsMenuButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.allItemsButton,
			"all items button on the menu",
		);
	}

	async clickOnAboutMenuButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.aboutButton,
			"about button on the menu",
		);

		await this.driver.wait(until.urlIs("https://saucelabs.com/"), this.timeout);
		console.log("opened about page");
	}

	async clickOnLogoutMenuButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.logoutButton,
			"logout button on the menu",
		);

		await this.driver.wait(
			until.urlIs("https://www.saucedemo.com/"),
			this.timeout,
		);
		console.log("successfully logged out");
	}

	async clickResetAppStateMenuButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.resetAppStateButton,
			"reset app state button on the menu",
		);
	}

	async openMenuAndVerifyContent(): Promise<void> {
		await this.openSideMenu();
		await waitForElement(
			this.driver,
			this.locators.allItemsButton,
			"all items button on the menu",
		);
		await waitForElement(
			this.driver,
			this.locators.aboutButton,
			"about button on the menu",
		);
		await waitForElement(
			this.driver,
			this.locators.logoutButton,
			"logout button on the menu",
		);
		await waitForElement(
			this.driver,
			this.locators.resetAppStateButton,
			"reset app state button on the menu",
		);
		await this.closeSideMenu();
		console.log("completed opening menu and verifying content");
	}
}
