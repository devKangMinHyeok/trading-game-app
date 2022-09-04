const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  // const config = await createExpoWebpackConfigAsync(env, argv);
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@ptomasroos/react-native-multi-slider",
        ],
      },
    },
    argv
  );
  // resolve victory-native as victory for the Web app
  config.resolve.alias["victory-native"] = "victory";

  return config;
};
