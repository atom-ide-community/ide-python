// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMPLETION = 'COMPLETION';
exports.COMPLETION_ADD_BRACKETS = 'COMPLETION.ADD_BRACKETS';
exports.DEFINITION = 'DEFINITION';
exports.HOVER_DEFINITION = 'HOVER_DEFINITION';
exports.REFERENCE = 'REFERENCE';
exports.SIGNATURE = 'SIGNATURE';
exports.SYMBOL = 'SYMBOL';
exports.FORMAT_SORT_IMPORTS = 'FORMAT.SORT_IMPORTS';
exports.FORMAT = 'FORMAT.FORMAT';
exports.FORMAT_ON_TYPE = 'FORMAT.FORMAT_ON_TYPE';
exports.EDITOR_LOAD = 'EDITOR.LOAD';
exports.LINTING = 'LINTING';
exports.GO_TO_OBJECT_DEFINITION = 'GO_TO_OBJECT_DEFINITION';
exports.UPDATE_PYSPARK_LIBRARY = 'UPDATE_PYSPARK_LIBRARY';
exports.REFACTOR_RENAME = 'REFACTOR_RENAME';
exports.REFACTOR_EXTRACT_VAR = 'REFACTOR_EXTRACT_VAR';
exports.REFACTOR_EXTRACT_FUNCTION = 'REFACTOR_EXTRACT_FUNCTION';
exports.REPL = 'REPL';
exports.PYTHON_INTERPRETER = 'PYTHON_INTERPRETER';
exports.WORKSPACE_SYMBOLS_BUILD = 'WORKSPACE_SYMBOLS.BUILD';
exports.WORKSPACE_SYMBOLS_GO_TO = 'WORKSPACE_SYMBOLS.GO_TO';
exports.EXECUTION_CODE = 'EXECUTION_CODE';
exports.EXECUTION_DJANGO = 'EXECUTION_DJANGO';
exports.DEBUGGER = 'DEBUGGER';
exports.DEBUGGER_ATTACH_TO_CHILD_PROCESS = 'DEBUGGER.ATTACH_TO_CHILD_PROCESS';
exports.DEBUGGER_PERFORMANCE = 'DEBUGGER.PERFORMANCE';
exports.UNITTEST_STOP = 'UNITTEST.STOP';
exports.UNITTEST_RUN = 'UNITTEST.RUN';
exports.UNITTEST_DISCOVER = 'UNITTEST.DISCOVER';
exports.UNITTEST_VIEW_OUTPUT = 'UNITTEST.VIEW_OUTPUT';
exports.PYTHON_LANGUAGE_SERVER_ANALYSISTIME = 'PYTHON_LANGUAGE_SERVER.ANALYSIS_TIME';
exports.PYTHON_LANGUAGE_SERVER_ENABLED = 'PYTHON_LANGUAGE_SERVER.ENABLED';
exports.PYTHON_LANGUAGE_SERVER_EXTRACTED = 'PYTHON_LANGUAGE_SERVER.EXTRACTED';
exports.PYTHON_LANGUAGE_SERVER_DOWNLOADED = 'PYTHON_LANGUAGE_SERVER.DOWNLOADED';
exports.PYTHON_LANGUAGE_SERVER_ERROR = 'PYTHON_LANGUAGE_SERVER.ERROR';
exports.PYTHON_LANGUAGE_SERVER_STARTUP = 'PYTHON_LANGUAGE_SERVER.STARTUP';
exports.PYTHON_LANGUAGE_SERVER_PLATFORM_NOT_SUPPORTED = 'PYTHON_LANGUAGE_SERVER.PLATFORM_NOT_SUPPORTED';
exports.PYTHON_LANGUAGE_SERVER_TELEMETRY = 'PYTHON_LANGUAGE_SERVER.EVENT';
exports.TERMINAL_CREATE = 'TERMINAL.CREATE';
exports.PYTHON_LANGUAGE_SERVER_LIST_BLOB_STORE_PACKAGES = 'PYTHON_LANGUAGE_SERVER.LIST_BLOB_PACKAGES';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkNPTVBMRVRJT04iLCJDT01QTEVUSU9OX0FERF9CUkFDS0VUUyIsIkRFRklOSVRJT04iLCJIT1ZFUl9ERUZJTklUSU9OIiwiUkVGRVJFTkNFIiwiU0lHTkFUVVJFIiwiU1lNQk9MIiwiRk9STUFUX1NPUlRfSU1QT1JUUyIsIkZPUk1BVCIsIkZPUk1BVF9PTl9UWVBFIiwiRURJVE9SX0xPQUQiLCJMSU5USU5HIiwiR09fVE9fT0JKRUNUX0RFRklOSVRJT04iLCJVUERBVEVfUFlTUEFSS19MSUJSQVJZIiwiUkVGQUNUT1JfUkVOQU1FIiwiUkVGQUNUT1JfRVhUUkFDVF9WQVIiLCJSRUZBQ1RPUl9FWFRSQUNUX0ZVTkNUSU9OIiwiUkVQTCIsIlBZVEhPTl9JTlRFUlBSRVRFUiIsIldPUktTUEFDRV9TWU1CT0xTX0JVSUxEIiwiV09SS1NQQUNFX1NZTUJPTFNfR09fVE8iLCJFWEVDVVRJT05fQ09ERSIsIkVYRUNVVElPTl9ESkFOR08iLCJERUJVR0dFUiIsIkRFQlVHR0VSX0FUVEFDSF9UT19DSElMRF9QUk9DRVNTIiwiREVCVUdHRVJfUEVSRk9STUFOQ0UiLCJVTklUVEVTVF9TVE9QIiwiVU5JVFRFU1RfUlVOIiwiVU5JVFRFU1RfRElTQ09WRVIiLCJVTklUVEVTVF9WSUVXX09VVFBVVCIsIlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfQU5BTFlTSVNUSU1FIiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9FTkFCTEVEIiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9FWFRSQUNURUQiLCJQWVRIT05fTEFOR1VBR0VfU0VSVkVSX0RPV05MT0FERUQiLCJQWVRIT05fTEFOR1VBR0VfU0VSVkVSX0VSUk9SIiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9TVEFSVFVQIiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9QTEFURk9STV9OT1RfU1VQUE9SVEVEIiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9URUxFTUVUUlkiLCJURVJNSU5BTF9DUkVBVEUiLCJQWVRIT05fTEFOR1VBR0VfU0VSVkVSX0xJU1RfQkxPQl9TVE9SRV9QQUNLQUdFUyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDO0FBQ0FELE9BQU8sQ0FBQ0UsVUFBUixHQUFxQixZQUFyQjtBQUNBRixPQUFPLENBQUNHLHVCQUFSLEdBQWtDLHlCQUFsQztBQUNBSCxPQUFPLENBQUNJLFVBQVIsR0FBcUIsWUFBckI7QUFDQUosT0FBTyxDQUFDSyxnQkFBUixHQUEyQixrQkFBM0I7QUFDQUwsT0FBTyxDQUFDTSxTQUFSLEdBQW9CLFdBQXBCO0FBQ0FOLE9BQU8sQ0FBQ08sU0FBUixHQUFvQixXQUFwQjtBQUNBUCxPQUFPLENBQUNRLE1BQVIsR0FBaUIsUUFBakI7QUFDQVIsT0FBTyxDQUFDUyxtQkFBUixHQUE4QixxQkFBOUI7QUFDQVQsT0FBTyxDQUFDVSxNQUFSLEdBQWlCLGVBQWpCO0FBQ0FWLE9BQU8sQ0FBQ1csY0FBUixHQUF5Qix1QkFBekI7QUFDQVgsT0FBTyxDQUFDWSxXQUFSLEdBQXNCLGFBQXRCO0FBQ0FaLE9BQU8sQ0FBQ2EsT0FBUixHQUFrQixTQUFsQjtBQUNBYixPQUFPLENBQUNjLHVCQUFSLEdBQWtDLHlCQUFsQztBQUNBZCxPQUFPLENBQUNlLHNCQUFSLEdBQWlDLHdCQUFqQztBQUNBZixPQUFPLENBQUNnQixlQUFSLEdBQTBCLGlCQUExQjtBQUNBaEIsT0FBTyxDQUFDaUIsb0JBQVIsR0FBK0Isc0JBQS9CO0FBQ0FqQixPQUFPLENBQUNrQix5QkFBUixHQUFvQywyQkFBcEM7QUFDQWxCLE9BQU8sQ0FBQ21CLElBQVIsR0FBZSxNQUFmO0FBQ0FuQixPQUFPLENBQUNvQixrQkFBUixHQUE2QixvQkFBN0I7QUFDQXBCLE9BQU8sQ0FBQ3FCLHVCQUFSLEdBQWtDLHlCQUFsQztBQUNBckIsT0FBTyxDQUFDc0IsdUJBQVIsR0FBa0MseUJBQWxDO0FBQ0F0QixPQUFPLENBQUN1QixjQUFSLEdBQXlCLGdCQUF6QjtBQUNBdkIsT0FBTyxDQUFDd0IsZ0JBQVIsR0FBMkIsa0JBQTNCO0FBQ0F4QixPQUFPLENBQUN5QixRQUFSLEdBQW1CLFVBQW5CO0FBQ0F6QixPQUFPLENBQUMwQixnQ0FBUixHQUEyQyxrQ0FBM0M7QUFDQTFCLE9BQU8sQ0FBQzJCLG9CQUFSLEdBQStCLHNCQUEvQjtBQUNBM0IsT0FBTyxDQUFDNEIsYUFBUixHQUF3QixlQUF4QjtBQUNBNUIsT0FBTyxDQUFDNkIsWUFBUixHQUF1QixjQUF2QjtBQUNBN0IsT0FBTyxDQUFDOEIsaUJBQVIsR0FBNEIsbUJBQTVCO0FBQ0E5QixPQUFPLENBQUMrQixvQkFBUixHQUErQixzQkFBL0I7QUFDQS9CLE9BQU8sQ0FBQ2dDLG1DQUFSLEdBQThDLHNDQUE5QztBQUNBaEMsT0FBTyxDQUFDaUMsOEJBQVIsR0FBeUMsZ0NBQXpDO0FBQ0FqQyxPQUFPLENBQUNrQyxnQ0FBUixHQUEyQyxrQ0FBM0M7QUFDQWxDLE9BQU8sQ0FBQ21DLGlDQUFSLEdBQTRDLG1DQUE1QztBQUNBbkMsT0FBTyxDQUFDb0MsNEJBQVIsR0FBdUMsOEJBQXZDO0FBQ0FwQyxPQUFPLENBQUNxQyw4QkFBUixHQUF5QyxnQ0FBekM7QUFDQXJDLE9BQU8sQ0FBQ3NDLDZDQUFSLEdBQXdELCtDQUF4RDtBQUNBdEMsT0FBTyxDQUFDdUMsZ0NBQVIsR0FBMkMsOEJBQTNDO0FBQ0F2QyxPQUFPLENBQUN3QyxlQUFSLEdBQTBCLGlCQUExQjtBQUNBeEMsT0FBTyxDQUFDeUMsK0NBQVIsR0FBMEQsMkNBQTFEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4ndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNPTVBMRVRJT04gPSAnQ09NUExFVElPTic7XG5leHBvcnRzLkNPTVBMRVRJT05fQUREX0JSQUNLRVRTID0gJ0NPTVBMRVRJT04uQUREX0JSQUNLRVRTJztcbmV4cG9ydHMuREVGSU5JVElPTiA9ICdERUZJTklUSU9OJztcbmV4cG9ydHMuSE9WRVJfREVGSU5JVElPTiA9ICdIT1ZFUl9ERUZJTklUSU9OJztcbmV4cG9ydHMuUkVGRVJFTkNFID0gJ1JFRkVSRU5DRSc7XG5leHBvcnRzLlNJR05BVFVSRSA9ICdTSUdOQVRVUkUnO1xuZXhwb3J0cy5TWU1CT0wgPSAnU1lNQk9MJztcbmV4cG9ydHMuRk9STUFUX1NPUlRfSU1QT1JUUyA9ICdGT1JNQVQuU09SVF9JTVBPUlRTJztcbmV4cG9ydHMuRk9STUFUID0gJ0ZPUk1BVC5GT1JNQVQnO1xuZXhwb3J0cy5GT1JNQVRfT05fVFlQRSA9ICdGT1JNQVQuRk9STUFUX09OX1RZUEUnO1xuZXhwb3J0cy5FRElUT1JfTE9BRCA9ICdFRElUT1IuTE9BRCc7XG5leHBvcnRzLkxJTlRJTkcgPSAnTElOVElORyc7XG5leHBvcnRzLkdPX1RPX09CSkVDVF9ERUZJTklUSU9OID0gJ0dPX1RPX09CSkVDVF9ERUZJTklUSU9OJztcbmV4cG9ydHMuVVBEQVRFX1BZU1BBUktfTElCUkFSWSA9ICdVUERBVEVfUFlTUEFSS19MSUJSQVJZJztcbmV4cG9ydHMuUkVGQUNUT1JfUkVOQU1FID0gJ1JFRkFDVE9SX1JFTkFNRSc7XG5leHBvcnRzLlJFRkFDVE9SX0VYVFJBQ1RfVkFSID0gJ1JFRkFDVE9SX0VYVFJBQ1RfVkFSJztcbmV4cG9ydHMuUkVGQUNUT1JfRVhUUkFDVF9GVU5DVElPTiA9ICdSRUZBQ1RPUl9FWFRSQUNUX0ZVTkNUSU9OJztcbmV4cG9ydHMuUkVQTCA9ICdSRVBMJztcbmV4cG9ydHMuUFlUSE9OX0lOVEVSUFJFVEVSID0gJ1BZVEhPTl9JTlRFUlBSRVRFUic7XG5leHBvcnRzLldPUktTUEFDRV9TWU1CT0xTX0JVSUxEID0gJ1dPUktTUEFDRV9TWU1CT0xTLkJVSUxEJztcbmV4cG9ydHMuV09SS1NQQUNFX1NZTUJPTFNfR09fVE8gPSAnV09SS1NQQUNFX1NZTUJPTFMuR09fVE8nO1xuZXhwb3J0cy5FWEVDVVRJT05fQ09ERSA9ICdFWEVDVVRJT05fQ09ERSc7XG5leHBvcnRzLkVYRUNVVElPTl9ESkFOR08gPSAnRVhFQ1VUSU9OX0RKQU5HTyc7XG5leHBvcnRzLkRFQlVHR0VSID0gJ0RFQlVHR0VSJztcbmV4cG9ydHMuREVCVUdHRVJfQVRUQUNIX1RPX0NISUxEX1BST0NFU1MgPSAnREVCVUdHRVIuQVRUQUNIX1RPX0NISUxEX1BST0NFU1MnO1xuZXhwb3J0cy5ERUJVR0dFUl9QRVJGT1JNQU5DRSA9ICdERUJVR0dFUi5QRVJGT1JNQU5DRSc7XG5leHBvcnRzLlVOSVRURVNUX1NUT1AgPSAnVU5JVFRFU1QuU1RPUCc7XG5leHBvcnRzLlVOSVRURVNUX1JVTiA9ICdVTklUVEVTVC5SVU4nO1xuZXhwb3J0cy5VTklUVEVTVF9ESVNDT1ZFUiA9ICdVTklUVEVTVC5ESVNDT1ZFUic7XG5leHBvcnRzLlVOSVRURVNUX1ZJRVdfT1VUUFVUID0gJ1VOSVRURVNULlZJRVdfT1VUUFVUJztcbmV4cG9ydHMuUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9BTkFMWVNJU1RJTUUgPSAnUFlUSE9OX0xBTkdVQUdFX1NFUlZFUi5BTkFMWVNJU19USU1FJztcbmV4cG9ydHMuUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9FTkFCTEVEID0gJ1BZVEhPTl9MQU5HVUFHRV9TRVJWRVIuRU5BQkxFRCc7XG5leHBvcnRzLlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfRVhUUkFDVEVEID0gJ1BZVEhPTl9MQU5HVUFHRV9TRVJWRVIuRVhUUkFDVEVEJztcbmV4cG9ydHMuUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9ET1dOTE9BREVEID0gJ1BZVEhPTl9MQU5HVUFHRV9TRVJWRVIuRE9XTkxPQURFRCc7XG5leHBvcnRzLlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfRVJST1IgPSAnUFlUSE9OX0xBTkdVQUdFX1NFUlZFUi5FUlJPUic7XG5leHBvcnRzLlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfU1RBUlRVUCA9ICdQWVRIT05fTEFOR1VBR0VfU0VSVkVSLlNUQVJUVVAnO1xuZXhwb3J0cy5QWVRIT05fTEFOR1VBR0VfU0VSVkVSX1BMQVRGT1JNX05PVF9TVVBQT1JURUQgPSAnUFlUSE9OX0xBTkdVQUdFX1NFUlZFUi5QTEFURk9STV9OT1RfU1VQUE9SVEVEJztcbmV4cG9ydHMuUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9URUxFTUVUUlkgPSAnUFlUSE9OX0xBTkdVQUdFX1NFUlZFUi5FVkVOVCc7XG5leHBvcnRzLlRFUk1JTkFMX0NSRUFURSA9ICdURVJNSU5BTC5DUkVBVEUnO1xuZXhwb3J0cy5QWVRIT05fTEFOR1VBR0VfU0VSVkVSX0xJU1RfQkxPQl9TVE9SRV9QQUNLQUdFUyA9ICdQWVRIT05fTEFOR1VBR0VfU0VSVkVSLkxJU1RfQkxPQl9QQUNLQUdFUyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIl19