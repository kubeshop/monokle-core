import { themes } from '@storybook/theming';

export const parameters = {
  darkMode: {
    darkClass: 'lights-out',
    lightClass: 'lights-on',
    current: 'dark',
    dark: { ...themes.dark, appBg: 'black' },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
