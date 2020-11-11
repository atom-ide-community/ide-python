"use strict";

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

class GlobalPythonPathUpdaterService {
  constructor(workspaceService) {
    this.workspaceService = workspaceService;
  }

  updatePythonPath(pythonPath) {
    return __awaiter(this, void 0, void 0, function* () {
      const pythonConfig = this.workspaceService.getConfiguration('python');
      const pythonPathValue = pythonConfig.inspect('pythonPath');

      if (pythonPathValue && pythonPathValue.globalValue === pythonPath) {
        return;
      }

      yield pythonConfig.update('pythonPath', pythonPath, true);
    });
  }

}

exports.GlobalPythonPathUpdaterService = GlobalPythonPathUpdaterService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbFVwZGF0ZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJHbG9iYWxQeXRob25QYXRoVXBkYXRlclNlcnZpY2UiLCJjb25zdHJ1Y3RvciIsIndvcmtzcGFjZVNlcnZpY2UiLCJ1cGRhdGVQeXRob25QYXRoIiwicHl0aG9uUGF0aCIsInB5dGhvbkNvbmZpZyIsImdldENvbmZpZ3VyYXRpb24iLCJweXRob25QYXRoVmFsdWUiLCJpbnNwZWN0IiwiZ2xvYmFsVmFsdWUiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUlBLFNBQVMsR0FBSSxVQUFRLFNBQUtBLFNBQWQsSUFBNEIsVUFBVUMsT0FBVixFQUFtQkMsVUFBbkIsRUFBK0JDLENBQS9CLEVBQWtDQyxTQUFsQyxFQUE2QztBQUNyRixTQUFPLEtBQUtELENBQUMsS0FBS0EsQ0FBQyxHQUFHRSxPQUFULENBQU4sRUFBeUIsVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkQsYUFBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDTyxJQUFWLENBQWVGLEtBQWYsQ0FBRCxDQUFKO0FBQThCLE9BQXBDLENBQXFDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FBQzNGLGFBQVNDLFFBQVQsQ0FBa0JKLEtBQWxCLEVBQXlCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQyxPQUFELENBQVQsQ0FBbUJLLEtBQW5CLENBQUQsQ0FBSjtBQUFrQyxPQUF4QyxDQUF5QyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENBQU47QUFBWTtBQUFFOztBQUM5RixhQUFTRixJQUFULENBQWNJLE1BQWQsRUFBc0I7QUFBRUEsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWNULE9BQU8sQ0FBQ1EsTUFBTSxDQUFDTCxLQUFSLENBQXJCLEdBQXNDLElBQUlOLENBQUosQ0FBTSxVQUFVRyxPQUFWLEVBQW1CO0FBQUVBLFFBQUFBLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDTCxLQUFSLENBQVA7QUFBd0IsT0FBbkQsRUFBcURPLElBQXJELENBQTBEUixTQUExRCxFQUFxRUssUUFBckUsQ0FBdEM7QUFBdUg7O0FBQy9JSCxJQUFBQSxJQUFJLENBQUMsQ0FBQ04sU0FBUyxHQUFHQSxTQUFTLENBQUNhLEtBQVYsQ0FBZ0JoQixPQUFoQixFQUF5QkMsVUFBVSxJQUFJLEVBQXZDLENBQWIsRUFBeURTLElBQXpELEVBQUQsQ0FBSjtBQUNILEdBTE0sQ0FBUDtBQU1ILENBUEQ7O0FBUUFPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRVgsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTVksOEJBQU4sQ0FBcUM7QUFDakNDLEVBQUFBLFdBQVcsQ0FBQ0MsZ0JBQUQsRUFBbUI7QUFDMUIsU0FBS0EsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNIOztBQUNEQyxFQUFBQSxnQkFBZ0IsQ0FBQ0MsVUFBRCxFQUFhO0FBQ3pCLFdBQU96QixTQUFTLENBQUMsSUFBRCxFQUFPLEtBQUssQ0FBWixFQUFlLEtBQUssQ0FBcEIsRUFBdUIsYUFBYTtBQUNoRCxZQUFNMEIsWUFBWSxHQUFHLEtBQUtILGdCQUFMLENBQXNCSSxnQkFBdEIsQ0FBdUMsUUFBdkMsQ0FBckI7QUFDQSxZQUFNQyxlQUFlLEdBQUdGLFlBQVksQ0FBQ0csT0FBYixDQUFxQixZQUFyQixDQUF4Qjs7QUFDQSxVQUFJRCxlQUFlLElBQUlBLGVBQWUsQ0FBQ0UsV0FBaEIsS0FBZ0NMLFVBQXZELEVBQW1FO0FBQy9EO0FBQ0g7O0FBQ0QsWUFBTUMsWUFBWSxDQUFDSyxNQUFiLENBQW9CLFlBQXBCLEVBQWtDTixVQUFsQyxFQUE4QyxJQUE5QyxDQUFOO0FBQ0gsS0FQZSxDQUFoQjtBQVFIOztBQWJnQzs7QUFlckNMLE9BQU8sQ0FBQ0MsOEJBQVIsR0FBeUNBLDhCQUF6QyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIEdsb2JhbFB5dGhvblBhdGhVcGRhdGVyU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3b3Jrc3BhY2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlID0gd29ya3NwYWNlU2VydmljZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVB5dGhvblBhdGgocHl0aG9uUGF0aCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHB5dGhvbkNvbmZpZyA9IHRoaXMud29ya3NwYWNlU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdweXRob24nKTtcclxuICAgICAgICAgICAgY29uc3QgcHl0aG9uUGF0aFZhbHVlID0gcHl0aG9uQ29uZmlnLmluc3BlY3QoJ3B5dGhvblBhdGgnKTtcclxuICAgICAgICAgICAgaWYgKHB5dGhvblBhdGhWYWx1ZSAmJiBweXRob25QYXRoVmFsdWUuZ2xvYmFsVmFsdWUgPT09IHB5dGhvblBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB5aWVsZCBweXRob25Db25maWcudXBkYXRlKCdweXRob25QYXRoJywgcHl0aG9uUGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5HbG9iYWxQeXRob25QYXRoVXBkYXRlclNlcnZpY2UgPSBHbG9iYWxQeXRob25QYXRoVXBkYXRlclNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdsb2JhbFVwZGF0ZXJTZXJ2aWNlLmpzLm1hcCJdfQ==