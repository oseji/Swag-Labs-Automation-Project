/*verifies that products can be sorted by price from low to high.*/
import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";

describe("Sort products by price low to high", () => {
    it("should verify that products are displayed in ascending price order when sorted low to high", async () => {
        try {
            await sortProducts("low to high");
        } catch (error) {
            console.error("❌ Sort products by price low to high test failed:", error);
            throw error;
        }
    });
});
