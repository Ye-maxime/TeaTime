const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    mode: 'development',
    output: {
        filename: 'bundle.[hash].js',
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
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/dist'
                    }
                }, 'css-loader']   // use的顺序从右往左
            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            // 具体配置见插件官网
                            limit: 10000,
                            name: '[name]-[hash:5].[ext]',
                            outputPath: 'img/', // outputPath所设置的路径，是相对于 webpack 的输出目录。
                            publicPath: 'img/'// publicPath 选项则被许多webpack的插件用于在生产模式下更新内嵌到css、html文件内的 url , 如CDN地址
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP, bug here!!!
                            // webp: {  
                            //     quality: 70
                            // }
                        }
                    }]
            },
            {
                // 字体
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 文件大小小于limit参数，url-loader将会把文件转为DataUR
                    limit: 10000,
                    name: '[name]-[hash:5].[ext]',
                    output: 'fonts/',
                    // publicPath: '', 多用于CDN
                }
            }
        ]
    },
    plugins: [
        // 打包html文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            favicon: './public/favicon.ico',
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true, // 压缩文内js
                minifyCSS: true, // 压缩文内css
                minifyURLs: true,
            },
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(),
        // 打包导出 CSS 到独立文件 main.css
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // 压缩 CSS  即丑化代码
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
        })
    ],
    optimization: {
        minimize: true, //production 模式下，这里默认是 true
        minimizer: [
            // 压缩JS
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ]
    },
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