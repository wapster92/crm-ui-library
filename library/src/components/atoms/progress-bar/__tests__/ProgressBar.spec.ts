import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ProgressBarEnums } from './../../../../enums';
import ProgressBar from './../ProgressBar.vue';

describe('ProgressBar.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(ProgressBar);

    // Проверка наличия основного элемента
    expect(wrapper.find('.progress-bar').exists()).toBe(true);

    // Проверка значения по умолчанию
    expect(wrapper.findComponent(ProgressBar).props('percentage')).toBe(50);
    expect(wrapper.findComponent(ProgressBar).props('indeterminate')).toBe(false);
  });

  it('accepts custom percentage prop', () => {
    const wrapper = mount(ProgressBar, {
      props: { percentage: 75 },
    });
    expect(wrapper.findComponent(ProgressBar).props('percentage')).toBe(75);
  });

  it('accepts custom size prop', () => {
    const wrapper = mount(ProgressBar, {
      props: { size: ProgressBarEnums.ProgressBarSize.default },
    });
    expect(wrapper.findComponent(ProgressBar).props('size')).toBe(ProgressBarEnums.ProgressBarSize.default);
  });
});
