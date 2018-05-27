(function() {
  var COMPANY_COUNTER_API, TRACK_URL, checkCookie, getCookie, getImage, getRandomNum, main, send_data, setCookie, update_company_counter, xhr_get;
  TRACK_URL = '/demlution.gif';
  COMPANY_COUNTER_API = '/company_api/company_counter/';
  getRandomNum = function(num) {
    return Math.round(Math.random() * num);
  };
  getCookie = function(c_name) {
    var c_end, c_start;
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=');
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  };
  setCookie = function(c_name, value) {
    return document.cookie = c_name + '=' + escape(value);
  };
  checkCookie = function(c_name) {
    var da_a;
    da_a = getCookie(c_name);
    if (!da_a) {
      da_a = getRandomNum(100000000);
      setCookie(c_name, da_a);
    }
    return da_a;
  };
  getImage = function(src, callback) {
    var image;
    image = new Image(1, 1);
    image.onload = function() {
      var iterator;
      iterator = 0;
      if (typeof callback === 'function') {
        return callback();
      }
    };
    return image.src = src;
  };
  send_data = function() {
    var k, query_set, query_string, src;
    query_set = {
      id: getRandomNum(100000000),
      referer: document.referrer,
      da_a: checkCookie('da_a'),
      width: window.screen.width,
      height: window.screen.height,
      color: screen.colorDepth,
      lang: navigator.browserLanguage ? navigator.browserLanguage : navigator.language,
      title: document.title
    };
    query_string = '';
    for (k in query_set) {
      query_string += '&' + k + '=' + query_set[k];
    }
    src = TRACK_URL + '?' + query_string.slice(1, query_string.length);
    return getImage(src);
  };
  xhr_get = function(url, callback) {
    var httpRequest;
    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (_error) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (_error) {

        }
      }
    }
    if (!httpRequest) {
      return;
    }
    httpRequest.onreadystatechange = function() {
      return callback(httpRequest);
    };
    httpRequest.open('GET', url);
    httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return httpRequest.send();
  };
  update_company_counter = function() {
    var ele;
    ele = document.getElementById('dm-company-counter');
    if (ele) {
      return xhr_get(COMPANY_COUNTER_API, function(httpRequest) {
        var data;
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            data = JSON.parse(httpRequest.responseText);
            return ele.innerHTML = data.counter;
          }
        }
      });
    }
  };
  main = function() {
    send_data();
    return update_company_counter();
  };
  return main();
}).call(this);
