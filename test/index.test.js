
var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Pinterest = require('../lib/');

describe('Pinterest', function() {
  var analytics;
  var pinterest;
  var options = {
    events: {
        signup: '12345678',
        bids: '22345678',
        checkouts: '32345678',
        pageVisits: '42345678'
    }
  };

  beforeEach(function() {
    analytics = new Analytics();
    pinterest = new Pinterest(options);
    analytics.use(Pinterest);
    analytics.use(tester);
    analytics.add(pinterest);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    pinterest.reset();
    sandbox();
  });

  it('should have the correct settings', function() {
    analytics.compare(Pinterest, integration('Pinterest')
      .assumesPageview()
      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.spy(pinterest, 'load');
      });

      it('should have one image tag', function() {
          analytics.track('signup');
          var images = document.querySelectorAll('img');
          analytics.equal(images.length, 1);
      });

      // it('should not send if event is not defined', function() {
      //   analytics.track('toString');
      //   analytics.didNotCall(pinterest.load);
      // });

      // it('should send correctly', function() {
      //   analytics.track('signup');
      //   analytics.loaded('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid=SkltST0UIzk&value=0.00&quantity=1"/>');
      // });
    });
  });
});