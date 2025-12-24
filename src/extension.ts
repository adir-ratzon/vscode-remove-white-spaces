import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const removeLeadingSpaces = vscode.commands.registerCommand('removeWhiteSpaces.removeLeading', () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const document = editor.document;
    const lineCount = document.lineCount;
    const linesToReplace: { range: vscode.Range }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const line = document.lineAt(i);
      const lineText = line.text;

      if (/^\s+$/.test(lineText)) {
        linesToReplace.push({ range: line.range });
      }
    }

    if (linesToReplace.length === 0) {
      vscode.window.showInformationMessage('No empty lines with whitespace found');
      return;
    }

    editor.edit(editBuilder => {
      for (let i = linesToReplace.length - 1; i >= 0; i--) {
        editBuilder.replace(linesToReplace[i].range, '');
      }
    }).then(success => {
      if (success) {
        vscode.window.showInformationMessage(`Replaced ${linesToReplace.length} whitespace-only line(s) with empty lines`);
      } else {
        vscode.window.showErrorMessage('Failed to remove whitespace');
      }
    });
  });

  const removeTrailingSpaces = vscode.commands.registerCommand('removeWhiteSpaces.removeTrailing', () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const document = editor.document;
    const lineCount = document.lineCount;
    const linesToReplace: { range: vscode.Range; newText: string }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const line = document.lineAt(i);
      const lineText = line.text;

      if (/\s+$/.test(lineText)) {
        const trimmedText = lineText.replace(/\s+$/, '');
        const startPos = new vscode.Position(i, trimmedText.length);
        const endPos = new vscode.Position(i, lineText.length);
        linesToReplace.push({
          range: new vscode.Range(startPos, endPos),
          newText: ''
        });
      }
    }

    if (linesToReplace.length === 0) {
      vscode.window.showInformationMessage('No trailing whitespace found');
      return;
    }

    editor.edit(editBuilder => {
      for (let i = linesToReplace.length - 1; i >= 0; i--) {
        editBuilder.replace(linesToReplace[i].range, linesToReplace[i].newText);
      }
    }).then(success => {
      if (success) {
        vscode.window.showInformationMessage(`Removed trailing whitespace from ${linesToReplace.length} line(s)`);
      } else {
        vscode.window.showErrorMessage('Failed to remove trailing whitespace');
      }
    });
  });

  const removeBothSpaces = vscode.commands.registerCommand('removeWhiteSpaces.removeBoth', () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const document = editor.document;
    const lineCount = document.lineCount;
    const leadingReplacements: { range: vscode.Range }[] = [];
    const trailingReplacements: { range: vscode.Range; newText: string }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const line = document.lineAt(i);
      const lineText = line.text;

      if (/^\s+$/.test(lineText)) {
        leadingReplacements.push({ range: line.range });
      } else if (/\s+$/.test(lineText)) {
        const trimmedText = lineText.replace(/\s+$/, '');
        const startPos = new vscode.Position(i, trimmedText.length);
        const endPos = new vscode.Position(i, lineText.length);
        trailingReplacements.push({
          range: new vscode.Range(startPos, endPos),
          newText: ''
        });
      }
    }

    const totalChanges = leadingReplacements.length + trailingReplacements.length;

    if (totalChanges === 0) {
      vscode.window.showInformationMessage('No whitespace found to remove');
      return;
    }

    editor.edit(editBuilder => {
      for (let i = leadingReplacements.length - 1; i >= 0; i--) {
        editBuilder.replace(leadingReplacements[i].range, '');
      }
      for (let i = trailingReplacements.length - 1; i >= 0; i--) {
        editBuilder.replace(trailingReplacements[i].range, trailingReplacements[i].newText);
      }
    }).then(success => {
      if (success) {
        const messages = [];
        if (leadingReplacements.length > 0) {
          messages.push(`${leadingReplacements.length} leading`);
        }
        if (trailingReplacements.length > 0) {
          messages.push(`${trailingReplacements.length} trailing`);
        }
        vscode.window.showInformationMessage(`Removed ${messages.join(' and ')} whitespace line(s)`);
      } else {
        vscode.window.showErrorMessage('Failed to remove whitespace');
      }
    });
  });

  context.subscriptions.push(removeLeadingSpaces, removeTrailingSpaces, removeBothSpaces);
}

export function deactivate() {} 