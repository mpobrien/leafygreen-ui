# leafyGreen UI Kit

[![Build Status](https://img.shields.io/circleci/project/github/mongodb/leafygreen-ui/master.svg)](https://circleci.com/gh/mongodb/leafygreen-ui)

A set of CSS styles and React components built with design in mind.

## Developer Setup

1. Node >= 6.11.5 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. npm >= 6 installed.

3. Install dependencies and link packages.

   `npm run init`

## Development

1. Start up storybook to see all UI components that exist.

   `npm start`

## Development within an Application

To actively develop `leafygreen-ui` components within an application, the following script will link all `leafygreen-ui` components within your application to the local `leafygreen-ui` repository.

This will allow you to make changes to your local repository of `leafygreen-ui` and see those changes immediately reflected within your running application. This allows you to develop both in isolation (within `leafygreen-ui`) and in the context of your application.

To do this, clone this repository and navigate to the root directory (where `package.json` is located), then run the following:

```
npm run link -- ${PATH_TO_APPLICATION}
```

The script does several things in order:

1. This builds every `leafygreen-ui` component so they are ready to be linked

2. It scans your application for any installed `leafygreen-ui` components in your `node_modules/@leafygreen-ui` folder.
   **NOTE:** If the package is new and unpublished/not installed, you will need to create a directory for the new component within your application inside `node_modules/@leafygreen-ui` before running this command.

3. If any `leafygreen-ui` components are found then the script uses `npm link` to link every `node_modules/@leafygreen-ui` module to your local `leafygreen-ui` repository.

After the script completes, you can make changes directly to the component in your local `leafygreen-ui` repository. Once you do this, run `npm run build` in the root of the `leafygreen-ui` repository and the changes will be visible on your running application.

## Linting

When you run `npm run lint`, we do the following:

- We check to ensure `npm run prettier` has been run so that we have consistently formatted code.
- We run `eslint` to catch any syntax errors, unused variables, and any other easy-to-catch issues.

To lint all files in the repository, run the following:

```
npm run lint
```

## Testing

To run the unit tests for our components, run the following:

```
npm run test
```

## Publishing

1.  Build the compiled version of every UI package. This creates the dist/ folder with the transpiled code ready for distribution.

```
npm run build
```

2. Create a new branch, and make sure to push it. This is where package version updates, and git tags will be pushed from.

3. Publish all packages to NPM using Lerna. In the future, this will also include automatic changelog creation.

```
npm run release
```

4. Push the branch you created, and make a pull request. It will contain all `package.json` changes for your publish.

## Deploy gh-pages

You can deploy a static build of our Storybook site to gh-pages.

1. First be sure you've built a static version of Storybook: `npm run build:storybook`
2. Then deploy to gh-pages: `npm run release:site`

## License

The source files in this repository are made available under the terms of the Apache License, version 2.0.
