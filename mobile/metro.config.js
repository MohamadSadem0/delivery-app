// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Important: make sure the Expo asset plugin is present
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;
