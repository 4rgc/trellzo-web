module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  staticDirs: ['../src/test/assets', '../public'],
  docs: {
    autodocs: true
  }
};