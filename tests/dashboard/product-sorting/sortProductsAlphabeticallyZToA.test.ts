import { describe } from "mocha";
import { uiTest } from "../../../utils/uiTest";
import { sortProducts } from "../../../utils/sortProducts";
import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Sort products alphabetically Z to A", () => {
    uiTest(
        "should verify that products are displayed in descending alphabetical order when sorted Z to A",
        async () => {
            await setAllureLabels({
                severity: "minor",
                tag: "regression",
                epic: "product",
                feature: "product sorting",
                story: "User sorts product list from z-a",
            });

            await sortProducts("z to a");
        },
    );
});
