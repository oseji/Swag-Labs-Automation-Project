/*verifies that products can be sorted by price from high to low.*/
import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";

describe("Sort products by price high to low", () => {
    it("should verify that products are displayed in descending price order when sorted high to low", async () => {
        try {
            await sortProducts("high to low");
        } catch (error) {
            console.error("❌ Sort products by price high to low test failed:", error);
            throw error;
        }
    });
});
