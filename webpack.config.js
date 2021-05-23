const path = require('path');

// Inyección de archivo js a html con plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[contentHash].bundle.js",
    },
    // mode: 'development',
    devtool: 'source-map',
    devServer: {
        // contentBase: path.join(__dirname, './src'), // Busca el archivo index html
        // compress: true,
        port: 9000,
        // publicPath: './public/js',
        // watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            esModule: false
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/",
                            // publicPath: 'assets',
                        }
                    },
                ]
            },
            {
                test: /\.js$/, // Busca todos los archivos js de nuestro proyecto
                exclude: /(node_modules|public)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: "Webpack Por DavidSalinas",
            template: "./src/index.html",
            filename: "./index.html",
            inject: "body"
        }),
    ]
};