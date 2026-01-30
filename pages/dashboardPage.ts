import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";
import { LandingPage } from "./landingPage";

export class DashboardPage {
	private driver: WebDriver;
	private timeout: number;
	private loadLandingPageAndLogin: LandingPage;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
		this.loadLandingPageAndLogin = new LandingPage(this.driver, this.timeout);
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
			"//div[text()='Test.allTheThings() T-Shirt (Red)']",
		),
	};

	footerLocators = {
		twitterIcon: By.className("social_twitter"),
		facebookIcon: By.className("social_facebook"),
		linkedinIcon: By.className("social_linkedin"),
	};

	productDetailsPageLocators = {
		backToProductsButton: By.id("back-to-products"),
		sauceLabsBackpackTitle: By.xpath("//div[text()='Sauce Labs Backpack']"),
		sauceLabsBikeLightTitle: By.xpath("//div[text()='Sauce Labs Bike Light']"),
		sauceLabsBoltTshirtTitle: By.xpath(
			"//div[text()='Sauce Labs Bolt T-Shirt']",
		),
		sauceLabsFleeceJacketTitle: By.xpath(
			"//div[text()='Sauce Labs Fleece Jacket']",
		),
		sauceLabsOnsieTitle: By.xpath("//div[text()='Sauce Labs Onesie']"),
		sauceLabsTestAllThingsShirtTitle: By.xpath(
			"//div[text()='Test.allTheThings() T-Shirt (Red)']",
		),
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

	private productDetailsLocatorsMapping = {
		"sauce labs backpack":
			this.productDetailsPageLocators.sauceLabsBackpackTitle,
		"sauce labs bike light":
			this.productDetailsPageLocators.sauceLabsBikeLightTitle,
		"sauce labs bolt t-shirt":
			this.productDetailsPageLocators.sauceLabsBoltTshirtTitle,
		"sauce labs fleece jacket":
			this.productDetailsPageLocators.sauceLabsFleeceJacketTitle,
		"sauce labs onesie": this.productDetailsPageLocators.sauceLabsOnsieTitle,
		"test all the things t-shirt red":
			this.productDetailsPageLocators.sauceLabsTestAllThingsShirtTitle,
	};

	private socialMediaMapping = {
		twitter: this.footerLocators.twitterIcon,
		facebook: this.footerLocators.facebookIcon,
		linkedIn: this.footerLocators.linkedinIcon,
	};

	private formatProductName(product: string): string {
		return product.trim().toLowerCase().replace(/\s+/g, "-");
	}

	async confirmUserIsOnDashboard(): Promise<void> {
		await this.driver.wait(
			until.urlIs(process.env.DASHBOARD_URL!),
			this.timeout,
		);

		//wait to locate products filter on the dashboard to confirm url has fully loaded
		await waitForElement(
			this.driver,
			this.dashboardLocators.productFilter,
			"products filter",
		);
	}

	async getAllProductsData(): Promise<{ name: string; price: number }[]> {
		// locate all product container divs
		const productContainers = await this.driver.findElements(
			By.xpath("//div[@data-test='inventory-item']"),
		);

		const products = [];

		for (const container of productContainers) {
			const nameElement = await container.findElement(
				By.xpath(".//*[@data-test='inventory-item-name']"),
			);
			const priceElement = await container.findElement(
				By.xpath(".//*[@data-test='inventory-item-price']"),
			);

			const name = await nameElement.getText();
			const priceText = await priceElement.getText();

			const price = parseFloat(priceText.replace("$", ""));

			products.push({ name, price });
		}

		return products;
	}

	async clickProductFilter(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.dashboardLocators.productFilter,
			"product filter",
		);
	}

	async selectAProductFilterOption(
		option:
			| "sort price low to high"
			| "sort price high to low"
			| "sort names from a to z"
			| "sort names from z to a",
	): Promise<void> {
		const locator = this.filterMapping[option];
		await waitAndClick(this.driver, locator, `${option} filter`);
	}

	async clickOnProductToViewDetails(
		product:
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red",
	): Promise<void> {
		const productLocator = this.productMapping[product];
		await waitAndClick(this.driver, productLocator, `${product} product`);

		await this.driver.wait(
			until.urlContains("https://www.saucedemo.com/inventory-item.html?id"),
			this.timeout,
		);

		console.log(`opened ${product} details page`);

		//verify correct product details page is opened
		const productTitleLocator = this.productDetailsLocatorsMapping[product];
		await waitForElement(
			this.driver,
			productTitleLocator,
			`${product} title on product details page`,
		);
	}

	async clickRemoveButtonOnProduct(
		product:
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red",
	): Promise<void> {
		const locator = By.id(`remove-${product}`);
		await waitAndClick(this.driver, locator, ` remove button for ${product}`);
	}

	async clickAddToCartButtonOnProduct(
		product:
			| "sauce labs backpack"
			| "sauce labs bike light"
			| "sauce labs bolt t-shirt"
			| "sauce labs fleece jacket"
			| "sauce labs onesie"
			| "test all the things t-shirt red",
	): Promise<void> {
		const formattedProduct = this.formatProductName(product);
		const locator = By.id(`add-to-cart-${formattedProduct}`);

		await waitAndClick(
			this.driver,
			locator,
			` add to cart button for ${product}`,
		);

		await this.driver.sleep(3000);
	}

	async clickToOpenSocialMedia(
		platform: "twitter" | "facebook" | "linkedIn",
	): Promise<void> {
		const locator = this.socialMediaMapping[platform];
		await waitAndClick(this.driver, locator, `${platform} icon`);
	}
}
