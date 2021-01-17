import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: { stream: require.resolve('stream-browserify'), buffer: require.resolve('buffer/') },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9090,
    },
};

export default config;
