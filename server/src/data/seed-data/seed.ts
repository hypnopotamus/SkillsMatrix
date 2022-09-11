import { seedSkills } from "./skills/seed";
import { seedTitles } from "./titles/seed";

(async () => {
    await seedSkills();
    await seedTitles();
})()
    .then(() => process.exit());