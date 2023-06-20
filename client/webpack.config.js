const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
  
// TODO: Add CSS loaders and babel to webpack.


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack html file and injects our bundles. 
      new HtmlWebpackPlugin({
       
       template: './index.html', 

       title: 'JATE Text Editor'
     }),
    
 
     new InjectManifest({
       swSrc: './src-sw.js',
       swDest: 'src-sw.js',
     }),
 
     // Creates a manifest.json file.
     new WebpackPwaManifest({
       fingerprints: false,
       inject: true,
       name: 'Just another text editor',
       short_name: 'JATE',
       description: 'Just another text editor!',
       background_color: '#225ca3',
       theme_color: '#225ca3',
       start_url: '/',
       
     }),
     ],
 

    module: {
      rules: [
        {
          
          test: /\.css$/i,
          
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
              }
            },
      },
      {
        test:  /\.(png|svg|ico|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        
      }

      ],
    },
  };
};
