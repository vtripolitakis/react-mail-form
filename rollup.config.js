import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"

export default {
    input: "src/ReactMailForm.js",
    output: {
        file: "lib/bundle.js",
        format: "cjs"
    },
    external: [
        "react", 
        "react-proptypes",
        "axios"
    ],
    plugins: [
        resolve(),
        babel({
            exclude: "node_modules/**"
        })
    ]
}
