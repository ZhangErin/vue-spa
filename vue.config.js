
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
    //     proxy: 'http://localhost:8086'
    // },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 7007,
        https: false,
        hotOnly: false,
        proxy: 'https://www.awebide.com:7001',
        before: app => { }
    },
    productionSourceMap: false,
    filenameHashing: false,
    css: {
       
        modules: false,

       
        extract: false,

      
        sourceMap: false
    }
}