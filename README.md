![alt text](img/logo.jpg "Analytics.js Integration for Pinterest Conversion Tracking")

#Analytics.js Integration for [Pinterest Conversion Tracking](https://help.pinterest.com/en/articles/website-conversion-tracking), by [Astronomer.io](http://www.astronomer.io/).

##Configuration
Pinterest Conversion Tracking is easily setup on with your Pinterest for Business account.  Once your account is setup, simply provide the following parameters to your [Astronomer dashboard](https://app.astronomer.io/):

### Sample analytics.js Track Call
This will be mapped to the Pinterest tracking code below.
```javascript
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
```

### Sample Pinterest Track Call
```javascript
pintrk('track', 'checkout', {
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
```

### All Possible Fields for Pinterest
```javascript
{
  value: string,
  order_quantity: number,
  currency: string,
  property: string,
  search_query: string,
  order_id: string,
  promo_code: string,
  video_title: string,
  lead_type: string,
  line_items: [
    {
      product_name: string,
      product_id: string,
      product_category: string,
      product_variant_id: string,
      product_variant: string,
      product_price: string,
      product_quantity: number,
      product_brand: string
    }
  ]
}
```
### Config Options
* tagId - This comes from your Pinterest Conversion Tracking tag. You'll need to copy this id.
* reservedMappings - Used to track on specific analytics track event ids. For example if you want checkout to be tracked but only when analytics.track() is called with test-checkout-example. You would set up your config to mapp checkout to test-checkout-example
```javascript 
 Pinterest: {
            tagId: "1234567891011",
            reservedMappings: {
                test-checkout-example: "checkout"
            }
        }
```
##License
Released under the [MIT license](License.md).
