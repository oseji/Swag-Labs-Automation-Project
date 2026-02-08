/*verifies that logout returns the user to the landing page and that the back button does not restore the dashboard session.*/
import { clickOnAMenuButton } from "../../utils/clickOnAMenuButton";

clickOnAMenuButton("logout");
