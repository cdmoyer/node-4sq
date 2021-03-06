// Generated by CoffeeScript 1.6.2
(function() {
  var Foursquare, qs, xhr;

  xhr = require('request');

  qs = require('querystring');

  Foursquare = (function() {
    var apihost, isFunction, request, version;

    apihost = 'https://api.foursquare.com';

    version = 'v2';

    function Foursquare(options) {
      var date, month;

      this.options = options != null ? options : {};
      date = new Date();
      month = date.getMonth() + 1;
      options.date = date.getFullYear();
      options.date += (month < 10 ? '0' : '') + month;
      options.date += (date.getDate() < 10 ? '0' : '') + date.getDate();
    }

    Foursquare.prototype.user = function(userid, params, fn) {
      if (!userid || parseInt(userid, 10) <= 0) {
        userid = 'self';
      }
      if (isFunction(params)) {
        fn = params;
        params = {};
      }
      this.scheme = "/users/" + userid;
      return request(this, params, fn);
    };

    Foursquare.prototype.checkins = function(userid, params, fn) {
      if (!userid || parseInt(userid, 10) <= 0) {
        userid = 'self';
      }
      if (isFunction(params)) {
        fn = params;
        params = {};
      }
      this.scheme = "/users/" + userid + "/checkins";
      return request(this, params, fn);
    };

    Foursquare.prototype.badges = function(userid, params, fn) {
      if (!userid || parseInt(userid, 10) <= 0) {
        userid = 'self';
      }
      if (isFunction(params)) {
        fn = params;
        params = {};
      }
      this.scheme = "/users/" + userid + "/badges";
      return request(this, params, fn);
    };

    request = function(self, query, fn) {
      var params;

      if (query == null) {
        query = {};
      }
      if (fn == null) {
        fn = function() {};
      }
      query.v = self.options.date;
      query = qs.stringify(query);
      params = {
        url: "" + apihost + "/" + version + self.scheme + "?oauth_token=" + self.options.token + "&" + query
      };
      return xhr(params, function(error, request, body) {
        var data;

        try {
            body = JSON.parse(body);
            if (body.meta.code !== 200) {
                  error = body.meta;
            }
            data = body.response != null ? body.response : null;
        } catch (e) {
            data = null;
            error = new Error("Unable to parse JSON response from foursquare.");
        }
        return fn.call(self, error, data);
      });
    };

    isFunction = function(object) {
      return '[object Function]' === toString.call(object);
    };

    return Foursquare;

  })();

  module.exports = Foursquare;

}).call(this);
