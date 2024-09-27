import buildConfig from './rollup.config.js';
import serve from 'rollup-plugin-serve';

const config = Array.isArray(buildConfig) ? buildConfig[0] : buildConfig;
Array.isArray(config.output) && (config.output = config.output[0]);

config.plugins = [
  ...(config.plugins || []),
  serve({
    open: true,
    contentBase: 'dist',
    port: 3000, // Specify your desired port here
  })
];

export default config;
