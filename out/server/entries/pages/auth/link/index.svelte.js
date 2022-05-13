import { c as create_ssr_component, d as add_attribute, b as subscribe, v as validate_component, f as escape } from "../../../../chunks/index-9677fd3e.js";
import adler32 from "adler-32";
import { w as writable } from "../../../../chunks/index-8d06bf08.js";
async function getUUID(username) {
  if (!valid(username))
    return Promise.reject(`${username} is an invalid username`);
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  console.log(await response.body);
  if (!response.ok)
    return Promise.reject(`${username} does not exist`);
  const json = await response.json();
  return json.id;
}
function valid(username) {
  if (!username.match(/^[a-z0-9_]*$/i))
    return false;
  return true;
}
const ListCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-white shadow overflow-hidden sm:rounded-md"}"><ul>${slots.default ? slots.default({}) : ``}</ul></div>`;
});
const ListCardItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { _class = "px-4 py-4 sm:px-6" } = $$props;
  if ($$props._class === void 0 && $$bindings._class && _class !== void 0)
    $$bindings._class(_class);
  return `<li${add_attribute("class", _class, 0)}>${slots.default ? slots.default({}) : ``}</li>`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $val, $$unsubscribe_val;
  let val = writable("");
  $$unsubscribe_val = subscribe(val, (value) => $val = value);
  let valid$1 = false;
  async function userexists(ign) {
    try {
      await getUUID(ign);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  val.subscribe(async (ign) => {
    valid$1 = ign.length && valid(ign) && await userexists(ign);
    console.log(valid$1);
  });
  $$unsubscribe_val();
  return `<div class="${"min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"}"><div class="${"sm:mx-auto sm:w-full sm:max-w-md"}"><h2 class="${"mt-6 text-center text-3xl font-extrabold text-gray-900"}">Link your Diamondfire profile</h2></div>
  
    <div class="${"mt-8 sm:mx-auto sm:w-full sm:max-w-md"}"><div class="${"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"}">${validate_component(ListCard, "ListCard").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(ListCardItem, "ListCardItem").$$render($$result, {}, {}, {
        default: () => {
          return `<input class="${"w-full"}" type="${"text"}" placeholder="${"Your Minecraft username"}"${add_attribute("value", $val, 0)}>`;
        }
      })}
            ${validate_component(ListCardItem, "ListCardItem").$$render($$result, {}, {}, {
        default: () => {
          return `Your Code is:
            `;
        }
      })}
            ${validate_component(ListCardItem, "ListCardItem").$$render($$result, {}, {}, {
        default: () => {
          return `<span class="${["w-full text-center", !valid$1 ? "text-rose-500" : ""].join(" ").trim()}">${valid$1 ? `${escape(adler32?.str($val))}` : `[INVALID]`}</span>`;
        }
      })}
            ${valid$1 ? `${validate_component(ListCardItem, "ListCardItem").$$render($$result, {}, {}, {
        default: () => {
          return `<span class="${"text-gray-500"}">Join plot 4533 to and enter type @${escape(adler32?.str($val))} in chat
                </span>`;
        }
      })}` : ``}`;
    }
  })}</div></div></div>`;
});
export { Link as default };
