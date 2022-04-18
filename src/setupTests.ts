import '@testing-library/jest-dom';
import { setGlobalConfig } from '@storybook/testing-react';
// Storybook's preview file location
import * as globalStorybookConfig from '../.storybook/preview';
import React from 'react';
React.useLayoutEffect = React.useEffect;

setGlobalConfig(globalStorybookConfig);
