import { createTables } from "../utils/db.init.js";

console.log("Migration start...");
await createTables();
console.log("Migration complete!");
process.exit(0);