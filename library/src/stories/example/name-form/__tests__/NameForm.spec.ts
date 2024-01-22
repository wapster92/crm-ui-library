import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useI18n } from 'vue-i18n';
import NameForm from '../NameForm.vue';
import SubmitForm from '../../submit-form/SubmitForm.vue';

vi.mock('vue-i18n');

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});
describe('NameForm.vue', () => {
  it('renders input elements and responds to input', () => {
    const modelValue = { firstName: '', lastName: '' };
    const wrapper = mount(NameForm, {
      global: {
        plugins: [],
      },
      props: {
        modelValue: modelValue,
        withLabel: true,
        size: 'default',
      },
      slots: {
        default: SubmitForm,
      },
    });

    // Проверка рендеринга
    expect(wrapper.find('.name-form').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });
  it('filling out the form', async () => {
    const modelValue = { firstName: '', lastName: '' };
    const wrapper = mount(NameForm, {
      global: {
        plugins: [],
      },
      props: {
        modelValue: modelValue,
        withLabel: true,
        size: 'default',
      },
      slots: {
        default: SubmitForm,
      },
    });
    // Имитация ввода в поля ввода
    await wrapper.find('.name-form__first-name input[type="text"]').setValue('John');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([{ firstName: 'John', lastName: '' }]);
    await wrapper.find('.name-form__last-name input[type="text"]').setValue('Doe');
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([{ firstName: '', lastName: 'Doe' }]);
  });
  it('render slot', async () => {
    const modelValue = { firstName: '', lastName: '' };
    const wrapper = mount(NameForm, {
      global: {
        plugins: [],
      },
      props: {
        modelValue: modelValue,
      },
      slots: {
        default: SubmitForm,
      },
    });
    expect(wrapper.find('.submit-form').exists()).toBe(true);
  });
});
