import { getActiveDrivers, quitActiveDrivers } from "./driverFactory";
import { attachScreenshotOnFailure } from "./allure/attachScreenShotOnFailure.helper";

export const mochaHooks = {
    async afterEach(this: Mocha.Context): Promise<void> {
        const test = this.currentTest;

        if (test?.state === "failed") {
            for (const driver of getActiveDrivers()) {
                await attachScreenshotOnFailure(
                    driver,
                    `failed: ${test.title}`,
                );
            }
        }

        await quitActiveDrivers();
    },
};
