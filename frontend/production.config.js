exports.babel = function (options) {
    console.log(options);
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