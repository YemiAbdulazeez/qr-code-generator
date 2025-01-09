import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// Convert 'import.meta.url' to '__dirname'-like behavior
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@api': path.resolve(__dirname, './src/api'),
  //   },
  // },
});
