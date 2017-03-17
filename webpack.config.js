var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";

module.exports={
	// context:path.join(__dirname),
	entry:{
			root:"./dev/js/root.js" ,
			index:"./dev/js/index.js"
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
