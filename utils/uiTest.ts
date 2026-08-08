import { it } from "mocha";
import { getActiveDrivers } from "./driverFactory";
import { attachScreenshotOnFailure } from "./allure/attachScreenShotOnFailure.helper";

export const uiTest = (title: string, fn: () => Promise<void>): Mocha.Test =>
    it(title, async () => {
        const preexistingDrivers = new Set(getActiveDrivers());

        try {
            await fn();
        } catch (error) {
            const ownDrivers = getActiveDrivers().filter(
                (driver) => !preexistingDrivers.has(driver),
            );

            for (const driver of ownDrivers) {
                await attachScreenshotOnFailure(driver, `failed: ${title}`);
            }

            throw error;
        }
    });
