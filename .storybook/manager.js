// .storybook/manager.js

import { addons } from '@storybook/addons';
import canvasTheme from './canvasTheme';

addons.setConfig({
  theme: canvasTheme,
  panelPosition: 'right',
  enableShortcuts: true,
});