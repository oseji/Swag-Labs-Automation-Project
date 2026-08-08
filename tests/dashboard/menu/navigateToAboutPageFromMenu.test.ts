import { describe } from "mocha";
import { uiTest } from "../../../utils/uiTest";
import { clickOnAMenuButton } from "../../../utils/clickOnAMenuButton";

import { setAllureLabels } from "../../../utils/allure/setAllureLabels.helper";

describe("Navigate to About page from menu", () => {
    uiTest(
        "should verify that clicking the About option in the side menu navigates to the Sauce Labs site",
        async () => {
            await setAllureLabels({
                severity: "high",
                tag: "regression",
                epic: "navigation",
                feature: "menu",
                story: "User opens menu and navigates to about page",
            });

            await clickOnAMenuButton("about");
        },
    );
});
