import { Context, createContext, ReactNode, useContext } from 'react';
import RootStore from './rootStore';

let StoreContext: Context<RootStore>;

interface Props {
  children: ReactNode;
}

const ProvideStore = ({ children }: Props) => {
  const store = new RootStore();
  StoreContext = createContext(store);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default ProvideStore;
