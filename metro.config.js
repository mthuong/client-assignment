/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()

  const sourceExtensions = [
    ...(process.env.RN_SRC_EXT
      ? process.env.RN_SRC_EXT.split(',').concat(sourceExts)
      : sourceExts),
    'svg',
  ]

  console.log(sourceExtensions)

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: sourceExtensions,
    },
  }
})()
