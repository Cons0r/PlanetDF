import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index-9677fd3e.js";
import { t as toast } from "../../../../chunks/SvelteToast.svelte_svelte_type_style_lang-12fbe01c.js";
import { w as writable } from "../../../../chunks/index-8d06bf08.js";
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_success;
  let $$unsubscribe_error;
  let { error = writable("") } = $$props;
  $$unsubscribe_error = subscribe(error, (value) => value);
  let { success = writable("") } = $$props;
  $$unsubscribe_success = subscribe(success, (value) => value);
  error.subscribe((err) => {
    if (!err?.length)
      return;
    toast.push(`Error: ${err}`, {
      theme: {
        "--toastBackground": "#F56565",
        "--toastBarBackground": "#C53030"
      }
    });
  });
  success.subscribe((s) => {
    if (!s?.length)
      return;
    toast.push(`Success!, ${s}`, {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastBarBackground": "#2F855A"
      }
    });
  });
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.success === void 0 && $$bindings.success && success !== void 0)
    $$bindings.success(success);
  $$unsubscribe_success();
  $$unsubscribe_error();
  return `<div class="${"min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"}"><div class="${"sm:mx-auto sm:w-full sm:max-w-md"}"><h2 class="${"mt-6 text-center text-3xl font-extrabold text-gray-900"}">Create an account</h2></div>

  <div class="${"mt-8 sm:mx-auto sm:w-full sm:max-w-md"}"><div class="${"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"}"><form class="${"space-y-6"}" method="${"POST"}"><div><label for="${"username"}" class="${"block text-sm font-medium text-gray-700"}">Username </label>
          <div class="${"mt-1"}"><input id="${"username"}" name="${"username"}" required class="${"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}"></div></div>

        <div><label for="${"password"}" class="${"block text-sm font-medium text-gray-700"}">Password </label>
          <div class="${"mt-1"}"><input id="${"password"}" name="${"password"}" type="${"password"}" autocomplete="${"current-password"}" required class="${"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}"></div></div>
        <div><button type="${"submit"}" class="${"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}">Sign Up</button></div></form></div></div></div>`;
});
export { Register as default };
