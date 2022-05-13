import { c as create_ssr_component, f as escape } from "../../chunks/index-9677fd3e.js";
function load({ error, status }) {
  return {
    props: { title: `${status}: ${error.message}` }
  };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<h1>${escape(title)}</h1>
${$$result.head += `${$$result.title = `<title>Error: ${escape(title)}</title>`, ""}`, ""}`;
});
export { _error as default, load };
