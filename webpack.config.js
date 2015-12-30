module.exports = {
    resolve: {
        extensions: ['.es6.js', '.js', '']
    },

    entry: './app/scripts/main',

    output: {
        filename: 'bundle.js',
        path: './app/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.scss/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.es6\.js/,
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
