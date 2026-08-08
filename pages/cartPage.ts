import { expect } from "chai";
import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";
import { ProductName } from "../types/products";

export class CartPage {
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

    productLocators = {
        saucelabsBackpack: By.xpath("//div[text()='Sauce Labs Backpack']"),
        saucelabsBikeLight: By.xpath("//div[text()='Sauce Labs Bike Light']"),
        saucelabsBoltTshirt: By.xpath(
            "//div[text()='Sauce Labs Bolt T-Shirt']",
        ),
        saucelabsFleeceJacket: By.xpath(
            "//div[text()='Sauce Labs Fleece Jacket']",
        ),
        saucelabsOnsie: By.xpath("//div[text()='Sauce Labs Onesie']"),
        saucelabsTestAllThingsShirt: By.xpath(
            "//div[text()='Test.allTheThings() T-Shirt (Red)']",
        ),
    };

    private productNameToLocatorMap = {
        "sauce labs backpack": this.productLocators.saucelabsBackpack,
        "sauce labs bike light": this.productLocators.saucelabsBikeLight,
        "sauce labs bolt t-shirt": this.productLocators.saucelabsBoltTshirt,
        "sauce labs fleece jacket": this.productLocators.saucelabsFleeceJacket,
        "sauce labs onesie": this.productLocators.saucelabsOnsie,
        "test all the things t-shirt red":
            this.productLocators.saucelabsTestAllThingsShirt,
    };

    async waitForCartPageToOpen(): Promise<void> {
        await this.driver.wait(
            until.urlIs(process.env.CART_URL!),
            this.timeout,
        );

        await waitForElement(
            this.driver,
            this.cartPageLocators.yourCartHeading,
            "cart page heading",
        );
    }

    async verifyProductInCart(productName: ProductName[]): Promise<void> {
        for (const product of productName) {
            const locator = this.productNameToLocatorMap[product];

            await waitForElement(
                this.driver,
                locator,
                `${product} in the cart`,
            );
        }

        expect(productName.length).to.be.greaterThan(
            0,
            "At least one product should be in cart",
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
