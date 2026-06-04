/*verifies that products can be sorted alphabetically by name (a to z).*/
import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";

describe("Sort products alphabetically A to Z", () => {
    it("should verify that products are displayed in ascending alphabetical order when sorted A to Z", async () => {
        try {
            await sortProducts("a to z");
        } catch (error) {
            console.error("❌ Sort products A to Z test failed:", error);
            throw error;
        }
    });
});
