import Ember from 'ember';
import moment from 'moment';
import layout from './template';
import computed from 'ember-computed';

export default Ember.Component.extend({
  layout,
  keen: Ember.inject.service('keen'),
  dateRange: 'this_30_days',

  init() {
    this._super(...arguments);

    this.get('keen').query('average', 'deploy', {
      target_property: 'size',
      timeframe: this.get('dateRange'),
      group_by: 'name',
      interval: 'hourly'
    }).then((data) => {

      let results = data.result.filter((asset)=> {
        let vendorJs = asset.value[3];
        if(vendorJs.result > 0) {
          return asset;
        }
      });

      this.set('data', results);
    });
  },

  data: null,

  noData: computed.empty('chartData'),

  timeframe: computed('data', function(){
    let data = this.get('data');

    if(!data) { return; }

    return data.map((object) => {
      return moment(object.timeframe.end).format('LLL');
    });
  }),

  chartData: computed('data', function() {
    let data = this.get('data');

    if(!data) { return; }
    let assetsNames = data[0].value.map((asset) => {
      return { name: asset.name, data: [] };
    });

    data.forEach(function(object){
      object.value.forEach((asset, index) => {
        assetsNames[index].data.push(asset.result / 8192);
      });
    });

    return assetsNames;
  }),

  chartOptions: computed(function(){
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Asset Sizes'
      },
      xAxis: {
        categories: this.get('timeframe')
      },
      yAxis: {
        title: {
          text: 'Size (KB)'
        }
      },
      tooltip: {
        valueDecimals: 3,
        valueSuffix: ' kb'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      }
    };
  })
});
