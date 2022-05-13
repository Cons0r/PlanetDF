import { a as assign, n as now, l as loop, i as identity, c as create_ssr_component, b as subscribe, o as onDestroy, v as validate_component, m as missing_component, d as add_attribute, e as each, f as escape, g as null_to_empty } from "../../chunks/index-9677fd3e.js";
import { t as toast } from "../../chunks/SvelteToast.svelte_svelte_type_style_lang-12fbe01c.js";
import { w as writable } from "../../chunks/index-8d06bf08.js";
var app = "";
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$1 = {
  code: "._toastItem.svelte-4niwqz{-webkit-tap-highlight-color:transparent;align-items:center;background:var(--toastBackground,rgba(66,66,66,.9));border:var(--toastBorder,none);border-radius:var(--toastBorderRadius,.125rem);box-shadow:var(\n    --toastBoxShadow,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)\n  );color:var(--toastColor,#fff);display:flex;flex-direction:row;height:var(--toastHeight,auto);margin:var(--toastMargin,0 0 .5rem 0);min-height:var(--toastMinHeight,3.5rem);overflow:hidden;padding:var(--toastPadding,0);position:relative;width:var(--toastWidth,16rem);will-change:transform,opacity}._toastMsg.svelte-4niwqz{flex:1 1 0%;padding:var(--toastMsgPadding,.75rem .5rem)}._toastMsg.svelte-4niwqz a,.pe.svelte-4niwqz{pointer-events:auto}._toastBtn.svelte-4niwqz{align-items:center;cursor:pointer;display:flex;font:1rem sans-serif;height:100%;justify-content:center;outline:none;width:2rem}._toastBar.svelte-4niwqz{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;border:none;bottom:var(--toastBarBottom,0);display:block;height:var(--toastBarHeight,6px);left:var(--toastBarLeft,0);pointer-events:none;position:absolute;right:var(--toastBarRight,auto);top:var(--toastBarTop,auto);width:var(--toastBarWidth,100%)}._toastBar.svelte-4niwqz::-webkit-progress-bar{background:transparent}._toastBar.svelte-4niwqz::-webkit-progress-value{background:var(--toastProgressBackground,var(--toastBarBackground,rgba(33,150,243,.75)))}._toastBar.svelte-4niwqz::-moz-progress-bar{background:var(--toastProgressBackground,var(--toastBarBackground,rgba(33,150,243,.75)))}",
  map: null
};
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  const close = () => toast.pop(item.id);
  const autoclose = () => {
    if ($progress === 1 || $progress === 0) {
      close();
    }
  };
  let next = item.initial;
  const getProps = () => {
    const { props = {}, sendIdTo } = item.component;
    if (sendIdTo) {
      props[sendIdTo] = item.id;
    }
    return props;
  };
  onDestroy(() => {
    if (typeof item.onpop === "function") {
      item.onpop(item.id);
    }
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$1);
  {
    if (typeof item.progress !== "undefined") {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  $$unsubscribe_progress();
  return `<div class="${["_toastItem svelte-4niwqz", item.pausable ? "pe" : ""].join(" ").trim()}"><div role="${"status"}" class="${["_toastMsg svelte-4niwqz", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign(getProps()), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div>
  ${item.dismissable ? `<div class="${"_toastBtn pe svelte-4niwqz"}" role="${"button"}" tabindex="${"-1"}">\u2715</div>` : ``}
  <progress class="${"_toastBar svelte-4niwqz"}"${add_attribute("value", $progress, 0)}></progress>
</div>`;
});
const css = {
  code: "._toastContainer.svelte-1x6b344{bottom:var(--toastContainerBottom,auto);left:var(--toastContainerLeft,auto);list-style-type:none;margin:0;padding:0;pointer-events:none;position:fixed;right:var(--toastContainerRight,2rem);top:var(--toastContainerTop,1.5rem);z-index:var(--toastContainerZIndex,9999)}",
  map: null
};
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items;
  const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "");
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  $$result.css.add(css);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="${"_toastContainer svelte-1x6b344"}">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes.join(" "))) + " svelte-1x6b344"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})}
    </li>`;
  })}
</ul>`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>
		DFTools
	</title>`, ""}`, ""}
<div class="${"h-full bg-gray-50"}">${slots.default ? slots.default({}) : ``}
	<div id="${"wrap"}">${validate_component(SvelteToast, "SvelteToast").$$render($$result, {
    options: { initial: 0, next: 0, intro: { y: -64 } }
  }, {}, {})}</div></div>`;
});
export { _layout as default };
