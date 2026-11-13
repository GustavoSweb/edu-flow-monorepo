import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // As camadas app/pages usam o prefixo "_" porque app/ e pages/ são reservados pelo Next.js.
      "fsd/typo-in-layer-name": "off",
      // No início do projeto quase toda fatia tem um único uso; reavaliar quando houver mais telas.
      "fsd/insignificant-slice": "warn",
    },
  },
]);
