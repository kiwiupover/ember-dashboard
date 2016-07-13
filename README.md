# ember-dashboard

[WIP]

A dashboard with a view into your ember app's size over time.
Use [ember-cli-deploy-asset-sizes](https://github.com/kiwiupover/ember-cli-deploy-asset-sizes) to push your apps data to [keen.io](https://keen.io).

More data addons to come.

## Installation
Create brandnew ember app.

```sh
ember new <my-ember-apps-name>-dashboard
ember install ember-dashboard
```

Add your keen.io keys to `config/environment.js`

```js
KEEN_PROJECT_ID: <keen-project-id>,
KEEN_READ_KEY: <keen-read-key>
```

## Deploy

```sh
ember surge
```

## You're Done.
Visit your dashboard on <my-ember-apps-name>-dashboard.surge.sh

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
