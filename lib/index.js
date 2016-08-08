'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var defaults = require('defaults');
var foldl = require('foldl');
var each = require('each');

/**
 * Expose `Pinterest`.
 */

var Pinterest = module.exports = integration('Pinterest')
  .tag('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid={{ tid }}&value=0.00&quantity=1"/>')
  .mapping('events');

/**
 * Initialize.
 *
 * @api public
 */

Pinterest.prototype.initialize = function() {
  this.ready();
};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

Pinterest.prototype.track = function(track) {
  var events = this.events(track.event());
  var self = this;
  each(function(tid) {
    self.load(defaults({
      tid: tid
    }));
  }, events);
};
