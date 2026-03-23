import path from 'node:path'
import { fileURLToPath } from 'node:url'

import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { WebpackAssetsManifest } from 'webpack-assets-manifest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default (_, argv) => {
  const isProd = argv.mode === 'production'

  return {
    entry: {
      application: [
        path.resolve(__dirname, 'src/client/javascripts/application.js'),
        path.resolve(__dirname, 'src/client/stylesheets/application.scss')
      ]
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: isProd ? '[name].[contenthash:7].min.js' : '[name].js',
      clean: true
    },
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: isProd ? ['cssnano'] : []
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: 'sass',
                sassOptions: {
                  loadPaths: [path.resolve(__dirname)],
                  quietDeps: true,
                  silenceDeprecations: ['import']
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash:7].min.css' : '[name].css'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              'node_modules/govuk-frontend/dist/govuk/assets'
            ),
            to: path.resolve(__dirname, 'public/assets')
          }
        ]
      }),
      new WebpackAssetsManifest({
        output: 'assets-manifest.json',
        writeToDisk: true
      })
    ],
    optimization: {
      minimizer: isProd ? [new TerserPlugin(), '...'] : []
    }
  }
}
