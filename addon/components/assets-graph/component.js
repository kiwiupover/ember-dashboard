import Ember from 'ember';
import moment from 'moment';
import layout from './template';
import computed from 'ember-computed';

export default Ember.Component.extend({
  layout,
  data: null,

  timeframe: computed('data', function(){
    let data = this.get('data');

    return data.map((object) => {
      return moment(object.timeframe.end).format('LLL');
    });
  }),

  chartData: computed('data', function() {
    let data = this.get('data');
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
