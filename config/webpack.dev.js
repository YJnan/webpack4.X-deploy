var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const path = require('path');        //node内置path模块，该模块主要集成文件系统路径操作API

const config = {
    mode: 'development',        //webpack打包的模式，上述命令里有介绍，也可以在本配置中配置
    entry: {    //js的入口文件，支持多入口 注释①
        main: path.resolve(__dirname, '../src/index.js')
    },
    output: {   //js打包压缩后的出口文件，多入口时对应的配置应做相对变化 注释②
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
                options: { sourceMap: false }
            }, {
                loader: 'css-loader',
                options: { sourceMap: false }
            },
            ]
        }, {
            test: /\.less$/,
            use: [
                { loader: 'style-loader', options: { sourceMap: false } },
                { loader: 'css-loader', options: { sourceMap: false } },
                { loader: 'less-loader', options: { sourceMap: false } }
            ]
        }, {
            test: /\.(scss|sass)$/,
            use: [
                { loader: 'style-loader', options: { sourceMap: false } },
                { loader: 'css-loader', options: { sourceMap: false } },
                { loader: 'sass-loader', options: { sourceMap: false } }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        }]
        // 配置loder使用的规则、作用范围、控制输出的名称、位置等；主要作用是编译，解析文件； 暂时不使用loader
    },
    plugins: [
        new webpack.DefinePlugin({  //环境变量装配
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                NODE_APIENV: JSON.stringify(process.env.NODE_APIENV || 'development'),
                WITH_TRACKER: process.env.WITH_TRACKER
            },
        }),
    ],
    devServer: {        //webpack-dev-server配置（仅开发环境需要）
        contentBase: path.join(__dirname, './dist'), //编译打包文件的位置
        publicPath: '/',
        port: 8080,                 //服务器端口号
        host: '0.0.0.0',
        proxy: {},                  //代理列表
        compress: true,
        historyApiFallback: true,   //开启服务器history重定向模式
    }
};

module.exports = config;