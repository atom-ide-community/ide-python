// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const vscode_1 = require("vscode");

const types_1 = require("../../../common/application/types");

require("../../../common/extensions");

const types_2 = require("../../../common/platform/types");

const types_3 = require("../../../ioc/types");

const base_1 = require("../base");

const types_4 = require("../commands/types");

const constants_1 = require("../constants");

const promptHandler_1 = require("../promptHandler");

const types_5 = require("../types");

const InvalidDebuggerTypeMessage = 'Your launch.json file needs to be updated to change the "pythonExperimental" debug ' + 'configurations to use the "python" debugger type, otherwise Python debugging may ' + 'not work. Would you like to automatically update your launch.json file now?';

class InvalidDebuggerTypeDiagnostic extends base_1.BaseDiagnostic {
  constructor(message) {
    super(constants_1.DiagnosticCodes.InvalidDebuggerTypeDiagnostic, message, vscode_1.DiagnosticSeverity.Error, types_5.DiagnosticScope.WorkspaceFolder);
  }

}

exports.InvalidDebuggerTypeDiagnostic = InvalidDebuggerTypeDiagnostic;
exports.InvalidDebuggerTypeDiagnosticsServiceId = 'InvalidDebuggerTypeDiagnosticsServiceId';
const CommandName = 'python.debugger.replaceExperimental';
let InvalidDebuggerTypeDiagnosticsService = class InvalidDebuggerTypeDiagnosticsService extends base_1.BaseDiagnosticsService {
  constructor(serviceContainer) {
    super([constants_1.DiagnosticCodes.InvalidEnvironmentPathVariableDiagnostic], serviceContainer);
    this.messageService = serviceContainer.get(types_5.IDiagnosticHandlerService, promptHandler_1.DiagnosticCommandPromptHandlerServiceId);
    const cmdManager = serviceContainer.get(types_1.ICommandManager);
    this.fs = this.serviceContainer.get(types_2.IFileSystem);
    cmdManager.registerCommand(CommandName, this.fixLaunchJson, this);
  }

  diagnose() {
    return __awaiter(this, void 0, void 0, function* () {
      if (yield this.isExperimentalDebuggerUsed()) {
        return [new InvalidDebuggerTypeDiagnostic(InvalidDebuggerTypeMessage)];
      } else {
        return [];
      }
    });
  }

  handle(diagnostics) {
    return __awaiter(this, void 0, void 0, function* () {
      // This class can only handle one type of diagnostic, hence just use first item in list.
      if (diagnostics.length === 0 || !this.canHandle(diagnostics[0])) {
        return;
      }

      const diagnostic = diagnostics[0];
      const commandFactory = this.serviceContainer.get(types_4.IDiagnosticsCommandFactory);
      const options = [{
        prompt: 'Yes, update launch.json',
        command: commandFactory.createCommand(diagnostic, {
          type: 'executeVSCCommand',
          options: 'python.debugger.replaceExperimental'
        })
      }, {
        prompt: 'No, I will do it later'
      }];
      yield this.messageService.handle(diagnostic, {
        commandPrompts: options
      });
    });
  }

  isExperimentalDebuggerUsed() {
    return __awaiter(this, void 0, void 0, function* () {
      const workspaceService = this.serviceContainer.get(types_1.IWorkspaceService);

      if (!workspaceService.hasWorkspaceFolders) {
        return false;
      }

      const results = yield Promise.all(workspaceService.workspaceFolders.map(workspaceFolder => this.isExperimentalDebuggerUsedInWorkspace(workspaceFolder)));
      return results.filter(used => used === true).length > 0;
    });
  }

  getLaunchJsonFile(workspaceFolder) {
    return path.join(workspaceFolder.uri.fsPath, '.vscode', 'launch.json');
  }

  isExperimentalDebuggerUsedInWorkspace(workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
      const launchJson = this.getLaunchJsonFile(workspaceFolder);

      if (!(yield this.fs.fileExists(launchJson))) {
        return false;
      }

      const fileContents = yield this.fs.readFile(launchJson);
      return fileContents.indexOf('"pythonExperimental"') > 0;
    });
  }

  fixLaunchJson() {
    return __awaiter(this, void 0, void 0, function* () {
      const workspaceService = this.serviceContainer.get(types_1.IWorkspaceService);

      if (!workspaceService.hasWorkspaceFolders) {
        return false;
      }

      yield Promise.all(workspaceService.workspaceFolders.map(workspaceFolder => this.fixLaunchJsonInWorkspace(workspaceFolder)));
    });
  }

  fixLaunchJsonInWorkspace(workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!(yield this.isExperimentalDebuggerUsedInWorkspace(workspaceFolder))) {
        return;
      }

      const launchJson = this.getLaunchJsonFile(workspaceFolder);
      let fileContents = yield this.fs.readFile(launchJson);
      const debuggerType = new RegExp('"pythonExperimental"', 'g');
      const debuggerLabel = new RegExp('"Python Experimental:', 'g');
      fileContents = fileContents.replace(debuggerType, '"python"');
      fileContents = fileContents.replace(debuggerLabel, '"Python:');
      yield this.fs.writeFile(launchJson, fileContents);
    });
  }

};
InvalidDebuggerTypeDiagnosticsService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_3.IServiceContainer))], InvalidDebuggerTypeDiagnosticsService);
exports.InvalidDebuggerTypeDiagnosticsService = InvalidDebuggerTypeDiagnosticsService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludmFsaWREZWJ1Z2dlclR5cGUuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInBhdGgiLCJ2c2NvZGVfMSIsInR5cGVzXzEiLCJ0eXBlc18yIiwidHlwZXNfMyIsImJhc2VfMSIsInR5cGVzXzQiLCJjb25zdGFudHNfMSIsInByb21wdEhhbmRsZXJfMSIsInR5cGVzXzUiLCJJbnZhbGlkRGVidWdnZXJUeXBlTWVzc2FnZSIsIkludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljIiwiQmFzZURpYWdub3N0aWMiLCJjb25zdHJ1Y3RvciIsIm1lc3NhZ2UiLCJEaWFnbm9zdGljQ29kZXMiLCJEaWFnbm9zdGljU2V2ZXJpdHkiLCJFcnJvciIsIkRpYWdub3N0aWNTY29wZSIsIldvcmtzcGFjZUZvbGRlciIsIkludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljc1NlcnZpY2VJZCIsIkNvbW1hbmROYW1lIiwiSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWNzU2VydmljZSIsIkJhc2VEaWFnbm9zdGljc1NlcnZpY2UiLCJzZXJ2aWNlQ29udGFpbmVyIiwiSW52YWxpZEVudmlyb25tZW50UGF0aFZhcmlhYmxlRGlhZ25vc3RpYyIsIm1lc3NhZ2VTZXJ2aWNlIiwiZ2V0IiwiSURpYWdub3N0aWNIYW5kbGVyU2VydmljZSIsIkRpYWdub3N0aWNDb21tYW5kUHJvbXB0SGFuZGxlclNlcnZpY2VJZCIsImNtZE1hbmFnZXIiLCJJQ29tbWFuZE1hbmFnZXIiLCJmcyIsIklGaWxlU3lzdGVtIiwicmVnaXN0ZXJDb21tYW5kIiwiZml4TGF1bmNoSnNvbiIsImRpYWdub3NlIiwiaXNFeHBlcmltZW50YWxEZWJ1Z2dlclVzZWQiLCJoYW5kbGUiLCJkaWFnbm9zdGljcyIsImNhbkhhbmRsZSIsImRpYWdub3N0aWMiLCJjb21tYW5kRmFjdG9yeSIsIklEaWFnbm9zdGljc0NvbW1hbmRGYWN0b3J5Iiwib3B0aW9ucyIsInByb21wdCIsImNvbW1hbmQiLCJjcmVhdGVDb21tYW5kIiwidHlwZSIsImNvbW1hbmRQcm9tcHRzIiwid29ya3NwYWNlU2VydmljZSIsIklXb3Jrc3BhY2VTZXJ2aWNlIiwiaGFzV29ya3NwYWNlRm9sZGVycyIsInJlc3VsdHMiLCJhbGwiLCJ3b3Jrc3BhY2VGb2xkZXJzIiwibWFwIiwid29ya3NwYWNlRm9sZGVyIiwiaXNFeHBlcmltZW50YWxEZWJ1Z2dlclVzZWRJbldvcmtzcGFjZSIsImZpbHRlciIsInVzZWQiLCJnZXRMYXVuY2hKc29uRmlsZSIsImpvaW4iLCJ1cmkiLCJmc1BhdGgiLCJsYXVuY2hKc29uIiwiZmlsZUV4aXN0cyIsImZpbGVDb250ZW50cyIsInJlYWRGaWxlIiwiaW5kZXhPZiIsImZpeExhdW5jaEpzb25JbldvcmtzcGFjZSIsImRlYnVnZ2VyVHlwZSIsIlJlZ0V4cCIsImRlYnVnZ2VyTGFiZWwiLCJyZXBsYWNlIiwid3JpdGVGaWxlIiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklTZXJ2aWNlQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVB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QUFZLEdBQUdBLFlBQVksQ0FBQ08sT0FBYixDQUFxQkgsWUFBckIsRUFBbUMsVUFBbkMsQ0FBZjtBQUNBSixNQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ08sT0FBYixDQUFxQkQsYUFBckIsRUFBb0MsVUFBcEMsQ0FBZjtBQUNBLFlBQU0sS0FBS3pDLEVBQUwsQ0FBUTJDLFNBQVIsQ0FBa0JWLFVBQWxCLEVBQThCRSxZQUE5QixDQUFOO0FBQ0gsS0FYZSxDQUFoQjtBQVlIOztBQW5GeUgsQ0FBOUg7QUFxRkE3QyxxQ0FBcUMsR0FBRzlELFVBQVUsQ0FBQyxDQUMvQ3NDLFdBQVcsQ0FBQzhFLFVBQVosRUFEK0MsRUFFL0NwRyxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDK0UsTUFBWixDQUFtQnpFLE9BQU8sQ0FBQzBFLGlCQUEzQixDQUFKLENBRndDLENBQUQsRUFHL0N4RCxxQ0FIK0MsQ0FBbEQ7QUFJQXpCLE9BQU8sQ0FBQ3lCLHFDQUFSLEdBQWdEQSxxQ0FBaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0JztcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCB2c2NvZGVfMSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vZXh0ZW5zaW9uc1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL3BsYXRmb3JtL3R5cGVzXCIpO1xuY29uc3QgdHlwZXNfMyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9pb2MvdHlwZXNcIik7XG5jb25zdCBiYXNlXzEgPSByZXF1aXJlKFwiLi4vYmFzZVwiKTtcbmNvbnN0IHR5cGVzXzQgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvdHlwZXNcIik7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5jb25zdCBwcm9tcHRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vcHJvbXB0SGFuZGxlclwiKTtcbmNvbnN0IHR5cGVzXzUgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XG5jb25zdCBJbnZhbGlkRGVidWdnZXJUeXBlTWVzc2FnZSA9ICdZb3VyIGxhdW5jaC5qc29uIGZpbGUgbmVlZHMgdG8gYmUgdXBkYXRlZCB0byBjaGFuZ2UgdGhlIFwicHl0aG9uRXhwZXJpbWVudGFsXCIgZGVidWcgJyArXG4gICAgJ2NvbmZpZ3VyYXRpb25zIHRvIHVzZSB0aGUgXCJweXRob25cIiBkZWJ1Z2dlciB0eXBlLCBvdGhlcndpc2UgUHl0aG9uIGRlYnVnZ2luZyBtYXkgJyArXG4gICAgJ25vdCB3b3JrLiBXb3VsZCB5b3UgbGlrZSB0byBhdXRvbWF0aWNhbGx5IHVwZGF0ZSB5b3VyIGxhdW5jaC5qc29uIGZpbGUgbm93Pyc7XG5jbGFzcyBJbnZhbGlkRGVidWdnZXJUeXBlRGlhZ25vc3RpYyBleHRlbmRzIGJhc2VfMS5CYXNlRGlhZ25vc3RpYyB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihjb25zdGFudHNfMS5EaWFnbm9zdGljQ29kZXMuSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWMsIG1lc3NhZ2UsIHZzY29kZV8xLkRpYWdub3N0aWNTZXZlcml0eS5FcnJvciwgdHlwZXNfNS5EaWFnbm9zdGljU2NvcGUuV29ya3NwYWNlRm9sZGVyKTtcbiAgICB9XG59XG5leHBvcnRzLkludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljID0gSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWM7XG5leHBvcnRzLkludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljc1NlcnZpY2VJZCA9ICdJbnZhbGlkRGVidWdnZXJUeXBlRGlhZ25vc3RpY3NTZXJ2aWNlSWQnO1xuY29uc3QgQ29tbWFuZE5hbWUgPSAncHl0aG9uLmRlYnVnZ2VyLnJlcGxhY2VFeHBlcmltZW50YWwnO1xubGV0IEludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljc1NlcnZpY2UgPSBjbGFzcyBJbnZhbGlkRGVidWdnZXJUeXBlRGlhZ25vc3RpY3NTZXJ2aWNlIGV4dGVuZHMgYmFzZV8xLkJhc2VEaWFnbm9zdGljc1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIpIHtcbiAgICAgICAgc3VwZXIoW2NvbnN0YW50c18xLkRpYWdub3N0aWNDb2Rlcy5JbnZhbGlkRW52aXJvbm1lbnRQYXRoVmFyaWFibGVEaWFnbm9zdGljXSwgc2VydmljZUNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UgPSBzZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc181LklEaWFnbm9zdGljSGFuZGxlclNlcnZpY2UsIHByb21wdEhhbmRsZXJfMS5EaWFnbm9zdGljQ29tbWFuZFByb21wdEhhbmRsZXJTZXJ2aWNlSWQpO1xuICAgICAgICBjb25zdCBjbWRNYW5hZ2VyID0gc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JQ29tbWFuZE1hbmFnZXIpO1xuICAgICAgICB0aGlzLmZzID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklGaWxlU3lzdGVtKTtcbiAgICAgICAgY21kTWFuYWdlci5yZWdpc3RlckNvbW1hbmQoQ29tbWFuZE5hbWUsIHRoaXMuZml4TGF1bmNoSnNvbiwgdGhpcyk7XG4gICAgfVxuICAgIGRpYWdub3NlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHlpZWxkIHRoaXMuaXNFeHBlcmltZW50YWxEZWJ1Z2dlclVzZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbbmV3IEludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljKEludmFsaWREZWJ1Z2dlclR5cGVNZXNzYWdlKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGUoZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY2xhc3MgY2FuIG9ubHkgaGFuZGxlIG9uZSB0eXBlIG9mIGRpYWdub3N0aWMsIGhlbmNlIGp1c3QgdXNlIGZpcnN0IGl0ZW0gaW4gbGlzdC5cbiAgICAgICAgICAgIGlmIChkaWFnbm9zdGljcy5sZW5ndGggPT09IDAgfHwgIXRoaXMuY2FuSGFuZGxlKGRpYWdub3N0aWNzWzBdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpYWdub3N0aWMgPSBkaWFnbm9zdGljc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRGYWN0b3J5ID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc180LklEaWFnbm9zdGljc0NvbW1hbmRGYWN0b3J5KTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm9tcHQ6ICdZZXMsIHVwZGF0ZSBsYXVuY2guanNvbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRGYWN0b3J5LmNyZWF0ZUNvbW1hbmQoZGlhZ25vc3RpYywgeyB0eXBlOiAnZXhlY3V0ZVZTQ0NvbW1hbmQnLCBvcHRpb25zOiAncHl0aG9uLmRlYnVnZ2VyLnJlcGxhY2VFeHBlcmltZW50YWwnIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdDogJ05vLCBJIHdpbGwgZG8gaXQgbGF0ZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMubWVzc2FnZVNlcnZpY2UuaGFuZGxlKGRpYWdub3N0aWMsIHsgY29tbWFuZFByb21wdHM6IG9wdGlvbnMgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0V4cGVyaW1lbnRhbERlYnVnZ2VyVXNlZCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHdvcmtzcGFjZVNlcnZpY2UgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSVdvcmtzcGFjZVNlcnZpY2UpO1xuICAgICAgICAgICAgaWYgKCF3b3Jrc3BhY2VTZXJ2aWNlLmhhc1dvcmtzcGFjZUZvbGRlcnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0geWllbGQgUHJvbWlzZS5hbGwod29ya3NwYWNlU2VydmljZS53b3Jrc3BhY2VGb2xkZXJzLm1hcCh3b3Jrc3BhY2VGb2xkZXIgPT4gdGhpcy5pc0V4cGVyaW1lbnRhbERlYnVnZ2VyVXNlZEluV29ya3NwYWNlKHdvcmtzcGFjZUZvbGRlcikpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzLmZpbHRlcih1c2VkID0+IHVzZWQgPT09IHRydWUpLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRMYXVuY2hKc29uRmlsZSh3b3Jrc3BhY2VGb2xkZXIpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbih3b3Jrc3BhY2VGb2xkZXIudXJpLmZzUGF0aCwgJy52c2NvZGUnLCAnbGF1bmNoLmpzb24nKTtcbiAgICB9XG4gICAgaXNFeHBlcmltZW50YWxEZWJ1Z2dlclVzZWRJbldvcmtzcGFjZSh3b3Jrc3BhY2VGb2xkZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhdW5jaEpzb24gPSB0aGlzLmdldExhdW5jaEpzb25GaWxlKHdvcmtzcGFjZUZvbGRlcik7XG4gICAgICAgICAgICBpZiAoISh5aWVsZCB0aGlzLmZzLmZpbGVFeGlzdHMobGF1bmNoSnNvbikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZUNvbnRlbnRzID0geWllbGQgdGhpcy5mcy5yZWFkRmlsZShsYXVuY2hKc29uKTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlQ29udGVudHMuaW5kZXhPZignXCJweXRob25FeHBlcmltZW50YWxcIicpID4gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpeExhdW5jaEpzb24oKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB3b3Jrc3BhY2VTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKTtcbiAgICAgICAgICAgIGlmICghd29ya3NwYWNlU2VydmljZS5oYXNXb3Jrc3BhY2VGb2xkZXJzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgUHJvbWlzZS5hbGwod29ya3NwYWNlU2VydmljZS53b3Jrc3BhY2VGb2xkZXJzLm1hcCh3b3Jrc3BhY2VGb2xkZXIgPT4gdGhpcy5maXhMYXVuY2hKc29uSW5Xb3Jrc3BhY2Uod29ya3NwYWNlRm9sZGVyKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZml4TGF1bmNoSnNvbkluV29ya3NwYWNlKHdvcmtzcGFjZUZvbGRlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKCEoeWllbGQgdGhpcy5pc0V4cGVyaW1lbnRhbERlYnVnZ2VyVXNlZEluV29ya3NwYWNlKHdvcmtzcGFjZUZvbGRlcikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGF1bmNoSnNvbiA9IHRoaXMuZ2V0TGF1bmNoSnNvbkZpbGUod29ya3NwYWNlRm9sZGVyKTtcbiAgICAgICAgICAgIGxldCBmaWxlQ29udGVudHMgPSB5aWVsZCB0aGlzLmZzLnJlYWRGaWxlKGxhdW5jaEpzb24pO1xuICAgICAgICAgICAgY29uc3QgZGVidWdnZXJUeXBlID0gbmV3IFJlZ0V4cCgnXCJweXRob25FeHBlcmltZW50YWxcIicsICdnJyk7XG4gICAgICAgICAgICBjb25zdCBkZWJ1Z2dlckxhYmVsID0gbmV3IFJlZ0V4cCgnXCJQeXRob24gRXhwZXJpbWVudGFsOicsICdnJyk7XG4gICAgICAgICAgICBmaWxlQ29udGVudHMgPSBmaWxlQ29udGVudHMucmVwbGFjZShkZWJ1Z2dlclR5cGUsICdcInB5dGhvblwiJyk7XG4gICAgICAgICAgICBmaWxlQ29udGVudHMgPSBmaWxlQ29udGVudHMucmVwbGFjZShkZWJ1Z2dlckxhYmVsLCAnXCJQeXRob246Jyk7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLmZzLndyaXRlRmlsZShsYXVuY2hKc29uLCBmaWxlQ29udGVudHMpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWNzU2VydmljZSA9IF9fZGVjb3JhdGUoW1xuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18zLklTZXJ2aWNlQ29udGFpbmVyKSlcbl0sIEludmFsaWREZWJ1Z2dlclR5cGVEaWFnbm9zdGljc1NlcnZpY2UpO1xuZXhwb3J0cy5JbnZhbGlkRGVidWdnZXJUeXBlRGlhZ25vc3RpY3NTZXJ2aWNlID0gSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWNzU2VydmljZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludmFsaWREZWJ1Z2dlclR5cGUuanMubWFwIl19