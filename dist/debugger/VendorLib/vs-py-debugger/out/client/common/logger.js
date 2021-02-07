"use strict"; // tslint:disable:no-console

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Logger_1;

const inversify_1 = require("inversify");

const helpers_1 = require("./helpers");

const types_1 = require("./types");

const PREFIX = 'Python Extension: ';
let Logger = Logger_1 = class Logger {
  // tslint:disable-next-line:no-any
  static error(title = '', message) {
    new Logger_1().logError(`${title}, ${message}`);
  } // tslint:disable-next-line:no-any


  static warn(title = '', message = '') {
    new Logger_1().logWarning(`${title}, ${message}`);
  } // tslint:disable-next-line:no-any


  static verbose(title = '') {
    new Logger_1().logInformation(title);
  }

  logError(message, ex) {
    if (ex) {
      console.error(`${PREFIX}${message}`, ex);
    } else {
      console.error(`${PREFIX}${message}`);
    }
  }

  logWarning(message, ex) {
    if (ex) {
      console.warn(`${PREFIX}${message}`, ex);
    } else {
      console.warn(`${PREFIX}${message}`);
    }
  }

  logInformation(message, ex) {
    if (ex) {
      console.info(`${PREFIX}${message}`, ex);
    } else {
      console.info(`${PREFIX}${message}`);
    }
  }

};

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logError", null);

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logWarning", null);

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logInformation", null);

Logger = Logger_1 = __decorate([inversify_1.injectable()], Logger);
exports.Logger = Logger;
var LogOptions;

(function (LogOptions) {
  LogOptions[LogOptions["None"] = 0] = "None";
  LogOptions[LogOptions["Arguments"] = 1] = "Arguments";
  LogOptions[LogOptions["ReturnValue"] = 2] = "ReturnValue";
})(LogOptions || (LogOptions = {})); // tslint:disable-next-line:no-any


function argsToLogString(args) {
  try {
    return (args || []).map((item, index) => {
      try {
        return `Arg ${index + 1}: ${JSON.stringify(item)}`;
      } catch (_a) {
        return `Arg ${index + 1}: UNABLE TO DETERMINE VALUE`;
      }
    }).join(', ');
  } catch (_a) {
    return '';
  }
} // tslint:disable-next-line:no-any


function returnValueToLogString(returnValue) {
  let returnValueMessage = 'Return Value: ';

  if (returnValue) {
    try {
      returnValueMessage += `${JSON.stringify(returnValue)}`;
    } catch (_a) {
      returnValueMessage += 'UNABLE TO DETERMINE VALUE';
    }
  }

  return returnValueMessage;
}

function traceVerbose(message) {
  return trace(message, LogOptions.Arguments | LogOptions.ReturnValue);
}

exports.traceVerbose = traceVerbose;

function traceError(message, ex) {
  return trace(message, LogOptions.Arguments | LogOptions.ReturnValue, types_1.LogLevel.Error);
}

exports.traceError = traceError;

function traceInfo(message) {
  return trace(message);
}

exports.traceInfo = traceInfo;

function trace(message, options = LogOptions.None, logLevel) {
  // tslint:disable-next-line:no-function-expression no-any
  return function (_, __, descriptor) {
    const originalMethod = descriptor.value; // tslint:disable-next-line:no-function-expression no-any

    descriptor.value = function (...args) {
      // tslint:disable-next-line:no-any
      function writeSuccess(returnValue) {
        if (logLevel === types_1.LogLevel.Error) {
          return;
        }

        writeToLog(returnValue);
      }

      function writeError(ex) {
        writeToLog(undefined, ex);
      } // tslint:disable-next-line:no-any


      function writeToLog(returnValue, ex) {
        const messagesToLog = [message];

        if ((options && LogOptions.Arguments) === LogOptions.Arguments) {
          messagesToLog.push(argsToLogString(args));
        }

        if ((options & LogOptions.ReturnValue) === LogOptions.ReturnValue) {
          messagesToLog.push(returnValueToLogString(returnValue));
        }

        if (ex) {
          new Logger().logError(messagesToLog.join(', '), ex);
        } else {
          new Logger().logInformation(messagesToLog.join(', '));
        }
      }

      try {
        // tslint:disable-next-line:no-invalid-this no-use-before-declare no-unsafe-any
        const result = originalMethod.apply(this, args); // If method being wrapped returns a promise then wait for it.
        // tslint:disable-next-line:no-unsafe-any

        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          // tslint:disable-next-line:prefer-type-cast
          result.then(data => {
            writeSuccess(data);
            return data;
          }).catch(ex => {
            writeError(ex);
            return Promise.reject(ex);
          });
        } else {
          writeSuccess(result);
        }

        return result;
      } catch (ex) {
        writeError(ex);
        throw ex;
      }
    };

    return descriptor;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJMb2dnZXJfMSIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsImhlbHBlcnNfMSIsInR5cGVzXzEiLCJQUkVGSVgiLCJMb2dnZXIiLCJlcnJvciIsInRpdGxlIiwibWVzc2FnZSIsImxvZ0Vycm9yIiwid2FybiIsImxvZ1dhcm5pbmciLCJ2ZXJib3NlIiwibG9nSW5mb3JtYXRpb24iLCJleCIsImNvbnNvbGUiLCJpbmZvIiwic2tpcElmVGVzdCIsInByb3RvdHlwZSIsImluamVjdGFibGUiLCJMb2dPcHRpb25zIiwiYXJnc1RvTG9nU3RyaW5nIiwiYXJncyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsIkpTT04iLCJzdHJpbmdpZnkiLCJfYSIsImpvaW4iLCJyZXR1cm5WYWx1ZVRvTG9nU3RyaW5nIiwicmV0dXJuVmFsdWUiLCJyZXR1cm5WYWx1ZU1lc3NhZ2UiLCJ0cmFjZVZlcmJvc2UiLCJ0cmFjZSIsIkFyZ3VtZW50cyIsIlJldHVyblZhbHVlIiwidHJhY2VFcnJvciIsIkxvZ0xldmVsIiwiRXJyb3IiLCJ0cmFjZUluZm8iLCJvcHRpb25zIiwiTm9uZSIsImxvZ0xldmVsIiwiXyIsIl9fIiwiZGVzY3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwid3JpdGVTdWNjZXNzIiwid3JpdGVUb0xvZyIsIndyaXRlRXJyb3IiLCJ1bmRlZmluZWQiLCJtZXNzYWdlc1RvTG9nIiwicHVzaCIsInJlc3VsdCIsImFwcGx5IiwidGhlbiIsImNhdGNoIiwiZGF0YSIsIlByb21pc2UiLCJyZWplY3QiXSwibWFwcGluZ3MiOiJB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Q1EsS0FBZixDQUFxQixJQUFyQixFQUEyQmpDLElBQTNCLENBQWYsQ0FGQSxDQUdBO0FBQ0E7O0FBQ0EsWUFBSWdDLE1BQU0sSUFBSSxPQUFPQSxNQUFNLENBQUNFLElBQWQsS0FBdUIsVUFBakMsSUFBK0MsT0FBT0YsTUFBTSxDQUFDRyxLQUFkLEtBQXdCLFVBQTNFLEVBQXVGO0FBQ25GO0FBQ0FILFVBQUFBLE1BQU0sQ0FDREUsSUFETCxDQUNVRSxJQUFJLElBQUk7QUFDZFYsWUFBQUEsWUFBWSxDQUFDVSxJQUFELENBQVo7QUFDQSxtQkFBT0EsSUFBUDtBQUNILFdBSkQsRUFLS0QsS0FMTCxDQUtXM0MsRUFBRSxJQUFJO0FBQ2JvQyxZQUFBQSxVQUFVLENBQUNwQyxFQUFELENBQVY7QUFDQSxtQkFBTzZDLE9BQU8sQ0FBQ0MsTUFBUixDQUFlOUMsRUFBZixDQUFQO0FBQ0gsV0FSRDtBQVNILFNBWEQsTUFZSztBQUNEa0MsVUFBQUEsWUFBWSxDQUFDTSxNQUFELENBQVo7QUFDSDs7QUFDRCxlQUFPQSxNQUFQO0FBQ0gsT0FyQkQsQ0FzQkEsT0FBT3hDLEVBQVAsRUFBVztBQUNQb0MsUUFBQUEsVUFBVSxDQUFDcEMsRUFBRCxDQUFWO0FBQ0EsY0FBTUEsRUFBTjtBQUNIO0FBQ0osS0FyREQ7O0FBc0RBLFdBQU9nQyxVQUFQO0FBQ0gsR0ExREQ7QUEyREgiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHRzbGludDpkaXNhYmxlOm5vLWNvbnNvbGVcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMb2dnZXJfMTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5jb25zdCBQUkVGSVggPSAnUHl0aG9uIEV4dGVuc2lvbjogJztcbmxldCBMb2dnZXIgPSBMb2dnZXJfMSA9IGNsYXNzIExvZ2dlciB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHN0YXRpYyBlcnJvcih0aXRsZSA9ICcnLCBtZXNzYWdlKSB7XG4gICAgICAgIG5ldyBMb2dnZXJfMSgpLmxvZ0Vycm9yKGAke3RpdGxlfSwgJHttZXNzYWdlfWApO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgc3RhdGljIHdhcm4odGl0bGUgPSAnJywgbWVzc2FnZSA9ICcnKSB7XG4gICAgICAgIG5ldyBMb2dnZXJfMSgpLmxvZ1dhcm5pbmcoYCR7dGl0bGV9LCAke21lc3NhZ2V9YCk7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBzdGF0aWMgdmVyYm9zZSh0aXRsZSA9ICcnKSB7XG4gICAgICAgIG5ldyBMb2dnZXJfMSgpLmxvZ0luZm9ybWF0aW9uKHRpdGxlKTtcbiAgICB9XG4gICAgbG9nRXJyb3IobWVzc2FnZSwgZXgpIHtcbiAgICAgICAgaWYgKGV4KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke1BSRUZJWH0ke21lc3NhZ2V9YCwgZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtQUkVGSVh9JHttZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvZ1dhcm5pbmcobWVzc2FnZSwgZXgpIHtcbiAgICAgICAgaWYgKGV4KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7UFJFRklYfSR7bWVzc2FnZX1gLCBleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7UFJFRklYfSR7bWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2dJbmZvcm1hdGlvbihtZXNzYWdlLCBleCkge1xuICAgICAgICBpZiAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHtQUkVGSVh9JHttZXNzYWdlfWAsIGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHtQUkVGSVh9JHttZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIGhlbHBlcnNfMS5za2lwSWZUZXN0KGZhbHNlKVxuXSwgTG9nZ2VyLnByb3RvdHlwZSwgXCJsb2dFcnJvclwiLCBudWxsKTtcbl9fZGVjb3JhdGUoW1xuICAgIGhlbHBlcnNfMS5za2lwSWZUZXN0KGZhbHNlKVxuXSwgTG9nZ2VyLnByb3RvdHlwZSwgXCJsb2dXYXJuaW5nXCIsIG51bGwpO1xuX19kZWNvcmF0ZShbXG4gICAgaGVscGVyc18xLnNraXBJZlRlc3QoZmFsc2UpXG5dLCBMb2dnZXIucHJvdG90eXBlLCBcImxvZ0luZm9ybWF0aW9uXCIsIG51bGwpO1xuTG9nZ2VyID0gTG9nZ2VyXzEgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKClcbl0sIExvZ2dlcik7XG5leHBvcnRzLkxvZ2dlciA9IExvZ2dlcjtcbnZhciBMb2dPcHRpb25zO1xuKGZ1bmN0aW9uIChMb2dPcHRpb25zKSB7XG4gICAgTG9nT3B0aW9uc1tMb2dPcHRpb25zW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XG4gICAgTG9nT3B0aW9uc1tMb2dPcHRpb25zW1wiQXJndW1lbnRzXCJdID0gMV0gPSBcIkFyZ3VtZW50c1wiO1xuICAgIExvZ09wdGlvbnNbTG9nT3B0aW9uc1tcIlJldHVyblZhbHVlXCJdID0gMl0gPSBcIlJldHVyblZhbHVlXCI7XG59KShMb2dPcHRpb25zIHx8IChMb2dPcHRpb25zID0ge30pKTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmZ1bmN0aW9uIGFyZ3NUb0xvZ1N0cmluZyhhcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIChhcmdzIHx8IFtdKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgQXJnICR7aW5kZXggKyAxfTogJHtKU09OLnN0cmluZ2lmeShpdGVtKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBBcmcgJHtpbmRleCArIDF9OiBVTkFCTEUgVE8gREVURVJNSU5FIFZBTFVFYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5mdW5jdGlvbiByZXR1cm5WYWx1ZVRvTG9nU3RyaW5nKHJldHVyblZhbHVlKSB7XG4gICAgbGV0IHJldHVyblZhbHVlTWVzc2FnZSA9ICdSZXR1cm4gVmFsdWU6ICc7XG4gICAgaWYgKHJldHVyblZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZU1lc3NhZ2UgKz0gYCR7SlNPTi5zdHJpbmdpZnkocmV0dXJuVmFsdWUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZU1lc3NhZ2UgKz0gJ1VOQUJMRSBUTyBERVRFUk1JTkUgVkFMVUUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZU1lc3NhZ2U7XG59XG5mdW5jdGlvbiB0cmFjZVZlcmJvc2UobWVzc2FnZSkge1xuICAgIHJldHVybiB0cmFjZShtZXNzYWdlLCBMb2dPcHRpb25zLkFyZ3VtZW50cyB8IExvZ09wdGlvbnMuUmV0dXJuVmFsdWUpO1xufVxuZXhwb3J0cy50cmFjZVZlcmJvc2UgPSB0cmFjZVZlcmJvc2U7XG5mdW5jdGlvbiB0cmFjZUVycm9yKG1lc3NhZ2UsIGV4KSB7XG4gICAgcmV0dXJuIHRyYWNlKG1lc3NhZ2UsIExvZ09wdGlvbnMuQXJndW1lbnRzIHwgTG9nT3B0aW9ucy5SZXR1cm5WYWx1ZSwgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvcik7XG59XG5leHBvcnRzLnRyYWNlRXJyb3IgPSB0cmFjZUVycm9yO1xuZnVuY3Rpb24gdHJhY2VJbmZvKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gdHJhY2UobWVzc2FnZSk7XG59XG5leHBvcnRzLnRyYWNlSW5mbyA9IHRyYWNlSW5mbztcbmZ1bmN0aW9uIHRyYWNlKG1lc3NhZ2UsIG9wdGlvbnMgPSBMb2dPcHRpb25zLk5vbmUsIGxvZ0xldmVsKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWV4cHJlc3Npb24gbm8tYW55XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChfLCBfXywgZGVzY3JpcHRvcikge1xuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1leHByZXNzaW9uIG5vLWFueVxuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlU3VjY2VzcyhyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChsb2dMZXZlbCA9PT0gdHlwZXNfMS5Mb2dMZXZlbC5FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdyaXRlVG9Mb2cocmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gd3JpdGVFcnJvcihleCkge1xuICAgICAgICAgICAgICAgIHdyaXRlVG9Mb2codW5kZWZpbmVkLCBleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZVRvTG9nKHJldHVyblZhbHVlLCBleCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VzVG9Mb2cgPSBbbWVzc2FnZV07XG4gICAgICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIExvZ09wdGlvbnMuQXJndW1lbnRzKSA9PT0gTG9nT3B0aW9ucy5Bcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNUb0xvZy5wdXNoKGFyZ3NUb0xvZ1N0cmluZyhhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgob3B0aW9ucyAmIExvZ09wdGlvbnMuUmV0dXJuVmFsdWUpID09PSBMb2dPcHRpb25zLlJldHVyblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzVG9Mb2cucHVzaChyZXR1cm5WYWx1ZVRvTG9nU3RyaW5nKHJldHVyblZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChleCkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgTG9nZ2VyKCkubG9nRXJyb3IobWVzc2FnZXNUb0xvZy5qb2luKCcsICcpLCBleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXcgTG9nZ2VyKCkubG9nSW5mb3JtYXRpb24obWVzc2FnZXNUb0xvZy5qb2luKCcsICcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnZhbGlkLXRoaXMgbm8tdXNlLWJlZm9yZS1kZWNsYXJlIG5vLXVuc2FmZS1hbnlcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAvLyBJZiBtZXRob2QgYmVpbmcgd3JhcHBlZCByZXR1cm5zIGEgcHJvbWlzZSB0aGVuIHdhaXQgZm9yIGl0LlxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHJlc3VsdC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXR5cGUtY2FzdFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVTdWNjZXNzKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVFcnJvcihleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgd3JpdGVFcnJvcihleCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2dnZXIuanMubWFwIl19