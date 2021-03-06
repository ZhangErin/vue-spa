var fs = require('fs');
var path = require('path');

module.exports = {
    baseUrl: './',
    // devServer: {
                
    //     proxy: {
    //          '/': {
    //              ws: false, 
    //             target: 'https://www.awebide.com:7001',
    //              secure: false,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/': ''
    //             }
    //          }
    //     }
    // },

    // devServer: {
    //     // proxy: 'https://www.awebide.com:7001'
    //     proxy: 'http://127.0.0.1:7008'
    // },
    devServer: {
          open: true,
          host: '0.0.0.0',
          port: 7007,
          https: true,
          disableHostCheck: true,
          hotOnly: false,
          proxy: 'http://localhost:7008'
         //proxy: 'https://www.awebide.com:7001'
    },
    productionSourceMap: false,
    filenameHashing: false,
    css: {
       
        modules: false,

       
        extract: false,

      
        sourceMap: false
    }
}