/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-11-29 21:50:15
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-02 10:36:27
 * @FilePath: \oms-platform-app\config\index.js
 * @Description:
 */
import { loadEnv } from '@vue3-oop/taro-plugin'
import NutUIResolver from '@nutui/auto-import-resolver'
import Components from 'unplugin-vue-components/webpack'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss'

const env = loadEnv()
const path = require('path')
const isH5 = process.env.TARO_ENV === 'h5'
const isWatch = process.env.VUE_APP_WATCH === 'true'
/**
 *
 * @type {import('@tarojs/taro/types/compile').IProjectConfig}
 */
const config = {
    projectName: 'oms-platform-app',
    date: '2023-11-30',
    framework: 'vue3',
    designWidth(input) {
        if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
            return 375
        }
        return 750
    },
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1,
    },
    alias: {
        '@': path.resolve(__dirname, '..', 'src'),
        '@/components': path.resolve(__dirname, '..', 'src/components'),
        '@/styles': path.resolve(__dirname, '..', 'src/styles'),
        '@/stores': path.resolve(__dirname, '..', 'src/stores'),
        '@/utils': path.resolve(__dirname, '..', 'src/utils'),
        '@/assets': path.resolve(__dirname, '..', 'src/assets'),
        '@/package': path.resolve(__dirname, '..', 'package.json'),
        '@/project': path.resolve(__dirname, '..', 'project.config.json'),
    },
    sourceRoot: 'src',
    outputRoot: isH5 ? `dist/h5` : `dist/weapp`,
    compiler: {
        type: 'webpack5',
        prebundle: {
            enable: false,
        },
    },
    cache: {
        // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
        enable: false,
    },
    plugins: [
        '@tarojs/plugin-html',
        '@tarojs/plugin-http',
        '@vue3-oop/taro-plugin',
        isWatch ? '@tarojs/plugin-mock' : undefined,
    ].filter(Boolean),
    copy: {
        patterns: [
            isH5
                ? {
                      from: 'public/',
                      to: 'dist/',
                      ignore: ['**/index.html'],
                  }
                : undefined,
        ].filter(Boolean),
    },
    sass: {
        resource: [path.resolve(__dirname, '..', 'src/theme/theme.scss')]
    },
    mini: {
        optimizeMainPackage: {
            enable: true,
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                    // 包含 `nut-` 的类名选择器中的 px 单位不会被解析
                    selectorBlackList: ['nut-'],
                },
            },
            url: {
                enable: true,
                config: {
                    // 设定转换尺寸上限
                    limit: 1024,
                },
            },
            cssModules: {
                // 默认为 false，如需使用 css modules 功能，则设为 true
                enable: true,
                config: {
                    // 转换模式，取值为 global/module
                    namingPattern: 'module',
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
        webpackChain(chain, webpack) {
            chain.plugin('unplugin-vue-components').use(
                Components({
                    resolvers: [NutUIResolver({ taro: true })],
                }),
            )
            chain.merge({
                plugin: {
                    install: {
                        plugin: UnifiedWebpackPluginV5,
                        args: [
                            {
                                appType: 'taro',
                                // 注意这一行(不传默认 react)
                                framework: 'vue3', // 'vue2' / 'vue3'
                                disabled: isH5,
                                injectAdditionalCssVarScope: true,
                            },
                        ],
                    },
                },
            })
        },
    },
    h5: {
        webpackChain(chain) {
            chain.plugin('unplugin-vue-components').use(
                Components({
                    resolvers: [NutUIResolver({ taro: true })],
                }),
            )
        },
        useDeprecatedAdapterComponent: true,
        publicPath: process.env.VUE_APP_BASE_URL,
        router: {
            basename: process.env.VUE_APP_BASE_ROUTE.replace(/\/$/, ''),
            mode: 'browser',
        },
        publicPath: '/',
        staticDirectory: 'static',
        esnextModules: ['nutui-taro', 'icons-vue-taro'],
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: true,
                config: {
                    namingPattern: 'module',
                    localsConvention: 'camelCaseOnly',
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
        devServer: {
            open: false,
        },
    },
}
module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
