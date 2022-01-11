module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@shared": "./src/shared",
          "@factories": "./spec/factories",
          "@spec-utils": "./spec/utils",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
  ]
}