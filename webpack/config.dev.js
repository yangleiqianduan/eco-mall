var path = require('path')
var fs = require('fs')

const base = path.join(__dirname, '..')
const modules = `${base}/node_modules`
let internalModules = fs.readdirSync(modules)
    .filter(folder => !!~folder.indexOf('fe-'))
.map(folder => `${modules}/${folder}`)

module.exports = function (webpackConfig, redSkull) {
  // const linkPath = path.join(redSkull.libraries, 'link')
  webpackConfig.module.loaders.splice(4, 1)

  webpackConfig.entry['common'] = ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'immutable', 'history', 'react-css-modules', 'react-router', 'react-router-dom']
  webpackConfig.output['filename'] = 'js/[name].js'
  webpackConfig.output['chunkFilename'] = 'js/[name].[hash].js'
  webpackConfig.plugins[1].filename = 'css/[name].css'

  webpackConfig.module.loaders.push({
    test: /\.styl$/,
    loader: 'style!css!stylus',
    include: path.join(redSkull.src, 'common')
  })
  webpackConfig.module.loaders.push({
    test: /\.styl$/,
    loader: 'style!css?modules!stylus',
    include: redSkull.src,
    exclude: path.join(redSkull.src, 'common')
  })
  webpackConfig.module.loaders.push({
    test: /\.styl$/,
    loader: 'style!css?modules!stylus',
    include: internalModules
  })

  // webpackConfig.module.loaders.push({
  //   test: /\.css/,
  //   loader: 'style!css',
  //   include: internalModules,
  //   exclude: modules
  // })
  // webpackConfig.module.loaders.push({
  //   test: /\.css/,
  //   loader: 'style!css',
  //   include: modules,
  //   exclude: redSkull.src
  // })
  webpackConfig.module.loaders.push({
    test: /\.js/,
    loader: 'babel-loader',
    include: internalModules,
    query: {
      'presets': [
        path.join(redSkull.redSkullRoot, 'node_modules', 'babel-preset-fe')
      ],
      'compact': true,
      cacheDirectory: true
    }
  })

  // webpackConfig.resolve.alias.react = path.join(linkPath, 'node_modules', 'react')
  // webpackConfig.resolve.alias['react-dom'] = path.join(linkPath, 'node_modules', 'react-dom')
  // webpackConfig.resolve.modules.push(fs.realpathSync(path.join(linkPath, 'themes', 'red')))

  // webpackConfig.plugins.push(envFile && new CopyWebpackPlugin([{
  //   from: path.join(`${base}/src`, 'client', envFile)
  // }]))

  return webpackConfig
}
