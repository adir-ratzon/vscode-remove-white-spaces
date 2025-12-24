# Remove Empty Spaces Extension

A VS Code extension that removes leading and trailing whitespace from files. Remove lines containing only whitespace, trailing whitespace, or both.

## Features

- Remove lines that contain only whitespace (spaces and tabs), replacing them with empty lines
- Remove trailing whitespace from lines
- Remove both leading and trailing whitespace in one operation
- Configurable keyboard shortcuts:
  - `CMD+Option+L` (Mac) / `Ctrl+Alt+L` (Windows/Linux) - Remove leading whitespace
  - `CMD+Option+T` (Mac) / `Ctrl+Alt+T` (Windows/Linux) - Remove trailing whitespace
  - `CMD+Option+E` (Mac) / `Ctrl+Alt+E` (Windows/Linux) - Remove both
- Command palette support for all commands

## Usage

### Via Keyboard Shortcuts
- Press `CMD+Option+L` to remove leading whitespace (lines with only whitespace)
- Press `CMD+Option+T` to remove trailing whitespace
- Press `CMD+Option+E` to remove both leading and trailing whitespace

### Via Command Palette
1. Open the Command Palette (`CMD+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
2. Type "Remove" and select the desired command:
   - "Remove Leading Spaces"
   - "Remove Trailing Spaces"
   - "Remove Both Leading and Trailing Spaces"
3. Press Enter

## Installation

### From Source
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile the TypeScript code
4. Press `F5` to run the extension in a new Extension Development Host window

### Packaging
To create a `.vsix` file for distribution:
1. Install the `vsce` tool: `npm install -g vsce`
2. Run `vsce package` to create the `.vsix` file
3. Install the extension using `code --install-extension remove-white-spaces-1.0.0.vsix`

## Development

- Run `npm run compile` to compile TypeScript
- Run `npm run watch` to compile in watch mode
- Press `F5` to run the extension in a new Extension Development Host window

## License

See LICENSE file for details.
