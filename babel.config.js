module.exports = {
  presets: [
    // Converte para a versão do node instalada (é bom que seja LTS)
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@modules': './src/modules',
        '@config': './src/config',
        '@shared': './src/shared'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
}
