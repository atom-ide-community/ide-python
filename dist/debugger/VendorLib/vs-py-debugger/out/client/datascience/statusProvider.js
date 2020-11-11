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

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const vscode_1 = require("vscode");

const types_1 = require("../common/application/types");

const async_1 = require("../common/utils/async");

const constants_1 = require("./constants");

class StatusItem {
  constructor(title, history, timeout) {
    this.disposed = false;

    this.dispose = () => {
      if (!this.disposed) {
        this.disposed = true;

        if (this.history !== null) {
          this.history.postMessage(constants_1.HistoryMessages.StopProgress);
        }

        this.deferred.resolve();
      }
    };

    this.promise = () => {
      return this.deferred.promise;
    };

    this.history = history;
    this.deferred = async_1.createDeferred();

    if (this.history !== null) {
      this.history.postMessage(constants_1.HistoryMessages.StartProgress, title);
    } // A timeout is possible too. Auto dispose if that's the case


    if (timeout) {
      setTimeout(this.dispose, timeout);
    }
  }

}

let StatusProvider = class StatusProvider {
  constructor(applicationShell) {
    this.applicationShell = applicationShell;
  }

  set(message, history, timeout) {
    // Create a StatusItem that will return our promise
    const statusItem = new StatusItem(message, history, timeout);
    const progressOptions = {
      location: vscode_1.ProgressLocation.Window,
      title: message
    }; // Set our application shell status with a busy icon

    this.applicationShell.withProgress(progressOptions, () => {
      return statusItem.promise();
    });
    return statusItem;
  }

};
StatusProvider = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IApplicationShell))], StatusProvider);
exports.StatusProvider = StatusProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXR1c1Byb3ZpZGVyLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiZXhwb3J0cyIsInZhbHVlIiwiaW52ZXJzaWZ5XzEiLCJyZXF1aXJlIiwidnNjb2RlXzEiLCJ0eXBlc18xIiwiYXN5bmNfMSIsImNvbnN0YW50c18xIiwiU3RhdHVzSXRlbSIsImNvbnN0cnVjdG9yIiwidGl0bGUiLCJoaXN0b3J5IiwidGltZW91dCIsImRpc3Bvc2VkIiwiZGlzcG9zZSIsInBvc3RNZXNzYWdlIiwiSGlzdG9yeU1lc3NhZ2VzIiwiU3RvcFByb2dyZXNzIiwiZGVmZXJyZWQiLCJyZXNvbHZlIiwicHJvbWlzZSIsImNyZWF0ZURlZmVycmVkIiwiU3RhcnRQcm9ncmVzcyIsInNldFRpbWVvdXQiLCJTdGF0dXNQcm92aWRlciIsImFwcGxpY2F0aW9uU2hlbGwiLCJzZXQiLCJtZXNzYWdlIiwic3RhdHVzSXRlbSIsInByb2dyZXNzT3B0aW9ucyIsImxvY2F0aW9uIiwiUHJvZ3Jlc3NMb2NhdGlvbiIsIldpbmRvdyIsIndpdGhQcm9ncmVzcyIsImluamVjdGFibGUiLCJpbmplY3QiLCJJQXBwbGljYXRpb25TaGVsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxH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Q0FBQ3dCLGNBQVIsR0FBeUJBLGNBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCB2c2NvZGVfMSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL2FwcGxpY2F0aW9uL3R5cGVzXCIpO1xyXG5jb25zdCBhc3luY18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlscy9hc3luY1wiKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbmNsYXNzIFN0YXR1c0l0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGhpc3RvcnksIHRpbWVvdXQpIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlzdG9yeSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlzdG9yeS5wb3N0TWVzc2FnZShjb25zdGFudHNfMS5IaXN0b3J5TWVzc2FnZXMuU3RvcFByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnByb21pc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhpc3RvcnkgPSBoaXN0b3J5O1xyXG4gICAgICAgIHRoaXMuZGVmZXJyZWQgPSBhc3luY18xLmNyZWF0ZURlZmVycmVkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnkucG9zdE1lc3NhZ2UoY29uc3RhbnRzXzEuSGlzdG9yeU1lc3NhZ2VzLlN0YXJ0UHJvZ3Jlc3MsIHRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQSB0aW1lb3V0IGlzIHBvc3NpYmxlIHRvby4gQXV0byBkaXNwb3NlIGlmIHRoYXQncyB0aGUgY2FzZVxyXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5kaXNwb3NlLCB0aW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxubGV0IFN0YXR1c1Byb3ZpZGVyID0gY2xhc3MgU3RhdHVzUHJvdmlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoYXBwbGljYXRpb25TaGVsbCkge1xyXG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25TaGVsbCA9IGFwcGxpY2F0aW9uU2hlbGw7XHJcbiAgICB9XHJcbiAgICBzZXQobWVzc2FnZSwgaGlzdG9yeSwgdGltZW91dCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIFN0YXR1c0l0ZW0gdGhhdCB3aWxsIHJldHVybiBvdXIgcHJvbWlzZVxyXG4gICAgICAgIGNvbnN0IHN0YXR1c0l0ZW0gPSBuZXcgU3RhdHVzSXRlbShtZXNzYWdlLCBoaXN0b3J5LCB0aW1lb3V0KTtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB2c2NvZGVfMS5Qcm9ncmVzc0xvY2F0aW9uLldpbmRvdyxcclxuICAgICAgICAgICAgdGl0bGU6IG1lc3NhZ2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFNldCBvdXIgYXBwbGljYXRpb24gc2hlbGwgc3RhdHVzIHdpdGggYSBidXN5IGljb25cclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uU2hlbGwud2l0aFByb2dyZXNzKHByb2dyZXNzT3B0aW9ucywgKCkgPT4geyByZXR1cm4gc3RhdHVzSXRlbS5wcm9taXNlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBzdGF0dXNJdGVtO1xyXG4gICAgfVxyXG59O1xyXG5TdGF0dXNQcm92aWRlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxyXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JQXBwbGljYXRpb25TaGVsbCkpXHJcbl0sIFN0YXR1c1Byb3ZpZGVyKTtcclxuZXhwb3J0cy5TdGF0dXNQcm92aWRlciA9IFN0YXR1c1Byb3ZpZGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0dXNQcm92aWRlci5qcy5tYXAiXX0=