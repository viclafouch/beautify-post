import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import browsers from './browsers'
import * as path from 'path'
import open from 'open'

// UNCOMMENT ME TO ANALYSE BUNDLE
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const currentBrowser = process.env.TARGET

if (!currentBrowser || !browsers.includes(currentBrowser)) {
  throw new Error(
    `Please specify the TARGET environment. \n Possible values: ${browsers}`
  )
} else {
  console.info(
    `\x1b[1;32mLinkedIn-Formatter@${process.env.npm_package_version}\x1b[m`
  )
  console.info(`\x1b[1;32mBuilding for ${currentBrowser}...\x1b[m`)
}

const outputPath = path.join(__dirname, 'build', currentBrowser)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createConfig = (env: any, argv: any): webpack.Configuration => {
  const IS_DEV = argv.mode === 'development'
  const config = {
    watch: IS_DEV,
    devtool: false as webpack.Configuration['devtool'],
    entry: './src/main.ts',
    output: {
      filename: '[name].bundle.js',
      path: outputPath
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      // UNCOMMENT ME TO ANALYSE BUNDLE
      // new BundleAnalyzerPlugin(),
      {
        apply: (compiler: webpack.Compiler) => {
          compiler.hooks.afterResolvers.tap('open', () => {
            if (IS_DEV) {
              open('https://www.linkedin.com')
            }
          })
        }
      },
      new webpack.ProgressPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'manifest.json'),
            to: outputPath,
            force: true,
            transform: function (content) {
              const manifestContent = JSON.parse(content.toString())
              return Buffer.from(
                JSON.stringify(
                  {
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version,
                    ...manifestContent
                  },
                  null,
                  4
                )
              )
            }
          }
        ]
      })
    ]
  }
  if (!IS_DEV && config.plugins) {
    config.plugins.push(new CleanWebpackPlugin())
  }
  return config
}

export default createConfig
