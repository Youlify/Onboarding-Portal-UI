const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      "@": pathResolve("src"),
      "@pages": pathResolve("src/Pages"),
      "@components": pathResolve("/src/Components"),
      "@common": pathResolve("src/Common"),
      "@router": pathResolve("src/Router"),
      "@hooks": pathResolve("src/Hooks"),
      "@provider": pathResolve("/src/Provider"),
      "@service": pathResolve("src/Service"),
      "@utils": pathResolve("src/Utils"),
      "@styles": pathResolve("src/Styles"),
      "@types": pathResolve("src/Types"),
      "@assets": pathResolve("src/Assets"),
    },
  },
  plugins: [{ plugin: CracoAntDesignPlugin }],
};
