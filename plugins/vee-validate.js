import Vue from "vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)

extend("required", {
  ...required,
  message: "{_field_} is required.",
});

extend("email", {
  ...email,
  message: "Insert a valid email.",
});

extend('email_confirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match.',
})
