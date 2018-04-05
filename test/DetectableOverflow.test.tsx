import * as React from 'react';
import * as enzyme from 'enzyme';
import DetectableOverflow from '../src';

describe('DetectableOverflow', () => {
  it('renders a `div` element.', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow>a</DetectableOverflow>);
    expect(wrapper.find('p').exists()).toBeFalsy();
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('renders an element whose type is `tag` argument.', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow tag="abc">a</DetectableOverflow>);
    expect(wrapper.find('div').exists()).toBeFalsy();
    expect(wrapper.find('abc').exists()).toBeTruthy();
  });

  it('renders a child element.', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow>abc</DetectableOverflow>);
    expect(wrapper.find('div').childAt(1).text()).toEqual('abc');
  });
});
