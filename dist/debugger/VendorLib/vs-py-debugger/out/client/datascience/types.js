// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Main interface

exports.IDataScience = Symbol('IDataScience');
exports.IDataScienceCommandListener = Symbol('IDataScienceCommandListener'); // Talks to a jupyter ipython kernel to retrieve data for cells

exports.INotebookServer = Symbol('INotebookServer');
exports.INotebookProcess = Symbol('INotebookProcess');
exports.IJupyterExecution = Symbol('IJupyterAvailablity');
exports.INotebookImporter = Symbol('INotebookImporter');
exports.IHistoryProvider = Symbol('IHistoryProvider');
exports.IHistory = Symbol('IHistory'); // Wraps the vscode API in order to send messages back and forth from a webview

exports.IPostOffice = Symbol('IPostOffice'); // Wraps the vscode CodeLensProvider base class

exports.IDataScienceCodeLensProvider = Symbol('IDataScienceCodeLensProvider'); // Wraps the Code Watcher API

exports.ICodeWatcher = Symbol('ICodeWatcher');
var CellState;

(function (CellState) {
  CellState[CellState["init"] = 0] = "init";
  CellState[CellState["executing"] = 1] = "executing";
  CellState[CellState["finished"] = 2] = "finished";
  CellState[CellState["error"] = 3] = "error";
})(CellState = exports.CellState || (exports.CellState = {}));

exports.ICodeCssGenerator = Symbol('ICodeCssGenerator');
exports.IStatusProvider = Symbol('IStatusProvider');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiSURhdGFTY2llbmNlIiwiU3ltYm9sIiwiSURhdGFTY2llbmNlQ29tbWFuZExpc3RlbmVyIiwiSU5vdGVib29rU2VydmVyIiwiSU5vdGVib29rUHJvY2VzcyIsIklKdXB5dGVyRXhlY3V0aW9uIiwiSU5vdGVib29rSW1wb3J0ZXIiLCJJSGlzdG9yeVByb3ZpZGVyIiwiSUhpc3RvcnkiLCJJUG9zdE9mZmljZSIsIklEYXRhU2NpZW5jZUNvZGVMZW5zUHJvdmlkZXIiLCJJQ29kZVdhdGNoZXIiLCJDZWxsU3RhdGUiLCJJQ29kZUNzc0dlbmVyYXRvciIsIklTdGF0dXNQcm92aWRlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDLEUsQ0FDQTs7QUFDQUQsT0FBTyxDQUFDRSxZQUFSLEdBQXVCQyxNQUFNLENBQUMsY0FBRCxDQUE3QjtBQUNBSCxPQUFPLENBQUNJLDJCQUFSLEdBQXNDRCxNQUFNLENBQUMsNkJBQUQsQ0FBNUMsQyxDQUNBOztBQUNBSCxPQUFPLENBQUNLLGVBQVIsR0FBMEJGLE1BQU0sQ0FBQyxpQkFBRCxDQUFoQztBQUNBSCxPQUFPLENBQUNNLGdCQUFSLEdBQTJCSCxNQUFNLENBQUMsa0JBQUQsQ0FBakM7QUFDQUgsT0FBTyxDQUFDTyxpQkFBUixHQUE0QkosTUFBTSxDQUFDLHFCQUFELENBQWxDO0FBQ0FILE9BQU8sQ0FBQ1EsaUJBQVIsR0FBNEJMLE1BQU0sQ0FBQyxtQkFBRCxDQUFsQztBQUNBSCxPQUFPLENBQUNTLGdCQUFSLEdBQTJCTixNQUFNLENBQUMsa0JBQUQsQ0FBakM7QUFDQUgsT0FBTyxDQUFDVSxRQUFSLEdBQW1CUCxNQUFNLENBQUMsVUFBRCxDQUF6QixDLENBQ0E7O0FBQ0FILE9BQU8sQ0FBQ1csV0FBUixHQUFzQlIsTUFBTSxDQUFDLGFBQUQsQ0FBNUIsQyxDQUNBOztBQUNBSCxPQUFPLENBQUNZLDRCQUFSLEdBQXVDVCxNQUFNLENBQUMsOEJBQUQsQ0FBN0MsQyxDQUNBOztBQUNBSCxPQUFPLENBQUNhLFlBQVIsR0FBdUJWLE1BQU0sQ0FBQyxjQUFELENBQTdCO0FBQ0EsSUFBSVcsU0FBSjs7QUFDQSxDQUFDLFVBQVVBLFNBQVYsRUFBcUI7QUFDbEJBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixDQUFyQixDQUFULEdBQW1DLE1BQW5DO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFdBQUQsQ0FBVCxHQUF5QixDQUExQixDQUFULEdBQXdDLFdBQXhDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFVBQUQsQ0FBVCxHQUF3QixDQUF6QixDQUFULEdBQXVDLFVBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixDQUF0QixDQUFULEdBQW9DLE9BQXBDO0FBQ0gsQ0FMRCxFQUtHQSxTQUFTLEdBQUdkLE9BQU8sQ0FBQ2MsU0FBUixLQUFzQmQsT0FBTyxDQUFDYyxTQUFSLEdBQW9CLEVBQTFDLENBTGY7O0FBTUFkLE9BQU8sQ0FBQ2UsaUJBQVIsR0FBNEJaLE1BQU0sQ0FBQyxtQkFBRCxDQUFsQztBQUNBSCxPQUFPLENBQUNnQixlQUFSLEdBQTBCYixNQUFNLENBQUMsaUJBQUQsQ0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIE1haW4gaW50ZXJmYWNlXG5leHBvcnRzLklEYXRhU2NpZW5jZSA9IFN5bWJvbCgnSURhdGFTY2llbmNlJyk7XG5leHBvcnRzLklEYXRhU2NpZW5jZUNvbW1hbmRMaXN0ZW5lciA9IFN5bWJvbCgnSURhdGFTY2llbmNlQ29tbWFuZExpc3RlbmVyJyk7XG4vLyBUYWxrcyB0byBhIGp1cHl0ZXIgaXB5dGhvbiBrZXJuZWwgdG8gcmV0cmlldmUgZGF0YSBmb3IgY2VsbHNcbmV4cG9ydHMuSU5vdGVib29rU2VydmVyID0gU3ltYm9sKCdJTm90ZWJvb2tTZXJ2ZXInKTtcbmV4cG9ydHMuSU5vdGVib29rUHJvY2VzcyA9IFN5bWJvbCgnSU5vdGVib29rUHJvY2VzcycpO1xuZXhwb3J0cy5JSnVweXRlckV4ZWN1dGlvbiA9IFN5bWJvbCgnSUp1cHl0ZXJBdmFpbGFibGl0eScpO1xuZXhwb3J0cy5JTm90ZWJvb2tJbXBvcnRlciA9IFN5bWJvbCgnSU5vdGVib29rSW1wb3J0ZXInKTtcbmV4cG9ydHMuSUhpc3RvcnlQcm92aWRlciA9IFN5bWJvbCgnSUhpc3RvcnlQcm92aWRlcicpO1xuZXhwb3J0cy5JSGlzdG9yeSA9IFN5bWJvbCgnSUhpc3RvcnknKTtcbi8vIFdyYXBzIHRoZSB2c2NvZGUgQVBJIGluIG9yZGVyIHRvIHNlbmQgbWVzc2FnZXMgYmFjayBhbmQgZm9ydGggZnJvbSBhIHdlYnZpZXdcbmV4cG9ydHMuSVBvc3RPZmZpY2UgPSBTeW1ib2woJ0lQb3N0T2ZmaWNlJyk7XG4vLyBXcmFwcyB0aGUgdnNjb2RlIENvZGVMZW5zUHJvdmlkZXIgYmFzZSBjbGFzc1xuZXhwb3J0cy5JRGF0YVNjaWVuY2VDb2RlTGVuc1Byb3ZpZGVyID0gU3ltYm9sKCdJRGF0YVNjaWVuY2VDb2RlTGVuc1Byb3ZpZGVyJyk7XG4vLyBXcmFwcyB0aGUgQ29kZSBXYXRjaGVyIEFQSVxuZXhwb3J0cy5JQ29kZVdhdGNoZXIgPSBTeW1ib2woJ0lDb2RlV2F0Y2hlcicpO1xudmFyIENlbGxTdGF0ZTtcbihmdW5jdGlvbiAoQ2VsbFN0YXRlKSB7XG4gICAgQ2VsbFN0YXRlW0NlbGxTdGF0ZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIENlbGxTdGF0ZVtDZWxsU3RhdGVbXCJleGVjdXRpbmdcIl0gPSAxXSA9IFwiZXhlY3V0aW5nXCI7XG4gICAgQ2VsbFN0YXRlW0NlbGxTdGF0ZVtcImZpbmlzaGVkXCJdID0gMl0gPSBcImZpbmlzaGVkXCI7XG4gICAgQ2VsbFN0YXRlW0NlbGxTdGF0ZVtcImVycm9yXCJdID0gM10gPSBcImVycm9yXCI7XG59KShDZWxsU3RhdGUgPSBleHBvcnRzLkNlbGxTdGF0ZSB8fCAoZXhwb3J0cy5DZWxsU3RhdGUgPSB7fSkpO1xuZXhwb3J0cy5JQ29kZUNzc0dlbmVyYXRvciA9IFN5bWJvbCgnSUNvZGVDc3NHZW5lcmF0b3InKTtcbmV4cG9ydHMuSVN0YXR1c1Byb3ZpZGVyID0gU3ltYm9sKCdJU3RhdHVzUHJvdmlkZXInKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCJdfQ==