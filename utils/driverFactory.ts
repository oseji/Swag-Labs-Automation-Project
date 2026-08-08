import { WebDriver, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

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

	return new Builder()
		.forBrowser("chrome")
		.setChromeOptions(chromeOptions)
		.build();
};
