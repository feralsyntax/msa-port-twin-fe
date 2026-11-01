import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    input: "./src/api/schema/schema.yml",
    output: {
      mode: "tags-split",
      target: "./src/api/generated",
      schemas: "./src/api/models",
      client: "react-query",
      httpClient: "axios",
      mock: true,
      indexFiles: true,
      clean: true,

      override: {
        mutator: {
          path: "./src/api/axios/custom-instance.ts",
          name: "customInstance",
        },

        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
