const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')  //会自动打包成一个bundle.js文件 并在index.html里面引用
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            favicon: './public/favicon.ico'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        // contentBase: path.join(__dirname, '/dist'),
        historyApiFallback: true,
        compress: true,
        // port: 8080,
        proxy: {
            '/v1/**': {
                target: 'http://localhost:4000/',  //http://localhost:8080/v1/...会被代理到请求 http://localhost:4000/v1/...
            }
        }
    }
};