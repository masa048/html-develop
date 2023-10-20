import { defineConfig } from "vite";

import { resolve } from "path";

// HTMLの複数出力を自動化する
//./src配下のファイル一式を取得
import fs from "fs";
const fileNameList = fs.readdirSync(resolve(__dirname, "./src/"));

//htmlファイルのみ抽出
const htmlFileList = fileNameList.filter((file) => /.html$/.test(file));

//build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0, -5)] = resolve(__dirname, "./src/" + file);
  /*
    この形を自動的に作る
    input:{
      index: resolve(__dirname, './src/index.html'),
      list: resolve(__dirname, './src/list.html'),
      hoge: resolve(__dirname, './src/hoge.html'),
    }
  */
}

//HTML上で出し分けたい各ページごとの情報
const pageData = {
  "/index.html": {
    isHome: true,
    title: "Main Page",
  },
  "/list.html": {
    isHome: false,
    title: "List Page",
  },
};

export default defineConfig({
  server: {
    host: true, //IPアドレスを有効化
  },
  base: "./", //相対パスでビルドする
  root: "./src", //開発ディレクトリ設定
  // publicDir: "public/",
  build: {
    outDir: "../dist/08hs/assets/", //出力場所の指定
    rollupOptions: {
      //ファイル出力設定
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          //Webフォントファイルの振り分け
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = "fonts";
          }
          if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          //ビルド時のCSS名を明記してコントロールする
          if (extType === "css") {
            return `css/style.min.css`;
          }
          return `${extType}/[name][extname]`;
        },
        chunkFileNames: "js/[name].min.js",
        entryFileNames: "js/[name].min.js",
      },
      //生成オブジェクトを渡す
      input: inputFiles,
    },
  },
  /*
    プラグインの設定を追加
  */
  plugins: [],
});
