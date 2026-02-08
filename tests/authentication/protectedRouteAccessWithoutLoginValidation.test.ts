/*verifies that opening the inventory page (/inventory.html) without being logged in redirects the user to the login page instead of showing protected content.*/

import { loadLandingPageAndLogin } from "../../utils/loadLandingPageAndLogin";

loadLandingPageAndLogin("protected route access without login", "", "");
