const path = require('path');

module.exports = {
    entry: path.join(
        __dirname, 'app/scripts/main.js'
    ),

    output: {
        filename: 'bundle.js',
        path: path.join(
            __dirname, 'app/dist/'
        )
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                    ]
                }
            }
        ]
    }
};
