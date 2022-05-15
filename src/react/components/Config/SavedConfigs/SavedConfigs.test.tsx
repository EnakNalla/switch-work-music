import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/rtl';
import { savedConfigStub } from '../../../test-utils/stubs/SavedConfigStub';
import SavedConfigs from './SavedConfigs';

describe('<SavedConfigs />', () => {
  it('should call store.loadConfig onClick', async () => {
    const config = savedConfigStub();
    const configStore = {
      savedConfigs: [config],
      loadConfig: jest.fn()
    };
    render(<SavedConfigs />, { configStore });

    await userEvent.click(screen.getByRole('button', { name: 'Load' }));

    expect(configStore.loadConfig).toHaveBeenCalledWith(config);
  });

  it('should call store.createConfig with update = true', async () => {
    const config = savedConfigStub();
    const configStore = {
      savedConfigs: [config],
      loadedConfig: config.name,
      createConfig: jest.fn()
    };
    render(<SavedConfigs />, { configStore });

    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(configStore.createConfig).toHaveBeenCalledWith({ name: config.name, update: true });
  });

  it('should open DeleteConfirm and call deleteConfig on confirm', async () => {
    const config = savedConfigStub();
    const configStore = {
      savedConfigs: [config],
      deleteConfig: jest.fn()
    };
    render(<SavedConfigs />, { configStore });

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(configStore.deleteConfig).toHaveBeenCalledWith(config.name);
  });
});
