import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";

export class DashboardPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	dashboardLocators = {
		productFilter: By.className("product_sort_container"),
		priceLowToHighFilter: By.css('option[value="lohi"]'),
		priceHighToLowFilter: By.css('option[value="hilo"]'),
		nameAToZFilter: By.css('option[value="az"]'),
		nameZToAFilter: By.css('option[value="za"]'),
		sauceLabsBackpack: By.xpath("//div[text()='Sauce Labs Backpack']"),
		sauceLabsBikeLight: By.xpath("//div[text()='Sauce Labs Bike Light']"),
		sauceLabsBoltTshirt: By.xpath("//div[text()='Sauce Labs Bolt T-Shirt']"),
		sauceLabsFleeceJacket: By.xpath("//div[text()='Sauce Labs Fleece Jacket']"),
		sauceLabsOnsie: By.xpath("//div[text()='Sauce Labs Onesie']"),
		sauceLabsTestAllThingsShirt: By.xpath(
			"//div[text()='Test.allTheThings() T-Shirt (Red)']"
		),
	};

	footerLocators = {
		twitterIcon: By.className("social_twitter"),
		facebookIcon: By.className("social_facebook"),
		linkedinIcon: By.className("social_linkedin"),
	};

	private filterMapping = {
		"sort price low to high": this.dashboardLocators.priceLowToHighFilter,
		"sort price high to low": this.dashboardLocators.priceHighToLowFilter,
		"sort names from a to z": this.dashboardLocators.nameAToZFilter,
		"sort names from z to a": this.dashboardLocators.nameZToAFilter,
	};

	private productMapping = {
		"sauce labs backpack": this.dashboardLocators.sauceLabsBackpack,
		"sauce labs bike light": this.dashboardLocators.sauceLabsBikeLight,
		"sauce labs bolt t-shirt": this.dashboardLocators.sauceLabsBoltTshirt,
		"sauce labs fleece jacket": this.dashboardLocators.sauceLabsFleeceJacket,
		"sauce labs onesie": this.dashboardLocators.sauceLabsOnsie,
		"test all the things t-shirt red":
			this.dashboardLocators.sauceLabsTestAllThingsShirt,
	};

	private socialMediaMapping = {
		twitter: this.footerLocators.twitterIcon,
		facebook: this.footerLocators.facebookIcon,
		linkedIn: this.footerLocators.linkedinIcon,
	};

	async confirmUserIsOnDashboard(): Promise<void> {
		await this.driver.wait(
			until.urlIs(process.env.DASHBOARD_URL!),
			this.timeout
		);

		//wait to locate products filter on the dashboard to confirm url has fully loaded
		await waitForElement(
			this.driver,
			this.dashboardLocators.productFilter,
			"products filter"
		);
	}

	async clickProductFilter(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.dashboardLocators.productFilter,
			"product filter"
		);
	}

	async selectAProductFilterOption(
		option:
			| "sort price low to high"
			| "sort price high to low"
			| "sort names from a to z"
			| "sort names from z to a"
	): Promise<void> {
		const locator = this.filterMapping[option];
		await waitAndClick(this.driver, locator, `${option} filter`);
	}

	async clickOnProductToOpenIt(
		product:
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red"
	): Promise<void> {
		const locator = this.productMapping[product];
		await waitAndClick(this.driver, locator, `${product} product`);
	}

	async clickToOpenSocialMedia(
		platform: "twitter" | "facebook" | "linkedIn"
	): Promise<void> {
		const locator = this.socialMediaMapping[platform];
		await waitAndClick(this.driver, locator, `${platform} icon`);
	}
}
