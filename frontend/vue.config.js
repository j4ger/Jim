module.exports = {
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/Jim/docs/" : "/",
  outputDir: "../docs",
};
