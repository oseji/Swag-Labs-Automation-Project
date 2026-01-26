import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin(
	"negative path",
	"wrong_username",
	process.env.PASSWORD!,
);
