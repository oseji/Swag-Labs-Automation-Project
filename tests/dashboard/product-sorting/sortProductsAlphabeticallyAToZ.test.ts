import { describe, it } from "mocha";
import { sortProducts } from "../../../utils/sortProducts";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Sort products alphabetically A to Z", () => {
    it("should verify that products are displayed in ascending alphabetical order when sorted A to Z", async () => {
        await setAllureLabels({
            severity: "minor",
            tag: "regression",
            epic: "product",
            feature: "product sorting",
            story: "User sorts product list from a-z",
        });

        await sortProducts("a to z");
    });
});
