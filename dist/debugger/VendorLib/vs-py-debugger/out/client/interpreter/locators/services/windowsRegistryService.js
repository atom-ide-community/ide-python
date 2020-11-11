"use strict";

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

const fs = require("fs-extra");

const inversify_1 = require("inversify");

const _ = require("lodash");

const path = require("path");

const types_1 = require("../../../common/platform/types");

const types_2 = require("../../../common/types");

const platform_1 = require("../../../common/utils/platform");

const types_3 = require("../../../ioc/types");

const contracts_1 = require("../../contracts");

const cacheableLocatorService_1 = require("./cacheableLocatorService");

const conda_1 = require("./conda"); // tslint:disable-next-line:variable-name


const DefaultPythonExecutable = 'python.exe'; // tslint:disable-next-line:variable-name

const CompaniesToIgnore = ['PYLAUNCHER']; // tslint:disable-next-line:variable-name

const PythonCoreCompanyDisplayName = 'Python Software Foundation'; // tslint:disable-next-line:variable-name

const PythonCoreComany = 'PYTHONCORE';
let WindowsRegistryService = class WindowsRegistryService extends cacheableLocatorService_1.CacheableLocatorService {
  constructor(registry, is64Bit, serviceContainer) {
    super('WindowsRegistryService', serviceContainer);
    this.registry = registry;
    this.is64Bit = is64Bit;
    this.pathUtils = serviceContainer.get(types_2.IPathUtils);
  } // tslint:disable-next-line:no-empty


  dispose() {}

  getInterpretersImplementation(resource) {
    return this.getInterpretersFromRegistry();
  }

  getInterpretersFromRegistry() {
    return __awaiter(this, void 0, void 0, function* () {
      // https://github.com/python/peps/blob/master/pep-0514.txt#L357
      const hkcuArch = this.is64Bit ? undefined : platform_1.Architecture.x86;
      const promises = [this.getCompanies(types_1.RegistryHive.HKCU, hkcuArch), this.getCompanies(types_1.RegistryHive.HKLM, platform_1.Architecture.x86)]; // https://github.com/Microsoft/PTVS/blob/ebfc4ca8bab234d453f15ee426af3b208f3c143c/Python/Product/Cookiecutter/Shared/Interpreters/PythonRegistrySearch.cs#L44

      if (this.is64Bit) {
        promises.push(this.getCompanies(types_1.RegistryHive.HKLM, platform_1.Architecture.x64));
      }

      const companies = yield Promise.all(promises); // tslint:disable-next-line:underscore-consistent-invocation

      const companyInterpreters = yield Promise.all(_.flatten(companies).filter(item => item !== undefined && item !== null).map(company => {
        return this.getInterpretersForCompany(company.companyKey, company.hive, company.arch);
      })); // tslint:disable-next-line:underscore-consistent-invocation

      return _.flatten(companyInterpreters).filter(item => item !== undefined && item !== null) // tslint:disable-next-line:no-non-null-assertion
      .map(item => item).reduce((prev, current) => {
        if (prev.findIndex(item => item.path.toUpperCase() === current.path.toUpperCase()) === -1) {
          prev.push(current);
        }

        return prev;
      }, []);
    });
  }

  getCompanies(hive, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.registry.getKeys('\\Software\\Python', hive, arch).then(companyKeys => companyKeys.filter(companyKey => CompaniesToIgnore.indexOf(this.pathUtils.basename(companyKey).toUpperCase()) === -1).map(companyKey => {
        return {
          companyKey,
          hive,
          arch
        };
      }));
    });
  }

  getInterpretersForCompany(companyKey, hive, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      const tagKeys = yield this.registry.getKeys(companyKey, hive, arch);
      return Promise.all(tagKeys.map(tagKey => this.getInreterpreterDetailsForCompany(tagKey, companyKey, hive, arch)));
    });
  }

  getInreterpreterDetailsForCompany(tagKey, companyKey, hive, arch) {
    const key = `${tagKey}\\InstallPath`;
    return this.registry.getValue(key, hive, arch).then(installPath => {
      // Install path is mandatory.
      if (!installPath) {
        return Promise.resolve(null);
      } // Check if 'ExecutablePath' exists.
      // Remember Python 2.7 doesn't have 'ExecutablePath' (there could be others).
      // Treat all other values as optional.


      return Promise.all([Promise.resolve(installPath), this.registry.getValue(key, hive, arch, 'ExecutablePath'), this.registry.getValue(tagKey, hive, arch, 'SysVersion'), this.getCompanyDisplayName(companyKey, hive, arch)]).then(([installedPath, executablePath, version, companyDisplayName]) => {
        companyDisplayName = conda_1.AnacondaCompanyNames.indexOf(companyDisplayName) === -1 ? companyDisplayName : conda_1.AnacondaCompanyName; // tslint:disable-next-line:prefer-type-cast no-object-literal-type-assertion

        return {
          installPath: installedPath,
          executablePath,
          version,
          companyDisplayName
        };
      });
    }).then(interpreterInfo => __awaiter(this, void 0, void 0, function* () {
      if (!interpreterInfo) {
        return;
      }

      const executablePath = interpreterInfo.executablePath && interpreterInfo.executablePath.length > 0 ? interpreterInfo.executablePath : path.join(interpreterInfo.installPath, DefaultPythonExecutable);
      const helper = this.serviceContainer.get(contracts_1.IInterpreterHelper);
      const details = yield helper.getInterpreterInformation(executablePath);

      if (!details) {
        return;
      }

      const version = interpreterInfo.version ? this.pathUtils.basename(interpreterInfo.version) : this.pathUtils.basename(tagKey); // tslint:disable-next-line:prefer-type-cast no-object-literal-type-assertion

      return Object.assign({}, details, {
        path: executablePath,
        version,
        companyDisplayName: interpreterInfo.companyDisplayName,
        type: contracts_1.InterpreterType.Unknown
      });
    })).then(interpreter => interpreter ? fs.pathExists(interpreter.path).catch(() => false).then(exists => exists ? interpreter : null) : null).catch(error => {
      console.error(`Failed to retrieve interpreter details for company ${companyKey},tag: ${tagKey}, hive: ${hive}, arch: ${arch}`);
      console.error(error);
      return null;
    });
  }

  getCompanyDisplayName(companyKey, hive, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      const displayName = yield this.registry.getValue(companyKey, hive, arch, 'DisplayName');

      if (displayName && displayName.length > 0) {
        return displayName;
      }

      const company = this.pathUtils.basename(companyKey);
      return company.toUpperCase() === PythonCoreComany ? PythonCoreCompanyDisplayName : company;
    });
  }

};
WindowsRegistryService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IRegistry)), __param(1, inversify_1.inject(types_2.Is64Bit)), __param(2, inversify_1.inject(types_3.IServiceContainer))], WindowsRegistryService);
exports.WindowsRegistryService = WindowsRegistryService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpbmRvd3NSZWdpc3RyeVNlcnZpY2UuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImZzIiwicmVxdWlyZSIsImludmVyc2lmeV8xIiwiXyIsInBhdGgiLCJ0eXBlc18xIiwidHlwZXNfMiIsInBsYXRmb3JtXzEiLCJ0eXBlc18zIiwiY29udHJhY3RzXzEiLCJjYWNoZWFibGVMb2NhdG9yU2VydmljZV8xIiwiY29uZGFfMSIsIkRlZmF1bHRQeXRob25FeGVjdXRhYmxlIiwiQ29tcGFuaWVzVG9JZ25vcmUiLCJQeXRob25Db3JlQ29tcGFueURpc3BsYXlOYW1lIiwiUHl0aG9uQ29yZUNvbWFueSIsIldpbmRvd3NSZWdpc3RyeVNlcnZpY2UiLCJDYWNoZWFibGVMb2NhdG9yU2VydmljZSIsImNvbnN0cnVjdG9yIiwicmVnaXN0cnkiLCJpczY0Qml0Iiwic2VydmljZUNvbnRhaW5lciIsInBhdGhVdGlscyIsImdldCIsIklQYXRoVXRpbHMiLCJkaXNwb3NlIiwiZ2V0SW50ZXJwcmV0ZXJzSW1wbGVtZW50YXRpb24iLCJyZXNvdXJjZSIsImdldEludGVycHJldGVyc0Zyb21SZWdpc3RyeSIsImhrY3VBcmNoIiwidW5kZWZpbmVkIiwiQXJjaGl0ZWN0dXJlIiwieDg2IiwicHJvbWlzZXMiLCJnZXRDb21wYW5pZXMiLCJSZWdpc3RyeUhpdmUiLCJIS0NVIiwiSEtMTSIsInB1c2giLCJ4NjQiLCJjb21wYW5pZXMiLCJhbGwiLCJjb21wYW55SW50ZXJwcmV0ZXJzIiwiZmxhdHRlbiIsImZpbHRlciIsIml0ZW0iLCJtYXAiLCJjb21wYW55IiwiZ2V0SW50ZXJwcmV0ZXJzRm9yQ29tcGFueSIsImNvbXBhbnlLZXkiLCJoaXZlIiwiYXJjaCIsInJlZHVjZSIsInByZXYiLCJjdXJyZW50IiwiZmluZEluZGV4IiwidG9VcHBlckNhc2UiLCJnZXRLZXlzIiwiY29tcGFueUtleXMiLCJpbmRleE9mIiwiYmFzZW5hbWUiLCJ0YWdLZXlzIiwidGFnS2V5IiwiZ2V0SW5yZXRlcnByZXRlckRldGFpbHNGb3JDb21wYW55IiwiZ2V0VmFsdWUiLCJpbnN0YWxsUGF0aCIsImdldENvbXBhbnlEaXNwbGF5TmFtZSIsImluc3RhbGxlZFBhdGgiLCJleGVjdXRhYmxlUGF0aCIsInZlcnNpb24iLCJjb21wYW55RGlzcGxheU5hbWUiLCJBbmFjb25kYUNvbXBhbnlOYW1lcyIsIkFuYWNvbmRhQ29tcGFueU5hbWUiLCJpbnRlcnByZXRlckluZm8iLCJqb2luIiwiaGVscGVyIiwiSUludGVycHJldGVySGVscGVyIiwiZGV0YWlscyIsImdldEludGVycHJldGVySW5mb3JtYXRpb24iLCJhc3NpZ24iLCJ0eXBlIiwiSW50ZXJwcmV0ZXJUeXBlIiwiVW5rbm93biIsImludGVycHJldGVyIiwicGF0aEV4aXN0cyIsImNhdGNoIiwiZXhpc3RzIiwiZXJyb3IiLCJjb25zb2xlIiwiZGlzcGxheU5hbWUiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVJlZ2lzdHJ5IiwiSXM2NEJpdCIsIklTZXJ2aWNlQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVB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LENBQWhCO0FBQ0EsYUFBT0YsT0FBTyxDQUFDUyxXQUFSLE9BQTBCekMsZ0JBQTFCLEdBQTZDRCw0QkFBN0MsR0FBNEVpQyxPQUFuRjtBQUNILEtBUGUsQ0FBaEI7QUFRSDs7QUFqSCtHLENBQXBIO0FBbUhBL0Isc0JBQXNCLEdBQUd0RCxVQUFVLENBQUMsQ0FDaEN3QyxXQUFXLENBQUN3RixVQUFaLEVBRGdDLEVBRWhDaEgsT0FBTyxDQUFDLENBQUQsRUFBSXdCLFdBQVcsQ0FBQ3lGLE1BQVosQ0FBbUJ0RixPQUFPLENBQUN1RixTQUEzQixDQUFKLENBRnlCLEVBR2hDbEgsT0FBTyxDQUFDLENBQUQsRUFBSXdCLFdBQVcsQ0FBQ3lGLE1BQVosQ0FBbUJyRixPQUFPLENBQUN1RixPQUEzQixDQUFKLENBSHlCLEVBSWhDbkgsT0FBTyxDQUFDLENBQUQsRUFBSXdCLFdBQVcsQ0FBQ3lGLE1BQVosQ0FBbUJuRixPQUFPLENBQUNzRixpQkFBM0IsQ0FBSixDQUp5QixDQUFELEVBS2hDOUUsc0JBTGdDLENBQW5DO0FBTUFqQixPQUFPLENBQUNpQixzQkFBUixHQUFpQ0Esc0JBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9wbGF0Zm9ybS90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vdHlwZXNcIik7XHJcbmNvbnN0IHBsYXRmb3JtXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL3V0aWxzL3BsYXRmb3JtXCIpO1xyXG5jb25zdCB0eXBlc18zID0gcmVxdWlyZShcIi4uLy4uLy4uL2lvYy90eXBlc1wiKTtcclxuY29uc3QgY29udHJhY3RzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29udHJhY3RzXCIpO1xyXG5jb25zdCBjYWNoZWFibGVMb2NhdG9yU2VydmljZV8xID0gcmVxdWlyZShcIi4vY2FjaGVhYmxlTG9jYXRvclNlcnZpY2VcIik7XHJcbmNvbnN0IGNvbmRhXzEgPSByZXF1aXJlKFwiLi9jb25kYVwiKTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuY29uc3QgRGVmYXVsdFB5dGhvbkV4ZWN1dGFibGUgPSAncHl0aG9uLmV4ZSc7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbmNvbnN0IENvbXBhbmllc1RvSWdub3JlID0gWydQWUxBVU5DSEVSJ107XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbmNvbnN0IFB5dGhvbkNvcmVDb21wYW55RGlzcGxheU5hbWUgPSAnUHl0aG9uIFNvZnR3YXJlIEZvdW5kYXRpb24nO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG5jb25zdCBQeXRob25Db3JlQ29tYW55ID0gJ1BZVEhPTkNPUkUnO1xyXG5sZXQgV2luZG93c1JlZ2lzdHJ5U2VydmljZSA9IGNsYXNzIFdpbmRvd3NSZWdpc3RyeVNlcnZpY2UgZXh0ZW5kcyBjYWNoZWFibGVMb2NhdG9yU2VydmljZV8xLkNhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5LCBpczY0Qml0LCBzZXJ2aWNlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgc3VwZXIoJ1dpbmRvd3NSZWdpc3RyeVNlcnZpY2UnLCBzZXJ2aWNlQ29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XHJcbiAgICAgICAgdGhpcy5pczY0Qml0ID0gaXM2NEJpdDtcclxuICAgICAgICB0aGlzLnBhdGhVdGlscyA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSVBhdGhVdGlscyk7XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIGRpc3Bvc2UoKSB7IH1cclxuICAgIGdldEludGVycHJldGVyc0ltcGxlbWVudGF0aW9uKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW50ZXJwcmV0ZXJzRnJvbVJlZ2lzdHJ5KCk7XHJcbiAgICB9XHJcbiAgICBnZXRJbnRlcnByZXRlcnNGcm9tUmVnaXN0cnkoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3B5dGhvbi9wZXBzL2Jsb2IvbWFzdGVyL3BlcC0wNTE0LnR4dCNMMzU3XHJcbiAgICAgICAgICAgIGNvbnN0IGhrY3VBcmNoID0gdGhpcy5pczY0Qml0ID8gdW5kZWZpbmVkIDogcGxhdGZvcm1fMS5BcmNoaXRlY3R1cmUueDg2O1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcGFuaWVzKHR5cGVzXzEuUmVnaXN0cnlIaXZlLkhLQ1UsIGhrY3VBcmNoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcGFuaWVzKHR5cGVzXzEuUmVnaXN0cnlIaXZlLkhLTE0sIHBsYXRmb3JtXzEuQXJjaGl0ZWN0dXJlLng4NilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9QVFZTL2Jsb2IvZWJmYzRjYThiYWIyMzRkNDUzZjE1ZWU0MjZhZjNiMjA4ZjNjMTQzYy9QeXRob24vUHJvZHVjdC9Db29raWVjdXR0ZXIvU2hhcmVkL0ludGVycHJldGVycy9QeXRob25SZWdpc3RyeVNlYXJjaC5jcyNMNDRcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXM2NEJpdCkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmdldENvbXBhbmllcyh0eXBlc18xLlJlZ2lzdHJ5SGl2ZS5IS0xNLCBwbGF0Zm9ybV8xLkFyY2hpdGVjdHVyZS54NjQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjb21wYW5pZXMgPSB5aWVsZCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1bmRlcnNjb3JlLWNvbnNpc3RlbnQtaW52b2NhdGlvblxyXG4gICAgICAgICAgICBjb25zdCBjb21wYW55SW50ZXJwcmV0ZXJzID0geWllbGQgUHJvbWlzZS5hbGwoXy5mbGF0dGVuKGNvbXBhbmllcylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB1bmRlZmluZWQgJiYgaXRlbSAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIC5tYXAoY29tcGFueSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnRlcnByZXRlcnNGb3JDb21wYW55KGNvbXBhbnkuY29tcGFueUtleSwgY29tcGFueS5oaXZlLCBjb21wYW55LmFyY2gpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1bmRlcnNjb3JlLWNvbnNpc3RlbnQtaW52b2NhdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKGNvbXBhbnlJbnRlcnByZXRlcnMpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0gIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbSlcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2LmZpbmRJbmRleChpdGVtID0+IGl0ZW0ucGF0aC50b1VwcGVyQ2FzZSgpID09PSBjdXJyZW50LnBhdGgudG9VcHBlckNhc2UoKSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldi5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldENvbXBhbmllcyhoaXZlLCBhcmNoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkuZ2V0S2V5cygnXFxcXFNvZnR3YXJlXFxcXFB5dGhvbicsIGhpdmUsIGFyY2gpXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb21wYW55S2V5cyA9PiBjb21wYW55S2V5c1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjb21wYW55S2V5ID0+IENvbXBhbmllc1RvSWdub3JlLmluZGV4T2YodGhpcy5wYXRoVXRpbHMuYmFzZW5hbWUoY29tcGFueUtleSkudG9VcHBlckNhc2UoKSkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgLm1hcChjb21wYW55S2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBhbnlLZXksIGhpdmUsIGFyY2ggfTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0SW50ZXJwcmV0ZXJzRm9yQ29tcGFueShjb21wYW55S2V5LCBoaXZlLCBhcmNoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFnS2V5cyA9IHlpZWxkIHRoaXMucmVnaXN0cnkuZ2V0S2V5cyhjb21wYW55S2V5LCBoaXZlLCBhcmNoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRhZ0tleXMubWFwKHRhZ0tleSA9PiB0aGlzLmdldElucmV0ZXJwcmV0ZXJEZXRhaWxzRm9yQ29tcGFueSh0YWdLZXksIGNvbXBhbnlLZXksIGhpdmUsIGFyY2gpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRJbnJldGVycHJldGVyRGV0YWlsc0ZvckNvbXBhbnkodGFnS2V5LCBjb21wYW55S2V5LCBoaXZlLCBhcmNoKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFnS2V5fVxcXFxJbnN0YWxsUGF0aGA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkuZ2V0VmFsdWUoa2V5LCBoaXZlLCBhcmNoKVxyXG4gICAgICAgICAgICAudGhlbihpbnN0YWxsUGF0aCA9PiB7XHJcbiAgICAgICAgICAgIC8vIEluc3RhbGwgcGF0aCBpcyBtYW5kYXRvcnkuXHJcbiAgICAgICAgICAgIGlmICghaW5zdGFsbFBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgJ0V4ZWN1dGFibGVQYXRoJyBleGlzdHMuXHJcbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIFB5dGhvbiAyLjcgZG9lc24ndCBoYXZlICdFeGVjdXRhYmxlUGF0aCcgKHRoZXJlIGNvdWxkIGJlIG90aGVycykuXHJcbiAgICAgICAgICAgIC8vIFRyZWF0IGFsbCBvdGhlciB2YWx1ZXMgYXMgb3B0aW9uYWwuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoaW5zdGFsbFBhdGgpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5nZXRWYWx1ZShrZXksIGhpdmUsIGFyY2gsICdFeGVjdXRhYmxlUGF0aCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5nZXRWYWx1ZSh0YWdLZXksIGhpdmUsIGFyY2gsICdTeXNWZXJzaW9uJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbXBhbnlEaXNwbGF5TmFtZShjb21wYW55S2V5LCBoaXZlLCBhcmNoKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKFtpbnN0YWxsZWRQYXRoLCBleGVjdXRhYmxlUGF0aCwgdmVyc2lvbiwgY29tcGFueURpc3BsYXlOYW1lXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tcGFueURpc3BsYXlOYW1lID0gY29uZGFfMS5BbmFjb25kYUNvbXBhbnlOYW1lcy5pbmRleE9mKGNvbXBhbnlEaXNwbGF5TmFtZSkgPT09IC0xID8gY29tcGFueURpc3BsYXlOYW1lIDogY29uZGFfMS5BbmFjb25kYUNvbXBhbnlOYW1lO1xyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci10eXBlLWNhc3Qgbm8tb2JqZWN0LWxpdGVyYWwtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGluc3RhbGxQYXRoOiBpbnN0YWxsZWRQYXRoLCBleGVjdXRhYmxlUGF0aCwgdmVyc2lvbiwgY29tcGFueURpc3BsYXlOYW1lIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChpbnRlcnByZXRlckluZm8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnRlcnByZXRlckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBleGVjdXRhYmxlUGF0aCA9IGludGVycHJldGVySW5mby5leGVjdXRhYmxlUGF0aCAmJiBpbnRlcnByZXRlckluZm8uZXhlY3V0YWJsZVBhdGgubGVuZ3RoID4gMCA/IGludGVycHJldGVySW5mby5leGVjdXRhYmxlUGF0aCA6IHBhdGguam9pbihpbnRlcnByZXRlckluZm8uaW5zdGFsbFBhdGgsIERlZmF1bHRQeXRob25FeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgY29uc3QgaGVscGVyID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldChjb250cmFjdHNfMS5JSW50ZXJwcmV0ZXJIZWxwZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBkZXRhaWxzID0geWllbGQgaGVscGVyLmdldEludGVycHJldGVySW5mb3JtYXRpb24oZXhlY3V0YWJsZVBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoIWRldGFpbHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gaW50ZXJwcmV0ZXJJbmZvLnZlcnNpb24gPyB0aGlzLnBhdGhVdGlscy5iYXNlbmFtZShpbnRlcnByZXRlckluZm8udmVyc2lvbikgOiB0aGlzLnBhdGhVdGlscy5iYXNlbmFtZSh0YWdLZXkpO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXR5cGUtY2FzdCBuby1vYmplY3QtbGl0ZXJhbC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGV0YWlscywgeyBwYXRoOiBleGVjdXRhYmxlUGF0aCwgdmVyc2lvbiwgY29tcGFueURpc3BsYXlOYW1lOiBpbnRlcnByZXRlckluZm8uY29tcGFueURpc3BsYXlOYW1lLCB0eXBlOiBjb250cmFjdHNfMS5JbnRlcnByZXRlclR5cGUuVW5rbm93biB9KTtcclxuICAgICAgICB9KSlcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJwcmV0ZXIgPT4gaW50ZXJwcmV0ZXIgPyBmcy5wYXRoRXhpc3RzKGludGVycHJldGVyLnBhdGgpLmNhdGNoKCgpID0+IGZhbHNlKS50aGVuKGV4aXN0cyA9PiBleGlzdHMgPyBpbnRlcnByZXRlciA6IG51bGwpIDogbnVsbClcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHJldHJpZXZlIGludGVycHJldGVyIGRldGFpbHMgZm9yIGNvbXBhbnkgJHtjb21wYW55S2V5fSx0YWc6ICR7dGFnS2V5fSwgaGl2ZTogJHtoaXZlfSwgYXJjaDogJHthcmNofWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb21wYW55RGlzcGxheU5hbWUoY29tcGFueUtleSwgaGl2ZSwgYXJjaCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0geWllbGQgdGhpcy5yZWdpc3RyeS5nZXRWYWx1ZShjb21wYW55S2V5LCBoaXZlLCBhcmNoLCAnRGlzcGxheU5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGRpc3BsYXlOYW1lICYmIGRpc3BsYXlOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjb21wYW55ID0gdGhpcy5wYXRoVXRpbHMuYmFzZW5hbWUoY29tcGFueUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wYW55LnRvVXBwZXJDYXNlKCkgPT09IFB5dGhvbkNvcmVDb21hbnkgPyBQeXRob25Db3JlQ29tcGFueURpc3BsYXlOYW1lIDogY29tcGFueTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuV2luZG93c1JlZ2lzdHJ5U2VydmljZSA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxyXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JUmVnaXN0cnkpKSxcclxuICAgIF9fcGFyYW0oMSwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzIuSXM2NEJpdCkpLFxyXG4gICAgX19wYXJhbSgyLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMy5JU2VydmljZUNvbnRhaW5lcikpXHJcbl0sIFdpbmRvd3NSZWdpc3RyeVNlcnZpY2UpO1xyXG5leHBvcnRzLldpbmRvd3NSZWdpc3RyeVNlcnZpY2UgPSBXaW5kb3dzUmVnaXN0cnlTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3dzUmVnaXN0cnlTZXJ2aWNlLmpzLm1hcCJdfQ==