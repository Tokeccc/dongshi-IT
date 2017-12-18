var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'static/js/main.js',
        publicPath:'./'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:[{
                        loader:'babel-loader'
                    }]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(scss|sass)$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader'
                },{
                    loader:'sass-loader'
                }]
            },
            {
                test:/\.(jpg|png|gif|jpeg|webp)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        outputPath:'../img/',
                        publicPath:'./static/img/'
                    }
                }]
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css','.scss']  //忽略文件后缀
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}), //生成html模板
        new webpack.optimize.UglifyJsPlugin() //压缩js
    ]
}