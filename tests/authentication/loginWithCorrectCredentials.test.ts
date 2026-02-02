import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin(
	"happy path",
	process.env.USER_NAME!,
	process.env.PASSWORD!,
);
