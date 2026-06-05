import { attachment } from "allure-js-commons";
import { WebDriver } from "selenium-webdriver";

export const attachScreenshotOnFailure = async (
    driver: WebDriver,
    name: string,
): Promise<void> => {
    try {
        const base64screenshot = await driver.takeScreenshot();

        const imageBuffer = Buffer.from(base64screenshot, "base64");

        await attachment(name, imageBuffer, {
            contentType: "image/png",
            fileExtension: "png",
        });
    } catch (screenshotError) {
        console.error(`Failed to capture screenshot: ${screenshotError}`);
    }
};
