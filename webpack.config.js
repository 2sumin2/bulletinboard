module.exports = {
    devServer: {
        contentBase: path.resolve("./build"),
        index: "index.html",
        // 클라이언트 포트는 3000
        port: 3000,
        proxy: {
            '/account': {
                target: 'http://localhost:4000/',
                changeOrigin: true,
            }
        }
    },
};