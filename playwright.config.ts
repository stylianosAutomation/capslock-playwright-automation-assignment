import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    // Take screenshots only on test failures
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
