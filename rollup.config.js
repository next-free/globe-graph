import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postCss from 'rollup-plugin-postcss';
import terser from "@rollup/plugin-terser";
import dts from 'rollup-plugin-dts';

const pkg = import('./package.json') as Record<string, any>;

const umdConf = {
  format: 'umd',
  moduleName: 'Globe', // Add this line
  name: 'Globe',
  banner: `// Version ${pkg.version} ${pkg.name} - ${pkg.homepage || ''}`
};

export default [
  {
    input: 'src/index.js',
    output: [
      {
        ...umdConf,
        file: `dist/${pkg.name}.js`,
        sourcemap: true
      },
      { // minify
        ...umdConf,
        file: `dist/${pkg.name}.min.js`
      }
    ],
    plugins: [
      resolve(),
      commonJs(),
      postCss(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' })
    ]
  },
  { // ES module
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: `dist/${pkg.name}.mjs`
      }
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [
      postCss(),
      babel({ babelHelpers: 'bundled' })
    ]
  },
  { // html file
    input: 'src/index.html',
    output: 'dist/index.html'
  },
  { // expose TS declarations
    input: 'src/index.d.ts',
    output: [{
      file: `dist/${pkg.name}.d.ts`,
      format: 'esm'
    }],
    plugins: [dts()]
  }
];
