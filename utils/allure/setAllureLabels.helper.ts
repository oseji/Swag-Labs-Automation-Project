import { label, tag } from "allure-js-commons";

type Severity =
    "blocker" | "critical" | "high" | "normal" | "minor" | "trivial";

type AllureLabels = {
    severity?: Severity;
    tag?: string;
    epic?: string;
    feature?: string;
    story?: string;
};

export const setAllureLabels = async (labels: AllureLabels): Promise<void> => {
    if (labels.severity) await label("severity", labels.severity);
    if (labels.tag) await tag(labels.tag);
    if (labels.epic) await label("epic", labels.epic);
    if (labels.feature) await label("feature", labels.feature);
    if (labels.story) await label("story", labels.story);
};
