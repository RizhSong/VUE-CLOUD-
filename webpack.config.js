const path = require('path')

// 启动热更新第二部
const webpack = require('webpack')

// 导入在内存中生成 HTML 页面的 插件
// 只要是插件，都一定要 放到 plugins 节点中去
// 这个插件的两个作用：
// 1. 自动在内存中根据指定页面生成一个内存的页面
// 2. 自动，把打包好的 bundles.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),  // 入口文件  表示 webpack 打包哪个文件
  output: {  // 输出 输出的文件配置
    path: path.join(__dirname, './dist'), // 指定打包好的文件 输出到哪个目录中去
    filename: 'bundle.js' // 输出文件的名称
  },
  mode: 'production',// 设置mode 开发模式
  devServer: {
    open: true,  // 自动打开浏览器
    port: 3001,  // 设置启动时运行端口
    contentBase: 'src',  // 指定托管的根目录
    hot: true, // 启动热更新   第一步
    // host: '0.0.0.0'
  },
  plugins: [  // 配置插件的节点
    // 热更新的第三步
    new webpack.HotModuleReplacementPlugin(),   //  new 一个热更新的 模块对象，这是 启用热更新的第 3 步
    new htmlWebpackPlugin({  // 创建一个 在内存中 生成 HTML 页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定 模拟页面，将来会根据指定的页面路径，去生成内存中的 页面
      filename: 'index.html' // 指定生成的页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module: { // 这个节点 用于配置 所有第三方模块 加载器
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
    ]
  }
}