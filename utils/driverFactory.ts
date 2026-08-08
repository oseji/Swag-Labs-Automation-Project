import { WebDriver, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

const activeDrivers = new Set<WebDriver>();

export const buildDriver = async (): Promise<WebDriver> => {
    const chromeOptions = new Options();

    chromeOptions.setUserPreferences({
        credentials_enable_service: false,
        "profile.password_manager_enabled": false,
    });

    chromeOptions.addArguments("--incognito");

    chromeOptions.setPageLoadStrategy("eager");

    if (process.env.HEADLESS === "true") {
        chromeOptions.addArguments(
            "--headless=new",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--window-size=1920,1080",
        );
    }

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    activeDrivers.add(driver);

    return driver;
};

export const getActiveDrivers = (): WebDriver[] => [...activeDrivers];

export const quitActiveDrivers = async (): Promise<void> => {
    for (const driver of activeDrivers) {
        try {
            await driver.quit();
        } catch {
            //session may already be gone, nothing left to clean up
        }
    }

    activeDrivers.clear();
};
