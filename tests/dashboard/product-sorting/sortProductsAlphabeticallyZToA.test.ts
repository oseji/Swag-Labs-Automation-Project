/*verifies that products can be sorted alphabetically by name (z to a).*/
import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";

describe("Sort products alphabetically Z to A", () => {
    it("should verify that products are displayed in descending alphabetical order when sorted Z to A", async () => {
        try {
            await sortProducts("z to a");
        } catch (error) {
            console.error("❌ Sort products Z to A test failed:", error);
            throw error;
        }
    });
});
