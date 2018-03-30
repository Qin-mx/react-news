const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry:'./app/index.js',
    output:{
        publicPath: 'temp/', // 公共路径
        filename: 'index.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer:{
        contentBase: './', // 基本目录
        host: 'localhost', // 地址
        compress: true, //压缩
        port: 1717, //端口
    },
    module:{
        rules:[{
            test:/\.js$/,
            exclude:/node_modules/,
            loaders:"babel-loader",
            query:{
                presets:['es2015','react']
            }
        },{
            test: /\.css$/,
            loader:['style-loader','css-loader']
        }]
    },
    // devServer:{
    //     //设置基本目录结构
    //     contentBase:path.resolve(__dirname,'dist'),
    //     //服务器的IP地址，可以使用IP也可以使用localhost
    //     host:'192.168.2.175',
    //     //服务端压缩是否开启
    //     compress:true,
    //     //配置服务端口号
    //     port:5050
    // }
}