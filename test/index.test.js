"use strict";

var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Pinterest = require('../lib/');

describe('Pinterest', function() {
  var analytics;
  var pinterest;
  var options = {
    events: {
      signup: 'BZ7FQQpqexJ',
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
  });     it('should have the correct settings', function() {
    analytics.compare(Pinterest, integration('Pinterest')
                      .global('pintrk')
                      .option('tagId', '')
                      .option('events'));
  });

  it('should load', function(done) {
    analytics.load(pinterest, done);
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.stub(window, 'pintrk');
    });

    describe('#page', function() {
      it('should call page', function() {
        analytics.page();
        analytics.called(window.pintrk);
      });
    });

    describe('#productListViewed', function() {
      it('should call method with right values', function() {
        analytics.track('Product List Viewed', {
          category: 'Boots'
        });
        analytics.called(window.pintrk,
                         'viewcategory', {
                           property: 'Boots'
                         });
      });
    });

    describe('#productAdded', function() {
      it('should call method with right values', function() {
        analytics.track('Product Added', {
          product_id: '507f1f77bcf86cd799439011',
          category: 'Games',
          name: 'Monopoly: 3rd Edition',
          brand: 'Hasbro',
          variant: '200 pieces',
          price: 18.99,
          quantity: 1
        });

        analytics.called(window.pintrk, 'addtocart', {
          value: 18.99,
          order_quantity: 1,
          currency: 'USD',
          line_items: [{
            product_name: 'Monopoly: 3rd Edition',
            product_id: '507f1f77bcf86cd799439011',
            product_category: 'Games',
            product_variant_id: '200 pieces',
            product_price: 18.99,
            product_quantity: 1,
            product_brand: 'Hasbro'
          }]
        });
      });
    });

    describe('#orderCompleted', function() {
      it('should call method with the right values', function() {
        analytics.track('Order Completed', {
          order_id: '50314b8e9bcf000000000000',
          total: 30,
          revenue: 25,
          currency: 'USD',
          products: [{
            product_id: '507f1f77bcf86cd799439011',
            name: 'Monopoly: 3rd Edition',
            price: 19,
            quantity: 1,
            category: 'Games'
          }]
        });

        analytics.called(window.pintrk, 'checkout', {
          order_id: '50314b8e9bcf000000000000',
          order_quantity: 30,
          value: 25,
          currency: 'USD',
          line_items:  [{
            product_id: '507f1f77bcf86cd799439011',
            product_name: 'Monopoly: 3rd Edition',
            product_price: 19,
            product_quantity: 1,
            product_category: 'Games'
          }]
        });
      });
    });
  });
});
