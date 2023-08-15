const path = require('path');

module.exports = {
    entry: './src/index.ts',  // Arquivo de entrada TypeScript
    output: {
        filename: 'bundle.js',  // Nome do arquivo de saída
        path: path.resolve(__dirname, 'wwwroot/dist')  // Pasta de saída
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
};
