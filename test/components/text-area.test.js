import React from 'react';
import { mount } from 'enzyme';
import Text from 'components/text';
import TextArea from 'components/text-area';
import { colors } from 'styles/color';

describe('Text area', () => {
  test('Accepts proxy props', () => {
    const textArea = mount(
      <TextArea rows={40} />,
    );

    expect(textArea.find('textarea').props().rows).toBe(40);
  });

  test('Error message', () => {
    const textArea = mount(
      <TextArea
        error="error"
      />,
    );

    expect(textArea.find(Text).length).toBe(1);
    expect(textArea.find(Text).at(0).children().text()).toBe('error');
  });

  test('Width and height are set via style', () => {
    const textArea = mount(
      <TextArea
        style={{
          height: '10px',
          width: '20px',
        }}
      />,
    );

    expect(textArea.find('textarea').props().style.height).toBe('10px');
    expect(textArea.find('textarea').props().style.width).toBe('20px');
  });

  test('Hover style', () => {
    const textArea = mount(
      <TextArea />,
    );

    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
    textArea.find('textarea').simulate('mouseover');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray20}`);
    textArea.find('textarea').simulate('mouseout');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
  });

  test('Focus style', () => {
    const textArea = mount(
      <TextArea />,
    );

    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
    textArea.find('textarea').simulate('focus');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.primary}`);
    textArea.find('textarea').simulate('blur');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
  });
});
