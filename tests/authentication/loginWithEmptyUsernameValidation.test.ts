/*verifies that login is blocked when the username field is empty and the correct error message is shown.*/
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin("no username", "", process.env.PASSWORD!);
