import React from 'react';
import {shallow, mount} from 'enzyme';

import GameStatusDisplay from './game-status-display';

describe('<GameStatusDisplay />', () => {
    it('Renders without crashing', () => {
        shallow(<GameStatusDisplay />);
    });
});