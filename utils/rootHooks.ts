import { quitActiveDrivers } from "./driverFactory";

export const mochaHooks = {
    async afterEach(): Promise<void> {
        await quitActiveDrivers();
    },
};
