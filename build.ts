await Bun.build({
  entrypoints: ["src/main.ts"],
  target: "bun",
  format: "esm",
  minify: true,
  sourcemap: "linked",
  external: ["node_modules/*"],
  outdir: "dist",
});
