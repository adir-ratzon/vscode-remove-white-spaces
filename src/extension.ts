import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('removeLeadingSpaces.remove', () => {
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

  context.subscriptions.push(disposable);
}

export function deactivate() {} 