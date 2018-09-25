import loadjs from 'loadjs';

export const getHereScripts = (callback) => {
  return loadjs([
    'https://js.cit.api.here.com/v3/3.0/mapsjs-ui.css',
    'https://js.cit.api.here.com/v3/3.0/mapsjs-core.js',
    'https://js.cit.api.here.com/v3/3.0/mapsjs-service.js',
    'https://js.cit.api.here.com/v3/3.0/mapsjs-ui.js',
    'https://js.cit.api.here.com/v3/3.0/mapsjs-mapevents.js'
  ], {
    success: callback,
    async: false
  });
}
