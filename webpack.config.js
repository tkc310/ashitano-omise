// refs: https://qiita.com/logue/items/2b744cb1091da83021ab

const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const pageConfig = require('./page_config.json');

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development';

  const pagesHtmlPlugins = pageConfig.pages
    .map(page => {
      const {
        type,
        name,
        id = null,
        params = {}
      } = page;

      // TODO: srcはjson化する
      const src =  type === 'single' ? name : `${name}/${id}/index`;
      const dist = type === 'single' ? name : `${name}/${id}/index`;

      return new HtmlWebpackPlugin({
        template: `./src/${src}.ejs`,
        filename: `./${dist}.html`,
      });
    });

  const tsEmtries = glob.sync('./src/assets/ts/**/*.*')
    .map(file => {
      return file;
    });

  const scssEmtries = glob.sync('./src/assets/scss/**/*.*')
    .map(file => {
      return file;
    });

  const imagesEntries = glob.sync('./src/assets/images/**/*.*')
    .map(file => {
      return file;
    });

  let plugins = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ].concat(pagesHtmlPlugins);

  let devServer = {};
  let optimization = {};
  let devtool = false;

  if (IS_DEVELOPMENT) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // build cache
      new HardSourceWebpackPlugin({
        info: {
          mode: 'none',
          level: 'debug',
        },
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /mini-css-extract-plugin[\\/]dist[\\/]loader/ },
      ]),
    ]);

    devServer = {
      contentBase: path.join(__dirname, 'dist'),
      host: '0.0.0.0',
      port: 1234,
      inline: true,
      hot: true,
      progress: true,
      disableHostCheck: true,
      historyApiFallback: true,
      open: false,
    };

    devtool = 'cheap-eval-source-map';
  }
  else {
    plugins = plugins.concat([
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      }),
    ]);

    optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        }),
        new OptimizeCssAssetsPlugin({})
      ],
      splitChunks: {
        name: true,
        cacheGroups: {
          vendor: {
            // node_modules配下のモジュールをバンドル対象とする
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          }
        }
      }
    };
  }

  return {
    mode: argv.mode,

    entry: tsEmtries
      .concat(imagesEntries)
      .concat(scssEmtries),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: './assets/js/app.js',
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.(scss$)/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve('./dist'),
                hmr: true,
                minimize: IS_DEVELOPMENT,
                // ソースマップを有効にする
                sourceMap: IS_DEVELOPMENT ? 2 : 0,
                importLoaders: 2
              }
            },
            'css-loader',
            {
              loader: "postcss-loader",
              options: {
                sourceMap: IS_DEVELOPMENT,
                plugins: () => {
                  return [
                    require('precss'),
                    require('autoprefixer')({
                      grid: true
                    })
                  ];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                url: false,
                sourceMap: IS_DEVELOPMENT,
                // includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          ]
        },
        {
          test: /\.(otf$|woff$|woff2$|ttf$|eot$|svg$|png$|jpg$|gif$)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (name, _path) => {
                return './assets/images/' + name
              },
              publicPath: (name, _path) => {
                return './assets/images/' + name
              }
            }
          },
        },
        {
          test: /\.ejs$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'ejs-compiled-loader',
              // https://github.com/mde/ejs
              options: {
                'htmlmin': true,
                'htmlminOptions': {
                  removeComments: true
                }
              }
            }
          ]
        },
      ]
    },

    resolve: {
      extensions: ['.json', '.vue', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/assets/'),
        '@ts': path.resolve(__dirname, 'src/assets/ts/'),
        '@scss': path.resolve(__dirname, 'src/assets/scss/'),
        vue: 'vue/dist/vue.js',
      }
    },

    externals: {
      'Vue': true,
      'window': true,
    },

    performance: {
      hints: false
    },

    devtool,
    optimization,
    devServer,
    plugins
  };
};
