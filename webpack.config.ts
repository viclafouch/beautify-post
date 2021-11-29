import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import open from 'open'
import * as path from 'path'
import webpack from 'webpack'

import packageJson from './package.json'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const browsers = require('./browsers')

// UNCOMMENT ME TO ANALYSE BUNDLE
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const currentBrowser = process.env.TARGET
const currentAppVersion = process.env.npm_package_version

if (!currentBrowser || !browsers.includes(currentBrowser)) {
  throw new Error(
    `Please specify the TARGET environment. \n Possible values: ${browsers}`
  )
} else {
  // eslint-disable-next-line no-console
  console.info(`\x1b[1;32mLinkedIn-Formatter@${currentAppVersion}\x1b[m`)
  // eslint-disable-next-line no-console
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
        apply: (compiler: webpack.Compiler): void => {
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
            transform(content): Buffer {
              const manifestContent = JSON.parse(content.toString())
              return Buffer.from(
                JSON.stringify(
                  {
                    description: packageJson.description,
                    version: currentAppVersion,
                    ...manifestContent
                  },
                  null,
                  4
                )
              )
            }
          },
          {
            from: path.join(__dirname, 'logo/images'),
            to: outputPath
          },
          {
            from: path.join(__dirname, 'options'),
            to: path.join(outputPath, 'options'),
            force: true,
            transform(content, currentPath): Buffer {
              if (currentPath.endsWith('popup.html')) {
                let htmlString = content.toString()
                htmlString = htmlString.replace(
                  '{{version}}',
                  String(currentAppVersion)
                )
                htmlString = htmlString.replace(
                  '{{homepage}}',
                  packageJson.homepage
                )
                return Buffer.from(htmlString)
              }
              return content
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
