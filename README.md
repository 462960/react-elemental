# react-elemental

[![npm version](https://badge.fury.io/js/react-elemental.svg)](https://badge.fury.io/js/react-elemental)
[![Build Status](https://travis-ci.org/LINKIWI/react-elemental.svg?branch=master)](https://travis-ci.org/LINKIWI/react-elemental)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/react-elemental/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/react-elemental?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/LINKIWI/react-elemental.svg)](https://greenkeeper.io/)

Flat UI component library for React

## Demo and Documentation

See [linkiwi.github.io/react-elemental](https://linkiwi.github.io/react-elemental).

## Components

#### `Alert`

Alerts are used to educate the user about the current state of the application.

![Info alert](https://linkiwi.github.io/react-elemental/images/alert/info.png)

![Success alert](https://linkiwi.github.io/react-elemental/images/alert/success.png)

![Warn alert](https://linkiwi.github.io/react-elemental/images/alert/warn.png)

![Error alert](https://linkiwi.github.io/react-elemental/images/alert/error.png)

#### `Button`

Buttons convey user actionability.

![Button](https://linkiwi.github.io/react-elemental/images/button/beta.png)

#### `Checkbox`

Checkboxes denote opt-in choices controlled by the user.

![Unchecked](https://linkiwi.github.io/react-elemental/images/checkbox/unchecked.png)

![Checked](https://linkiwi.github.io/react-elemental/images/checkbox/checked.png)

#### `Link`

Links are textual prompts for navigation events.

![Primary](https://linkiwi.github.io/react-elemental/images/link/primary.png)

#### `LoadingBar`

Animated component to indicate indeterminate progress.

#### `SelectList`

Select lists are used to allow users to choose one item from a dropdown menu of items.

![Idle](https://linkiwi.github.io/react-elemental/images/select-list/idle.png)

![Error](https://linkiwi.github.io/react-elemental/images/select-list/error.png)

#### `Spacing`

Spacing elements are used as containers to add margins and padding.

#### `Tag`

Tags serve as simple, textual status indicators.

![Primary](https://linkiwi.github.io/react-elemental/images/tag/primary.png)

![Red](https://linkiwi.github.io/react-elemental/images/tag/red.png)

![Green](https://linkiwi.github.io/react-elemental/images/tag/green.png)

![Dismissable](https://linkiwi.github.io/react-elemental/images/tag/dismissable.png)

#### `Text`

Text elements automatically apply font styles and sizes. The Elemental typeface is Karla (primary),
and Source Code Pro (secondary).

![Primary](https://linkiwi.github.io/react-elemental/images/text/primary.png)

![Secondary](https://linkiwi.github.io/react-elemental/images/text/secondary.png)

#### `TextArea`

Allow the user to enter an arbitrary-length text blob.

![Idle](https://linkiwi.github.io/react-elemental/images/text-area/idle.png)

#### `TextField`

Text fields are used for accepting user text input.

![Idle](https://linkiwi.github.io/react-elemental/images/text-field/idle.png)

## Installation and Usage

```bash
$ npm install --save react-elemental
```

```javascript
import { bootstrap } from 'react-elemental';

// As early as possible in your client-side rendering path, invoke the bootstrapping function.
// This will inject some necessary global CSS into the document head and override default
// configuration parameters with those you specify.
bootstrap();

const App = () => {
  ...
};

export default App;
```

```javascript
import { Button, Spacing, Text } from 'react-elemental';

const MyComponent = ({ onClick }) => (
  <Spacing bottom>
    <Text size="epsilon" bold>
      Hello world!
    </Text>
    <Button
      label="Magical button"
      text="Click me"
      onClick={onClick}
    />
  </Spacing>
);

export default MyComponent;
```

## Options

You can optionally invoke the bootstrapping/initialization function with objects specifying
overrides for global constants used by `react-elemental`:

```javascript
import { bootstrap } from 'react-elemental';

bootstrap(colorOpts);
```

All respected override options are as follows:

#### `colorOpts`

|Key|Value|Example|
|-|-|-|
|`primary`|Hex color code string for the desired primary color.|`'#3eb8f0'`|
|`primaryLight`|Hex color code string for the desired primary light color.|`'#d6ecf5'`|
|`primaryDark`|Hex color code string for the desired primary dark color.|`'#036996'`|

## Guiding Principles

* Only inline styles, and no CSS (or at least as little CSS as possible)
* Minimalistic, simple design language