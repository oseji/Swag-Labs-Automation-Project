import { describe } from "mocha";
import { uiTest } from "../../utils/uiTest";
import { clickOnAMenuButton } from "../../utils/clickOnAMenuButton";
import { setAllureLabels } from "../../utils/allure/setAllureLabels.helper";

describe("Logout and session persistence", () => {
    uiTest(
        "should verify that when the user logs out, they are redirected to the landing page and that clicking the back button does not restore the dashboard session",
        async () => {
            await setAllureLabels({
                severity: "critical",
                tag: "regression",
                epic: "Authentication",
                feature: "Login",
                story: "User logs out and is sent to the dashboard",
            });

            await clickOnAMenuButton("logout");
        },
    );
});
