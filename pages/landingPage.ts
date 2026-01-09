import { WebDriver, By, until } from "selenium-webdriver";
import {
	waitAndClick,
	waitAndInput,
	waitForElement,
} from "../utils/webElementHelpers";

export class LandingPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	locators = {
		usernameInputField: By.id(`user-name`),
		passwordInputField: By.id(`password`),
		loginButton: By.id(`login-button`),
		productFilter: By.className("product_sort_container"),
	};

	async openLandingPageAndWaitForItToLoad(): Promise<void> {
		await this.driver.get(process.env.LANDING_PAGE_URL!);

		await waitForElement(
			this.driver,
			this.locators.loginButton,
			`login button`
		);
	}

	async inputUserName(username: string): Promise<void> {
		await waitAndInput(
			this.driver,
			this.locators.usernameInputField,
			username,
			"username input"
		);
	}

	async inputPassword(password: string): Promise<void> {
		await waitAndInput(
			this.driver,
			this.locators.passwordInputField,
			password,
			"password input"
		);
	}

	async clickLoginButton(): Promise<void> {
		await waitAndClick(this.driver, this.locators.loginButton, "login button");
	}

	async waitForDashboardToLoad(): Promise<void> {
		await this.driver.wait(
			until.urlIs(process.env.DASHBOARD_URL!),
			this.timeout
		);

		//wait to locate products label on the dashboard to confirm url has fully loaded
		await waitForElement(
			this.driver,
			this.locators.productFilter,
			"products label"
		);
	}

	async waitForLandingPageAndLogin(
		username: string,
		password: string
	): Promise<void> {
		await this.openLandingPageAndWaitForItToLoad();
		await this.inputUserName(username);
		await this.inputPassword(password);
		await this.clickLoginButton();
		await this.waitForDashboardToLoad();
	}
}
