/* global __sentry */
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

export default {
  install: (Vue) => {
    if (__sentry.isEnabled) {
      Sentry.init({
        dsn: __sentry.dsn,
        environment: __sentry.environment,
        release: __sentry.release,
        integrations: [
          new Integrations.Vue({
            Vue,
            attachProps: true
          })
        ]
      });
    }

    Sentry.configureScope((scope) => {
      scope.setTag('instance', window.location.hostname);
      scope.setTag('event_layer', 'frontend');
    });

    Vue.$sentry = {
      Sentry,
      setTag(key, value) {
        Sentry.configureScope((scope) => {
          scope.setTag(key, value);
        });
      },
      setUser(id, username, name, email) {
        Sentry.configureScope((scope) => {
          scope.setUser({id, username, name, email});
        });
      },
      setActiveInterfaceLanguage(value) {
        Sentry.configureScope((scope) => {
          scope.setTag('i18n.locale', value);
        });
      }
    };

    Object.defineProperties(Vue.prototype, {
      $sentry: {
        get() {
          return Vue.$sentry;
        }
      }
    });
  }
};
