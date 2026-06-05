import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Sort products by price low to high", () => {
    it("should verify that products are displayed in ascending price order when sorted low to high", async () => {
        await setAllureLabels({
            severity: "minor",
            tag: "regression",
            epic: "product",
            feature: "product sorting",
            story: "User sorts product list from low to high price",
        });

        try {
            await sortProducts("low to high");
        } catch (error) {
            console.error(
                "❌ Sort products by price low to high test failed:",
                error,
            );
            throw error;
        }
    });
});
