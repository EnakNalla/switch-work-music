import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import ProvideStore from '../stores/ProvideStore';
import RootStore from '../stores/rootStore';

// https://stackoverflow.com/questions/61132262/typescript-deep-partial
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

const customRender = (ui: ReactNode, store?: DeepPartial<RootStore>, opts?: RenderOptions) => {
  return render(<ProvideStore store={store}>{ui}</ProvideStore>, opts);
};

export * from '@testing-library/react';
export { customRender as render };
