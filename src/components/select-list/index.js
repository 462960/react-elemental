import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import SelectListItem from 'components/select-list/select-list-item';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import noop from 'util/noop';

// Generic, (hopefully) unique key reserved for the placeholder item in the select list.
const PLACEHOLDER_VALUE = 'select-list-placeholder-item-value';

// Mapping of keys to event key codes.
const KEY_CODES = {
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40,
};

/**
 * Some cleverness is required to make Javascript's modulo operator return a nonnegative number for
 * modulo operations on negative integers.
 *
 * @param {number} num Number for which a modulo operation should be performed.
 * @param {number} modulus Modulus integer.
 */
const modulo = (num, modulus) => ((num % modulus) + modulus) % modulus;

/**
 * Dropdown menu component.
 */
export default class SelectList extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.number,
    error: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Select an item...',
    options: [],
    width: '100%',
    height: null,
    error: null,
    style: {},
    onChange: noop,
  };

  constructor(props) {
    super(props);

    const { placeholder } = this.props;

    this.state = {
      isExpanded: false,
      isFocused: false,
      isHovered: false,
      selectedOption: {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
      },
      highlightedIdx: null,
    };
  }

  setDropdownRef = (ref) => {
    this.dropdown = ref;
  };

  setContainerRef = (ref) => {
    this.container = ref;
  };

  handleChange = (selectedOption) => () => {
    this.props.onChange(selectedOption.value);
    this.setState({ selectedOption, isExpanded: false });
    this.container.focus();
  };

  handleHoverStateChange = (isHovered) => () => this.setState({ isHovered });

  handleFocus = () => this.setState({ isFocused: true });

  // The dropdown will be blurred on any mouse event that isn't on the select item placeholder.
  // In order to allow the onClick event of the dropdown items to fire instead of triggering the
  // normal onBlur behavior, only hide the dropdown items if the click target is outside of the
  // dropdown's containing DOM node.
  handleBlur = (evt) => {
    if (evt && this.dropdown.contains(evt.relatedTarget)) {
      return;
    }

    this.setState({
      isExpanded: false,
      isFocused: false,
      highlightedIdx: null,
    });
  };

  handleKeyDown = (evt) => {
    const { keyCode } = evt;
    const { options } = this.props;

    const withDefaultPrevented = (func) => () => {
      evt.preventDefault();
      return func();
    };

    const selectHandler = () => {
      const { highlightedIdx, isExpanded } = this.state;

      if (highlightedIdx === null || !isExpanded) {
        return this.toggleExpand();
      }

      return this.handleChange(options[modulo(highlightedIdx, options.length)])();
    };

    const escapeHandler = () => this.handleBlur();

    const upHandler = () => this.setState(({ highlightedIdx }) => ({
      isExpanded: true,
      highlightedIdx: highlightedIdx === null ? -1 : highlightedIdx - 1,
    }));

    const downHandler = () => this.setState(({ highlightedIdx }) => ({
      isExpanded: true,
      highlightedIdx: highlightedIdx === null ? 0 : highlightedIdx + 1,
    }));

    const characterSearchHandler = () => {
      const char = String.fromCharCode(keyCode);
      const isNonControlCharacter =
        // Number keys
        (keyCode > 47 && keyCode < 58) ||
        // Alphabetic keys
        (keyCode > 64 && keyCode < 91);
      const matchingOptionIdx = options
        .findIndex((option) => option.label.toLowerCase().startsWith(char.toLowerCase()));

      // Don't attempt to perform a character search on pressed control characters
      if (!isNonControlCharacter) {
        return null;
      }

      return this.setState(({ highlightedIdx }) => ({
        isExpanded: true,
        highlightedIdx: (matchingOptionIdx >= 0) ? matchingOptionIdx : highlightedIdx,
      }));
    };

    const keyHandlers = {
      [KEY_CODES.SPACE]: withDefaultPrevented(selectHandler),
      [KEY_CODES.ENTER]: withDefaultPrevented(selectHandler),
      [KEY_CODES.ESC]: withDefaultPrevented(escapeHandler),
      [KEY_CODES.UP]: withDefaultPrevented(upHandler),
      [KEY_CODES.DOWN]: withDefaultPrevented(downHandler),
    };

    return (keyHandlers[keyCode] || characterSearchHandler)();
  };

  toggleExpand = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  render() {
    const {
      options,
      width,
      height,
      error,
      style: overrides,
      ...proxyProps
    } = this.props;
    const { isExpanded, isFocused, isHovered, selectedOption, highlightedIdx } = this.state;

    const dropdownElementsStyle = {
      position: 'absolute',
      zIndex: 2,
      ...height && {
        height,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    };

    const outlineColor = (() => {
      if (isExpanded) {
        return error ? colors.red : colors.primary;
      }
      if (isFocused) {
        return error ? colors.red : colors.gray35;
      }
      if (isHovered) {
        return error ? new Color(colors.red).lighten(0.7).string() : colors.gray20;
      }
      return error ? colors.redLight : colors.gray10;
    })();

    return (
      <div
        ref={this.setContainerRef}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={0}
        style={{ display: 'inline-block', ...overrides }}
        {...proxyProps}
      >
        <SelectListPlaceholder
          label={selectedOption.label}
          color={outlineColor}
          arrowDirection={isExpanded ? 'up' : 'down'}
          width={width}
          error={error}
          onClick={this.toggleExpand}
          onHoverStateChange={this.handleHoverStateChange}
        />

        <div ref={this.setDropdownRef}>
          {isExpanded && (
            <div
              style={dropdownElementsStyle}
              tabIndex={-1}
            >
              {options.map((option, idx) => (
                <SelectListItem
                  key={option.value}
                  label={option.label}
                  width={width}
                  isSelected={
                    (highlightedIdx !== null) && modulo(highlightedIdx, options.length) === idx
                  }
                  onClick={this.handleChange(option)}
                />
              ))}
            </div>
          )}
        </div>

        {error && (
          <Spacing size="micro" top>
            <Text color="red" size="lambda" bold>
              {error}
            </Text>
          </Spacing>
        )}
      </div>
    );
  }
}
