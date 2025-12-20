# Remove Leading Spaces Extension

A VS Code extension that removes lines containing only whitespace (spaces and tabs), replacing them with empty lines.

## Features

- Remove lines that contain only whitespace (spaces and tabs), replacing them with empty lines
- Configurable keyboard shortcut: `CMD+Option+L` (Mac) / `Ctrl+Alt+L` (Windows/Linux)
- Command palette support: "Remove Leading Spaces"

## Usage

### Via Keyboard Shortcut
- Press `CMD+Option+L` (Mac) or `Ctrl+Alt+L` (Windows/Linux) while editing a file

### Via Command Palette
1. Open the Command Palette (`CMD+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
2. Type "Remove Leading Spaces"
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
3. Install the extension using `code --install-extension remove-leading-spaces-1.0.0.vsix`

## Development

- Run `npm run compile` to compile TypeScript
- Run `npm run watch` to compile in watch mode
- Press `F5` to run the extension in a new Extension Development Host window

## License

See LICENSE file for details.
