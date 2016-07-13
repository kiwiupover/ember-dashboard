import Ember from 'ember';

export default Ember.Route.extend({
  keen: Ember.inject.service('keen'),

  model() {
    return this.get('keen').query('average', 'deploy', {
      target_property: 'size',
      timeframe: 'this_30_days',
      group_by: 'name',
      interval: 'hourly'
    }).then(function(data) {

      let results = data.result.filter( (asset)=> {
        let vendorJs = asset.value[4];
        if(vendorJs.result > 0) {
          return asset;
        }
      });

      return results;
    });
  }
});
