import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
 
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...js.configs.recommended,
  },

 
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
  })),

  
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,           
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "script",       
      },
    },
    rules: {
      
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      
      "no-undef": "off",
    },
  },

  
  {
    files: ["frontend/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/build/",
      "**/coverage/",
      "backend/migrations/",   
      "backend/seeders/",
    ],
  },
];