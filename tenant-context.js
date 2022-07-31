const { AsyncLocalStorage } = require('async_hooks');

const tenantCtxLocalStorage = new AsyncLocalStorage();

const tenantContextMiddleware = (req, res, next) => {
  const tenantId  = req.headers['tenantid'];

  const map = new Map();
  map.set('tenantId', tenantId);

  tenantCtxLocalStorage.run(map, () => next());
};

const contextProp = (prop) => {
    return tenantCtxLocalStorage.getStore().get(prop);
}

module.exports = contextProp, tenantContextMiddleware;