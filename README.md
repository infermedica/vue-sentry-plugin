# Infermedica Vue Sentry Plugin

This package provides a simple vue plugin to configure Sentry.

## Installation

```bash
$ npm install --save-dev @infermedica/vue-sentry-plugin
```

## Configuration

The Sentry plugin has to be configured in Webpack configuration file through `webpack.DefinePlugin`:

```javascript
new webpack.DefinePlugin({
  __sentry: JSON.stringify({
    isEnabled: process.env.NODE_ENV === 'production',
    dsn: 'https://XXX@sentry.io/XXX',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'local',
    release: '<release-identifier>'
  })
})
```

## Usage

To use the module, just import the `VueSentry` object and install the plugin in Vue.

```javascript
import VueSentry from '@infermedica/vue-sentry-plugin';

Vue.use(VueSentry);
```

The plugin will be avaliabe under `VueSentry` and in components under `this.$sentry`.


### Set additional global Sentry tags

```javascript
this.$sentry.setTag('tag_name', 'tag_value');
```


### Set active user in Sentry

```javascript
this.$sentry.setUser(currentUser.id, currentUser.username, currentUser.name);
```


### Set active interface language in Sentry

```javascript
this.$sentry.setActiveInterfaceLanguage('en');
```

This just sets a tag 'i18n.locale' to given value.


### Access Sentry object

The global Sentry object is also avaliable through the plugin, so one can access the core sentry functionality.

```javascript
this.$sentry.Sentry
```

## Contribution

We're happy to accept pull requests with additional integrations. Feel free to raise an issue if you have any
questions or suggestions.

## License

MIT Copyright (c) Infermedica
