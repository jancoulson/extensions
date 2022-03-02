import React from 'react';
import { priorities, setPriority } from 'shoutem-core';
import { preventStateRehydration } from './services/state';
import { createStore } from './services/store';
import { StoreProvider } from './providers';

let store = null;

export const appWillMount = setPriority(app => {
  store = createStore(app);
  app.setStore(store);
}, priorities.INIT);

export function renderProvider(children) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}

export function getStore() {
  return store;
}

export { preventStateRehydration };
