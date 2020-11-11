// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require("react");

require("./collapseButton.css");

class CollapseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const collapseInputPolygonClassNames = `collapse-input-svg ${this.props.open ? ' collapse-input-svg-rotate' : ''} collapse-input-svg-${this.props.theme}`;
    const collapseInputClassNames = `collapse-input remove-style ${this.props.hidden ? '' : ' hide'}`;
    return React.createElement("div", null, React.createElement("button", {
      className: collapseInputClassNames,
      onClick: this.props.onClick
    }, React.createElement("svg", {
      version: '1.1',
      baseProfile: 'full',
      width: '8px',
      height: '11px'
    }, React.createElement("polygon", {
      points: '0,0 0,10 5,5',
      className: collapseInputPolygonClassNames,
      fill: 'black'
    }))));
  }

}

exports.CollapseButton = CollapseButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNlQnV0dG9uLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiUmVhY3QiLCJyZXF1aXJlIiwiQ29sbGFwc2VCdXR0b24iLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwicmVuZGVyIiwiY29sbGFwc2VJbnB1dFBvbHlnb25DbGFzc05hbWVzIiwib3BlbiIsInRoZW1lIiwiY29sbGFwc2VJbnB1dENsYXNzTmFtZXMiLCJoaWRkZW4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwib25DbGljayIsInZlcnNpb24iLCJiYXNlUHJvZmlsZSIsIndpZHRoIiwiaGVpZ2h0IiwicG9pbnRzIiwiZmlsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0FBLE9BQU8sQ0FBQyxzQkFBRCxDQUFQOztBQUNBLE1BQU1DLGNBQU4sU0FBNkJGLEtBQUssQ0FBQ0csU0FBbkMsQ0FBNkM7QUFDekNDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRO0FBQ2YsVUFBTUEsS0FBTjtBQUNIOztBQUNEQyxFQUFBQSxNQUFNLEdBQUc7QUFDTCxVQUFNQyw4QkFBOEIsR0FBSSxzQkFBcUIsS0FBS0YsS0FBTCxDQUFXRyxJQUFYLEdBQWtCLDRCQUFsQixHQUFpRCxFQUFHLHVCQUFzQixLQUFLSCxLQUFMLENBQVdJLEtBQU0sRUFBeEo7QUFDQSxVQUFNQyx1QkFBdUIsR0FBSSwrQkFBOEIsS0FBS0wsS0FBTCxDQUFXTSxNQUFYLEdBQW9CLEVBQXBCLEdBQXlCLE9BQVEsRUFBaEc7QUFDQSxXQUFRWCxLQUFLLENBQUNZLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDSlosS0FBSyxDQUFDWSxhQUFOLENBQW9CLFFBQXBCLEVBQThCO0FBQUVDLE1BQUFBLFNBQVMsRUFBRUgsdUJBQWI7QUFBc0NJLE1BQUFBLE9BQU8sRUFBRSxLQUFLVCxLQUFMLENBQVdTO0FBQTFELEtBQTlCLEVBQ0lkLEtBQUssQ0FBQ1ksYUFBTixDQUFvQixLQUFwQixFQUEyQjtBQUFFRyxNQUFBQSxPQUFPLEVBQUUsS0FBWDtBQUFrQkMsTUFBQUEsV0FBVyxFQUFFLE1BQS9CO0FBQXVDQyxNQUFBQSxLQUFLLEVBQUUsS0FBOUM7QUFBcURDLE1BQUFBLE1BQU0sRUFBRTtBQUE3RCxLQUEzQixFQUNJbEIsS0FBSyxDQUFDWSxhQUFOLENBQW9CLFNBQXBCLEVBQStCO0FBQUVPLE1BQUFBLE1BQU0sRUFBRSxjQUFWO0FBQTBCTixNQUFBQSxTQUFTLEVBQUVOLDhCQUFyQztBQUFxRWEsTUFBQUEsSUFBSSxFQUFFO0FBQTNFLEtBQS9CLENBREosQ0FESixDQURJLENBQVI7QUFJSDs7QUFYd0M7O0FBYTdDdEIsT0FBTyxDQUFDSSxjQUFSLEdBQXlCQSxjQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxucmVxdWlyZShcIi4vY29sbGFwc2VCdXR0b24uY3NzXCIpO1xyXG5jbGFzcyBDb2xsYXBzZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBjb2xsYXBzZUlucHV0UG9seWdvbkNsYXNzTmFtZXMgPSBgY29sbGFwc2UtaW5wdXQtc3ZnICR7dGhpcy5wcm9wcy5vcGVuID8gJyBjb2xsYXBzZS1pbnB1dC1zdmctcm90YXRlJyA6ICcnfSBjb2xsYXBzZS1pbnB1dC1zdmctJHt0aGlzLnByb3BzLnRoZW1lfWA7XHJcbiAgICAgICAgY29uc3QgY29sbGFwc2VJbnB1dENsYXNzTmFtZXMgPSBgY29sbGFwc2UtaW5wdXQgcmVtb3ZlLXN0eWxlICR7dGhpcy5wcm9wcy5oaWRkZW4gPyAnJyA6ICcgaGlkZSd9YDtcclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogY29sbGFwc2VJbnB1dENsYXNzTmFtZXMsIG9uQ2xpY2s6IHRoaXMucHJvcHMub25DbGljayB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHZlcnNpb246ICcxLjEnLCBiYXNlUHJvZmlsZTogJ2Z1bGwnLCB3aWR0aDogJzhweCcsIGhlaWdodDogJzExcHgnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBvbHlnb25cIiwgeyBwb2ludHM6ICcwLDAgMCwxMCA1LDUnLCBjbGFzc05hbWU6IGNvbGxhcHNlSW5wdXRQb2x5Z29uQ2xhc3NOYW1lcywgZmlsbDogJ2JsYWNrJyB9KSkpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Db2xsYXBzZUJ1dHRvbiA9IENvbGxhcHNlQnV0dG9uO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xsYXBzZUJ1dHRvbi5qcy5tYXAiXX0=