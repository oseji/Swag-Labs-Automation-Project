/*verifies that a user can log in with valid credentials and is redirected to the dashboard.*/
import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin(
	"happy path",
	process.env.USER_NAME!,
	process.env.PASSWORD!,
);
