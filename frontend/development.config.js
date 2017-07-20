const webpack = require('webpack');

exports.devServer = function (options) {
    return {
        devServer: {
            host: options.host,
            port: options.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            }),
            new webpack.NoErrorsPlugin()
        ]
    };
};

exports.babel = function (options) {
    return {
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    include: options.include,
                    exclude: options.exclude,
                    loader: 'babel'
                }
            ]
        }
    };
};

exports.sourcemap = () => ({
    devtool: "source-map"
});