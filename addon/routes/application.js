import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  keen: service('keen'),

  model() {
    return this.get('keen').query('average', 'deploy', {
      target_property: 'size',
      timeframe: 'this_90_days',
      group_by: 'name',
      interval: 'hourly'
    }).then(function(data) {

      let results = data.result.filter( (asset)=> {
        let vendorJs = asset.value[3];
        if(vendorJs.result > 0) {
          return asset;
        }
      });

      return results;
    });
  }
});
