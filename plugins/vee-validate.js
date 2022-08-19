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
