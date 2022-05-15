import { fireEvent, render, screen } from '../../../test-utils/rtl';
import VisualiserConfig from './VisualiserConfig';

describe('<VisualiserConfig />', () => {
  it('should set primary colour', () => {
    const configStore = {
      colours: {
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      },
      useVisualiser: true,
      visualiserType: 'cubes' as VisualiserTypes,
      visualiserStroke: 2,
      setColour: jest.fn()
    };
    render(<VisualiserConfig />, {
      configStore
    });

    fireEvent.change(screen.getByLabelText('Primary'), { target: { value: '#eaeaea' } });

    expect(configStore.setColour).toHaveBeenCalledWith('primary', '#eaeaea');
  });

  it('should set secondary colour', () => {
    const configStore = {
      colours: {
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      },
      useVisualiser: true,
      visualiserType: 'cubes' as VisualiserTypes,
      visualiserStroke: 2,
      setColour: jest.fn()
    };
    render(<VisualiserConfig />, {
      configStore
    });

    fireEvent.change(screen.getByLabelText('Secondary'), { target: { value: '#eaeaea' } });

    expect(configStore.setColour).toHaveBeenCalledWith('secondary', '#eaeaea');
  });

  it('should set tertiary colour', () => {
    const configStore = {
      colours: {
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      },
      useVisualiser: true,
      visualiserType: 'cubes' as VisualiserTypes,
      visualiserStroke: 2,
      setColour: jest.fn()
    };
    render(<VisualiserConfig />, {
      configStore
    });

    fireEvent.change(screen.getByLabelText('Tertiary'), { target: { value: '#eaeaea' } });

    expect(configStore.setColour).toHaveBeenCalledWith('tertiary', '#eaeaea');
  });

  it('should set quaternary colour', () => {
    const configStore = {
      colours: {
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      },
      useVisualiser: true,
      visualiserType: 'cubes' as VisualiserTypes,
      visualiserStroke: 2,
      setColour: jest.fn()
    };
    render(<VisualiserConfig />, {
      configStore
    });

    fireEvent.change(screen.getByLabelText('Quaternary'), { target: { value: '#eaeaea' } });

    expect(configStore.setColour).toHaveBeenCalledWith('quaternary', '#eaeaea');
  });

  it('should set background colour', () => {
    const configStore = {
      colours: {
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      },
      useVisualiser: true,
      visualiserType: 'cubes' as VisualiserTypes,
      visualiserStroke: 2,
      setColour: jest.fn()
    };
    render(<VisualiserConfig />, {
      configStore
    });

    fireEvent.change(screen.getByLabelText('Background'), { target: { value: '#eaeaea' } });

    expect(configStore.setColour).toHaveBeenCalledWith('background', '#eaeaea');
  });
});
