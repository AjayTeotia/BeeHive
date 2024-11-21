/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
