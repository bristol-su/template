const path = require("path");
const development = process.env.NODE_ENV !== 'production';
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    // Set the mode based on the NODE_ENV environment variable
    mode: development ? 'development' : 'production',

    // Optimization Information
    optimization: {
        // Only minimize for production
        minimize: !development,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

    // Entry points
    entry: {
        // Assets for the majority of the site
        module: [
            './resources/js/module.js',
            './resources/sass/module.scss'
        ],
    },

    // Outputs
    output: {
        // Specify the public path
        path: path.resolve(__dirname, './public/modules/template'),
        // Specify where the js should be saved. Give it a chunkhash if in production to allow caching
        filename: development ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    },
    module: {
        rules: [
            // Compile JS with babel so we can use modern JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

            // Compile SASS. Sass must use the indented syntax
            {
                test: /\.sass$/,
                // Convert sass to css, load the css, extract it into its own file and load vue styles
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                // publicPath is the relative path of the resource to the context
                                // e.g. for ./css/admin/main.css the publicPath will be ../../
                                // while for ./css/main.css the publicPath will be ../
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        }
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true
                            },
                        },
                    }
                ]
            },

            // Compile SCSS. Scss must NOT use the indented syntax
            {
                test: /\.scss$/,
                // Convert sass to css, load the css, extract it into its own file and load vue styles
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                // publicPath is the relative path of the resource to the context
                                // e.g. for ./css/admin/main.css the publicPath will be ../../
                                // while for ./css/main.css the publicPath will be ../
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        }
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: false
                            },
                        },
                    }
                ]
            },

            // Loader for css.
            {
                test: /\.css$/,
                // Load the css, and extract it to its own file
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },

            // Loader for .vue files
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins: [
        // Clean old compiled files before new ones are compiles
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['js/*', 'css/*'],
        }),

        // Load Vue
        new VueLoaderPlugin(),

        // Load Vuetify through the loader
        new VuetifyLoaderPlugin(),

        // Save the webpack asset manifest
        new WebpackAssetsManifest({
            writeToDisk: true
        }),


        // Extract css to its own file
        new MiniCssExtractPlugin({
            filename: development ? 'css/[name].css' : 'css/[name].[chunkhash].css',
            chunkFilename: development ? 'css/[id].css' : 'css/[id].[chunkhash].css',
        }),

        // Notify on completed build. Notify on error in production, or always in development
        new WebpackNotifierPlugin({
            title: 'Template Module',
            alwaysNotify: development
        })
    ],

    externals : {
        vuetify : 'Vuetify',
        vue : 'Vue'
    },

    resolve: {
        // Define aliases
        alias: {
            // Holds all stand-alone components
            // 'Components': path.resolve(__dirname, 'resources/js/components'),
            // Holds all pages
            // 'Pages': path.resolve(__dirname, 'resources/js/pages'),
            // Holds all mixins
            // 'Mixins': path.resolve(__dirname, 'resources/js/mixins'),
            // Base path
            '@': path.resolve(__dirname, 'resources/js'),
            // Set up vue to contain the template compiler
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    stats: {
        // Hide stats about child output
        children: false
    }
}
