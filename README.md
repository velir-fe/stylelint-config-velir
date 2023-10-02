# Velir stylelint preset

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

## Description

[stylelint](https://stylelint.io/) and [prettier](https://prettier.io/) are used to ensure correct and well-formatted css.

## Installation

Run from the root of your project:

```

$ npm install
$ yarn

```

## Usage

In the project [`.stylelintrc.json`](.stylelintrc.json) file add the `@velir-fe/stylelint-plugin-velir-presets` to the plugins.

```
...
"plugins":["@velir-fe/stylelint-plugin-velir-presets"],
...
```

A preset to extend from should also be provided to avoid errors.

```
...
"extends":["stylelint-config-prettier"],
...
```

Any overrides desired for specific projects can be done by adding to rules.

## Development and testing

Changes to the stylelint config can be added in the `index.js` file.

In order to use the updated package in a project run `npm link` from the root directory and `npm link @velir-fe/stylelint-plugin-velir-presets` in the root of the project you want to use the preset in. A `test` directory has been provided for convenience.

Yarn link and npm link work slightly differently: you can use yarn for development but you do need to use npm to link packages.

```

$ npm link
$ cd test
$ npm link @velir-fe/stylelint-plugin-velir-presets
$ yarn stylelint (--fix)

```
