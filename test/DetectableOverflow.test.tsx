import * as React from 'react';
import * as enzyme from 'enzyme';
import DetectableOverflow from '../src';

describe('DetectableOverflow', () => {
  it('renders a `div` element.', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow value="a"/>);
    expect(wrapper.find('p').exists()).toBeFalsy();
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('renders an element whose type is `tag` argument.', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow value="a" tag="abc"/>);
    expect(wrapper.find('div').exists()).toBeFalsy();
    expect(wrapper.find('abc').exists()).toBeTruthy();
  });

  it('renders `value` argument as a child', () => {
    const wrapper = enzyme.shallow(<DetectableOverflow value="abc"/>);
    expect(wrapper.find('div').childAt(1).text()).toEqual('abc');
  });
});
