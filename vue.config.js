
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

    devServer: {
        // proxy: 'https://www.awebide.com:7001'
        proxy: 'http://localhost:8086'
    },
    
    productionSourceMap: false,
    filenameHashing: false,
    css: {
       
        modules: false,

       
        extract: false,

      
        sourceMap: false
    }
}