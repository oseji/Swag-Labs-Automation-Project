import { expect } from "chai";
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
		cartBadge: By.css('[data-test="shopping-cart-badge"]'),
		menuWrapper: By.css(".bm-menu-wrap"),
		menuButton: By.id("react-burger-menu-btn"),
		closeMenuButton: By.id("react-burger-cross-btn"),
		allItemsButton: By.id("inventory_sidebar_link"),
		aboutButton: By.id("about_sidebar_link"),
		logoutButton: By.id("logout_sidebar_link"),
		resetAppStateButton: By.id("reset_sidebar_link"),
	};

	private async waitForSideMenuState(shouldBeOpen: boolean): Promise<void> {
		await this.driver.wait(
			async () => {
				const wrapper = await this.driver.findElement(
					this.locators.menuWrapper,
				);
				const isHidden = await wrapper.getAttribute("aria-hidden");

				return isHidden === (shouldBeOpen ? "false" : "true");
			},
			this.timeout,
			`Side menu did not ${shouldBeOpen ? "open" : "close"} within ${this.timeout}ms`,
		);
	}

	async openCart(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.cartButton,
			"cart icon and opened cart page",
		);
	}

	async verifyCartBadgeCount(expectedCount: number): Promise<void> {
		const badgeElement = await waitForElement(
			this.driver,
			this.locators.cartBadge,
			"cart badge",
		);

		const badgeText = await badgeElement.getText();
		const badgeCount = parseInt(badgeText, 10);

		console.log(`Cart badge count verified: ${badgeCount}`);
		expect(
			badgeCount,
			`Cart badge count should be ${expectedCount}`,
		).to.equal(expectedCount);
	}

	async verifyCartBadgeNotPresent(): Promise<void> {
		const badges = await this.driver.findElements(this.locators.cartBadge);

		expect(
			badges.length,
			"Cart badge should not be displayed when the cart is empty",
		).to.equal(0);

		console.log("Cart badge verified as not present");
	}

	async openSideMenu(): Promise<void> {
		await waitAndClick(this.driver, this.locators.menuButton, "menu button");

		await this.waitForSideMenuState(true);
	}

	async closeSideMenu(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.closeMenuButton,
			"close menu button",
		);

		await this.waitForSideMenuState(false);
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

		await this.driver.wait(
			until.urlContains("saucelabs.com"),
			this.timeout,
		);
		console.log("opened about page");
	}

	async clickOnLogoutMenuButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.logoutButton,
			"logout button on the menu",
		);

		await this.driver.wait(
			until.urlIs(process.env.LANDING_PAGE_URL!),
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
