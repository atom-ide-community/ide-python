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

const vscode_1 = require("vscode");

require("../../../common/extensions");

const logger_1 = require("../../../common/logger");

const types_1 = require("../../../common/types");

const contracts_1 = require("../../../interpreter/contracts");

const types_2 = require("../../../ioc/types");

const base_1 = require("../base");

const types_3 = require("../commands/types");

const constants_1 = require("../constants");

const promptHandler_1 = require("../promptHandler");

const types_4 = require("../types");

const InvalidPythonPathInDebuggerMessage = 'You need to select a Python interpreter before you start debugging.\n\nTip: click on "Select Python Interpreter" in the status bar.';

class InvalidPythonPathInDebuggerDiagnostic extends base_1.BaseDiagnostic {
  constructor() {
    super(constants_1.DiagnosticCodes.InvalidDebuggerTypeDiagnostic, InvalidPythonPathInDebuggerMessage, vscode_1.DiagnosticSeverity.Error, types_4.DiagnosticScope.WorkspaceFolder);
  }

}

exports.InvalidPythonPathInDebuggerDiagnostic = InvalidPythonPathInDebuggerDiagnostic;
exports.InvalidPythonPathInDebuggerServiceId = 'InvalidPythonPathInDebuggerServiceId';
const CommandName = 'python.setInterpreter';
let InvalidPythonPathInDebuggerService = class InvalidPythonPathInDebuggerService extends base_1.BaseDiagnosticsService {
  constructor(serviceContainer) {
    super([constants_1.DiagnosticCodes.InvalidPythonPathInDebuggerDiagnostic], serviceContainer);
    this.messageService = serviceContainer.get(types_4.IDiagnosticHandlerService, promptHandler_1.DiagnosticCommandPromptHandlerServiceId);
  }

  diagnose() {
    return __awaiter(this, void 0, void 0, function* () {
      return [];
    });
  }

  handle(diagnostics) {
    return __awaiter(this, void 0, void 0, function* () {
      // This class can only handle one type of diagnostic, hence just use first item in list.
      if (diagnostics.length === 0 || !this.canHandle(diagnostics[0])) {
        return;
      }

      const diagnostic = diagnostics[0];
      const commandFactory = this.serviceContainer.get(types_3.IDiagnosticsCommandFactory);
      const options = [{
        prompt: 'Select Python Interpreter',
        command: commandFactory.createCommand(diagnostic, {
          type: 'executeVSCCommand',
          options: CommandName
        })
      }];
      yield this.messageService.handle(diagnostic, {
        commandPrompts: options
      });
    });
  }

  validatePythonPath(pythonPath, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      // tslint:disable-next-line:no-invalid-template-strings
      if (pythonPath === '${config:python.pythonPath}' || !pythonPath) {
        const configService = this.serviceContainer.get(types_1.IConfigurationService);
        pythonPath = configService.getSettings(resource).pythonPath;
      }

      const helper = this.serviceContainer.get(contracts_1.IInterpreterHelper);

      if (yield helper.getInterpreterInformation(pythonPath).catch(() => undefined)) {
        return true;
      }

      this.handle([new InvalidPythonPathInDebuggerDiagnostic()]).catch(ex => logger_1.Logger.error('Failed to handle invalid python path in debugger', ex)).ignoreErrors();
      return false;
    });
  }

};
InvalidPythonPathInDebuggerService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_2.IServiceContainer))], InvalidPythonPathInDebuggerService);
exports.InvalidPythonPathInDebuggerService = InvalidPythonPathInDebuggerService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJleHBvcnRzIiwiaW52ZXJzaWZ5XzEiLCJyZXF1aXJlIiwidnNjb2RlXzEiLCJsb2dnZXJfMSIsInR5cGVzXzEiLCJjb250cmFjdHNfMSIsInR5cGVzXzIiLCJiYXNlXzEiLCJ0eXBlc18zIiwiY29uc3RhbnRzXzEiLCJwcm9tcHRIYW5kbGVyXzEiLCJ0eXBlc180IiwiSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyTWVzc2FnZSIsIkludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlckRpYWdub3N0aWMiLCJCYXNlRGlhZ25vc3RpYyIsImNvbnN0cnVjdG9yIiwiRGlhZ25vc3RpY0NvZGVzIiwiSW52YWxpZERlYnVnZ2VyVHlwZURpYWdub3N0aWMiLCJEaWFnbm9zdGljU2V2ZXJpdHkiLCJFcnJvciIsIkRpYWdub3N0aWNTY29wZSIsIldvcmtzcGFjZUZvbGRlciIsIkludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlclNlcnZpY2VJZCIsIkNvbW1hbmROYW1lIiwiSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyU2VydmljZSIsIkJhc2VEaWFnbm9zdGljc1NlcnZpY2UiLCJzZXJ2aWNlQ29udGFpbmVyIiwibWVzc2FnZVNlcnZpY2UiLCJnZXQiLCJJRGlhZ25vc3RpY0hhbmRsZXJTZXJ2aWNlIiwiRGlhZ25vc3RpY0NvbW1hbmRQcm9tcHRIYW5kbGVyU2VydmljZUlkIiwiZGlhZ25vc2UiLCJoYW5kbGUiLCJkaWFnbm9zdGljcyIsImNhbkhhbmRsZSIsImRpYWdub3N0aWMiLCJjb21tYW5kRmFjdG9yeSIsIklEaWFnbm9zdGljc0NvbW1hbmRGYWN0b3J5Iiwib3B0aW9ucyIsInByb21wdCIsImNvbW1hbmQiLCJjcmVhdGVDb21tYW5kIiwidHlwZSIsImNvbW1hbmRQcm9tcHRzIiwidmFsaWRhdGVQeXRob25QYXRoIiwicHl0aG9uUGF0aCIsInJlc291cmNlIiwiY29uZmlnU2VydmljZSIsIklDb25maWd1cmF0aW9uU2VydmljZSIsImdldFNldHRpbmdzIiwiaGVscGVyIiwiSUludGVycHJldGVySGVscGVyIiwiZ2V0SW50ZXJwcmV0ZXJJbmZvcm1hdGlvbiIsImNhdGNoIiwidW5kZWZpbmVkIiwiZXgiLCJMb2dnZXIiLCJlcnJvciIsImlnbm9yZUVycm9ycyIsImluamVjdGFibGUiLCJpbmplY3QiLCJJU2VydmljZUNvbnRhaW5lciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFBSSxHQUFHSyxNQUFNLENBQUNDLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q0MsR0FBeEMsQ0FBdkIsR0FBc0VDLElBQXJIO0FBQUEsTUFBMkhPLENBQTNIO0FBQ0EsTUFBSSxP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QTZDQWxDLGtDQUFrQyxHQUFHOUQsVUFBVSxDQUFDLENBQzVDc0MsV0FBVyxDQUFDMkQsVUFBWixFQUQ0QyxFQUU1Q2pGLE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUM0RCxNQUFaLENBQW1CdEQsT0FBTyxDQUFDdUQsaUJBQTNCLENBQUosQ0FGcUMsQ0FBRCxFQUc1Q3JDLGtDQUg0QyxDQUEvQztBQUlBekIsT0FBTyxDQUFDeUIsa0NBQVIsR0FBNkNBLGtDQUE3QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vZXh0ZW5zaW9uc1wiKTtcbmNvbnN0IGxvZ2dlcl8xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9sb2dnZXJcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi90eXBlc1wiKTtcbmNvbnN0IGNvbnRyYWN0c18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2ludGVycHJldGVyL2NvbnRyYWN0c1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW9jL3R5cGVzXCIpO1xuY29uc3QgYmFzZV8xID0gcmVxdWlyZShcIi4uL2Jhc2VcIik7XG5jb25zdCB0eXBlc18zID0gcmVxdWlyZShcIi4uL2NvbW1hbmRzL3R5cGVzXCIpO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuY29uc3QgcHJvbXB0SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL3Byb21wdEhhbmRsZXJcIik7XG5jb25zdCB0eXBlc180ID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xuY29uc3QgSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyTWVzc2FnZSA9ICdZb3UgbmVlZCB0byBzZWxlY3QgYSBQeXRob24gaW50ZXJwcmV0ZXIgYmVmb3JlIHlvdSBzdGFydCBkZWJ1Z2dpbmcuXFxuXFxuVGlwOiBjbGljayBvbiBcIlNlbGVjdCBQeXRob24gSW50ZXJwcmV0ZXJcIiBpbiB0aGUgc3RhdHVzIGJhci4nO1xuY2xhc3MgSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyRGlhZ25vc3RpYyBleHRlbmRzIGJhc2VfMS5CYXNlRGlhZ25vc3RpYyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKGNvbnN0YW50c18xLkRpYWdub3N0aWNDb2Rlcy5JbnZhbGlkRGVidWdnZXJUeXBlRGlhZ25vc3RpYywgSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyTWVzc2FnZSwgdnNjb2RlXzEuRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yLCB0eXBlc180LkRpYWdub3N0aWNTY29wZS5Xb3Jrc3BhY2VGb2xkZXIpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyRGlhZ25vc3RpYyA9IEludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlckRpYWdub3N0aWM7XG5leHBvcnRzLkludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlclNlcnZpY2VJZCA9ICdJbnZhbGlkUHl0aG9uUGF0aEluRGVidWdnZXJTZXJ2aWNlSWQnO1xuY29uc3QgQ29tbWFuZE5hbWUgPSAncHl0aG9uLnNldEludGVycHJldGVyJztcbmxldCBJbnZhbGlkUHl0aG9uUGF0aEluRGVidWdnZXJTZXJ2aWNlID0gY2xhc3MgSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyU2VydmljZSBleHRlbmRzIGJhc2VfMS5CYXNlRGlhZ25vc3RpY3NTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKFtjb25zdGFudHNfMS5EaWFnbm9zdGljQ29kZXMuSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyRGlhZ25vc3RpY10sIHNlcnZpY2VDb250YWluZXIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlID0gc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfNC5JRGlhZ25vc3RpY0hhbmRsZXJTZXJ2aWNlLCBwcm9tcHRIYW5kbGVyXzEuRGlhZ25vc3RpY0NvbW1hbmRQcm9tcHRIYW5kbGVyU2VydmljZUlkKTtcbiAgICB9XG4gICAgZGlhZ25vc2UoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGUoZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY2xhc3MgY2FuIG9ubHkgaGFuZGxlIG9uZSB0eXBlIG9mIGRpYWdub3N0aWMsIGhlbmNlIGp1c3QgdXNlIGZpcnN0IGl0ZW0gaW4gbGlzdC5cbiAgICAgICAgICAgIGlmIChkaWFnbm9zdGljcy5sZW5ndGggPT09IDAgfHwgIXRoaXMuY2FuSGFuZGxlKGRpYWdub3N0aWNzWzBdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpYWdub3N0aWMgPSBkaWFnbm9zdGljc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRGYWN0b3J5ID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18zLklEaWFnbm9zdGljc0NvbW1hbmRGYWN0b3J5KTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm9tcHQ6ICdTZWxlY3QgUHl0aG9uIEludGVycHJldGVyJyxcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogY29tbWFuZEZhY3RvcnkuY3JlYXRlQ29tbWFuZChkaWFnbm9zdGljLCB7IHR5cGU6ICdleGVjdXRlVlNDQ29tbWFuZCcsIG9wdGlvbnM6IENvbW1hbmROYW1lIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMubWVzc2FnZVNlcnZpY2UuaGFuZGxlKGRpYWdub3N0aWMsIHsgY29tbWFuZFByb21wdHM6IG9wdGlvbnMgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWxpZGF0ZVB5dGhvblBhdGgocHl0aG9uUGF0aCwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnZhbGlkLXRlbXBsYXRlLXN0cmluZ3NcbiAgICAgICAgICAgIGlmIChweXRob25QYXRoID09PSAnJHtjb25maWc6cHl0aG9uLnB5dGhvblBhdGh9JyB8fCAhcHl0aG9uUGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1NlcnZpY2UgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlKTtcbiAgICAgICAgICAgICAgICBweXRob25QYXRoID0gY29uZmlnU2VydmljZS5nZXRTZXR0aW5ncyhyZXNvdXJjZSkucHl0aG9uUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhlbHBlciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQoY29udHJhY3RzXzEuSUludGVycHJldGVySGVscGVyKTtcbiAgICAgICAgICAgIGlmICh5aWVsZCBoZWxwZXIuZ2V0SW50ZXJwcmV0ZXJJbmZvcm1hdGlvbihweXRob25QYXRoKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhbmRsZShbbmV3IEludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlckRpYWdub3N0aWMoKV0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGV4ID0+IGxvZ2dlcl8xLkxvZ2dlci5lcnJvcignRmFpbGVkIHRvIGhhbmRsZSBpbnZhbGlkIHB5dGhvbiBwYXRoIGluIGRlYnVnZ2VyJywgZXgpKVxuICAgICAgICAgICAgICAgIC5pZ25vcmVFcnJvcnMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbkludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlclNlcnZpY2UgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMi5JU2VydmljZUNvbnRhaW5lcikpXG5dLCBJbnZhbGlkUHl0aG9uUGF0aEluRGVidWdnZXJTZXJ2aWNlKTtcbmV4cG9ydHMuSW52YWxpZFB5dGhvblBhdGhJbkRlYnVnZ2VyU2VydmljZSA9IEludmFsaWRQeXRob25QYXRoSW5EZWJ1Z2dlclNlcnZpY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZhbGlkUHl0aG9uUGF0aEluRGVidWdnZXIuanMubWFwIl19