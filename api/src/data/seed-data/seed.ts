import { seedSkills } from "./skills/seed";
import { seedTitles } from "./titles/seed";
import { seedTracks } from "./tracks/seed";

(async () => {
    await seedSkills();
    await seedTracks();
    await seedTitles();
})()
    .then(() => process.exit());