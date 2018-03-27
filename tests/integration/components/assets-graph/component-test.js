import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assets-graph', 'Integration | Component | assets graph', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{assets-graph}}`);

  assert.equal(this.$().text().trim(), '');
});
