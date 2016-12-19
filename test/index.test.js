'use strict';

var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Pinterest = require('../lib/index');

describe('Pinterest', function() {
  var analytics;
  var pinterest;
  var options = {
    tagId: '2617283085816',
    reservedMappings: [ 
    { key: 'sign_up', value: 'sign_up' }, 
    { key: 'lead', value: 'lead' }, 
    { key: 'watchvideo', value: 'watch_video' }, 
    { key: 'search', value: 'search' }, 
    { key: 'page_visit', value: 'page_visit' },
    { key: 'view_category', value: 'view_category' },
    { key: 'checkout', value: 'checkout' },
    { key: 'No Value', value: 'test' },
    { key: 'add_to_cart', value: 'add_to_cart' }
    ]
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
        .mapping('reservedMappings'));
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

    describe('util', function() {
      describe('track call with unmapped key', function() {
        it('should call track with a key thats not mapped', function() {
          analytics.track('this key is not mapped');
        });
      });
      describe('unmatch track call', function() {
        it('should call track with an event thats not mapped ', function() {
          analytics.track('No Value',{ 
            accountType: 'lead'
          });
        });
      }); 
      describe('signup', function() {
        it('should call track with sign up', function() {
          analytics.track('sign_up',{ 
            accountType: 'lead'
          });
          analytics.called(window.pintrk, 'track',
              'signup', {
                value: '',
                order_quantity: 1,
                currency: 'USD',
                property: '',
                order_id: '',
                promo_code: '',
                lead_type: 'lead',
                line_items: []
              });
        });
      });

      describe('lead', function() {
        it('should call track with lead', function() {
          analytics.track('lead',{ 
            accountType: 'lead'
          });
          analytics.called(window.pintrk, 'track',
              'lead', {
                value: '',
                order_quantity: 1,
                currency: 'USD',
                property: '',
                order_id: '',
                promo_code: '',
                lead_type: 'lead',
                line_items: []
              });
        });
      });

      describe('watchvideo', function() {
        it('should call track with watchvideo', function() {
          analytics.track('watchvideo',{ 
            name: 'video'
          });
          analytics.called(window.pintrk, 'track',
              'watchvideo', {
                video_title: 'video',
                value: '',
                order_quantity: 1,
                currency: 'USD',
                property: '',
                order_id: '',
                promo_code: '',
                lead_type: '',
                line_items: []
              });
        });
      });

      describe('pagevisit', function() {
        it('should call track with page_visit', function() {
          analytics.track('page_visit',{ 
            category: 'page'
          });
          analytics.called(window.pintrk, 'track',
              'pagevisit', {
                value: '',
                order_quantity: 1,
                currency: 'USD',
                property: 'page',
                order_id: '',
                promo_code: '',
                lead_type: '',
                line_items: []
              });
        });
      });

      describe('search', function() {
        it('should call track with search', function() {
          analytics.track('search',{  
            query: 'search'
          });
          analytics.called(window.pintrk, 'track',
              'search', {
                value: '',
                order_quantity: 1,
                currency: 'USD',
                search_query: 'search',
                property: '',
                order_id: '',
                promo_code: '',
                lead_type: '',
                line_items: []
              });
        });
      });

      describe('viewcategory', function() {
        it('should call method with right values', function() {
          analytics.track('view_category', {
            category: 'boots'
          });
          analytics.called(window.pintrk, 'track',
              'viewcategory', {
                value: '',
                order_quantity: 1,
                currency: 'USD',
                property: 'boots',
                order_id: '',
                promo_code: '',
                lead_type: '',
                line_items: []
              });
        });
      });

      describe('checkout', function() {
        it('should call track with checkout', function() {
          analytics.track('checkout', {
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

          analytics.called(window.pintrk, 'track', 'checkout', {
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

      describe('add to cart ', function() {
        it('should call track with add to cart', function() {
          analytics.track('add_to_cart', {
            product_id: '507f1f77bcf86cd799439011',
            category: 'Games',
            name: 'Monopoly: 3rd Edition',
            brand: 'Hasbro',
            variant: '200 pieces',
            price: 18.99,
            quantity: 1
          });

          analytics.called(window.pintrk, 'track', 'addtocart', {
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
    });

    describe('#product searched', function() {
      it('should call product searched', function() {
        analytics.track('Products Searched',{ 
          query: 'search'
        });
        analytics.called(window.pintrk, 'track',
            'search', {
              value: '',
              order_quantity: 1,
              currency: 'USD',
              property: '',
              search_query: 'search',
              order_id: '',
              promo_code: '',
              lead_type: '',
              line_items: []
            });
      });
    });

    describe('#productListViewed', function() {
      it('should call method with right values', function() {
        analytics.track('Product List Viewed', {
          category: 'boots'
        });
        analytics.called(window.pintrk, 'track',
            'viewcategory', {
              value: '',
              order_quantity: 1,
              currency: 'USD',
              property: 'boots',
              order_id: '',
              promo_code: '',
              lead_type: '',
              line_items: []
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

        analytics.called(window.pintrk, 'track', 'addtocart', {
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

        analytics.called(window.pintrk, 'track', 'checkout', {
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
    describe('#product added with no values', function() {
      it('should call product added  method with nothing', function() {
        analytics.track('Product Added');
      });
    });
    describe('#with no values', function() {
      it('should call method with nothing', function() {
        analytics.track('Order Completed');
      });
    });
  });
});
