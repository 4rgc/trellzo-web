import '@testing-library/jest-dom';
import { setProjectAnnotations } from '@storybook/testing-react';
// Storybook's preview file location
import * as globalStorybookConfig from '../.storybook/preview';
import React from 'react';
React.useLayoutEffect = React.useEffect;

setProjectAnnotations(globalStorybookConfig);
