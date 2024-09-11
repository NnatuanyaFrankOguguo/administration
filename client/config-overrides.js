const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
    config.resolve = {
        ...config.resolve,  // Ensure existing resolve settings are preserved
        alias: {
            'process/browser': path.resolve(__dirname, 'node_modules/process/browser.js'),
        },
        fallback: {
            ...config.resolve.fallback,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url/'),
            buffer: require.resolve('buffer/'),
            process: require.resolve("process/browser.js"),
            timers: require.resolve("timers-browserify"),
            child_process: false,  // Disable child_process
            fs: false,  // Disable fs
            net: false,  // Disable net
            tls: false,  // Disable tls
            dns: false,  // Disable dns
            zlib: require.resolve('browserify-zlib'),
        },
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
};





// const webpack = require('webpack');
// const path = require('path');

// module.exports = function override(config, env) {
//     config.resolve.fallback = {
//         alias: {
//             'process/browser': path.resolve('c:/hotelmanageproject/client', 'node_modules/process/browser.js'),
//           },
//         ...config.resolve.fallback,
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         assert: require.resolve('assert/'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         url: require.resolve('url/'),
//         buffer: require.resolve('buffer/'),
//         process: require.resolve("process/browser.js"),
//         timers: require.resolve("timers-browserify"),
//         child_process: false,  // Disable child_process
//         fs: false,  // Disable fs
//         net: false,  // Disable net
//         tls: false,  // Disable tls
//         dns: false,  // Disable dns
//         zlib: require.resolve('browserify-zlib'),
       
//     };
//     config.plugins.push(
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     );

//     return config;
// };