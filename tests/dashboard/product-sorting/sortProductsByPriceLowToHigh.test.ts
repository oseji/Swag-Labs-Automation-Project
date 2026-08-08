import { describe } from "mocha";
import { uiTest } from "../../../utils/uiTest";
import { sortProducts } from "../../../utils/sortProducts";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Sort products by price low to high", () => {
    uiTest(
        "should verify that products are displayed in ascending price order when sorted low to high",
        async () => {
            await setAllureLabels({
                severity: "minor",
                tag: "regression",
                epic: "product",
                feature: "product sorting",
                story: "User sorts product list from low to high price",
            });

            await sortProducts("low to high");
        },
    );
});
