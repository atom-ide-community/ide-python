"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const launcherProvider_1 = require("./launcherProvider");

const localDebugClientV2_1 = require("./localDebugClientV2");

const nonDebugClientV2_1 = require("./nonDebugClientV2");

const RemoteDebugClient_1 = require("./RemoteDebugClient");

function CreateLaunchDebugClient(launchRequestOptions, debugSession, canLaunchTerminal) {
  let launchScriptProvider;
  let debugClientClass;

  if (launchRequestOptions.noDebug === true) {
    launchScriptProvider = new launcherProvider_1.NoDebugLauncherScriptProvider();
    debugClientClass = nonDebugClientV2_1.NonDebugClientV2;
  } else {
    launchScriptProvider = new launcherProvider_1.DebuggerLauncherScriptProvider();
    debugClientClass = localDebugClientV2_1.LocalDebugClientV2;
  }

  return new debugClientClass(launchRequestOptions, debugSession, canLaunchTerminal, launchScriptProvider);
}

exports.CreateLaunchDebugClient = CreateLaunchDebugClient;

function CreateAttachDebugClient(attachRequestOptions, debugSession) {
  return new RemoteDebugClient_1.RemoteDebugClient(attachRequestOptions, debugSession);
}

exports.CreateAttachDebugClient = CreateAttachDebugClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlYnVnRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImxhdW5jaGVyUHJvdmlkZXJfMSIsInJlcXVpcmUiLCJsb2NhbERlYnVnQ2xpZW50VjJfMSIsIm5vbkRlYnVnQ2xpZW50VjJfMSIsIlJlbW90ZURlYnVnQ2xpZW50XzEiLCJDcmVhdGVMYXVuY2hEZWJ1Z0NsaWVudCIsImxhdW5jaFJlcXVlc3RPcHRpb25zIiwiZGVidWdTZXNzaW9uIiwiY2FuTGF1bmNoVGVybWluYWwiLCJsYXVuY2hTY3JpcHRQcm92aWRlciIsImRlYnVnQ2xpZW50Q2xhc3MiLCJub0RlYnVnIiwiTm9EZWJ1Z0xhdW5jaGVyU2NyaXB0UHJvdmlkZXIiLCJOb25EZWJ1Z0NsaWVudFYyIiwiRGVidWdnZXJMYXVuY2hlclNjcmlwdFByb3ZpZGVyIiwiTG9jYWxEZWJ1Z0NsaWVudFYyIiwiQ3JlYXRlQXR0YWNoRGVidWdDbGllbnQiLCJhdHRhY2hSZXF1ZXN0T3B0aW9ucyIsIlJlbW90ZURlYnVnQ2xpZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxrQkFBa0IsR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQWxDOztBQUNBLE1BQU1DLG9CQUFvQixHQUFHRCxPQUFPLENBQUMsc0JBQUQsQ0FBcEM7O0FBQ0EsTUFBTUUsa0JBQWtCLEdBQUdGLE9BQU8sQ0FBQyxvQkFBRCxDQUFsQzs7QUFDQSxNQUFNRyxtQkFBbUIsR0FBR0gsT0FBTyxDQUFDLHFCQUFELENBQW5DOztBQUNBLFNBQVNJLHVCQUFULENBQWlDQyxvQkFBakMsRUFBdURDLFlBQXZELEVBQXFFQyxpQkFBckUsRUFBd0Y7QUFDcEYsTUFBSUMsb0JBQUo7QUFDQSxNQUFJQyxnQkFBSjs7QUFDQSxNQUFJSixvQkFBb0IsQ0FBQ0ssT0FBckIsS0FBaUMsSUFBckMsRUFBMkM7QUFDdkNGLElBQUFBLG9CQUFvQixHQUFHLElBQUlULGtCQUFrQixDQUFDWSw2QkFBdkIsRUFBdkI7QUFDQUYsSUFBQUEsZ0JBQWdCLEdBQUdQLGtCQUFrQixDQUFDVSxnQkFBdEM7QUFDSCxHQUhELE1BSUs7QUFDREosSUFBQUEsb0JBQW9CLEdBQUcsSUFBSVQsa0JBQWtCLENBQUNjLDhCQUF2QixFQUF2QjtBQUNBSixJQUFBQSxnQkFBZ0IsR0FBR1Isb0JBQW9CLENBQUNhLGtCQUF4QztBQUNIOztBQUNELFNBQU8sSUFBSUwsZ0JBQUosQ0FBcUJKLG9CQUFyQixFQUEyQ0MsWUFBM0MsRUFBeURDLGlCQUF6RCxFQUE0RUMsb0JBQTVFLENBQVA7QUFDSDs7QUFDRFgsT0FBTyxDQUFDTyx1QkFBUixHQUFrQ0EsdUJBQWxDOztBQUNBLFNBQVNXLHVCQUFULENBQWlDQyxvQkFBakMsRUFBdURWLFlBQXZELEVBQXFFO0FBQ2pFLFNBQU8sSUFBSUgsbUJBQW1CLENBQUNjLGlCQUF4QixDQUEwQ0Qsb0JBQTFDLEVBQWdFVixZQUFoRSxDQUFQO0FBQ0g7O0FBQ0RULE9BQU8sQ0FBQ2tCLHVCQUFSLEdBQWtDQSx1QkFBbEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxhdW5jaGVyUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2xhdW5jaGVyUHJvdmlkZXJcIik7XG5jb25zdCBsb2NhbERlYnVnQ2xpZW50VjJfMSA9IHJlcXVpcmUoXCIuL2xvY2FsRGVidWdDbGllbnRWMlwiKTtcbmNvbnN0IG5vbkRlYnVnQ2xpZW50VjJfMSA9IHJlcXVpcmUoXCIuL25vbkRlYnVnQ2xpZW50VjJcIik7XG5jb25zdCBSZW1vdGVEZWJ1Z0NsaWVudF8xID0gcmVxdWlyZShcIi4vUmVtb3RlRGVidWdDbGllbnRcIik7XG5mdW5jdGlvbiBDcmVhdGVMYXVuY2hEZWJ1Z0NsaWVudChsYXVuY2hSZXF1ZXN0T3B0aW9ucywgZGVidWdTZXNzaW9uLCBjYW5MYXVuY2hUZXJtaW5hbCkge1xuICAgIGxldCBsYXVuY2hTY3JpcHRQcm92aWRlcjtcbiAgICBsZXQgZGVidWdDbGllbnRDbGFzcztcbiAgICBpZiAobGF1bmNoUmVxdWVzdE9wdGlvbnMubm9EZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBsYXVuY2hTY3JpcHRQcm92aWRlciA9IG5ldyBsYXVuY2hlclByb3ZpZGVyXzEuTm9EZWJ1Z0xhdW5jaGVyU2NyaXB0UHJvdmlkZXIoKTtcbiAgICAgICAgZGVidWdDbGllbnRDbGFzcyA9IG5vbkRlYnVnQ2xpZW50VjJfMS5Ob25EZWJ1Z0NsaWVudFYyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGF1bmNoU2NyaXB0UHJvdmlkZXIgPSBuZXcgbGF1bmNoZXJQcm92aWRlcl8xLkRlYnVnZ2VyTGF1bmNoZXJTY3JpcHRQcm92aWRlcigpO1xuICAgICAgICBkZWJ1Z0NsaWVudENsYXNzID0gbG9jYWxEZWJ1Z0NsaWVudFYyXzEuTG9jYWxEZWJ1Z0NsaWVudFYyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IGRlYnVnQ2xpZW50Q2xhc3MobGF1bmNoUmVxdWVzdE9wdGlvbnMsIGRlYnVnU2Vzc2lvbiwgY2FuTGF1bmNoVGVybWluYWwsIGxhdW5jaFNjcmlwdFByb3ZpZGVyKTtcbn1cbmV4cG9ydHMuQ3JlYXRlTGF1bmNoRGVidWdDbGllbnQgPSBDcmVhdGVMYXVuY2hEZWJ1Z0NsaWVudDtcbmZ1bmN0aW9uIENyZWF0ZUF0dGFjaERlYnVnQ2xpZW50KGF0dGFjaFJlcXVlc3RPcHRpb25zLCBkZWJ1Z1Nlc3Npb24pIHtcbiAgICByZXR1cm4gbmV3IFJlbW90ZURlYnVnQ2xpZW50XzEuUmVtb3RlRGVidWdDbGllbnQoYXR0YWNoUmVxdWVzdE9wdGlvbnMsIGRlYnVnU2Vzc2lvbik7XG59XG5leHBvcnRzLkNyZWF0ZUF0dGFjaERlYnVnQ2xpZW50ID0gQ3JlYXRlQXR0YWNoRGVidWdDbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZWJ1Z0ZhY3RvcnkuanMubWFwIl19