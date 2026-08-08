import { describe } from "mocha";
import { uiTest } from "../../../utils/uiTest";
import { sortProducts } from "../../../utils/sortProducts";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Sort products by price high to low", () => {
    uiTest(
        "should verify that products are displayed in descending price order when sorted high to low",
        async () => {
            await setAllureLabels({
                severity: "minor",
                tag: "regression",
                epic: "product",
                feature: "product sorting",
                story: "User sorts product list from from high to low price",
            });

            await sortProducts("high to low");
        },
    );
});
