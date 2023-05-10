module.exports = {
    // ...,
    externals: {
      // only define the dependencies you are NOT using as externals!
      canvg: "canvg",
      html2canvas: "html2canvas",
      dompurify: "dompurify"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          parser: {
            // add this line to specify the sourceType
            "javascript": { "sourceType": "module" },
          },
        },
      ],
    }
    
  };