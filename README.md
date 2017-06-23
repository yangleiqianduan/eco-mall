# 房产后市场-家装M站

#### 主要技术
* react         整体架构
* redux         数据管理
* es6 + stylus  编写语言
* redskull      构建工具

#### redskull信息

* redskull文档 http://git.lianjia.com/hydra/redskull
* redskull是基于webpack的react项目构建及开发的脚手架


#### 运行流程
    <!--安装构建工具-->
    curl http://git.lianjia.com/hydra/redskull/raw/master/script/install.sh -L -o - | sh    
    <!--安装依赖 -->
	npm install
	<!--检查构建工具是否有升级-->
	redskull update
	<!--安装构建工具依赖-->
	redskull install
	<!--启动开发服务-->
	redskull start


#### 代码结构

```
|- dist 构建后的代码
|- src 源码
|--- client 客户端方法
|------ action 定义所有action
|------ common 公共方法及样式
|------ constants 常量(api配置及路由配置)
|------ containers 按页面逻辑划分的各个页面
|------ reducers 按页面逻辑划分的reducer
|------ store 初始store处理(注入一些中间件)
|------ templates 页面模板(开发时使用，线上使用后端模板)
|------ index.js 入口文件
|-config 通用配置(mock数据等)
|-webpack webpack配置(复写redskull的webpack配置)
|-online.sh 上线部署执行脚本
|-package.json
```


#### 关于构建
构建产出如下

```
|- dist
|--- css
|--- img
|--- js
|--- index.html
```

其中index.html可作为模板放在后端，其余静态资源可部署到cdn(需要再构建是加入publicPath，online.sh中的第三个参数)，js依据各页面被拆成很多包(分包优化)，基础通用库(react, react-redux等)被打包到common.min.js中，打包产出的index.js是入口文件，同时负责引入其余各页面包，各页面js包打出时是带着md5版本号的，index.js和common.min.js没有，后端模板需引入index.js和common.min.js并附带随机版本号(防止缓存)，同时模板需引入其他外部sdk(如微信sdk)，外部sdk没有打在业务包里面。具体打包配置在webpack下(dev是开发环境配置，prod是构建打包配置)。