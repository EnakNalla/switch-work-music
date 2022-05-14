import { render, RenderOptions, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import ProvideStore from '../stores/ProvideStore';
import RootStore from '../stores/rootStore';

const customRender = (ui: ReactNode, store?: Partial<RootStore>, opts?: RenderOptions) => {
  return render(<ProvideStore store={store}>{ui}</ProvideStore>, opts);
};

export * from '@testing-library/react';
export { screen };
export { customRender as render };
