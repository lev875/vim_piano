import babel from "@rollup/plugin-babel"
import serve from "rollup-plugin-serve"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import svgr from "@svgr/rollup"
import replace from "@rollup/plugin-replace"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"

const isProduction = process.env.NODE_ENV === 'production'

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: "src/main.js",
  output: {
    file: "build/bundle.js",
    format: "iife",
    sourcemap: !isProduction
  },
  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      preventAssignment: false
    }),
    postcss({
      extract: true,
      modules: true
    }),
    svgr(),
    babel({
      babelHelpers: 'runtime',
      presets: [
        [ "@babel/preset-react", { runtime: "automatic" } ]
      ]
    }),
    commonjs()
  ]
  .concat(
    isProduction
      ? [ terser() ]
      : [
        serve({
          contentBase: "build",
          host: process.env.APP_HOST,
          port: process.env.APP_PORT
        }),
        livereload({ watch: "dist", port: process.env.APP_LIVERELOAD_PORT })
      ]
  ),
  // Suppress 'this is undefined' message caused by redux-toolkit
  onwarn: (message, warn) => {
    if (message.code === 'THIS_IS_UNDEFINED') return
    warn(message)
  }
}
