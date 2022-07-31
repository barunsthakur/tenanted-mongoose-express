import { AsyncLocalStorage } from 'async_hooks';

const tenantCtxLocalStorage = new AsyncLocalStorage();

export const tenantContextMiddleware = (req, res, next) => {
  const tenantId  = req.headers['tenantid'];

  const map = new Map();
  map.set('tenantId', tenantId);

  tenantCtxLocalStorage.run(map, () => next());
};

export const contextProp = (prop) => {
    return tenantCtxLocalStorage.getStore().get(prop);
};
