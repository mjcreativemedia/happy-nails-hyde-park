import { defineConfig } from "astro/config";
import { business } from "./src/config/business";

export default defineConfig({
  site: business.website,
});
