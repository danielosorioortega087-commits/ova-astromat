import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, computed, defineComponent, h, isReadonly, isRef, isShallow, isReactive, toRaw, mergeProps, useSSRContext, ref, watch, unref, provide, defineAsyncComponent, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, createApp } from "vue";
import { $fetch } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/ofetch/dist/node.mjs";
import { baseURL, publicAssetsURL } from "#internal/nuxt/paths";
import { createHooks } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/hookable/dist/index.mjs";
import { getContext } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/unctx/dist/index.mjs";
import { sanitizeStatusCode, createError as createError$1 } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/h3/dist/index.mjs";
import { hasProtocol, joinURL, withQuery, parseURL, encodePath, decodePath, isScriptProtocol, isEqual, stringifyParsedURL, stringifyQuery, parseQuery } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/ufo/dist/index.mjs";
import { defu } from "C:/Users/javie/Downloads/AstroMat-OVA-Interactivo-Actualizado-v2/ova-mision-matematica/node_modules/defu/dist/defu.mjs";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const nuxtDefaultErrorValue = null;
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.11";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.add(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
import.meta.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
function isScopeWithinInstance(instance) {
  const instanceScope = instance.scope;
  let scope = getCurrentScope();
  while (scope) {
    if (scope === instanceScope) {
      return true;
    }
    scope = scope.parent;
  }
  return false;
}
const useRoute = () => {
  if (hasInjectionContext()) {
    const instance = getCurrentInstance();
    if (!instance || isScopeWithinInstance(instance)) {
      return inject(PageRouteSymbol, useNuxtApp()._route);
    }
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = /* @__PURE__ */ useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = nuxtDefaultErrorValue;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
const routerOptions = {};
const sensitiveMatcher = (m, p) => {
  return [];
};
const foldedMatcher = sensitiveMatcher;
const decodeRoutePath = function decodeRoutePath2(path) {
  if (!path.includes("%")) return path;
  const queryIndex = path.indexOf("?");
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
  try {
    return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
  } catch {
    return path;
  }
};
const normalizePath = (path, fold) => {
  if (typeof path !== "string") {
    return path;
  }
  const decoded = decodeRoutePath(path);
  return fold ? decoded.toLowerCase() : decoded;
};
const _routeRulesMatcher = (path) => routerOptions.sensitive ? defu({}, ...sensitiveMatcher("", normalizePath(path, false)).map((r) => r.data).reverse()) : defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
const routeRulesMatcher = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  const route = fullPath && typeof fullPath === "object" ? fullPath : {};
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: route.params || {},
    name: void 0,
    matched: route.matched || [],
    redirectedFrom: void 0,
    meta: route.meta || {},
    href: fullPath
  };
}
const router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => {
        const index = hooks[hook].indexOf(guard);
        if (index !== -1) {
          hooks[hook].splice(index, 1);
        }
      };
    };
    const baseURL2 = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    let navigationCounter = 0;
    async function handleNavigation(url, replace) {
      const navigationId = ++navigationCounter;
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (navigationId !== navigationCounter) {
            return;
          }
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return await handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
          if (navigationId !== navigationCounter) {
            return;
          }
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url, false),
      replace: (url) => handleNavigation(url, true),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          const route2 = router.resolve(props.to);
          return props.custom ? slots.default?.({ href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    const initialLayoutProps = nuxtApp.payload.state._layoutProps;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
          to.meta.layoutProps = initialLayoutProps;
        }
        nuxtApp._processingMiddleware = true;
        {
          nuxtApp._middlewareTo = to;
        }
        if (!nuxtApp.ssrContext?.islandContext) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          const routeRules = getRouteRules({ path: to.path });
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              const guard = nuxtApp._middleware.named[key];
              if (!guard) {
                continue;
              }
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(guard);
              } else {
                middlewareEntries.delete(guard);
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                delete nuxtApp._middlewareTo;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
        {
          delete nuxtApp._middlewareTo;
        }
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const _imports_0 = publicAssetsURL("/astronauta-logo.png");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$d = {
  __name: "BotonPrincipal",
  __ssrInlineRender: true,
  props: {
    texto: { type: String, default: "Continuar" },
    color: { type: String, default: "primary" },
    deshabilitado: { type: Boolean, default: false },
    anchoCompleto: { type: Boolean, default: false },
    icono: { type: String, default: "→" }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["main-button", [`tone-${__props.color}`, { "is-wide": __props.anchoCompleto }]],
        disabled: __props.deshabilitado
      }, _attrs))} data-v-7c36bbd0><span data-v-7c36bbd0>${ssrInterpolate(__props.texto)}</span><span class="button-arrow" aria-hidden="true" data-v-7c36bbd0>${ssrInterpolate(__props.icono)}</span></button>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BotonPrincipal.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const BotonPrincipal = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-7c36bbd0"]]);
const _sfc_main$c = {
  __name: "PantallaBienvenida",
  __ssrInlineRender: true,
  emits: ["comenzar"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "welcome-screen",
        "aria-label": "Pantalla de bienvenida"
      }, _attrs))} data-v-06f512d4><div class="space-background" aria-hidden="true" data-v-06f512d4><svg class="space-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" data-v-06f512d4><defs data-v-06f512d4><radialGradient id="space-fill" cx="50%" cy="45%" r="75%" data-v-06f512d4><stop offset="0" stop-color="#253978" data-v-06f512d4></stop><stop offset=".52" stop-color="#121b46" data-v-06f512d4></stop><stop offset="1" stop-color="#05091f" data-v-06f512d4></stop></radialGradient><radialGradient id="nebula-purple" data-v-06f512d4><stop offset="0" stop-color="#8d68ff" stop-opacity=".55" data-v-06f512d4></stop><stop offset="1" stop-color="#5844d8" stop-opacity="0" data-v-06f512d4></stop></radialGradient><radialGradient id="nebula-cyan" data-v-06f512d4><stop offset="0" stop-color="#39d9ff" stop-opacity=".38" data-v-06f512d4></stop><stop offset="1" stop-color="#2479c8" stop-opacity="0" data-v-06f512d4></stop></radialGradient><radialGradient id="planet-blue" cx="28%" cy="24%" r="78%" data-v-06f512d4><stop offset="0" stop-color="#c6f5ff" data-v-06f512d4></stop><stop offset=".35" stop-color="#6c9fe9" data-v-06f512d4></stop><stop offset=".75" stop-color="#354caa" data-v-06f512d4></stop><stop offset="1" stop-color="#18245d" data-v-06f512d4></stop></radialGradient><radialGradient id="planet-lilac" cx="30%" cy="24%" r="78%" data-v-06f512d4><stop offset="0" stop-color="#ffe3f2" data-v-06f512d4></stop><stop offset=".4" stop-color="#b37bea" data-v-06f512d4></stop><stop offset="1" stop-color="#49357f" data-v-06f512d4></stop></radialGradient><filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%" data-v-06f512d4><feGaussianBlur stdDeviation="12" result="blur" data-v-06f512d4></feGaussianBlur><feMerge data-v-06f512d4><feMergeNode in="blur" data-v-06f512d4></feMergeNode><feMergeNode in="SourceGraphic" data-v-06f512d4></feMergeNode></feMerge></filter></defs><rect width="1600" height="900" fill="url(#space-fill)" data-v-06f512d4></rect><ellipse class="svg-nebula nebula-purple" cx="300" cy="210" rx="430" ry="270" fill="url(#nebula-purple)" data-v-06f512d4></ellipse><ellipse class="svg-nebula nebula-cyan" cx="1330" cy="690" rx="440" ry="300" fill="url(#nebula-cyan)" data-v-06f512d4></ellipse><ellipse class="svg-nebula nebula-blue" cx="900" cy="430" rx="500" ry="260" fill="url(#nebula-purple)" opacity=".4" data-v-06f512d4></ellipse><g class="stars-layer stars-layer-one" fill="#ffffff" data-v-06f512d4><circle cx="90" cy="105" r="2.2" data-v-06f512d4></circle><circle cx="220" cy="330" r="1.5" data-v-06f512d4></circle><circle cx="365" cy="80" r="1.8" data-v-06f512d4></circle><circle cx="510" cy="230" r="1.3" data-v-06f512d4></circle><circle cx="690" cy="110" r="2" data-v-06f512d4></circle><circle cx="835" cy="300" r="1.4" data-v-06f512d4></circle><circle cx="1010" cy="115" r="1.7" data-v-06f512d4></circle><circle cx="1190" cy="250" r="2.1" data-v-06f512d4></circle><circle cx="1430" cy="130" r="1.6" data-v-06f512d4></circle><circle cx="1510" cy="430" r="2" data-v-06f512d4></circle><circle cx="130" cy="650" r="1.5" data-v-06f512d4></circle><circle cx="390" cy="790" r="1.9" data-v-06f512d4></circle><circle cx="610" cy="650" r="1.3" data-v-06f512d4></circle><circle cx="820" cy="790" r="1.9" data-v-06f512d4></circle><circle cx="1080" cy="620" r="1.5" data-v-06f512d4></circle><circle cx="1450" cy="790" r="1.8" data-v-06f512d4></circle><circle cx="1540" cy="600" r="1.3" data-v-06f512d4></circle><circle cx="950" cy="500" r="1.2" data-v-06f512d4></circle></g><g class="stars-layer stars-layer-two" fill="#9fdfff" data-v-06f512d4><circle cx="155" cy="245" r="2" data-v-06f512d4></circle><circle cx="310" cy="500" r="1.4" data-v-06f512d4></circle><circle cx="555" cy="420" r="1.8" data-v-06f512d4></circle><circle cx="740" cy="590" r="1.4" data-v-06f512d4></circle><circle cx="930" cy="190" r="2" data-v-06f512d4></circle><circle cx="1135" cy="420" r="1.4" data-v-06f512d4></circle><circle cx="1350" cy="330" r="1.8" data-v-06f512d4></circle><circle cx="1480" cy="540" r="1.3" data-v-06f512d4></circle><circle cx="70" cy="835" r="1.6" data-v-06f512d4></circle><circle cx="490" cy="865" r="1.4" data-v-06f512d4></circle><circle cx="760" cy="45" r="1.5" data-v-06f512d4></circle><circle cx="1240" cy="845" r="1.8" data-v-06f512d4></circle></g><g class="orbital-lines" fill="none" stroke="#a7c4ff" stroke-opacity=".14" data-v-06f512d4><ellipse cx="820" cy="455" rx="590" ry="245" transform="rotate(-17 820 455)" data-v-06f512d4></ellipse><ellipse cx="820" cy="455" rx="720" ry="330" transform="rotate(13 820 455)" stroke-dasharray="5 16" data-v-06f512d4></ellipse></g><g class="svg-planet planet-float-one" filter="url(#soft-glow)" data-v-06f512d4><circle cx="250" cy="610" r="76" fill="url(#planet-blue)" data-v-06f512d4></circle><ellipse cx="250" cy="610" rx="105" ry="24" fill="none" stroke="#c4ddff" stroke-opacity=".65" stroke-width="7" transform="rotate(-21 250 610)" data-v-06f512d4></ellipse><ellipse cx="225" cy="582" rx="30" ry="9" fill="#ffffff" opacity=".18" transform="rotate(-24 225 582)" data-v-06f512d4></ellipse></g><g class="svg-planet planet-float-two" filter="url(#soft-glow)" data-v-06f512d4><circle cx="1330" cy="260" r="55" fill="url(#planet-lilac)" data-v-06f512d4></circle><path d="M1282 250 Q1330 230 1378 252" fill="none" stroke="#ffffff" stroke-opacity=".2" stroke-width="7" data-v-06f512d4></path></g><g class="svg-planet planet-float-three" data-v-06f512d4><circle cx="1110" cy="760" r="27" fill="#f5c77b" opacity=".8" data-v-06f512d4></circle><circle cx="1100" cy="751" r="7" fill="#fff2c9" opacity=".8" data-v-06f512d4></circle></g><g class="shooting-star" filter="url(#soft-glow)" data-v-06f512d4><path d="M0 0 L115 58" stroke="#d8f7ff" stroke-width="3" stroke-linecap="round" data-v-06f512d4></path><circle cx="0" cy="0" r="4" fill="#ffffff" data-v-06f512d4></circle></g></svg><div class="space-vignette" data-v-06f512d4></div></div><div class="welcome-content" data-v-06f512d4><div class="logo-stage" data-v-06f512d4><div class="logo-aura" aria-hidden="true" data-v-06f512d4></div><img class="astronaut-logo"${ssrRenderAttr("src", _imports_0)} alt="Astronauta, mascota de la misión matemática" draggable="false" data-v-06f512d4><span class="logo-spark spark-one" aria-hidden="true" data-v-06f512d4>✦</span><span class="logo-spark spark-two" aria-hidden="true" data-v-06f512d4>✧</span><span class="logo-spark spark-three" aria-hidden="true" data-v-06f512d4>✦</span></div><h1 class="welcome-question" aria-label="Astromat: números a bordo" data-v-06f512d4><span class="title-main" data-v-06f512d4>Astromat:</span><span class="title-subline" data-v-06f512d4>números a bordo</span></h1><div class="launch-button" data-v-06f512d4>`);
      _push(ssrRenderComponent(BotonPrincipal, {
        texto: "Comenzar",
        icono: "🚀",
        onClick: ($event) => emit("comenzar")
      }, null, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PantallaBienvenida.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const PantallaBienvenida = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-06f512d4"]]);
const _sfc_main$b = {
  __name: "LeccionMatematica",
  __ssrInlineRender: true,
  props: { mundo: { type: Object, required: true } },
  setup(__props) {
    const props = __props;
    const symbols = computed(() => props.mundo.id === "multiplicacion" ? ["🛰️", "🛰️", "🛰️", "🛰️", "×", "📦", "📦", "📦"] : props.mundo.id === "division" ? ["💎", "💎", "💎", "💎", "÷", "🪐", "🪐", "🪐"] : props.mundo.id === "patrones" ? ["⭐", "🌙", "⭐", "🌙", "⭐", "🌙", "⭐"] : props.mundo.id === "problemas" ? ["🚀", "🧑‍🚀", "🪐", "🔭", "🧩"] : ["⭐", "⭐", "＋", "🌟", "−", "✨"]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "lesson" }, _attrs))} data-v-5d4475e3><div class="hero" data-v-5d4475e3><div data-v-5d4475e3><p class="eyebrow" data-v-5d4475e3>BITÁCORA DE EXPLORACIÓN</p><h2 data-v-5d4475e3>${ssrInterpolate(__props.mundo.titulo)}</h2><p data-v-5d4475e3>${ssrInterpolate(__props.mundo.intro)}</p></div><div class="planet-art" aria-hidden="true" data-v-5d4475e3><span data-v-5d4475e3>${ssrInterpolate(__props.mundo.icono)}</span><i data-v-5d4475e3></i><b data-v-5d4475e3>✦</b></div></div><h3 data-v-5d4475e3>Conceptos para tu misión</h3><div class="concept-grid" data-v-5d4475e3><!--[-->`);
      ssrRenderList(__props.mundo.conceptos, (concepto, i) => {
        _push(`<article class="concept" data-v-5d4475e3><span class="concept-number" data-v-5d4475e3>${ssrInterpolate(i + 1)}</span><h4 data-v-5d4475e3>${ssrInterpolate(concepto[0])}</h4><p data-v-5d4475e3>${ssrInterpolate(concepto[1])}</p></article>`);
      });
      _push(`<!--]--></div><div class="example" data-v-5d4475e3><span class="example-icon" data-v-5d4475e3>💡</span><div data-v-5d4475e3><strong data-v-5d4475e3>Ejemplo ilustrado</strong><p data-v-5d4475e3>${ssrInterpolate(__props.mundo.ejemplo)}</p></div></div><div class="visual-strip" aria-label="Ilustración espacial" data-v-5d4475e3><!--[-->`);
      ssrRenderList(symbols.value, (symbol) => {
        _push(`<span data-v-5d4475e3>${ssrInterpolate(symbol)}</span>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LeccionMatematica.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const LeccionMatematica = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-5d4475e3"]]);
const _sfc_main$a = {
  __name: "ActividadInteractiva",
  __ssrInlineRender: true,
  props: { actividades: { type: Array, required: true }, completadas: { type: Object, default: () => ({}) }, mundoId: { type: String, required: true } },
  emits: ["calificada"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const respuestas = ref({});
    const resultados = ref({});
    watch(() => props.mundoId, () => {
      respuestas.value = {};
      resultados.value = {};
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "activity" }, _attrs))} data-v-e77c77a6><div class="section-title" data-v-e77c77a6><span data-v-e77c77a6>🧪</span><div data-v-e77c77a6><p class="eyebrow" data-v-e77c77a6>LABORATORIO DE PRÁCTICA</p><h3 data-v-e77c77a6>Completa las cinco actividades</h3></div></div><p class="intro" data-v-e77c77a6>Cada respuesta correcta suma un punto a tus actividades y una estrella. Puedes volver a intentar las que aún no superas.</p><div class="activity-list" data-v-e77c77a6><!--[-->`);
      ssrRenderList(__props.actividades, (actividad, index) => {
        _push(`<article class="mission-card" data-v-e77c77a6><h4 data-v-e77c77a6>Actividad ${ssrInterpolate(index + 1)} de ${ssrInterpolate(__props.actividades.length)}</h4><p class="question" data-v-e77c77a6>${ssrInterpolate(actividad.pregunta)}</p><form class="answer-row" data-v-e77c77a6><label class="sr-only"${ssrRenderAttr("for", `respuesta-${__props.mundoId}-${actividad.id}`)} data-v-e77c77a6>Tu respuesta para la actividad ${ssrInterpolate(index + 1)}</label><input${ssrRenderAttr("id", `respuesta-${__props.mundoId}-${actividad.id}`)}${ssrRenderAttr("value", respuestas.value[actividad.id])} type="number" inputmode="numeric" placeholder="Escribe tu respuesta"${ssrIncludeBooleanAttr(__props.completadas[actividad.id] || resultados.value[actividad.id] !== void 0) ? " disabled" : ""} data-v-e77c77a6><button type="submit"${ssrIncludeBooleanAttr(respuestas.value[actividad.id] === void 0 || respuestas.value[actividad.id] === "" || __props.completadas[actividad.id] || resultados.value[actividad.id] !== void 0) ? " disabled" : ""} data-v-e77c77a6>Comprobar</button></form>`);
        if (__props.completadas[actividad.id] || resultados.value[actividad.id] !== void 0) {
          _push(`<div class="${ssrRenderClass([{ correct: __props.completadas[actividad.id] || resultados.value[actividad.id] }, "feedback"])}" data-v-e77c77a6><strong data-v-e77c77a6>${ssrInterpolate(__props.completadas[actividad.id] || resultados.value[actividad.id] ? "¡Actividad superada! ⭐" : "¡Sigue intentando! 🚀")}</strong><p data-v-e77c77a6>${ssrInterpolate(__props.completadas[actividad.id] || resultados.value[actividad.id] ? "Respuesta correcta: sumaste un punto y una estrella." : `La respuesta correcta es ${actividad.respuesta}.`)} ${ssrInterpolate(actividad.ayuda)}</p>`);
          if (!__props.completadas[actividad.id] && resultados.value[actividad.id] === false) {
            _push(`<button type="button" data-v-e77c77a6>Volver a intentar</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ActividadInteractiva.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ActividadInteractiva = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-e77c77a6"]]);
const _sfc_main$9 = {
  __name: "EvaluacionMundo",
  __ssrInlineRender: true,
  props: { preguntas: { type: Array, required: true }, mundoId: { type: String, required: true } },
  emits: ["completada"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const respuestas = ref({});
    const terminada = ref(false);
    const respondidas = computed(() => Object.keys(respuestas.value).length);
    const puntaje = computed(() => props.preguntas.reduce((total, p, i) => total + (respuestas.value[i] === p[2] ? 1 : 0), 0));
    function reiniciar() {
      respuestas.value = {};
      terminada.value = false;
    }
    watch(() => props.mundoId, reiniciar);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "assessment" }, _attrs))} data-v-abd65076><div class="assessment-head" data-v-abd65076><div data-v-abd65076><p class="eyebrow" data-v-abd65076>CONTROL DE LA MISIÓN</p><h3 data-v-abd65076>Evaluación del mundo</h3><p data-v-abd65076>Responde las diez preguntas. Puedes revisar tus resultados y volver a intentarlo.</p></div><div class="counter" data-v-abd65076>${ssrInterpolate(respondidas.value)}/10</div></div><div class="progress-track" data-v-abd65076><span style="${ssrRenderStyle({ width: `${respondidas.value * 10}%` })}" data-v-abd65076></span></div><!--[-->`);
      ssrRenderList(__props.preguntas, (pregunta, index) => {
        _push(`<article class="question-card" data-v-abd65076><h4 data-v-abd65076><span data-v-abd65076>${ssrInterpolate(index + 1)}.</span> ${ssrInterpolate(pregunta[0])}</h4><div class="options" data-v-abd65076><!--[-->`);
        ssrRenderList(pregunta[1], (opcion, i) => {
          _push(`<button type="button"${ssrIncludeBooleanAttr(terminada.value) ? " disabled" : ""} class="${ssrRenderClass({ chosen: respuestas.value[index] === i, right: terminada.value && i === pregunta[2], wrong: terminada.value && respuestas.value[index] === i && i !== pregunta[2] })}" data-v-abd65076><b data-v-abd65076>${ssrInterpolate(String.fromCharCode(65 + i))}</b>${ssrInterpolate(opcion)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (terminada.value) {
          _push(`<p class="${ssrRenderClass([{ good: respuestas.value[index] === pregunta[2] }, "explanation"])}" data-v-abd65076>${ssrInterpolate(respuestas.value[index] === pregunta[2] ? "✓ Correcta" : "✕ Revisa")} — ${ssrInterpolate(pregunta[3])} `);
          if (respuestas.value[index] === pregunta[2]) {
            _push(`<strong class="earned-star" data-v-abd65076>⭐ +1 estrella</strong>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--><div class="assessment-actions" data-v-abd65076>`);
      if (!terminada.value) {
        _push(`<button type="button"${ssrIncludeBooleanAttr(respondidas.value !== 10) ? " disabled" : ""} data-v-abd65076>Calificar evaluación</button>`);
      } else {
        _push(`<div class="result" data-v-abd65076><strong data-v-abd65076>Resultado: ${ssrInterpolate(puntaje.value)}/10</strong><span data-v-abd65076>${ssrInterpolate(puntaje.value >= 8 ? "¡Excelente exploración!" : puntaje.value >= 6 ? "¡Buen trabajo, sigue practicando!" : "Cada intento te ayuda a aprender. ¡Puedes repetir!")}</span><strong class="earned-total" data-v-abd65076>Estrellas ganadas: ${ssrInterpolate(puntaje.value)} ⭐</strong><button type="button" data-v-abd65076>Reintentar evaluación</button></div>`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EvaluacionMundo.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const EvaluacionMundo = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-abd65076"]]);
const _sfc_main$8 = {
  __name: "ProgresoEstudiante",
  __ssrInlineRender: true,
  props: { mundos: { type: Array, required: true }, registro: { type: Object, default: () => ({}) }, progresoActividades: { type: Object, default: () => ({}) }, actividadesRealizadas: { type: Object, default: () => ({}) }, estrellas: { type: Object, default: () => ({}) } },
  emits: ["reiniciar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const completados = computed(() => props.mundos.filter((m) => props.registro[m.id] !== void 0));
    const puntos = computed(() => Object.values(props.registro).reduce((a, b) => a + b, 0));
    const porcentaje = computed(() => Math.round(completados.value.length / 5 * 100));
    const totalActividades = computed(() => props.mundos.reduce((total, mundo) => total + mundo.actividades.length, 0));
    const actividadesCompletadas = computed(() => props.mundos.reduce((total, mundo) => total + contarActividades(mundo), 0));
    const actividadesRealizadasTotal = computed(() => props.mundos.reduce((total, mundo) => total + contarActividadesRealizadas(mundo), 0));
    const totalEstrellas = computed(() => Object.values(props.estrellas).reduce((total, cantidad) => total + cantidad, 0));
    function contarActividades(mundo) {
      const completadas = props.progresoActividades[mundo.id] || {};
      return mundo.actividades.filter((actividad) => completadas[actividad.id]).length;
    }
    function contarActividadesRealizadas(mundo) {
      const realizadas = props.actividadesRealizadas[mundo.id] || {};
      return mundo.actividades.filter((actividad) => realizadas[actividad.id]).length;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "progress-panel" }, _attrs))} data-v-badda1fe><p class="eyebrow" data-v-badda1fe>DIARIO DE VIAJE</p><h3 data-v-badda1fe>Tu progreso estelar</h3><div class="summary" data-v-badda1fe><div data-v-badda1fe><strong data-v-badda1fe>${ssrInterpolate(completados.value.length)}/5</strong><span data-v-badda1fe>Evaluaciones completadas</span></div><div data-v-badda1fe><strong data-v-badda1fe>${ssrInterpolate(puntos.value)}</strong><span data-v-badda1fe>Puntos de evaluación</span></div><div data-v-badda1fe><strong data-v-badda1fe>${ssrInterpolate(porcentaje.value)}%</strong><span data-v-badda1fe>Avance de evaluación</span></div></div><div class="progress-track" data-v-badda1fe><span style="${ssrRenderStyle({ width: `${porcentaje.value}%` })}" data-v-badda1fe></span></div><h4 class="list-heading" data-v-badda1fe>Avance de actividades</h4><p class="section-description" data-v-badda1fe>${ssrInterpolate(actividadesRealizadasTotal.value)}/${ssrInterpolate(totalActividades.value)} actividades realizadas y ${ssrInterpolate(actividadesCompletadas.value)} superadas.</p><ul class="progress-list" data-v-badda1fe><!--[-->`);
      ssrRenderList(__props.mundos, (mundo) => {
        _push(`<li data-v-badda1fe><span data-v-badda1fe>${ssrInterpolate(mundo.icono)} ${ssrInterpolate(mundo.titulo)}</span><b data-v-badda1fe>${ssrInterpolate(contarActividadesRealizadas(mundo))}/${ssrInterpolate(mundo.actividades.length)} realizadas · ${ssrInterpolate(contarActividades(mundo))} superadas</b></li>`);
      });
      _push(`<!--]--></ul><h4 class="list-heading" data-v-badda1fe>Resultados de evaluaciones</h4><ul class="progress-list" data-v-badda1fe><!--[-->`);
      ssrRenderList(__props.mundos, (mundo) => {
        _push(`<li data-v-badda1fe><span data-v-badda1fe>${ssrInterpolate(mundo.icono)} ${ssrInterpolate(mundo.titulo)}</span>`);
        if (__props.registro[mundo.id] !== void 0) {
          _push(`<b data-v-badda1fe>${ssrInterpolate(__props.registro[mundo.id])}/10</b>`);
        } else {
          _push(`<span class="pending" data-v-badda1fe>Pendiente</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      if (completados.value.length === 5) {
        _push(`<div class="award" data-v-badda1fe><span data-v-badda1fe>🏆</span><strong data-v-badda1fe>¡Explorador/a de AstroMat!</strong><p data-v-badda1fe>Has completado las cinco misiones matemáticas. ¡La galaxia celebra tu esfuerzo!</p><div class="congratulations" data-v-badda1fe><span class="congratulations-astronaut" role="img" aria-label="Astronauta felicitándote" data-v-badda1fe>🧑‍🚀</span><strong data-v-badda1fe>¡Felicidades! ¡Lo lograste!</strong><span class="celebration-stars" aria-hidden="true" data-v-badda1fe>✨ ⭐ ✨</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (completados.value.length || actividadesRealizadasTotal.value || totalEstrellas.value) {
        _push(`<button type="button" class="reset-progress" data-v-badda1fe>↺ Reiniciar avance</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProgresoEstudiante.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ProgresoEstudiante = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-badda1fe"]]);
const _sfc_main$7 = {
  __name: "EstrellasEstudiante",
  __ssrInlineRender: true,
  props: { mundos: { type: Array, required: true }, estrellas: { type: Object, default: () => ({}) } },
  setup(__props) {
    const props = __props;
    const totalEstrellas = computed(() => props.mundos.reduce((total, mundo) => total + (props.estrellas[mundo.id] || 0), 0));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "stars-panel" }, _attrs))} data-v-190d83b7><p class="eyebrow" data-v-190d83b7>RECOMPENSAS DE MISIÓN</p><h3 data-v-190d83b7>Mis estrellas</h3><div class="star-total" role="status" aria-live="polite" data-v-190d83b7><span aria-hidden="true" data-v-190d83b7>⭐</span><strong data-v-190d83b7>${ssrInterpolate(totalEstrellas.value)}</strong><span data-v-190d83b7>estrellas ganadas</span></div>`);
      if (totalEstrellas.value === 0) {
        _push(`<p class="empty-message" data-v-190d83b7>Responde correctamente en las actividades y evaluaciones para ganar estrellas.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul data-v-190d83b7><!--[-->`);
      ssrRenderList(__props.mundos, (mundo) => {
        _push(`<li data-v-190d83b7><span class="world-name" data-v-190d83b7><span aria-hidden="true" data-v-190d83b7>${ssrInterpolate(mundo.icono)}</span>${ssrInterpolate(mundo.titulo)}</span><strong${ssrRenderAttr("aria-label", `${__props.estrellas[mundo.id] || 0} estrellas`)} data-v-190d83b7>${ssrInterpolate(__props.estrellas[mundo.id] || 0)} <span aria-hidden="true" data-v-190d83b7>⭐</span></strong></li>`);
      });
      _push(`<!--]--></ul></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EstrellasEstudiante.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const EstrellasEstudiante = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-190d83b7"]]);
const _sfc_main$6 = {
  __name: "RecursosEducativos",
  __ssrInlineRender: true,
  props: { mundos: { type: Array, required: true } },
  setup(__props) {
    const props = __props;
    const recursos = computed(() => props.mundos.flatMap((m) => m.recursos.map((r) => [r[0], `${m.titulo}: ${r[1]}`, r[2]])));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "resources" }, _attrs))} data-v-597008da><p class="eyebrow" data-v-597008da>BIBLIOTECA ESTELAR</p><h3 data-v-597008da>Recursos para seguir explorando</h3><p class="intro" data-v-597008da>Material complementario para reforzar lo aprendido en cada mundo.</p><div class="resource-grid" data-v-597008da><!--[-->`);
      ssrRenderList(recursos.value, (item, i) => {
        _push(`<article class="resource-card" data-v-597008da><span class="resource-icon" data-v-597008da>${ssrInterpolate(i % 2 === 0 ? "▶" : "🎮")}</span><div data-v-597008da><h4 data-v-597008da>${ssrInterpolate(item[0])}</h4><p data-v-597008da>${ssrInterpolate(item[1])}</p><a${ssrRenderAttr("href", item[2])} target="_blank" rel="noopener noreferrer" data-v-597008da>${ssrInterpolate(i % 2 === 0 ? "Ver video" : "Jugar ahora")} ↗</a></div></article>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecursosEducativos.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const RecursosEducativos = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-597008da"]]);
const _sfc_main$5 = {
  __name: "Creditos",
  __ssrInlineRender: true,
  setup(__props) {
    const integrantes = [
      { nombre: "Sherik Hernández", foto: "/fotos-integrantes/Sherik Hernández.jpeg" },
      { nombre: "Daniel Galarcio", foto: "/fotos-integrantes/Daniel Galarcio.jpeg" },
      { nombre: "Karol Bustamante", foto: "/fotos-integrantes/Karol Bustamante.jpeg" }
    ];
    const docente = {
      nombre: "Camilo Mendoza",
      foto: "/fotos-integrantes/Camilo Mendoza.jpg"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "credits" }, _attrs))} data-v-83c2c2af><p class="eyebrow" data-v-83c2c2af>TRIPULACIÓN DE ASTROMAT</p><h3 data-v-83c2c2af>Créditos del proyecto</h3><p class="intro" data-v-83c2c2af>Conoce a las personas que hicieron posible esta misión de aprendizaje.</p><h4 class="section-heading" data-v-83c2c2af>Integrantes</h4><div class="crew-grid" data-v-83c2c2af><!--[-->`);
      ssrRenderList(integrantes, (integrante) => {
        _push(`<article class="crew-card" data-v-83c2c2af><div class="photo-slot" data-v-83c2c2af><img${ssrRenderAttr("src", integrante.foto)}${ssrRenderAttr("alt", `Fotografía de ${integrante.nombre}`)} loading="lazy" data-v-83c2c2af></div><h5 data-v-83c2c2af>${ssrInterpolate(integrante.nombre)}</h5></article>`);
      });
      _push(`<!--]--></div><h4 class="section-heading" data-v-83c2c2af>Docente</h4><div class="teacher-grid" data-v-83c2c2af><article class="crew-card teacher-card" data-v-83c2c2af><div class="photo-slot" data-v-83c2c2af><img${ssrRenderAttr("src", docente.foto)}${ssrRenderAttr("alt", `Fotografía de ${docente.nombre}`)} loading="lazy" data-v-83c2c2af></div><div class="teacher-info" data-v-83c2c2af><span class="role-badge" data-v-83c2c2af>Docente responsable</span><h5 data-v-83c2c2af>${ssrInterpolate(docente.nombre)}</h5></div></article></div><h4 class="section-heading" data-v-83c2c2af>Información institucional</h4><dl class="institution" data-v-83c2c2af><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Universidad</dt><dd data-v-83c2c2af>Universidad de Córdoba</dd></div><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Programa</dt><dd data-v-83c2c2af>Licenciatura en Informática</dd></div><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Asignatura</dt><dd data-v-83c2c2af>Fundamentos de programación</dd></div><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Facultad</dt><dd data-v-83c2c2af>Facultad de educación y ciencias humanas</dd></div><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Lugar</dt><dd data-v-83c2c2af>Montería</dd></div><div class="inst-item" data-v-83c2c2af><dt data-v-83c2c2af>Año</dt><dd data-v-83c2c2af>2026</dd></div></dl><p class="sources" data-v-83c2c2af><strong data-v-83c2c2af>Fuentes de apoyo:</strong> materiales educativos de Mundo Primaria y KidsDoMath, y videos de YouTube enlazados en la biblioteca de recursos. Las fotografías corresponden al equipo del proyecto. </p></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Creditos.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Creditos = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-83c2c2af"]]);
const _sfc_main$4 = {
  __name: "MundoAprendizaje",
  __ssrInlineRender: true,
  props: { mundo: { type: Object, required: true }, mundos: { type: Array, required: true }, registro: { type: Object, default: () => ({}) }, progresoActividades: { type: Object, default: () => ({}) }, actividadesRealizadas: { type: Object, default: () => ({}) }, estrellas: { type: Object, default: () => ({}) } },
  emits: ["volver", "completada", "reiniciar", "actividadCalificada"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function guardarActividadCalificada(resultado) {
      emit("actividadCalificada", { mundoId: props.mundo.id, ...resultado });
    }
    const seccion = ref("contenido");
    const tabs = [{ id: "contenido", nombre: "Contenido", icon: "📘" }, { id: "actividad", nombre: "Actividades", icon: "🧩" }, { id: "evaluacion", nombre: "Evaluación", icon: "📝" }, { id: "progreso", nombre: "Avance", icon: "🚀" }, { id: "estrellas", nombre: "Estrellas", icon: "⭐" }, { id: "recursos", nombre: "Recursos", icon: "📚" }, { id: "creditos", nombre: "Créditos", icon: "👩‍🚀" }];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "learning-world" }, _attrs))} data-v-89445ab2><div class="world-top" data-v-89445ab2><button type="button" class="back" data-v-89445ab2>← Volver a los planetas</button><div class="world-title" data-v-89445ab2><span data-v-89445ab2>${ssrInterpolate(__props.mundo.icono)}</span><div data-v-89445ab2><p data-v-89445ab2>DESTINO ACTUAL</p><h2 data-v-89445ab2>${ssrInterpolate(__props.mundo.titulo)}</h2></div></div></div><nav class="tabs" aria-label="Secciones del mundo" data-v-89445ab2><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass({ active: seccion.value === tab.id })}" data-v-89445ab2>${ssrInterpolate(tab.icon)} ${ssrInterpolate(tab.nombre)}</button>`);
      });
      _push(`<!--]--></nav>`);
      if (seccion.value === "contenido") {
        _push(ssrRenderComponent(LeccionMatematica, {
          key: `lesson-${__props.mundo.id}`,
          mundo: __props.mundo
        }, null, _parent));
      } else if (seccion.value === "actividad") {
        _push(ssrRenderComponent(ActividadInteractiva, {
          key: `activity-${__props.mundo.id}`,
          "mundo-id": __props.mundo.id,
          actividades: __props.mundo.actividades,
          completadas: __props.progresoActividades[__props.mundo.id] || {},
          onCalificada: guardarActividadCalificada
        }, null, _parent));
      } else if (seccion.value === "evaluacion") {
        _push(ssrRenderComponent(EvaluacionMundo, {
          key: `test-${__props.mundo.id}`,
          "mundo-id": __props.mundo.id,
          preguntas: __props.mundo.preguntas,
          onCompletada: ($event) => _ctx.$emit("completada", $event)
        }, null, _parent));
      } else if (seccion.value === "progreso") {
        _push(ssrRenderComponent(ProgresoEstudiante, {
          mundos: __props.mundos,
          registro: __props.registro,
          "progreso-actividades": __props.progresoActividades,
          "actividades-realizadas": __props.actividadesRealizadas,
          estrellas: __props.estrellas,
          onReiniciar: ($event) => _ctx.$emit("reiniciar")
        }, null, _parent));
      } else if (seccion.value === "estrellas") {
        _push(ssrRenderComponent(EstrellasEstudiante, {
          mundos: __props.mundos,
          estrellas: __props.estrellas
        }, null, _parent));
      } else if (seccion.value === "recursos") {
        _push(ssrRenderComponent(RecursosEducativos, { mundos: __props.mundos }, null, _parent));
      } else {
        _push(ssrRenderComponent(Creditos, null, null, _parent));
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MundoAprendizaje.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MundoAprendizaje = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-89445ab2"]]);
const mundos = [
  {
    "id": "sumas-restas",
    "titulo": "Planeta Numérico",
    "subtitulo": "Suma y resta",
    "icono": "＋",
    "color": "azul",
    "intro": "En este planeta las cantidades se reúnen y se transforman. Sumar permite encontrar un total; restar permite saber cuánto queda o comparar cantidades.",
    "conceptos": [
      [
        "Suma",
        "Operación que reúne cantidades para obtener un total."
      ],
      [
        "Resta",
        "Operación que quita una cantidad o encuentra una diferencia."
      ],
      [
        "Términos",
        "En la suma: sumandos y total. En la resta: minuendo, sustraendo y diferencia."
      ],
      [
        "Comprobación",
        "Una resta se comprueba sumando la diferencia y el sustraendo."
      ]
    ],
    "ejemplo": "En la estación hay 24 estrellas y llegan 13 más: 24 + 13 = 37. Si se usan 9, quedan 37 − 9 = 28.",
    "actividades": [
      {
        "id": "suma-1",
        "pregunta": "La nave recoge 28 cristales y después 17 más. ¿Cuántos tiene en total?",
        "respuesta": 45,
        "ayuda": "Suma las decenas (20 + 10) y las unidades (8 + 7)."
      },
      {
        "id": "suma-2",
        "pregunta": "Una sonda encuentra 46 rocas y luego 38 más. ¿Cuántas encuentra en total?",
        "respuesta": 84,
        "ayuda": "Agrupa primero las decenas y luego las unidades."
      },
      {
        "id": "resta-1",
        "pregunta": "Había 95 muestras y se analizaron 27. ¿Cuántas quedan?",
        "respuesta": 68,
        "ayuda": "Resta primero 20 y después 7."
      },
      {
        "id": "suma-3",
        "pregunta": "¿Cuánto es 125 + 75?",
        "respuesta": 200,
        "ayuda": "75 completa la centena que falta después de 125."
      },
      {
        "id": "resta-2",
        "pregunta": "La estación tenía 300 baterías y usó 148. ¿Cuántas quedan?",
        "respuesta": 152,
        "ayuda": "Puedes restar 100 y luego 48."
      }
    ],
    "preguntas": [
      [
        "36 + 27 = ?",
        [
          "53",
          "63",
          "73",
          "62"
        ],
        1,
        "36 + 20 = 56 y 56 + 7 = 63."
      ],
      [
        "84 − 29 = ?",
        [
          "55",
          "65",
          "54",
          "45"
        ],
        0,
        "84 − 20 = 64 y 64 − 9 = 55."
      ],
      [
        "125 + 75 = ?",
        [
          "190",
          "200",
          "210",
          "175"
        ],
        1,
        "125 + 75 completa 200."
      ],
      [
        "90 − 46 = ?",
        [
          "54",
          "44",
          "46",
          "34"
        ],
        1,
        "90 − 40 = 50 y 50 − 6 = 44."
      ],
      [
        "¿Qué propiedad muestra 8 + 5 = 5 + 8?",
        [
          "Asociativa",
          "Conmutativa",
          "Distributiva",
          "Clausurativa"
        ],
        1,
        "El orden de los sumandos no cambia el resultado."
      ],
      [
        "300 − 125 = ?",
        [
          "175",
          "185",
          "225",
          "165"
        ],
        0,
        "300 − 100 = 200 y 200 − 25 = 175."
      ],
      [
        "Una sonda tiene 48 unidades y recibe 26. ¿Cuántas tiene?",
        [
          "64",
          "72",
          "74",
          "84"
        ],
        2,
        "48 + 26 = 74."
      ],
      [
        "¿Cómo se comprueba 72 − 38 = 34?",
        [
          "34 − 38",
          "72 + 38",
          "34 + 38",
          "72 − 34"
        ],
        2,
        "34 + 38 debe dar el minuendo: 72."
      ],
      [
        "16 + 19 + 4 = ?",
        [
          "39",
          "40",
          "41",
          "29"
        ],
        0,
        "16 + 4 = 20 y 20 + 19 = 39."
      ],
      [
        "Había 100 muestras y se analizaron 37. ¿Cuántas faltan?",
        [
          "73",
          "67",
          "63",
          "53"
        ],
        2,
        "100 − 37 = 63."
      ]
    ],
    "recursos": [
      [
        "Suma y resta para niños",
        "Video educativo sobre las operaciones de suma y resta.",
        "https://www.youtube.com/watch?v=LUBlI90ya4E"
      ],
      [
        "Juegos de sumas",
        "Juegos educativos para practicar sumas.",
        "https://www.mundoprimaria.com/juegos-educativos/juegos-matematicas/juegos-sumas"
      ]
    ]
  },
  {
    "id": "multiplicacion",
    "titulo": "Mundo de los Grupos",
    "subtitulo": "Multiplicación",
    "icono": "×",
    "color": "rosa",
    "intro": "Organizamos objetos en grupos iguales. Multiplicar permite contar con rapidez cuando una cantidad se repite varias veces.",
    "conceptos": [
      [
        "Multiplicación",
        "Suma repetida de grupos con la misma cantidad."
      ],
      [
        "Factores",
        "Son los números que se multiplican."
      ],
      [
        "Producto",
        "Es el resultado de la multiplicación."
      ],
      [
        "Propiedad conmutativa",
        "Cambiar el orden de los factores no cambia el producto."
      ]
    ],
    "ejemplo": "Hay 4 plataformas con 6 robots en cada una. En total hay 4 × 6 = 24 robots. También es 6 + 6 + 6 + 6.",
    "actividades": [
      {
        "id": "multiplicacion-1",
        "pregunta": "Hay 7 cajas con 8 baterías en cada una. ¿Cuántas baterías hay?",
        "respuesta": 56,
        "ayuda": "Calcula 7 grupos de 8."
      },
      {
        "id": "multiplicacion-2",
        "pregunta": "Una nave tiene 6 filas con 9 asientos cada una. ¿Cuántos asientos hay?",
        "respuesta": 54,
        "ayuda": "Multiplica el número de filas por los asientos de cada fila."
      },
      {
        "id": "multiplicacion-3",
        "pregunta": "¿Cuánto es 12 × 4?",
        "respuesta": 48,
        "ayuda": "Suma 12 cuatro veces."
      },
      {
        "id": "multiplicacion-4",
        "pregunta": "Hay 5 grupos con 13 estrellas cada uno. ¿Cuántas estrellas hay?",
        "respuesta": 65,
        "ayuda": "Calcula 13 × 5."
      },
      {
        "id": "multiplicacion-5",
        "pregunta": "Nueve equipos reciben 6 mapas cada uno. ¿Cuántos mapas se entregan?",
        "respuesta": 54,
        "ayuda": "Calcula 9 grupos de 6."
      }
    ],
    "preguntas": [
      [
        "6 × 7 = ?",
        [
          "36",
          "42",
          "48",
          "56"
        ],
        1,
        "6 grupos de 7 forman 42."
      ],
      [
        "9 × 8 = ?",
        [
          "63",
          "72",
          "81",
          "64"
        ],
        1,
        "9 por 8 es 72."
      ],
      [
        "5 × 12 = ?",
        [
          "50",
          "55",
          "60",
          "65"
        ],
        2,
        "Cinco grupos de doce suman 60."
      ],
      [
        "¿Qué representa 3 × 4?",
        [
          "3 + 4",
          "4 grupos de 3",
          "3 − 4",
          "12 + 3"
        ],
        1,
        "Cuatro grupos de tres forman 12."
      ],
      [
        "8 × 1 = ?",
        [
          "0",
          "1",
          "8",
          "9"
        ],
        2,
        "Todo número multiplicado por uno conserva su valor."
      ],
      [
        "7 × 0 = ?",
        [
          "7",
          "1",
          "0",
          "70"
        ],
        2,
        "Todo número multiplicado por cero da cero."
      ],
      [
        "12 × 4 = ?",
        [
          "36",
          "42",
          "48",
          "52"
        ],
        2,
        "12 + 12 + 12 + 12 = 48."
      ],
      [
        "En 6 × 9 = 54, ¿cuál es el producto?",
        [
          "6",
          "9",
          "54",
          "15"
        ],
        2,
        "El producto es el resultado: 54."
      ],
      [
        "4 × 15 = ?",
        [
          "45",
          "50",
          "60",
          "65"
        ],
        2,
        "4 veces 15 es 60."
      ],
      [
        "8 filas tienen 6 asientos cada una. ¿Cuántos asientos?",
        [
          "42",
          "46",
          "48",
          "56"
        ],
        2,
        "8 × 6 = 48."
      ]
    ],
    "recursos": [
      [
        "Multiplicación por grupos",
        "Video sobre la multiplicación como suma repetida.",
        "https://www.youtube.com/watch?v=mXdMxO3IZZY"
      ],
      [
        "Juegos de multiplicación",
        "Actividades interactivas para practicar multiplicaciones.",
        "https://www.mundoprimaria.com/juegos-educativos/juegos-matematicas/juegos-multiplicar"
      ]
    ]
  },
  {
    "id": "division",
    "titulo": "Anillos de Reparto",
    "subtitulo": "División",
    "icono": "÷",
    "color": "violeta",
    "intro": "En los anillos de reparto distribuimos cantidades en partes iguales. La división permite saber cuánto recibe cada grupo o cuántos grupos se pueden formar.",
    "conceptos": [
      [
        "Dividendo",
        "Cantidad total que se va a repartir."
      ],
      [
        "Divisor",
        "Número por el que se divide."
      ],
      [
        "Cociente",
        "Resultado de la división."
      ],
      [
        "Residuo",
        "Cantidad que puede sobrar cuando el reparto no es exacto."
      ]
    ],
    "ejemplo": "24 meteoritos se reparten por igual entre 4 estaciones: 24 ÷ 4 = 6. Cada estación recibe 6 meteoritos.",
    "actividades": [
      {
        "id": "division-1",
        "pregunta": "Se reparten 63 tarjetas entre 9 equipos por igual. ¿Cuántas recibe cada equipo?",
        "respuesta": 7,
        "ayuda": "Busca qué número multiplicado por 9 da 63."
      },
      {
        "id": "division-2",
        "pregunta": "Se reparten 72 muestras entre 8 estaciones. ¿Cuántas recibe cada una?",
        "respuesta": 9,
        "ayuda": "Encuentra el número que multiplicado por 8 da 72."
      },
      {
        "id": "division-3",
        "pregunta": "¿Cuánto es 96 ÷ 12?",
        "respuesta": 8,
        "ayuda": "Piensa qué número multiplicado por 12 da 96."
      },
      {
        "id": "division-4",
        "pregunta": "81 paneles se distribuyen en 9 grupos iguales. ¿Cuántos van en cada grupo?",
        "respuesta": 9,
        "ayuda": "Divide 81 entre 9."
      },
      {
        "id": "division-5",
        "pregunta": "¿Cuánto es 45 ÷ 5?",
        "respuesta": 9,
        "ayuda": "Busca qué número multiplicado por 5 da 45."
      }
    ],
    "preguntas": [
      [
        "36 ÷ 6 = ?",
        [
          "5",
          "6",
          "7",
          "8"
        ],
        1,
        "6 × 6 = 36."
      ],
      [
        "72 ÷ 8 = ?",
        [
          "8",
          "9",
          "10",
          "7"
        ],
        1,
        "8 × 9 = 72."
      ],
      [
        "45 ÷ 5 = ?",
        [
          "8",
          "9",
          "10",
          "7"
        ],
        1,
        "5 × 9 = 45."
      ],
      [
        "En 56 ÷ 7, ¿cuál es el divisor?",
        [
          "56",
          "7",
          "8",
          "49"
        ],
        1,
        "El divisor es 7."
      ],
      [
        "81 ÷ 9 = ?",
        [
          "8",
          "9",
          "10",
          "7"
        ],
        1,
        "9 × 9 = 81."
      ],
      [
        "¿Qué es el residuo?",
        [
          "El total",
          "Lo que sobra",
          "El divisor",
          "El doble"
        ],
        1,
        "Es la cantidad que queda sin repartir."
      ],
      [
        "30 ÷ 4 = ?",
        [
          "7 y sobra 2",
          "6 y sobra 4",
          "8 y sobra 1",
          "7 exacto"
        ],
        0,
        "4 × 7 = 28 y sobran 2."
      ],
      [
        "64 ÷ 8 = ?",
        [
          "6",
          "7",
          "8",
          "9"
        ],
        2,
        "8 × 8 = 64."
      ],
      [
        "Se reparten 42 piezas en 6 cajas. ¿Cuántas por caja?",
        [
          "6",
          "7",
          "8",
          "9"
        ],
        1,
        "42 ÷ 6 = 7."
      ],
      [
        "¿Cómo se comprueba 48 ÷ 6 = 8?",
        [
          "8 + 6 = 14",
          "8 × 6 = 48",
          "48 + 6 = 54",
          "48 ÷ 8 = 5"
        ],
        1,
        "El cociente por el divisor da el dividendo."
      ]
    ],
    "recursos": [
      [
        "División paso a paso",
        "Video educativo para aprender a dividir paso a paso.",
        "https://www.youtube.com/watch?v=iA0fP4tL67s"
      ],
      [
        "Juegos de división",
        "Juegos educativos para practicar divisiones.",
        "https://www.mundoprimaria.com/juegos-educativos/juegos-matematicas/juegos-divisiones"
      ]
    ]
  },
  {
    "id": "patrones",
    "titulo": "Sistema de Secuencias",
    "subtitulo": "Patrones numéricos y series",
    "icono": "✧",
    "color": "verde",
    "intro": "Observamos cómo cambian los números siguiendo una regla. Reconocer patrones permite anticipar términos y describir regularidades.",
    "conceptos": [
      [
        "Patrón",
        "Regla que se repite o relación que permite continuar una secuencia."
      ],
      [
        "Secuencia",
        "Lista ordenada de números u objetos."
      ],
      [
        "Regla aditiva",
        "Cada término se obtiene sumando o restando una cantidad fija."
      ],
      [
        "Regla multiplicativa",
        "Cada término se obtiene multiplicando o dividiendo por un mismo número."
      ]
    ],
    "ejemplo": "En 4, 7, 10, 13, … se suma 3 cada vez. Los siguientes términos son 16 y 19.",
    "actividades": [
      {
        "id": "patrones-1",
        "pregunta": "Completa: 5, 10, 15, 20, __. ¿Qué número sigue?",
        "respuesta": 25,
        "ayuda": "Observa cuánto aumenta cada término."
      },
      {
        "id": "patrones-2",
        "pregunta": "Completa la secuencia: 3, 6, 9, 12, __.",
        "respuesta": 15,
        "ayuda": "Suma la misma cantidad entre cada término."
      },
      {
        "id": "patrones-3",
        "pregunta": "Completa la secuencia: 2, 4, 8, 16, __.",
        "respuesta": 32,
        "ayuda": "Cada término se obtiene multiplicando el anterior por 2."
      },
      {
        "id": "patrones-4",
        "pregunta": "Completa la secuencia: 100, 90, 80, __.",
        "respuesta": 70,
        "ayuda": "Resta 10 en cada paso."
      },
      {
        "id": "patrones-5",
        "pregunta": "Completa la secuencia: 1, 4, 9, 16, __.",
        "respuesta": 25,
        "ayuda": "Son cuadrados de números consecutivos."
      }
    ],
    "preguntas": [
      [
        "2, 4, 6, 8, __",
        [
          "9",
          "10",
          "11",
          "12"
        ],
        1,
        "La regla es sumar 2."
      ],
      [
        "5, 10, 15, __",
        [
          "18",
          "20",
          "25",
          "30"
        ],
        1,
        "La regla es sumar 5."
      ],
      [
        "30, 27, 24, __",
        [
          "23",
          "22",
          "21",
          "20"
        ],
        2,
        "La regla es restar 3."
      ],
      [
        "3, 6, 12, 24, __",
        [
          "30",
          "36",
          "42",
          "48"
        ],
        3,
        "Cada término se multiplica por 2."
      ],
      [
        "Regla de 7, 11, 15, 19:",
        [
          "Sumar 3",
          "Sumar 4",
          "Restar 4",
          "Multiplicar por 2"
        ],
        1,
        "Cada término aumenta cuatro unidades."
      ],
      [
        "1, 4, 9, 16, __",
        [
          "20",
          "24",
          "25",
          "36"
        ],
        2,
        "Son cuadrados: 1², 2², 3², 4² y 5²."
      ],
      [
        "100, 90, 80, __",
        [
          "75",
          "70",
          "60",
          "85"
        ],
        1,
        "Se resta 10 cada vez."
      ],
      [
        "2, 6, 18, __",
        [
          "24",
          "36",
          "48",
          "54"
        ],
        3,
        "Cada término se multiplica por 3."
      ],
      [
        "12, __, 20, 24 (aumenta de 4 en 4)",
        [
          "14",
          "15",
          "16",
          "18"
        ],
        2,
        "12 + 4 = 16."
      ],
      [
        "4, 8, 12, 16, __",
        [
          "18",
          "20",
          "22",
          "24"
        ],
        1,
        "Se suman 4 unidades."
      ]
    ],
    "recursos": [
      [
        "Patrones y secuencias",
        "Video educativo sobre patrones numéricos y secuencias.",
        "https://www.youtube.com/watch?v=ZdDk0mqhI2Q"
      ],
      [
        "Juegos de patrones matemáticos",
        "Juegos educativos para encontrar y continuar patrones.",
        "https://kidsdomath.com/es/juegos-de-patrones"
      ]
    ]
  },
  {
    "id": "problemas",
    "titulo": "Nebulosa de Retos",
    "subtitulo": "Resolución de problemas",
    "icono": "?",
    "color": "dorado",
    "intro": "Cada reto cuenta una historia. Lee, identifica los datos, reconoce qué necesitas averiguar, elige una operación y comprueba si la respuesta tiene sentido.",
    "conceptos": [
      [
        "Comprender",
        "Leer el enunciado e identificar qué se pregunta."
      ],
      [
        "Datos",
        "Localizar la información numérica útil."
      ],
      [
        "Estrategia",
        "Elegir una operación, dibujo, tabla o cálculo."
      ],
      [
        "Comprobar",
        "Revisar el procedimiento y explicar la respuesta con sus unidades."
      ]
    ],
    "ejemplo": "Hay 5 cajas con 12 alimentos cada una: 5 × 12 = 60. Si se consumen 18, quedan 60 − 18 = 42 alimentos.",
    "actividades": [
      {
        "id": "problemas-1",
        "pregunta": "Una estación tiene 4 módulos con 15 paneles solares cada uno. ¿Cuántos paneles hay?",
        "respuesta": 60,
        "ayuda": "Son 4 grupos iguales de 15 paneles."
      },
      {
        "id": "problemas-2",
        "pregunta": "Hay 5 cajas con 12 alimentos cada una. ¿Cuántos alimentos hay?",
        "respuesta": 60,
        "ayuda": "Multiplica el número de cajas por los alimentos de cada una."
      },
      {
        "id": "problemas-3",
        "pregunta": "48 muestras se guardan en 6 cajas iguales. ¿Cuántas van en cada caja?",
        "respuesta": 8,
        "ayuda": "Divide 48 entre 6."
      },
      {
        "id": "problemas-4",
        "pregunta": "Había 90 litros de combustible y se usaron 34. ¿Cuántos litros quedan?",
        "respuesta": 56,
        "ayuda": "Resta 34 a 90."
      },
      {
        "id": "problemas-5",
        "pregunta": "En un equipo hay 18 astronautas y se unen 7 más. ¿Cuántos hay ahora?",
        "respuesta": 25,
        "ayuda": "Suma los astronautas que ya había y los que llegaron."
      }
    ],
    "preguntas": [
      [
        "Hay 18 astronautas y llegan 7 más. ¿Cuántos hay?",
        [
          "24",
          "25",
          "26",
          "27"
        ],
        1,
        "18 + 7 = 25."
      ],
      [
        "48 muestras se guardan en 6 cajas iguales. ¿Cuántas por caja?",
        [
          "6",
          "7",
          "8",
          "9"
        ],
        2,
        "48 ÷ 6 = 8."
      ],
      [
        "7 naves llevan 5 sondas cada una. ¿Cuántas sondas?",
        [
          "30",
          "35",
          "40",
          "45"
        ],
        1,
        "7 × 5 = 35."
      ],
      [
        "Había 90 litros y se usan 34. ¿Cuántos quedan?",
        [
          "54",
          "56",
          "64",
          "66"
        ],
        1,
        "90 − 34 = 56."
      ],
      [
        "Un equipo reúne 24 rocas y otro 19. ¿Cuántas en total?",
        [
          "42",
          "43",
          "44",
          "45"
        ],
        1,
        "24 + 19 = 43."
      ],
      [
        "72 mapas se reparten entre 8 grupos. ¿Cuántos por grupo?",
        [
          "8",
          "9",
          "10",
          "11"
        ],
        1,
        "72 ÷ 8 = 9."
      ],
      [
        "Una sonda recorre 16 km por hora durante 3 horas. ¿Cuánto recorre?",
        [
          "32",
          "40",
          "48",
          "64"
        ],
        2,
        "16 × 3 = 48 km."
      ],
      [
        "Hay 65 baterías y se distribuyen 25. ¿Cuántas quedan?",
        [
          "35",
          "40",
          "45",
          "50"
        ],
        1,
        "65 − 25 = 40."
      ],
      [
        "4 tripulaciones encuentran 13 minerales cada una. ¿Cuántos minerales?",
        [
          "42",
          "48",
          "52",
          "56"
        ],
        2,
        "4 × 13 = 52."
      ],
      [
        "Una misión necesita 100 piezas. Ya tiene 68. ¿Cuántas faltan?",
        [
          "22",
          "32",
          "38",
          "42"
        ],
        1,
        "100 − 68 = 32."
      ]
    ],
    "recursos": [
      [
        "Pasos para resolver problemas matemáticos",
        "Video educativo con pasos para resolver problemas.",
        "https://www.youtube.com/watch?v=RWTFlsMhArQ"
      ],
      [
        "Juegos de resolución de problemas",
        "Juegos educativos de matemáticas con problemas contextualizados.",
        "https://www.mundoprimaria.com/juegos-educativos/juegos-matematicas/problemas"
      ]
    ]
  }
];
const _sfc_main$3 = {
  __name: "SeleccionContenidos",
  __ssrInlineRender: true,
  emits: ["volverInicio"],
  setup(__props, { emit: __emit }) {
    const contenidoSeleccionado = ref(null);
    const audio = inject("audio", null);
    const registro = ref({});
    const progresoActividades = ref({});
    const actividadesRealizadas = ref({});
    const estrellas = ref({});
    function guardarResultado(resultado) {
      registro.value = { ...registro.value, [resultado.mundoId]: resultado.puntaje };
      localStorage.setItem("astromat-progreso", JSON.stringify(registro.value));
      guardarEstrella(resultado.mundoId, resultado.puntaje);
    }
    function guardarEstrella(mundoId, cantidad = 1) {
      if (cantidad <= 0) return;
      estrellas.value = { ...estrellas.value, [mundoId]: (estrellas.value[mundoId] || 0) + cantidad };
      localStorage.setItem("astromat-estrellas", JSON.stringify(estrellas.value));
    }
    function guardarActividadCalificada({ mundoId, actividadId, correcta }) {
      const mundo = mundos.find((item) => item.id === mundoId);
      if (!mundo || !mundo.actividades.some((actividad) => actividad.id === actividadId)) return;
      const realizadas = actividadesRealizadas.value[mundoId] || {};
      if (!realizadas[actividadId]) {
        actividadesRealizadas.value = {
          ...actividadesRealizadas.value,
          [mundoId]: { ...realizadas, [actividadId]: true }
        };
        localStorage.setItem("astromat-actividades-realizadas", JSON.stringify(actividadesRealizadas.value));
      }
      if (!correcta) return;
      const completadas = progresoActividades.value[mundoId] || {};
      if (completadas[actividadId]) return;
      progresoActividades.value = {
        ...progresoActividades.value,
        [mundoId]: { ...completadas, [actividadId]: true }
      };
      localStorage.setItem("astromat-actividades", JSON.stringify(progresoActividades.value));
      guardarEstrella(mundoId);
    }
    function reiniciarProgreso() {
      registro.value = {};
      progresoActividades.value = {};
      actividadesRealizadas.value = {};
      estrellas.value = {};
      localStorage.removeItem("astromat-progreso");
      localStorage.removeItem("astromat-actividades");
      localStorage.removeItem("astromat-actividades-realizadas");
      localStorage.removeItem("astromat-estrellas");
    }
    const contenidos = mundos;
    function volverPlanetas() {
      audio?.playUiSound("back");
      contenidoSeleccionado.value = null;
    }
    function starStyle(index) {
      const x = index * 37 % 97 + 1;
      const y = index * 53 % 93 + 2;
      const delay = index % 11 * -0.31;
      const size = index % 9 === 0 ? "1.15rem" : index % 4 === 0 ? ".85rem" : ".65rem";
      return { left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, fontSize: size };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: "galaxy-screen",
        "aria-label": "Selección de contenidos"
      }, _attrs))} data-v-1a5f4586><div class="galaxy-backdrop" aria-hidden="true" data-v-1a5f4586><!--[-->`);
      ssrRenderList(52, (star) => {
        _push(`<span class="star" style="${ssrRenderStyle(starStyle(star))}" data-v-1a5f4586>${ssrInterpolate(star % 7 === 0 ? "✦" : "·")}</span>`);
      });
      _push(`<!--]--><div class="nebula nebula-a" data-v-1a5f4586></div><div class="nebula nebula-b" data-v-1a5f4586></div><div class="nebula nebula-c" data-v-1a5f4586></div></div><header class="galaxy-header" data-v-1a5f4586><button class="home-button" type="button" aria-label="Volver a la pantalla de entrada" data-v-1a5f4586><span aria-hidden="true" data-v-1a5f4586>←</span> Inicio </button><div class="header-copy" data-v-1a5f4586><p class="eyebrow" data-v-1a5f4586><span class="eyebrow-dot" data-v-1a5f4586></span> CENTRO DE EXPLORACIÓN</p><h1 data-v-1a5f4586>Elige tu planeta</h1><p class="subtitle" data-v-1a5f4586>Cada mundo guarda un espacio para un nuevo contenido.</p></div><div class="header-orbit" aria-hidden="true" data-v-1a5f4586>✦</div></header>`);
      if (!contenidoSeleccionado.value) {
        _push(`<section class="galaxy-map" aria-label="Planetas con contenidos disponibles" data-v-1a5f4586><div class="orbit orbit-one" aria-hidden="true" data-v-1a5f4586></div><div class="orbit orbit-two" aria-hidden="true" data-v-1a5f4586></div><div class="orbit orbit-three" aria-hidden="true" data-v-1a5f4586></div><div class="orbit orbit-four" aria-hidden="true" data-v-1a5f4586></div><div class="sun-core" aria-hidden="true" data-v-1a5f4586><span data-v-1a5f4586>✦</span></div><div class="sun-glow" aria-hidden="true" data-v-1a5f4586></div><!--[-->`);
        ssrRenderList(unref(contenidos), (contenido, index) => {
          _push(`<button class="${ssrRenderClass([[`planet-position-${index + 1}`, `planet-color-${index + 1}`], "planet-entry"])}" type="button"${ssrRenderAttr("aria-label", `Abrir ${contenido.titulo}`)} data-v-1a5f4586><span class="planet-system" aria-hidden="true" data-v-1a5f4586><span class="planet-halo" data-v-1a5f4586></span><span class="planet-ball" data-v-1a5f4586><span class="planet-surface" data-v-1a5f4586></span><span class="planet-mark" data-v-1a5f4586>${ssrInterpolate(contenido.icono)}</span></span>`);
          if (index === 2) {
            _push(`<span class="planet-ring" data-v-1a5f4586></span>`);
          } else {
            _push(`<!---->`);
          }
          if (index === 4) {
            _push(`<span class="planet-moon" data-v-1a5f4586></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span class="planet-label" data-v-1a5f4586><strong data-v-1a5f4586>${ssrInterpolate(contenido.titulo)}</strong><small data-v-1a5f4586>${ssrInterpolate(contenido.subtitulo)}</small></span></button>`);
        });
        _push(`<!--]--><div class="floating-astronaut" aria-hidden="true" data-v-1a5f4586>🧑‍🚀</div><div class="floating-satellite" aria-hidden="true" data-v-1a5f4586>🛰️</div></section>`);
      } else {
        _push(ssrRenderComponent(MundoAprendizaje, {
          key: contenidoSeleccionado.value.id,
          mundo: contenidoSeleccionado.value,
          mundos: unref(contenidos),
          registro: registro.value,
          "progreso-actividades": progresoActividades.value,
          "actividades-realizadas": actividadesRealizadas.value,
          estrellas: estrellas.value,
          onVolver: volverPlanetas,
          onCompletada: guardarResultado,
          onActividadCalificada: guardarActividadCalificada,
          onReiniciar: reiniciarProgreso
        }, null, _parent));
      }
      _push(`<footer class="galaxy-footer" data-v-1a5f4586><span class="footer-star" aria-hidden="true" data-v-1a5f4586>✦</span><span data-v-1a5f4586>${ssrInterpolate(contenidoSeleccionado.value ? "Tu próxima aventura te espera en la galaxia." : "Pulsa un planeta para explorar su espacio de contenido.")}</span><span class="footer-star" aria-hidden="true" data-v-1a5f4586>✦</span></footer></main>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SeleccionContenidos.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SeleccionContenidos = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1a5f4586"]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const pantalla = ref("inicio");
    const transicionActiva = ref(false);
    const musicaActiva = ref(true);
    let temporizadorDespegue;
    function startMusic(reset = false) {
      if (!musicaActiva.value || true) return;
    }
    function playUiSound(kind = "back") {
      if (!musicaActiva.value || true) return;
    }
    function iniciarAudioPorInteraccion() {
      if (musicaActiva.value) startMusic();
    }
    provide("audio", { playUiSound });
    function iniciarExploracion() {
      if (transicionActiva.value) return;
      clearTimeout(temporizadorDespegue);
      iniciarAudioPorInteraccion();
      playUiSound("rocket");
      transicionActiva.value = true;
      temporizadorDespegue = setTimeout(() => {
        pantalla.value = "galaxia";
        transicionActiva.value = false;
      }, 1550);
    }
    function volverInicio() {
      playUiSound("back");
      pantalla.value = "inicio";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "app-shell" }, _attrs))}>`);
      if (pantalla.value === "inicio") {
        _push(ssrRenderComponent(PantallaBienvenida, {
          key: "inicio",
          onComenzar: iniciarExploracion
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(SeleccionContenidos, {
          key: "galaxia",
          onVolverInicio: volverInicio
        }, null, _parent));
      }
      _push(`<button class="music-toggle" type="button"${ssrRenderAttr("aria-pressed", musicaActiva.value)}${ssrRenderAttr("aria-label", musicaActiva.value ? "Desactivar música" : "Activar música")}><span class="music-icon" aria-hidden="true">${ssrInterpolate(musicaActiva.value ? "♫" : "♪")}</span><span>${ssrInterpolate(musicaActiva.value ? "Música activada" : "Música desactivada")}</span><span class="music-state" aria-hidden="true">${ssrInterpolate(musicaActiva.value ? "ON" : "OFF")}</span></button>`);
      if (transicionActiva.value) {
        _push(`<div class="warp-overlay" aria-live="polite" role="status"><div class="warp-stars"></div><div class="warp-core"></div><div class="warp-rocket" aria-hidden="true">🚀</div><p>¡Despegando hacia la galaxia!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-BxauZNm0.js"));
    const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-BFTqEOkU.js"));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));
export {
  _export_sfc as _,
  useNuxtApp as a,
  useRuntimeConfig as b,
  nuxtLinkDefaults as c,
  entry_default as default,
  encodeRoutePath as e,
  navigateTo as n,
  resolveRouteObject as r,
  tryUseNuxtApp as t,
  useRouter as u
};
//# sourceMappingURL=server.mjs.map
