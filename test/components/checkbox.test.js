import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from 'components/checkbox';
import Text from 'components/text';
import Check from 'icons/check';
import { colors } from 'styles/color';

describe('Checkbox', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const checkbox = mount(
      <Checkbox
        onClick={onClick}
      />,
    );

    expect(checkbox.at(0).props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const checkbox = shallow(
      <Checkbox label="label" />,
    );

    expect(checkbox.find(Check).length).toBe(1);
    expect(checkbox.find(Text).length).toBe(1);
    expect(checkbox.find(Text).props().children).toBe('label');
  });

  test('Rendering of checked checkbox', () => {
    const checkbox = shallow(
      <Checkbox />,
    );

    expect(checkbox.find(Check).props().style.opacity).toBe(0);
  });

  test('Rendering of hovered checkbox', () => {
    const checkbox = shallow(
      <Checkbox />,
    );

    checkbox.find('button').simulate('mouseenter');

    expect(checkbox.childAt(0).props().style.border).toBe(`1px solid ${colors.gray20}`);
  });

  test('Check change callback for unchecked checkbox', () => {
    const onChange = jest.fn();
    const checkbox = shallow(
      <Checkbox onChange={onChange} />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange).toBeCalledWith(true);
  });

  test('Uncheck change callback for checked checkbox', () => {
    const onChange = jest.fn();
    const checkbox = shallow(
      <Checkbox onChange={onChange} checked />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange).toBeCalledWith(false);
  });

  test('Disabled checkbox', () => {
    const onChange = jest.fn();
    const checkbox = shallow(
      <Checkbox onChange={onChange} disabled />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange.mock.calls.length).toBe(0);
  });
});
