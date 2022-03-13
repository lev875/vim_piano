import babel from "@rollup/plugin-babel"
import serve from "rollup-plugin-serve"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"
import livereload from "rollup-plugin-livereload"

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      preventAssignment: false
    }),
    babel({
      presets: [
        ["@babel/preset-react", { runtime: "automatic" } ]
      ]
    }),
    commonjs(),
    serve({
      contentBase: "dist",
      host: process.env.APP_HOST,
      port: process.env.APP_PORT
    }),
    livereload({ watch: "dist" })
  ]
}
