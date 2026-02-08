/*verifies that login fails with invalid credentials and the correct error message is displayed.*/
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin(
	"negative path",
	"wrong_username",
	process.env.PASSWORD!,
);
