# 房产后市场-家装M站

#### 主要技术
* react         整体架构
* redux         数据管理
* es6 + stylus  编写语言
* redskull      构建工具

#### redskull信息

* redskull文档 http://git.lianjia.com/hydra/redskull
* redskull是基于webpackde的构建工具


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