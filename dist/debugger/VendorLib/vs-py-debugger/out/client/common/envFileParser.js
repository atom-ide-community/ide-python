"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = require("fs-extra");

const pathUtils_1 = require("./platform/pathUtils");

const environment_1 = require("./variables/environment");

exports.IS_WINDOWS = /^win/.test(process.platform);

function parseEnvironmentVariables(contents) {
  if (typeof contents !== 'string' || contents.length === 0) {
    return undefined;
  }

  const env = {};
  contents.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);

    if (match !== null) {
      let value = typeof match[2] === 'string' ? match[2] : '';

      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.replace(/\\n/gm, '\n');
      }

      env[match[1]] = value.replace(/(^['"]|['"]$)/g, '');
    }
  });
  return env;
}

function parseEnvFile(envFile, mergeWithProcessEnvVars = true) {
  const buffer = fs.readFileSync(envFile, 'utf8');
  const env = parseEnvironmentVariables(buffer);
  return mergeWithProcessEnvVars ? mergeEnvVariables(env, process.env) : mergePythonPath(env, process.env.PYTHONPATH);
}

exports.parseEnvFile = parseEnvFile;
/**
 * Merge the target environment variables into the source.
 * Note: The source variables are modified and returned (i.e. it modifies value passed in).
 * @export
 * @param {EnvironmentVariables} targetEnvVars target environment variables.
 * @param {EnvironmentVariables} [sourceEnvVars=process.env] source environment variables (defaults to current process variables).
 * @returns {EnvironmentVariables}
 */

function mergeEnvVariables(targetEnvVars, sourceEnvVars = process.env) {
  const service = new environment_1.EnvironmentVariablesService(new pathUtils_1.PathUtils(exports.IS_WINDOWS));
  service.mergeVariables(sourceEnvVars, targetEnvVars);

  if (sourceEnvVars.PYTHONPATH) {
    service.appendPythonPath(targetEnvVars, sourceEnvVars.PYTHONPATH);
  }

  return targetEnvVars;
}

exports.mergeEnvVariables = mergeEnvVariables;
/**
 * Merge the target PYTHONPATH value into the env variables passed.
 * Note: The env variables passed in are modified and returned (i.e. it modifies value passed in).
 * @export
 * @param {EnvironmentVariables} env target environment variables.
 * @param {string | undefined} [currentPythonPath] PYTHONPATH value.
 * @returns {EnvironmentVariables}
 */

function mergePythonPath(env, currentPythonPath) {
  if (typeof currentPythonPath !== 'string' || currentPythonPath.length === 0) {
    return env;
  }

  const service = new environment_1.EnvironmentVariablesService(new pathUtils_1.PathUtils(exports.IS_WINDOWS));
  service.appendPythonPath(env, currentPythonPath);
  return env;
}

exports.mergePythonPath = mergePythonPath;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudkZpbGVQYXJzZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJmcyIsInJlcXVpcmUiLCJwYXRoVXRpbHNfMSIsImVudmlyb25tZW50XzEiLCJJU19XSU5ET1dTIiwidGVzdCIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsInBhcnNlRW52aXJvbm1lbnRWYXJpYWJsZXMiLCJjb250ZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImVudiIsInNwbGl0IiwiZm9yRWFjaCIsImxpbmUiLCJtYXRjaCIsImNoYXJBdCIsInJlcGxhY2UiLCJwYXJzZUVudkZpbGUiLCJlbnZGaWxlIiwibWVyZ2VXaXRoUHJvY2Vzc0VudlZhcnMiLCJidWZmZXIiLCJyZWFkRmlsZVN5bmMiLCJtZXJnZUVudlZhcmlhYmxlcyIsIm1lcmdlUHl0aG9uUGF0aCIsIlBZVEhPTlBBVEgiLCJ0YXJnZXRFbnZWYXJzIiwic291cmNlRW52VmFycyIsInNlcnZpY2UiLCJFbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UiLCJQYXRoVXRpbHMiLCJtZXJnZVZhcmlhYmxlcyIsImFwcGVuZFB5dGhvblBhdGgiLCJjdXJyZW50UHl0aG9uUGF0aCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsRUFBRSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFsQjs7QUFDQSxNQUFNQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyxzQkFBRCxDQUEzQjs7QUFDQSxNQUFNRSxhQUFhLEdBQUdGLE9BQU8sQ0FBQyx5QkFBRCxDQUE3Qjs7QUFDQUgsT0FBTyxDQUFDTSxVQUFSLEdBQXFCLE9BQU9DLElBQVAsQ0FBWUMsT0FBTyxDQUFDQyxRQUFwQixDQUFyQjs7QUFDQSxTQUFTQyx5QkFBVCxDQUFtQ0Ms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QUFhLENBQUMyQiwyQkFBbEIsQ0FBOEMsSUFBSTVCLFdBQVcsQ0FBQzZCLFNBQWhCLENBQTBCakMsT0FBTyxDQUFDTSxVQUFsQyxDQUE5QyxDQUFoQjtBQUNBeUIsRUFBQUEsT0FBTyxDQUFDSSxnQkFBUixDQUF5QnJCLEdBQXpCLEVBQThCc0IsaUJBQTlCO0FBQ0EsU0FBT3RCLEdBQVA7QUFDSDs7QUFDRGQsT0FBTyxDQUFDMkIsZUFBUixHQUEwQkEsZUFBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcclxuY29uc3QgcGF0aFV0aWxzXzEgPSByZXF1aXJlKFwiLi9wbGF0Zm9ybS9wYXRoVXRpbHNcIik7XHJcbmNvbnN0IGVudmlyb25tZW50XzEgPSByZXF1aXJlKFwiLi92YXJpYWJsZXMvZW52aXJvbm1lbnRcIik7XHJcbmV4cG9ydHMuSVNfV0lORE9XUyA9IC9ed2luLy50ZXN0KHByb2Nlc3MucGxhdGZvcm0pO1xyXG5mdW5jdGlvbiBwYXJzZUVudmlyb25tZW50VmFyaWFibGVzKGNvbnRlbnRzKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbnRlbnRzICE9PSAnc3RyaW5nJyB8fCBjb250ZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZW52ID0ge307XHJcbiAgICBjb250ZW50cy5zcGxpdCgnXFxuJykuZm9yRWFjaChsaW5lID0+IHtcclxuICAgICAgICBjb25zdCBtYXRjaCA9IGxpbmUubWF0Y2goL15cXHMqKFtcXHdcXC5cXC1dKylcXHMqPVxccyooLiopP1xccyokLyk7XHJcbiAgICAgICAgaWYgKG1hdGNoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHR5cGVvZiBtYXRjaFsyXSA9PT0gJ3N0cmluZycgPyBtYXRjaFsyXSA6ICcnO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCAmJiB2YWx1ZS5jaGFyQXQoMCkgPT09ICdcIicgJiYgdmFsdWUuY2hhckF0KHZhbHVlLmxlbmd0aCAtIDEpID09PSAnXCInKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFxuL2dtLCAnXFxuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW52W21hdGNoWzFdXSA9IHZhbHVlLnJlcGxhY2UoLyheWydcIl18WydcIl0kKS9nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZW52O1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlRW52RmlsZShlbnZGaWxlLCBtZXJnZVdpdGhQcm9jZXNzRW52VmFycyA9IHRydWUpIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhlbnZGaWxlLCAndXRmOCcpO1xyXG4gICAgY29uc3QgZW52ID0gcGFyc2VFbnZpcm9ubWVudFZhcmlhYmxlcyhidWZmZXIpO1xyXG4gICAgcmV0dXJuIG1lcmdlV2l0aFByb2Nlc3NFbnZWYXJzID8gbWVyZ2VFbnZWYXJpYWJsZXMoZW52LCBwcm9jZXNzLmVudikgOiBtZXJnZVB5dGhvblBhdGgoZW52LCBwcm9jZXNzLmVudi5QWVRIT05QQVRIKTtcclxufVxyXG5leHBvcnRzLnBhcnNlRW52RmlsZSA9IHBhcnNlRW52RmlsZTtcclxuLyoqXHJcbiAqIE1lcmdlIHRoZSB0YXJnZXQgZW52aXJvbm1lbnQgdmFyaWFibGVzIGludG8gdGhlIHNvdXJjZS5cclxuICogTm90ZTogVGhlIHNvdXJjZSB2YXJpYWJsZXMgYXJlIG1vZGlmaWVkIGFuZCByZXR1cm5lZCAoaS5lLiBpdCBtb2RpZmllcyB2YWx1ZSBwYXNzZWQgaW4pLlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSB7RW52aXJvbm1lbnRWYXJpYWJsZXN9IHRhcmdldEVudlZhcnMgdGFyZ2V0IGVudmlyb25tZW50IHZhcmlhYmxlcy5cclxuICogQHBhcmFtIHtFbnZpcm9ubWVudFZhcmlhYmxlc30gW3NvdXJjZUVudlZhcnM9cHJvY2Vzcy5lbnZdIHNvdXJjZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgKGRlZmF1bHRzIHRvIGN1cnJlbnQgcHJvY2VzcyB2YXJpYWJsZXMpLlxyXG4gKiBAcmV0dXJucyB7RW52aXJvbm1lbnRWYXJpYWJsZXN9XHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUVudlZhcmlhYmxlcyh0YXJnZXRFbnZWYXJzLCBzb3VyY2VFbnZWYXJzID0gcHJvY2Vzcy5lbnYpIHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgZW52aXJvbm1lbnRfMS5FbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UobmV3IHBhdGhVdGlsc18xLlBhdGhVdGlscyhleHBvcnRzLklTX1dJTkRPV1MpKTtcclxuICAgIHNlcnZpY2UubWVyZ2VWYXJpYWJsZXMoc291cmNlRW52VmFycywgdGFyZ2V0RW52VmFycyk7XHJcbiAgICBpZiAoc291cmNlRW52VmFycy5QWVRIT05QQVRIKSB7XHJcbiAgICAgICAgc2VydmljZS5hcHBlbmRQeXRob25QYXRoKHRhcmdldEVudlZhcnMsIHNvdXJjZUVudlZhcnMuUFlUSE9OUEFUSCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0RW52VmFycztcclxufVxyXG5leHBvcnRzLm1lcmdlRW52VmFyaWFibGVzID0gbWVyZ2VFbnZWYXJpYWJsZXM7XHJcbi8qKlxyXG4gKiBNZXJnZSB0aGUgdGFyZ2V0IFBZVEhPTlBBVEggdmFsdWUgaW50byB0aGUgZW52IHZhcmlhYmxlcyBwYXNzZWQuXHJcbiAqIE5vdGU6IFRoZSBlbnYgdmFyaWFibGVzIHBhc3NlZCBpbiBhcmUgbW9kaWZpZWQgYW5kIHJldHVybmVkIChpLmUuIGl0IG1vZGlmaWVzIHZhbHVlIHBhc3NlZCBpbikuXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIHtFbnZpcm9ubWVudFZhcmlhYmxlc30gZW52IHRhcmdldCBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBbY3VycmVudFB5dGhvblBhdGhdIFBZVEhPTlBBVEggdmFsdWUuXHJcbiAqIEByZXR1cm5zIHtFbnZpcm9ubWVudFZhcmlhYmxlc31cclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlUHl0aG9uUGF0aChlbnYsIGN1cnJlbnRQeXRob25QYXRoKSB7XHJcbiAgICBpZiAodHlwZW9mIGN1cnJlbnRQeXRob25QYXRoICE9PSAnc3RyaW5nJyB8fCBjdXJyZW50UHl0aG9uUGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gZW52O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBlbnZpcm9ubWVudF8xLkVudmlyb25tZW50VmFyaWFibGVzU2VydmljZShuZXcgcGF0aFV0aWxzXzEuUGF0aFV0aWxzKGV4cG9ydHMuSVNfV0lORE9XUykpO1xyXG4gICAgc2VydmljZS5hcHBlbmRQeXRob25QYXRoKGVudiwgY3VycmVudFB5dGhvblBhdGgpO1xyXG4gICAgcmV0dXJuIGVudjtcclxufVxyXG5leHBvcnRzLm1lcmdlUHl0aG9uUGF0aCA9IG1lcmdlUHl0aG9uUGF0aDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW52RmlsZVBhcnNlci5qcy5tYXAiXX0=