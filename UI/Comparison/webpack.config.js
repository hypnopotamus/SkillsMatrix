const path = require("path");

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }//todo remove this option, it shouldn't be needed. the ui container should build and publish ready to use js with type definition files for the parts it intends to expose as an API (and only those parts); the publish setup for the ui container package needs improvement
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'public'),
        clean: true,
    }
};