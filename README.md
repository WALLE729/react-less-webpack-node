#react-less-webpack-node
1.	新建一个项目文件夹	使用node初始化项目  生成package.json文件
npm init

2.   在package.json中，在script中添加，dev ,build 等命令
"dev" : "webpack-dev-server --host 0.0.0.0",
"build": "webpack --progress --colors --production"

复制粘贴所需要的依赖包
"devDependencies": {
    "babel": "^6.5.2",
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "css-loader": "^0.26.1",
    "expose-loader": "^0.7.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "html-loader": "^0.4.4",
    "html-webpack-plugin": "^2.24.1",
    "jquery": "^3.1.1",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-hot-loader": "^1.3.1",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.16.2"
  }
在命令行中 npm install 进行安装

3.创建项目结构
-dev
-js
-img
-css
-public
-js
-img
-css
-view
-index.html
-about.html
.babelrc =>{ "presets":[['es2015'],['react']] }
.gitignore => node_modules public
webpack.config.js =>接下

4.配置webpack.config.js 文件

var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";

module.exports={
	// context:path.join(__dirname),
	entry:{
			root:"./dev/js/root.js" ,
			index:"./dev/js/index.js",
			about:"./dev/js/about.js"
		  },//有几个入口文件就写几个
	output:{
		path: path.join(__dirname, 'public'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/public/', //模板、样式、脚本、图片等资源对应的server上的路径,最后生成的html引入的文件相对的路径
        filename: 'js/[name].js',            //每个页面对应的主js的生成配置
        //chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
	},
	devtool:'devtool:debug ? "inline-sourcemap":null,',//直接生成source-map,方便在控制台调试代码,在这里直接设置，在谷歌控制台就会直接生成
	devServer:{
		contentBase: './',  //开启的服务器的根路径，可自动打开当前路径中的index.html文件，你懂的
		// host: '0.0.0.0',
		port:8080,//设置通过webpack-dev-server开启的服务器的端口号
		inline:true,// 设置实时刷新，也就是监听有变化，就刷新页面
		hot:true // 热重载（局部更改，不需要整个刷新页面）
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.less$/,
				loader:'css!less'
			},
			{
				test:/\.js$/,
				loader:'react-hot!babel',//js后缀的不光使用babel编译，也可能使用react-hot编译
				exclude:/node_modules/ //排除node_modules中的js文件
				
			},
			{
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
            	//暴露到全局
            	test:require.resolve('jquery'), 
            	loader: 'expose?$'
            }
		]
	},
	resolve:{//配置，  省略引入文件名后缀，也就是起个别名,import引入的时候可以省略后缀名或者使用别名
		"extensions":['','.js','.css']
	},
	plugins:[
		new webpack.ProvidePlugin({ //加载jq webpack可以这样把jQuery设置为全局
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin()//加上这句就不会报错[HMR] Hot Module Replacement is disabled
	]

}

*然后在命令行运行 webpack-dev-server 就可以进行实时开发了
如果添加的新的文件 比如入口文件，就要先改变下webpack.config.js配置文件，加入入口
再执行webpack命令  再执行webpack-dev-server 进行开发














 













