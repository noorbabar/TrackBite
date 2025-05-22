/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string;
    // add other env variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  