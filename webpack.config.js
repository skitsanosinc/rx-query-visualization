const path = require('path');

module.exports = (/*env, options*/) =>
{
    return {
        devtool: false,

        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    };
};
