module.exports = {
    entry: './app/scripts/main.js',

    output: {
        filename: 'bundle.js',
        path: './app/dist/'
    },

    module: {
        loaders: [
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
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
