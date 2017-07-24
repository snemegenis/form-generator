exports.babel = function (options) {
    return {
        module : {
            loaders: [
                {
                    test: /\.jsx$/,
                    include: options.include,
                    exclude: options.exclude,
                    loader: 'babel'
                }

            ]
        }
    };
};