/*
    * io(): socket.io를 실행하고 있는 서버를 찾아준다.
    * 브라우저의 콘솔창에 io 입력시 확인가능. 엣지는 안됌!
    ƒ lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
*/
const socket = io();
