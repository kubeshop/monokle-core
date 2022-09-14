import * as _ from "react";
import dr, { useRef as ke, useEffect as Ue, createContext as Ba, useState as $n, useMemo as Mn, useContext as In, useLayoutEffect as za, forwardRef as Ha, useCallback as Ya } from "react";
import gr from "styled-components";
import Ga from "react-dom";
var Ka = function(e, t) {
  var r = ke(function() {
  });
  Ue(function() {
    r.current = e;
  }), Ue(function() {
    if (t !== null) {
      var n = setInterval(function() {
        return r.current();
      }, t || 0);
      return function() {
        return clearInterval(n);
      };
    }
  }, [t]);
};
const Ja = Ka;
var Vr = { exports: {} }, ir = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function Qa() {
  if (Kt)
    return ir;
  Kt = 1;
  var e = dr, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(u, s, l) {
    var c, d = {}, g = null, S = null;
    l !== void 0 && (g = "" + l), s.key !== void 0 && (g = "" + s.key), s.ref !== void 0 && (S = s.ref);
    for (c in s)
      n.call(s, c) && !i.hasOwnProperty(c) && (d[c] = s[c]);
    if (u && u.defaultProps)
      for (c in s = u.defaultProps, s)
        d[c] === void 0 && (d[c] = s[c]);
    return { $$typeof: t, type: u, key: g, ref: S, props: d, _owner: a.current };
  }
  return ir.Fragment = r, ir.jsx = o, ir.jsxs = o, ir;
}
var or = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function Za() {
  return Jt || (Jt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = dr, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), u = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), R = Symbol.iterator, m = "@@iterator";
    function y(f) {
      if (f === null || typeof f != "object")
        return null;
      var w = R && f[R] || f[m];
      return typeof w == "function" ? w : null;
    }
    var p = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(f) {
      {
        for (var w = arguments.length, T = new Array(w > 1 ? w - 1 : 0), j = 1; j < w; j++)
          T[j - 1] = arguments[j];
        E("error", f, T);
      }
    }
    function E(f, w, T) {
      {
        var j = p.ReactDebugCurrentFrame, Y = j.getStackAddendum();
        Y !== "" && (w += "%s", T = T.concat([Y]));
        var X = T.map(function(U) {
          return String(U);
        });
        X.unshift("Warning: " + w), Function.prototype.apply.call(console[f], console, X);
      }
    }
    var P = !1, h = !1, N = !1, M = !1, $ = !1, I;
    I = Symbol.for("react.module.reference");
    function b(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === n || f === i || $ || f === a || f === l || f === c || M || f === S || P || h || N || typeof f == "object" && f !== null && (f.$$typeof === g || f.$$typeof === d || f.$$typeof === o || f.$$typeof === u || f.$$typeof === s || f.$$typeof === I || f.getModuleId !== void 0));
    }
    function v(f, w, T) {
      var j = f.displayName;
      if (j)
        return j;
      var Y = w.displayName || w.name || "";
      return Y !== "" ? T + "(" + Y + ")" : T;
    }
    function F(f) {
      return f.displayName || "Context";
    }
    function x(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case l:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case u:
            var w = f;
            return F(w) + ".Consumer";
          case o:
            var T = f;
            return F(T._context) + ".Provider";
          case s:
            return v(f, f.render, "ForwardRef");
          case d:
            var j = f.displayName || null;
            return j !== null ? j : x(f.type) || "Memo";
          case g: {
            var Y = f, X = Y._payload, U = Y._init;
            try {
              return x(U(X));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, A = 0, D, Z, ee, L, z, te, re;
    function oe() {
    }
    oe.__reactDisabledLog = !0;
    function ce() {
      {
        if (A === 0) {
          D = console.log, Z = console.info, ee = console.warn, L = console.error, z = console.group, te = console.groupCollapsed, re = console.groupEnd;
          var f = {
            configurable: !0,
            enumerable: !0,
            value: oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: f,
            log: f,
            warn: f,
            error: f,
            group: f,
            groupCollapsed: f,
            groupEnd: f
          });
        }
        A++;
      }
    }
    function le() {
      {
        if (A--, A === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, f, {
              value: D
            }),
            info: O({}, f, {
              value: Z
            }),
            warn: O({}, f, {
              value: ee
            }),
            error: O({}, f, {
              value: L
            }),
            group: O({}, f, {
              value: z
            }),
            groupCollapsed: O({}, f, {
              value: te
            }),
            groupEnd: O({}, f, {
              value: re
            })
          });
        }
        A < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ve = p.ReactCurrentDispatcher, we;
    function Oe(f, w, T) {
      {
        if (we === void 0)
          try {
            throw Error();
          } catch (Y) {
            var j = Y.stack.trim().match(/\n( *(at )?)/);
            we = j && j[1] || "";
          }
        return `
` + we + f;
      }
    }
    var ne = !1, Te;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      Te = new Le();
    }
    function k(f, w) {
      if (!f || ne)
        return "";
      {
        var T = Te.get(f);
        if (T !== void 0)
          return T;
      }
      var j;
      ne = !0;
      var Y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var X;
      X = Ve.current, Ve.current = null, ce();
      try {
        if (w) {
          var U = function() {
            throw Error();
          };
          if (Object.defineProperty(U.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(U, []);
            } catch ($e) {
              j = $e;
            }
            Reflect.construct(f, [], U);
          } else {
            try {
              U.call();
            } catch ($e) {
              j = $e;
            }
            f.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($e) {
            j = $e;
          }
          f();
        }
      } catch ($e) {
        if ($e && j && typeof $e.stack == "string") {
          for (var q = $e.stack.split(`
`), be = j.stack.split(`
`), se = q.length - 1, de = be.length - 1; se >= 1 && de >= 0 && q[se] !== be[de]; )
            de--;
          for (; se >= 1 && de >= 0; se--, de--)
            if (q[se] !== be[de]) {
              if (se !== 1 || de !== 1)
                do
                  if (se--, de--, de < 0 || q[se] !== be[de]) {
                    var Pe = `
` + q[se].replace(" at new ", " at ");
                    return f.displayName && Pe.includes("<anonymous>") && (Pe = Pe.replace("<anonymous>", f.displayName)), typeof f == "function" && Te.set(f, Pe), Pe;
                  }
                while (se >= 1 && de >= 0);
              break;
            }
        }
      } finally {
        ne = !1, Ve.current = X, le(), Error.prepareStackTrace = Y;
      }
      var Ke = f ? f.displayName || f.name : "", Gt = Ke ? Oe(Ke) : "";
      return typeof f == "function" && Te.set(f, Gt), Gt;
    }
    function he(f, w, T) {
      return k(f, !1);
    }
    function Ne(f) {
      var w = f.prototype;
      return !!(w && w.isReactComponent);
    }
    function me(f, w, T) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return k(f, Ne(f));
      if (typeof f == "string")
        return Oe(f);
      switch (f) {
        case l:
          return Oe("Suspense");
        case c:
          return Oe("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case s:
            return he(f.render);
          case d:
            return me(f.type, w, T);
          case g: {
            var j = f, Y = j._payload, X = j._init;
            try {
              return me(X(Y), w, T);
            } catch {
            }
          }
        }
      return "";
    }
    var _e = Object.prototype.hasOwnProperty, ae = {}, ie = p.ReactDebugCurrentFrame;
    function ue(f) {
      if (f) {
        var w = f._owner, T = me(f.type, f._source, w ? w.type : null);
        ie.setExtraStackFrame(T);
      } else
        ie.setExtraStackFrame(null);
    }
    function ye(f, w, T, j, Y) {
      {
        var X = Function.call.bind(_e);
        for (var U in f)
          if (X(f, U)) {
            var q = void 0;
            try {
              if (typeof f[U] != "function") {
                var be = Error((j || "React class") + ": " + T + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw be.name = "Invariant Violation", be;
              }
              q = f[U](w, U, j, T, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (se) {
              q = se;
            }
            q && !(q instanceof Error) && (ue(Y), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", j || "React class", T, U, typeof q), ue(null)), q instanceof Error && !(q.message in ae) && (ae[q.message] = !0, ue(Y), C("Failed %s type: %s", T, q.message), ue(null));
          }
      }
    }
    var Ye = Array.isArray;
    function Be(f) {
      return Ye(f);
    }
    function xa(f) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, T = w && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return T;
      }
    }
    function Ra(f) {
      try {
        return jt(f), !1;
      } catch {
        return !0;
      }
    }
    function jt(f) {
      return "" + f;
    }
    function Lt(f) {
      if (Ra(f))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xa(f)), jt(f);
    }
    var ar = p.ReactCurrentOwner, Oa = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Dt, qt, Ur;
    Ur = {};
    function Ta(f) {
      if (_e.call(f, "ref")) {
        var w = Object.getOwnPropertyDescriptor(f, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return f.ref !== void 0;
    }
    function _a(f) {
      if (_e.call(f, "key")) {
        var w = Object.getOwnPropertyDescriptor(f, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function Aa(f, w) {
      if (typeof f.ref == "string" && ar.current && w && ar.current.stateNode !== w) {
        var T = x(ar.current.type);
        Ur[T] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', x(ar.current.type), f.ref), Ur[T] = !0);
      }
    }
    function Na(f, w) {
      {
        var T = function() {
          Dt || (Dt = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        T.isReactWarning = !0, Object.defineProperty(f, "key", {
          get: T,
          configurable: !0
        });
      }
    }
    function ka(f, w) {
      {
        var T = function() {
          qt || (qt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        T.isReactWarning = !0, Object.defineProperty(f, "ref", {
          get: T,
          configurable: !0
        });
      }
    }
    var Va = function(f, w, T, j, Y, X, U) {
      var q = {
        $$typeof: t,
        type: f,
        key: w,
        ref: T,
        props: U,
        _owner: X
      };
      return q._store = {}, Object.defineProperty(q._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(q, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.defineProperty(q, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Y
      }), Object.freeze && (Object.freeze(q.props), Object.freeze(q)), q;
    };
    function $a(f, w, T, j, Y) {
      {
        var X, U = {}, q = null, be = null;
        T !== void 0 && (Lt(T), q = "" + T), _a(w) && (Lt(w.key), q = "" + w.key), Ta(w) && (be = w.ref, Aa(w, Y));
        for (X in w)
          _e.call(w, X) && !Oa.hasOwnProperty(X) && (U[X] = w[X]);
        if (f && f.defaultProps) {
          var se = f.defaultProps;
          for (X in se)
            U[X] === void 0 && (U[X] = se[X]);
        }
        if (q || be) {
          var de = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
          q && Na(U, de), be && ka(U, de);
        }
        return Va(f, q, be, Y, j, ar.current, U);
      }
    }
    var Br = p.ReactCurrentOwner, Wt = p.ReactDebugCurrentFrame;
    function Ge(f) {
      if (f) {
        var w = f._owner, T = me(f.type, f._source, w ? w.type : null);
        Wt.setExtraStackFrame(T);
      } else
        Wt.setExtraStackFrame(null);
    }
    var zr;
    zr = !1;
    function Hr(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }
    function Ut() {
      {
        if (Br.current) {
          var f = x(Br.current.type);
          if (f)
            return `

Check the render method of \`` + f + "`.";
        }
        return "";
      }
    }
    function Ma(f) {
      {
        if (f !== void 0) {
          var w = f.fileName.replace(/^.*[\\\/]/, ""), T = f.lineNumber;
          return `

Check your code at ` + w + ":" + T + ".";
        }
        return "";
      }
    }
    var Bt = {};
    function Ia(f) {
      {
        var w = Ut();
        if (!w) {
          var T = typeof f == "string" ? f : f.displayName || f.name;
          T && (w = `

Check the top-level render call using <` + T + ">.");
        }
        return w;
      }
    }
    function zt(f, w) {
      {
        if (!f._store || f._store.validated || f.key != null)
          return;
        f._store.validated = !0;
        var T = Ia(w);
        if (Bt[T])
          return;
        Bt[T] = !0;
        var j = "";
        f && f._owner && f._owner !== Br.current && (j = " It was passed a child from " + x(f._owner.type) + "."), Ge(f), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', T, j), Ge(null);
      }
    }
    function Ht(f, w) {
      {
        if (typeof f != "object")
          return;
        if (Be(f))
          for (var T = 0; T < f.length; T++) {
            var j = f[T];
            Hr(j) && zt(j, w);
          }
        else if (Hr(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var Y = y(f);
          if (typeof Y == "function" && Y !== f.entries)
            for (var X = Y.call(f), U; !(U = X.next()).done; )
              Hr(U.value) && zt(U.value, w);
        }
      }
    }
    function ja(f) {
      {
        var w = f.type;
        if (w == null || typeof w == "string")
          return;
        var T;
        if (typeof w == "function")
          T = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === s || w.$$typeof === d))
          T = w.propTypes;
        else
          return;
        if (T) {
          var j = x(w);
          ye(T, f.props, "prop", j, f);
        } else if (w.PropTypes !== void 0 && !zr) {
          zr = !0;
          var Y = x(w);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Y || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function La(f) {
      {
        for (var w = Object.keys(f.props), T = 0; T < w.length; T++) {
          var j = w[T];
          if (j !== "children" && j !== "key") {
            Ge(f), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", j), Ge(null);
            break;
          }
        }
        f.ref !== null && (Ge(f), C("Invalid attribute `ref` supplied to `React.Fragment`."), Ge(null));
      }
    }
    function Yt(f, w, T, j, Y, X) {
      {
        var U = b(f);
        if (!U) {
          var q = "";
          (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var be = Ma(Y);
          be ? q += be : q += Ut();
          var se;
          f === null ? se = "null" : Be(f) ? se = "array" : f !== void 0 && f.$$typeof === t ? (se = "<" + (x(f.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : se = typeof f, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", se, q);
        }
        var de = $a(f, w, T, Y, X);
        if (de == null)
          return de;
        if (U) {
          var Pe = w.children;
          if (Pe !== void 0)
            if (j)
              if (Be(Pe)) {
                for (var Ke = 0; Ke < Pe.length; Ke++)
                  Ht(Pe[Ke], f);
                Object.freeze && Object.freeze(Pe);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ht(Pe, f);
        }
        return f === n ? La(de) : ja(de), de;
      }
    }
    function Da(f, w, T) {
      return Yt(f, w, T, !0);
    }
    function qa(f, w, T) {
      return Yt(f, w, T, !1);
    }
    var Wa = qa, Ua = Da;
    or.Fragment = n, or.jsx = Wa, or.jsxs = Ua;
  }()), or;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Qa() : e.exports = Za();
})(Vr);
const Xa = Vr.exports.Fragment, H = Vr.exports.jsx, it = Vr.exports.jsxs;
function G(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function pr(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Qt(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function hr(e, t, r) {
  return t && Qt(e.prototype, t), r && Qt(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function ot(e, t) {
  return ot = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ot(e, t);
}
function xt(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && ot(e, t);
}
function Nr(e) {
  return Nr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Nr(e);
}
function ei() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function pe(e) {
  return pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pe(e);
}
function Rt(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ri(e, t) {
  if (t && (pe(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Rt(e);
}
function Ot(e) {
  var t = ei();
  return function() {
    var n = Nr(e), a;
    if (t) {
      var i = Nr(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return ri(this, a);
  };
}
var jn = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
    function r() {
      for (var n = [], a = 0; a < arguments.length; a++) {
        var i = arguments[a];
        if (!!i) {
          var o = typeof i;
          if (o === "string" || o === "number")
            n.push(i);
          else if (Array.isArray(i)) {
            if (i.length) {
              var u = r.apply(null, i);
              u && n.push(u);
            }
          } else if (o === "object") {
            if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]")) {
              n.push(i.toString());
              continue;
            }
            for (var s in i)
              t.call(i, s) && i[s] && n.push(s);
          }
        }
      }
      return n.join(" ");
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
})(jn);
const $r = jn.exports;
var Tt = { exports: {} }, K = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zt;
function ti() {
  if (Zt)
    return K;
  Zt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, c = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, S = e ? Symbol.for("react.memo") : 60115, R = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, p = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function E(h) {
    if (typeof h == "object" && h !== null) {
      var N = h.$$typeof;
      switch (N) {
        case t:
          switch (h = h.type, h) {
            case s:
            case l:
            case n:
            case i:
            case a:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case u:
                case c:
                case R:
                case S:
                case o:
                  return h;
                default:
                  return N;
              }
          }
        case r:
          return N;
      }
    }
  }
  function P(h) {
    return E(h) === l;
  }
  return K.AsyncMode = s, K.ConcurrentMode = l, K.ContextConsumer = u, K.ContextProvider = o, K.Element = t, K.ForwardRef = c, K.Fragment = n, K.Lazy = R, K.Memo = S, K.Portal = r, K.Profiler = i, K.StrictMode = a, K.Suspense = d, K.isAsyncMode = function(h) {
    return P(h) || E(h) === s;
  }, K.isConcurrentMode = P, K.isContextConsumer = function(h) {
    return E(h) === u;
  }, K.isContextProvider = function(h) {
    return E(h) === o;
  }, K.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, K.isForwardRef = function(h) {
    return E(h) === c;
  }, K.isFragment = function(h) {
    return E(h) === n;
  }, K.isLazy = function(h) {
    return E(h) === R;
  }, K.isMemo = function(h) {
    return E(h) === S;
  }, K.isPortal = function(h) {
    return E(h) === r;
  }, K.isProfiler = function(h) {
    return E(h) === i;
  }, K.isStrictMode = function(h) {
    return E(h) === a;
  }, K.isSuspense = function(h) {
    return E(h) === d;
  }, K.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === l || h === i || h === a || h === d || h === g || typeof h == "object" && h !== null && (h.$$typeof === R || h.$$typeof === S || h.$$typeof === o || h.$$typeof === u || h.$$typeof === c || h.$$typeof === y || h.$$typeof === p || h.$$typeof === C || h.$$typeof === m);
  }, K.typeOf = E, K;
}
var J = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xt;
function ni() {
  return Xt || (Xt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, c = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, S = e ? Symbol.for("react.memo") : 60115, R = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, p = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function E(k) {
      return typeof k == "string" || typeof k == "function" || k === n || k === l || k === i || k === a || k === d || k === g || typeof k == "object" && k !== null && (k.$$typeof === R || k.$$typeof === S || k.$$typeof === o || k.$$typeof === u || k.$$typeof === c || k.$$typeof === y || k.$$typeof === p || k.$$typeof === C || k.$$typeof === m);
    }
    function P(k) {
      if (typeof k == "object" && k !== null) {
        var he = k.$$typeof;
        switch (he) {
          case t:
            var Ne = k.type;
            switch (Ne) {
              case s:
              case l:
              case n:
              case i:
              case a:
              case d:
                return Ne;
              default:
                var me = Ne && Ne.$$typeof;
                switch (me) {
                  case u:
                  case c:
                  case R:
                  case S:
                  case o:
                    return me;
                  default:
                    return he;
                }
            }
          case r:
            return he;
        }
      }
    }
    var h = s, N = l, M = u, $ = o, I = t, b = c, v = n, F = R, x = S, O = r, A = i, D = a, Z = d, ee = !1;
    function L(k) {
      return ee || (ee = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(k) || P(k) === s;
    }
    function z(k) {
      return P(k) === l;
    }
    function te(k) {
      return P(k) === u;
    }
    function re(k) {
      return P(k) === o;
    }
    function oe(k) {
      return typeof k == "object" && k !== null && k.$$typeof === t;
    }
    function ce(k) {
      return P(k) === c;
    }
    function le(k) {
      return P(k) === n;
    }
    function Ve(k) {
      return P(k) === R;
    }
    function we(k) {
      return P(k) === S;
    }
    function Oe(k) {
      return P(k) === r;
    }
    function ne(k) {
      return P(k) === i;
    }
    function Te(k) {
      return P(k) === a;
    }
    function Le(k) {
      return P(k) === d;
    }
    J.AsyncMode = h, J.ConcurrentMode = N, J.ContextConsumer = M, J.ContextProvider = $, J.Element = I, J.ForwardRef = b, J.Fragment = v, J.Lazy = F, J.Memo = x, J.Portal = O, J.Profiler = A, J.StrictMode = D, J.Suspense = Z, J.isAsyncMode = L, J.isConcurrentMode = z, J.isContextConsumer = te, J.isContextProvider = re, J.isElement = oe, J.isForwardRef = ce, J.isFragment = le, J.isLazy = Ve, J.isMemo = we, J.isPortal = Oe, J.isProfiler = ne, J.isStrictMode = Te, J.isSuspense = Le, J.isValidElementType = E, J.typeOf = P;
  }()), J;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ti() : e.exports = ni();
})(Tt);
function ut(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return dr.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(ut(n)) : Tt.exports.isFragment(n) && n.props ? r = r.concat(ut(n.props.children, t)) : r.push(n));
  }), r;
}
var st = {};
function ai(e, t) {
  process.env.NODE_ENV !== "production" && !e && console !== void 0 && console.error("Warning: ".concat(t));
}
function ii() {
  st = {};
}
function oi(e, t, r) {
  !t && !st[r] && (e(!1, r), st[r] = !0);
}
function Ee(e, t) {
  oi(ai, e, t);
}
function en(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function V(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? en(Object(r), !0).forEach(function(n) {
      G(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : en(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ln(e, t) {
  typeof e == "function" ? e(t) : pe(e) === "object" && e && "current" in e && (e.current = t);
}
function ui() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t.filter(function(a) {
    return a;
  });
  return n.length <= 1 ? n[0] : function(a) {
    t.forEach(function(i) {
      Ln(i, a);
    });
  };
}
function Dn(e) {
  var t, r, n = Tt.exports.isMemo(e) ? e.type.type : e.type;
  return !(typeof n == "function" && !(!((t = n.prototype) === null || t === void 0) && t.render) || typeof e == "function" && !(!((r = e.prototype) === null || r === void 0) && r.render));
}
function si(e) {
  return e instanceof HTMLElement ? e : Ga.findDOMNode(e);
}
function fi(e, t) {
  var r = V({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
var ci = /* @__PURE__ */ Ba({});
const qn = ci;
function li(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function mr(e, t) {
  if (e == null)
    return {};
  var r = li(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, n) || (r[n] = e[n]));
  }
  return r;
}
function ft(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function di(e) {
  if (Array.isArray(e))
    return ft(e);
}
function Wn(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function _t(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return ft(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ft(e, t);
  }
}
function vi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function B(e) {
  return di(e) || Wn(e) || _t(e) || vi();
}
var ze = "RC_FORM_INTERNAL_HOOKS", Q = function() {
  Ee(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, tr = /* @__PURE__ */ _.createContext({
  getFieldValue: Q,
  getFieldsValue: Q,
  getFieldError: Q,
  getFieldWarning: Q,
  getFieldsError: Q,
  isFieldsTouched: Q,
  isFieldTouched: Q,
  isFieldValidating: Q,
  isFieldsValidating: Q,
  resetFields: Q,
  setFields: Q,
  setFieldValue: Q,
  setFieldsValue: Q,
  validateFields: Q,
  submit: Q,
  getInternalHooks: function() {
    return Q(), {
      dispatch: Q,
      initEntityValue: Q,
      registerField: Q,
      useSubscribe: Q,
      setInitialValues: Q,
      destroyForm: Q,
      setCallbacks: Q,
      registerWatch: Q,
      getFields: Q,
      setValidateMessages: Q,
      setPreserve: Q,
      getInitialValue: Q
    };
  }
});
function ct(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function je() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  je = function() {
    return e;
  };
  var e = {}, t = Object.prototype, r = t.hasOwnProperty, n = typeof Symbol == "function" ? Symbol : {}, a = n.iterator || "@@iterator", i = n.asyncIterator || "@@asyncIterator", o = n.toStringTag || "@@toStringTag";
  function u(b, v, F) {
    return Object.defineProperty(b, v, {
      value: F,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), b[v];
  }
  try {
    u({}, "");
  } catch {
    u = function(F, x, O) {
      return F[x] = O;
    };
  }
  function s(b, v, F, x) {
    var O = v && v.prototype instanceof d ? v : d, A = Object.create(O.prototype), D = new M(x || []);
    return A._invoke = function(Z, ee, L) {
      var z = "suspendedStart";
      return function(te, re) {
        if (z === "executing")
          throw new Error("Generator is already running");
        if (z === "completed") {
          if (te === "throw")
            throw re;
          return I();
        }
        for (L.method = te, L.arg = re; ; ) {
          var oe = L.delegate;
          if (oe) {
            var ce = P(oe, L);
            if (ce) {
              if (ce === c)
                continue;
              return ce;
            }
          }
          if (L.method === "next")
            L.sent = L._sent = L.arg;
          else if (L.method === "throw") {
            if (z === "suspendedStart")
              throw z = "completed", L.arg;
            L.dispatchException(L.arg);
          } else
            L.method === "return" && L.abrupt("return", L.arg);
          z = "executing";
          var le = l(Z, ee, L);
          if (le.type === "normal") {
            if (z = L.done ? "completed" : "suspendedYield", le.arg === c)
              continue;
            return {
              value: le.arg,
              done: L.done
            };
          }
          le.type === "throw" && (z = "completed", L.method = "throw", L.arg = le.arg);
        }
      };
    }(b, F, D), A;
  }
  function l(b, v, F) {
    try {
      return {
        type: "normal",
        arg: b.call(v, F)
      };
    } catch (x) {
      return {
        type: "throw",
        arg: x
      };
    }
  }
  e.wrap = s;
  var c = {};
  function d() {
  }
  function g() {
  }
  function S() {
  }
  var R = {};
  u(R, a, function() {
    return this;
  });
  var m = Object.getPrototypeOf, y = m && m(m($([])));
  y && y !== t && r.call(y, a) && (R = y);
  var p = S.prototype = d.prototype = Object.create(R);
  function C(b) {
    ["next", "throw", "return"].forEach(function(v) {
      u(b, v, function(F) {
        return this._invoke(v, F);
      });
    });
  }
  function E(b, v) {
    function F(O, A, D, Z) {
      var ee = l(b[O], b, A);
      if (ee.type !== "throw") {
        var L = ee.arg, z = L.value;
        return z && pe(z) == "object" && r.call(z, "__await") ? v.resolve(z.__await).then(function(te) {
          F("next", te, D, Z);
        }, function(te) {
          F("throw", te, D, Z);
        }) : v.resolve(z).then(function(te) {
          L.value = te, D(L);
        }, function(te) {
          return F("throw", te, D, Z);
        });
      }
      Z(ee.arg);
    }
    var x;
    this._invoke = function(O, A) {
      function D() {
        return new v(function(Z, ee) {
          F(O, A, Z, ee);
        });
      }
      return x = x ? x.then(D, D) : D();
    };
  }
  function P(b, v) {
    var F = b.iterator[v.method];
    if (F === void 0) {
      if (v.delegate = null, v.method === "throw") {
        if (b.iterator.return && (v.method = "return", v.arg = void 0, P(b, v), v.method === "throw"))
          return c;
        v.method = "throw", v.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return c;
    }
    var x = l(F, b.iterator, v.arg);
    if (x.type === "throw")
      return v.method = "throw", v.arg = x.arg, v.delegate = null, c;
    var O = x.arg;
    return O ? O.done ? (v[b.resultName] = O.value, v.next = b.nextLoc, v.method !== "return" && (v.method = "next", v.arg = void 0), v.delegate = null, c) : O : (v.method = "throw", v.arg = new TypeError("iterator result is not an object"), v.delegate = null, c);
  }
  function h(b) {
    var v = {
      tryLoc: b[0]
    };
    1 in b && (v.catchLoc = b[1]), 2 in b && (v.finallyLoc = b[2], v.afterLoc = b[3]), this.tryEntries.push(v);
  }
  function N(b) {
    var v = b.completion || {};
    v.type = "normal", delete v.arg, b.completion = v;
  }
  function M(b) {
    this.tryEntries = [{
      tryLoc: "root"
    }], b.forEach(h, this), this.reset(!0);
  }
  function $(b) {
    if (b) {
      var v = b[a];
      if (v)
        return v.call(b);
      if (typeof b.next == "function")
        return b;
      if (!isNaN(b.length)) {
        var F = -1, x = function O() {
          for (; ++F < b.length; )
            if (r.call(b, F))
              return O.value = b[F], O.done = !1, O;
          return O.value = void 0, O.done = !0, O;
        };
        return x.next = x;
      }
    }
    return {
      next: I
    };
  }
  function I() {
    return {
      value: void 0,
      done: !0
    };
  }
  return g.prototype = S, u(p, "constructor", S), u(S, "constructor", g), g.displayName = u(S, o, "GeneratorFunction"), e.isGeneratorFunction = function(b) {
    var v = typeof b == "function" && b.constructor;
    return !!v && (v === g || (v.displayName || v.name) === "GeneratorFunction");
  }, e.mark = function(b) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(b, S) : (b.__proto__ = S, u(b, o, "GeneratorFunction")), b.prototype = Object.create(p), b;
  }, e.awrap = function(b) {
    return {
      __await: b
    };
  }, C(E.prototype), u(E.prototype, i, function() {
    return this;
  }), e.AsyncIterator = E, e.async = function(b, v, F, x, O) {
    O === void 0 && (O = Promise);
    var A = new E(s(b, v, F, x), O);
    return e.isGeneratorFunction(v) ? A : A.next().then(function(D) {
      return D.done ? D.value : A.next();
    });
  }, C(p), u(p, o, "Generator"), u(p, a, function() {
    return this;
  }), u(p, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(b) {
    var v = [];
    for (var F in b)
      v.push(F);
    return v.reverse(), function x() {
      for (; v.length; ) {
        var O = v.pop();
        if (O in b)
          return x.value = O, x.done = !1, x;
      }
      return x.done = !0, x;
    };
  }, e.values = $, M.prototype = {
    constructor: M,
    reset: function(v) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(N), !v)
        for (var F in this)
          F.charAt(0) === "t" && r.call(this, F) && !isNaN(+F.slice(1)) && (this[F] = void 0);
    },
    stop: function() {
      this.done = !0;
      var v = this.tryEntries[0].completion;
      if (v.type === "throw")
        throw v.arg;
      return this.rval;
    },
    dispatchException: function(v) {
      if (this.done)
        throw v;
      var F = this;
      function x(L, z) {
        return D.type = "throw", D.arg = v, F.next = L, z && (F.method = "next", F.arg = void 0), !!z;
      }
      for (var O = this.tryEntries.length - 1; O >= 0; --O) {
        var A = this.tryEntries[O], D = A.completion;
        if (A.tryLoc === "root")
          return x("end");
        if (A.tryLoc <= this.prev) {
          var Z = r.call(A, "catchLoc"), ee = r.call(A, "finallyLoc");
          if (Z && ee) {
            if (this.prev < A.catchLoc)
              return x(A.catchLoc, !0);
            if (this.prev < A.finallyLoc)
              return x(A.finallyLoc);
          } else if (Z) {
            if (this.prev < A.catchLoc)
              return x(A.catchLoc, !0);
          } else {
            if (!ee)
              throw new Error("try statement without catch or finally");
            if (this.prev < A.finallyLoc)
              return x(A.finallyLoc);
          }
        }
      }
    },
    abrupt: function(v, F) {
      for (var x = this.tryEntries.length - 1; x >= 0; --x) {
        var O = this.tryEntries[x];
        if (O.tryLoc <= this.prev && r.call(O, "finallyLoc") && this.prev < O.finallyLoc) {
          var A = O;
          break;
        }
      }
      A && (v === "break" || v === "continue") && A.tryLoc <= F && F <= A.finallyLoc && (A = null);
      var D = A ? A.completion : {};
      return D.type = v, D.arg = F, A ? (this.method = "next", this.next = A.finallyLoc, c) : this.complete(D);
    },
    complete: function(v, F) {
      if (v.type === "throw")
        throw v.arg;
      return v.type === "break" || v.type === "continue" ? this.next = v.arg : v.type === "return" ? (this.rval = this.arg = v.arg, this.method = "return", this.next = "end") : v.type === "normal" && F && (this.next = F), c;
    },
    finish: function(v) {
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var x = this.tryEntries[F];
        if (x.finallyLoc === v)
          return this.complete(x.completion, x.afterLoc), N(x), c;
      }
    },
    catch: function(v) {
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var x = this.tryEntries[F];
        if (x.tryLoc === v) {
          var O = x.completion;
          if (O.type === "throw") {
            var A = O.arg;
            N(x);
          }
          return A;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(v, F, x) {
      return this.delegate = {
        iterator: $(v),
        resultName: F,
        nextLoc: x
      }, this.method === "next" && (this.arg = void 0), c;
    }
  }, e;
}
function rn(e, t, r, n, a, i, o) {
  try {
    var u = e[i](o), s = u.value;
  } catch (l) {
    r(l);
    return;
  }
  u.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Mr(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function o(s) {
        rn(i, n, a, o, u, "next", s);
      }
      function u(s) {
        rn(i, n, a, o, u, "throw", s);
      }
      o(void 0);
    });
  };
}
function He() {
  return He = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, He.apply(this, arguments);
}
function gi(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, vr(e, t);
}
function lt(e) {
  return lt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, lt(e);
}
function vr(e, t) {
  return vr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, vr(e, t);
}
function pi() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Tr(e, t, r) {
  return pi() ? Tr = Reflect.construct.bind() : Tr = function(a, i, o) {
    var u = [null];
    u.push.apply(u, i);
    var s = Function.bind.apply(a, u), l = new s();
    return o && vr(l, o.prototype), l;
  }, Tr.apply(null, arguments);
}
function hi(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function dt(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return dt = function(n) {
    if (n === null || !hi(n))
      return n;
    if (typeof n != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(n))
        return t.get(n);
      t.set(n, a);
    }
    function a() {
      return Tr(n, arguments, lt(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), vr(a, n);
  }, dt(e);
}
var mi = /%[sdj%]/g, Un = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Un = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function vt(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(r) {
    var n = r.field;
    t[n] = t[n] || [], t[n].push(r);
  }), t;
}
function Se(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var a = 0, i = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var o = e.replace(mi, function(u) {
      if (u === "%%")
        return "%";
      if (a >= i)
        return u;
      switch (u) {
        case "%s":
          return String(r[a++]);
        case "%d":
          return Number(r[a++]);
        case "%j":
          try {
            return JSON.stringify(r[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return u;
      }
    });
    return o;
  }
  return e;
}
function yi(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function ve(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || yi(t) && typeof e == "string" && !e);
}
function bi(e, t, r) {
  var n = [], a = 0, i = e.length;
  function o(u) {
    n.push.apply(n, u || []), a++, a === i && r(n);
  }
  e.forEach(function(u) {
    t(u, o);
  });
}
function tn(e, t, r) {
  var n = 0, a = e.length;
  function i(o) {
    if (o && o.length) {
      r(o);
      return;
    }
    var u = n;
    n = n + 1, u < a ? t(e[u], i) : r([]);
  }
  i([]);
}
function Ei(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, e[r] || []);
  }), t;
}
var nn = /* @__PURE__ */ function(e) {
  gi(t, e);
  function t(r, n) {
    var a;
    return a = e.call(this, "Async Validation Error") || this, a.errors = r, a.fields = n, a;
  }
  return t;
}(/* @__PURE__ */ dt(Error));
function wi(e, t, r, n, a) {
  if (t.first) {
    var i = new Promise(function(g, S) {
      var R = function(p) {
        return n(p), p.length ? S(new nn(p, vt(p))) : g(a);
      }, m = Ei(e);
      tn(m, r, R);
    });
    return i.catch(function(g) {
      return g;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], u = Object.keys(e), s = u.length, l = 0, c = [], d = new Promise(function(g, S) {
    var R = function(y) {
      if (c.push.apply(c, y), l++, l === s)
        return n(c), c.length ? S(new nn(c, vt(c))) : g(a);
    };
    u.length || (n(c), g(a)), u.forEach(function(m) {
      var y = e[m];
      o.indexOf(m) !== -1 ? tn(y, r, R) : bi(y, r, R);
    });
  });
  return d.catch(function(g) {
    return g;
  }), d;
}
function Fi(e) {
  return !!(e && e.message !== void 0);
}
function Ci(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function an(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = Ci(t, e.fullFields) : n = t[r.field || e.fullField], Fi(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function on(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        typeof n == "object" && typeof e[r] == "object" ? e[r] = He({}, e[r], n) : e[r] = n;
      }
  }
  return e;
}
var Bn = function(t, r, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || ve(r, o || t.type)) && a.push(Se(i.messages.required, t.fullField));
}, Si = function(t, r, n, a, i) {
  (/^\s+$/.test(r) || r === "") && a.push(Se(i.messages.whitespace, t.fullField));
}, Er, Pi = function() {
  if (Er)
    return Er;
  var e = "[a-fA-F\\d:]", t = function(P) {
    return P && P.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", a = (`
(?:
(?:` + n + ":){7}(?:" + n + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + n + ":){6}(?:" + r + "|:" + n + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + n + ":){5}(?::" + r + "|(?::" + n + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + n + ":){4}(?:(?::" + n + "){0,1}:" + r + "|(?::" + n + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + n + ":){3}(?:(?::" + n + "){0,2}:" + r + "|(?::" + n + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + n + ":){2}(?:(?::" + n + "){0,3}:" + r + "|(?::" + n + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + n + ":){1}(?:(?::" + n + "){0,4}:" + r + "|(?::" + n + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + n + "){0,5}:" + r + "|(?::" + n + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + r + "$)|(?:^" + a + "$)"), o = new RegExp("^" + r + "$"), u = new RegExp("^" + a + "$"), s = function(P) {
    return P && P.exact ? i : new RegExp("(?:" + t(P) + r + t(P) + ")|(?:" + t(P) + a + t(P) + ")", "g");
  };
  s.v4 = function(E) {
    return E && E.exact ? o : new RegExp("" + t(E) + r + t(E), "g");
  }, s.v6 = function(E) {
    return E && E.exact ? u : new RegExp("" + t(E) + a + t(E), "g");
  };
  var l = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", d = s.v4().source, g = s.v6().source, S = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", R = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", y = "(?::\\d{2,5})?", p = '(?:[/?#][^\\s"]*)?', C = "(?:" + l + "|www\\.)" + c + "(?:localhost|" + d + "|" + g + "|" + S + R + m + ")" + y + p;
  return Er = new RegExp("(?:^" + C + "$)", "i"), Er;
}, un = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, sr = {
  integer: function(t) {
    return sr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return sr.number(t) && !sr.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !sr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(un.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Pi());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(un.hex);
  }
}, xi = function(t, r, n, a, i) {
  if (t.required && r === void 0) {
    Bn(t, r, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], u = t.type;
  o.indexOf(u) > -1 ? sr[u](r) || a.push(Se(i.messages.types[u], t.fullField, t.type)) : u && typeof r !== t.type && a.push(Se(i.messages.types[u], t.fullField, t.type));
}, Ri = function(t, r, n, a, i) {
  var o = typeof t.len == "number", u = typeof t.min == "number", s = typeof t.max == "number", l = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = r, d = null, g = typeof r == "number", S = typeof r == "string", R = Array.isArray(r);
  if (g ? d = "number" : S ? d = "string" : R && (d = "array"), !d)
    return !1;
  R && (c = r.length), S && (c = r.replace(l, "_").length), o ? c !== t.len && a.push(Se(i.messages[d].len, t.fullField, t.len)) : u && !s && c < t.min ? a.push(Se(i.messages[d].min, t.fullField, t.min)) : s && !u && c > t.max ? a.push(Se(i.messages[d].max, t.fullField, t.max)) : u && s && (c < t.min || c > t.max) && a.push(Se(i.messages[d].range, t.fullField, t.min, t.max));
}, Je = "enum", Oi = function(t, r, n, a, i) {
  t[Je] = Array.isArray(t[Je]) ? t[Je] : [], t[Je].indexOf(r) === -1 && a.push(Se(i.messages[Je], t.fullField, t[Je].join(", ")));
}, Ti = function(t, r, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(Se(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || a.push(Se(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, W = {
  required: Bn,
  whitespace: Si,
  type: xi,
  range: Ri,
  enum: Oi,
  pattern: Ti
}, _i = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r, "string") && !t.required)
      return n();
    W.required(t, r, a, o, i, "string"), ve(r, "string") || (W.type(t, r, a, o, i), W.range(t, r, a, o, i), W.pattern(t, r, a, o, i), t.whitespace === !0 && W.whitespace(t, r, a, o, i));
  }
  n(o);
}, Ai = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && W.type(t, r, a, o, i);
  }
  n(o);
}, Ni = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (r === "" && (r = void 0), ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && (W.type(t, r, a, o, i), W.range(t, r, a, o, i));
  }
  n(o);
}, ki = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && W.type(t, r, a, o, i);
  }
  n(o);
}, Vi = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), ve(r) || W.type(t, r, a, o, i);
  }
  n(o);
}, $i = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && (W.type(t, r, a, o, i), W.range(t, r, a, o, i));
  }
  n(o);
}, Mi = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && (W.type(t, r, a, o, i), W.range(t, r, a, o, i));
  }
  n(o);
}, Ii = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (r == null && !t.required)
      return n();
    W.required(t, r, a, o, i, "array"), r != null && (W.type(t, r, a, o, i), W.range(t, r, a, o, i));
  }
  n(o);
}, ji = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && W.type(t, r, a, o, i);
  }
  n(o);
}, Li = "enum", Di = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i), r !== void 0 && W[Li](t, r, a, o, i);
  }
  n(o);
}, qi = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r, "string") && !t.required)
      return n();
    W.required(t, r, a, o, i), ve(r, "string") || W.pattern(t, r, a, o, i);
  }
  n(o);
}, Wi = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r, "date") && !t.required)
      return n();
    if (W.required(t, r, a, o, i), !ve(r, "date")) {
      var s;
      r instanceof Date ? s = r : s = new Date(r), W.type(t, s, a, o, i), s && W.range(t, s.getTime(), a, o, i);
    }
  }
  n(o);
}, Ui = function(t, r, n, a, i) {
  var o = [], u = Array.isArray(r) ? "array" : typeof r;
  W.required(t, r, a, o, i, u), n(o);
}, Yr = function(t, r, n, a, i) {
  var o = t.type, u = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(r, o) && !t.required)
      return n();
    W.required(t, r, a, u, i, o), ve(r, o) || W.type(t, r, a, u, i);
  }
  n(u);
}, Bi = function(t, r, n, a, i) {
  var o = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(r) && !t.required)
      return n();
    W.required(t, r, a, o, i);
  }
  n(o);
}, fr = {
  string: _i,
  method: Ai,
  number: Ni,
  boolean: ki,
  regexp: Vi,
  integer: $i,
  float: Mi,
  array: Ii,
  object: ji,
  enum: Di,
  pattern: qi,
  date: Wi,
  url: Yr,
  hex: Yr,
  email: Yr,
  required: Ui,
  any: Bi
};
function gt() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var pt = gt(), yr = /* @__PURE__ */ function() {
  function e(r) {
    this.rules = null, this._messages = pt, this.define(r);
  }
  var t = e.prototype;
  return t.define = function(n) {
    var a = this;
    if (!n)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof n != "object" || Array.isArray(n))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(n).forEach(function(i) {
      var o = n[i];
      a.rules[i] = Array.isArray(o) ? o : [o];
    });
  }, t.messages = function(n) {
    return n && (this._messages = on(gt(), n)), this._messages;
  }, t.validate = function(n, a, i) {
    var o = this;
    a === void 0 && (a = {}), i === void 0 && (i = function() {
    });
    var u = n, s = a, l = i;
    if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return l && l(null, u), Promise.resolve(u);
    function c(m) {
      var y = [], p = {};
      function C(P) {
        if (Array.isArray(P)) {
          var h;
          y = (h = y).concat.apply(h, P);
        } else
          y.push(P);
      }
      for (var E = 0; E < m.length; E++)
        C(m[E]);
      y.length ? (p = vt(y), l(y, p)) : l(null, u);
    }
    if (s.messages) {
      var d = this.messages();
      d === pt && (d = gt()), on(d, s.messages), s.messages = d;
    } else
      s.messages = this.messages();
    var g = {}, S = s.keys || Object.keys(this.rules);
    S.forEach(function(m) {
      var y = o.rules[m], p = u[m];
      y.forEach(function(C) {
        var E = C;
        typeof E.transform == "function" && (u === n && (u = He({}, u)), p = u[m] = E.transform(p)), typeof E == "function" ? E = {
          validator: E
        } : E = He({}, E), E.validator = o.getValidationMethod(E), E.validator && (E.field = m, E.fullField = E.fullField || m, E.type = o.getType(E), g[m] = g[m] || [], g[m].push({
          rule: E,
          value: p,
          source: u,
          field: m
        }));
      });
    });
    var R = {};
    return wi(g, s, function(m, y) {
      var p = m.rule, C = (p.type === "object" || p.type === "array") && (typeof p.fields == "object" || typeof p.defaultField == "object");
      C = C && (p.required || !p.required && m.value), p.field = m.field;
      function E(N, M) {
        return He({}, M, {
          fullField: p.fullField + "." + N,
          fullFields: p.fullFields ? [].concat(p.fullFields, [N]) : [N]
        });
      }
      function P(N) {
        N === void 0 && (N = []);
        var M = Array.isArray(N) ? N : [N];
        !s.suppressWarning && M.length && e.warning("async-validator:", M), M.length && p.message !== void 0 && (M = [].concat(p.message));
        var $ = M.map(an(p, u));
        if (s.first && $.length)
          return R[p.field] = 1, y($);
        if (!C)
          y($);
        else {
          if (p.required && !m.value)
            return p.message !== void 0 ? $ = [].concat(p.message).map(an(p, u)) : s.error && ($ = [s.error(p, Se(s.messages.required, p.field))]), y($);
          var I = {};
          p.defaultField && Object.keys(m.value).map(function(F) {
            I[F] = p.defaultField;
          }), I = He({}, I, m.rule.fields);
          var b = {};
          Object.keys(I).forEach(function(F) {
            var x = I[F], O = Array.isArray(x) ? x : [x];
            b[F] = O.map(E.bind(null, F));
          });
          var v = new e(b);
          v.messages(s.messages), m.rule.options && (m.rule.options.messages = s.messages, m.rule.options.error = s.error), v.validate(m.value, m.rule.options || s, function(F) {
            var x = [];
            $ && $.length && x.push.apply(x, $), F && F.length && x.push.apply(x, F), y(x.length ? x : null);
          });
        }
      }
      var h;
      if (p.asyncValidator)
        h = p.asyncValidator(p, m.value, P, m.source, s);
      else if (p.validator) {
        try {
          h = p.validator(p, m.value, P, m.source, s);
        } catch (N) {
          console.error == null || console.error(N), s.suppressValidatorError || setTimeout(function() {
            throw N;
          }, 0), P(N.message);
        }
        h === !0 ? P() : h === !1 ? P(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || (p.fullField || p.field) + " fails") : h instanceof Array ? P(h) : h instanceof Error && P(h.message);
      }
      h && h.then && h.then(function() {
        return P();
      }, function(N) {
        return P(N);
      });
    }, function(m) {
      c(m);
    }, u);
  }, t.getType = function(n) {
    if (n.type === void 0 && n.pattern instanceof RegExp && (n.type = "pattern"), typeof n.validator != "function" && n.type && !fr.hasOwnProperty(n.type))
      throw new Error(Se("Unknown rule type %s", n.type));
    return n.type || "string";
  }, t.getValidationMethod = function(n) {
    if (typeof n.validator == "function")
      return n.validator;
    var a = Object.keys(n), i = a.indexOf("message");
    return i !== -1 && a.splice(i, 1), a.length === 1 && a[0] === "required" ? fr.required : fr[this.getType(n)] || void 0;
  }, e;
}();
yr.register = function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  fr[t] = r;
};
yr.warning = Un;
yr.messages = pt;
yr.validators = fr;
var Fe = "'${name}' is not a valid ${type}", zn = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: Fe,
    method: Fe,
    array: Fe,
    object: Fe,
    number: Fe,
    date: Fe,
    boolean: Fe,
    integer: Fe,
    float: Fe,
    regexp: Fe,
    email: Fe,
    url: Fe,
    hex: Fe
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};
function Hn(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function Yn(e) {
  if (Array.isArray(e))
    return e;
}
function Gn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zi(e) {
  return Yn(e) || Wn(e) || _t(e) || Gn();
}
function Kn(e, t, r, n) {
  if (!t.length)
    return r;
  var a = zi(t), i = a[0], o = a.slice(1), u;
  return !e && typeof i == "number" ? u = [] : Array.isArray(e) ? u = B(e) : u = V({}, e), n && r === void 0 && o.length === 1 ? delete u[i][o[0]] : u[i] = Kn(u[i], o, r, n), u;
}
function Hi(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !Hn(e, t.slice(0, -1)) ? e : Kn(e, t, r, n);
}
function Ir(e) {
  return Array.isArray(e) ? Gi(e) : pe(e) === "object" && e !== null ? Yi(e) : e;
}
function Yi(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var r in e)
      t[r] = Ir(e[r]);
    return t;
  }
  return e;
}
function Gi(e) {
  return e.map(function(t) {
    return Ir(t);
  });
}
function fe(e) {
  return ct(e);
}
function qe(e, t) {
  var r = Hn(e, t);
  return r;
}
function De(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, a = Hi(e, t, r, n);
  return a;
}
function sn(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = qe(e, n);
    r = De(r, n, a);
  }), r;
}
function cr(e, t) {
  return e && e.some(function(r) {
    return Qn(r, t);
  });
}
function fn(e) {
  return pe(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function Jn(e, t) {
  var r = Array.isArray(e) ? B(e) : V({}, e);
  return t && Object.keys(t).forEach(function(n) {
    var a = r[n], i = t[n], o = fn(a) && fn(i);
    r[n] = o ? Jn(a, i || {}) : Ir(i);
  }), r;
}
function _r(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return r.reduce(function(a, i) {
    return Jn(a, i);
  }, e);
}
function Qn(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(r, n) {
    return t[n] === r;
  });
}
function Ki(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || pe(e) !== "object" || pe(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return B(a).every(function(i) {
    var o = e[i], u = t[i];
    return typeof o == "function" && typeof u == "function" ? !0 : o === u;
  });
}
function Ji(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && pe(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function cn(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], i = t - r;
  return i > 0 ? [].concat(B(e.slice(0, r)), [a], B(e.slice(r, t)), B(e.slice(t + 1, n))) : i < 0 ? [].concat(B(e.slice(0, t)), B(e.slice(t + 1, r + 1)), [a], B(e.slice(r + 1, n))) : e;
}
var Qi = yr;
function Zi(e, t) {
  return e.replace(/\$\{\w+\}/g, function(r) {
    var n = r.slice(2, -1);
    return t[n];
  });
}
var ln = "CODE_LOGIC_ERROR";
function ht(e, t, r, n, a) {
  return mt.apply(this, arguments);
}
function mt() {
  return mt = Mr(/* @__PURE__ */ je().mark(function e(t, r, n, a, i) {
    var o, u, s, l, c, d, g, S, R;
    return je().wrap(function(y) {
      for (; ; )
        switch (y.prev = y.next) {
          case 0:
            return o = V({}, n), delete o.ruleIndex, o.validator && (u = o.validator, o.validator = function() {
              try {
                return u.apply(void 0, arguments);
              } catch (p) {
                return console.error(p), Promise.reject(ln);
              }
            }), s = null, o && o.type === "array" && o.defaultField && (s = o.defaultField, delete o.defaultField), l = new Qi(G({}, t, [o])), c = _r({}, zn, a.validateMessages), l.messages(c), d = [], y.prev = 9, y.next = 12, Promise.resolve(l.validate(G({}, t, r), V({}, a)));
          case 12:
            y.next = 17;
            break;
          case 14:
            y.prev = 14, y.t0 = y.catch(9), y.t0.errors && (d = y.t0.errors.map(function(p, C) {
              var E = p.message, P = E === ln ? c.default : E;
              return /* @__PURE__ */ _.isValidElement(P) ? /* @__PURE__ */ _.cloneElement(P, {
                key: "error_".concat(C)
              }) : P;
            }));
          case 17:
            if (!(!d.length && s)) {
              y.next = 22;
              break;
            }
            return y.next = 20, Promise.all(r.map(function(p, C) {
              return ht("".concat(t, ".").concat(C), p, s, a, i);
            }));
          case 20:
            return g = y.sent, y.abrupt("return", g.reduce(function(p, C) {
              return [].concat(B(p), B(C));
            }, []));
          case 22:
            return S = V(V({}, n), {}, {
              name: t,
              enum: (n.enum || []).join(", ")
            }, i), R = d.map(function(p) {
              return typeof p == "string" ? Zi(p, S) : p;
            }), y.abrupt("return", R);
          case 25:
          case "end":
            return y.stop();
        }
    }, e, null, [[9, 14]]);
  })), mt.apply(this, arguments);
}
function Xi(e, t, r, n, a, i) {
  var o = e.join("."), u = r.map(function(c, d) {
    var g = c.validator, S = V(V({}, c), {}, {
      ruleIndex: d
    });
    return g && (S.validator = function(R, m, y) {
      var p = !1, C = function() {
        for (var h = arguments.length, N = new Array(h), M = 0; M < h; M++)
          N[M] = arguments[M];
        Promise.resolve().then(function() {
          Ee(!p, "Your validator function has already return a promise. `callback` will be ignored."), p || y.apply(void 0, N);
        });
      }, E = g(R, m, C);
      p = E && typeof E.then == "function" && typeof E.catch == "function", Ee(p, "`callback` is deprecated. Please return a promise instead."), p && E.then(function() {
        y();
      }).catch(function(P) {
        y(P || " ");
      });
    }), S;
  }).sort(function(c, d) {
    var g = c.warningOnly, S = c.ruleIndex, R = d.warningOnly, m = d.ruleIndex;
    return !!g == !!R ? S - m : g ? 1 : -1;
  }), s;
  if (a === !0)
    s = new Promise(/* @__PURE__ */ function() {
      var c = Mr(/* @__PURE__ */ je().mark(function d(g, S) {
        var R, m, y;
        return je().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                R = 0;
              case 1:
                if (!(R < u.length)) {
                  C.next = 12;
                  break;
                }
                return m = u[R], C.next = 5, ht(o, t, m, n, i);
              case 5:
                if (y = C.sent, !y.length) {
                  C.next = 9;
                  break;
                }
                return S([{
                  errors: y,
                  rule: m
                }]), C.abrupt("return");
              case 9:
                R += 1, C.next = 1;
                break;
              case 12:
                g([]);
              case 13:
              case "end":
                return C.stop();
            }
        }, d);
      }));
      return function(d, g) {
        return c.apply(this, arguments);
      };
    }());
  else {
    var l = u.map(function(c) {
      return ht(o, t, c, n, i).then(function(d) {
        return {
          errors: d,
          rule: c
        };
      });
    });
    s = (a ? ro(l) : eo(l)).then(function(c) {
      return Promise.reject(c);
    });
  }
  return s.catch(function(c) {
    return c;
  }), s;
}
function eo(e) {
  return yt.apply(this, arguments);
}
function yt() {
  return yt = Mr(/* @__PURE__ */ je().mark(function e(t) {
    return je().wrap(function(n) {
      for (; ; )
        switch (n.prev = n.next) {
          case 0:
            return n.abrupt("return", Promise.all(t).then(function(a) {
              var i, o = (i = []).concat.apply(i, B(a));
              return o;
            }));
          case 1:
          case "end":
            return n.stop();
        }
    }, e);
  })), yt.apply(this, arguments);
}
function ro(e) {
  return bt.apply(this, arguments);
}
function bt() {
  return bt = Mr(/* @__PURE__ */ je().mark(function e(t) {
    var r;
    return je().wrap(function(a) {
      for (; ; )
        switch (a.prev = a.next) {
          case 0:
            return r = 0, a.abrupt("return", new Promise(function(i) {
              t.forEach(function(o) {
                o.then(function(u) {
                  u.errors.length && i([u]), r += 1, r === t.length && i([]);
                });
              });
            }));
          case 2:
          case "end":
            return a.stop();
        }
    }, e);
  })), bt.apply(this, arguments);
}
var to = ["name"], xe = [];
function dn(e, t, r, n, a, i) {
  return typeof e == "function" ? e(t, r, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var At = /* @__PURE__ */ function(e) {
  xt(r, e);
  var t = Ot(r);
  function r(n) {
    var a;
    if (pr(this, r), a = t.call(this, n), a.state = {
      resetCount: 0
    }, a.cancelRegisterFunc = null, a.mounted = !1, a.touched = !1, a.dirty = !1, a.validatePromise = null, a.prevValidating = void 0, a.errors = xe, a.warnings = xe, a.cancelRegister = function() {
      var s = a.props, l = s.preserve, c = s.isListField, d = s.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(c, l, fe(d)), a.cancelRegisterFunc = null;
    }, a.getNamePath = function() {
      var s = a.props, l = s.name, c = s.fieldContext, d = c.prefixName, g = d === void 0 ? [] : d;
      return l !== void 0 ? [].concat(B(g), B(l)) : [];
    }, a.getRules = function() {
      var s = a.props, l = s.rules, c = l === void 0 ? [] : l, d = s.fieldContext;
      return c.map(function(g) {
        return typeof g == "function" ? g(d) : g;
      });
    }, a.refresh = function() {
      !a.mounted || a.setState(function(s) {
        var l = s.resetCount;
        return {
          resetCount: l + 1
        };
      });
    }, a.triggerMetaEvent = function(s) {
      var l = a.props.onMetaChange;
      l == null || l(V(V({}, a.getMeta()), {}, {
        destroy: s
      }));
    }, a.onStoreChange = function(s, l, c) {
      var d = a.props, g = d.shouldUpdate, S = d.dependencies, R = S === void 0 ? [] : S, m = d.onReset, y = c.store, p = a.getNamePath(), C = a.getValue(s), E = a.getValue(y), P = l && cr(l, p);
      switch (c.type === "valueUpdate" && c.source === "external" && C !== E && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = xe, a.warnings = xe, a.triggerMetaEvent()), c.type) {
        case "reset":
          if (!l || P) {
            a.touched = !1, a.dirty = !1, a.validatePromise = null, a.errors = xe, a.warnings = xe, a.triggerMetaEvent(), m == null || m(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (g) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          if (P) {
            var h = c.data;
            "touched" in h && (a.touched = h.touched), "validating" in h && !("originRCField" in h) && (a.validatePromise = h.validating ? Promise.resolve([]) : null), "errors" in h && (a.errors = h.errors || xe), "warnings" in h && (a.warnings = h.warnings || xe), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          }
          if (g && !p.length && dn(g, s, y, C, E, c)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var N = R.map(fe);
          if (N.some(function(M) {
            return cr(c.relatedFields, M);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (P || (!R.length || p.length || g) && dn(g, s, y, C, E, c)) {
            a.reRender();
            return;
          }
          break;
      }
      g === !0 && a.reRender();
    }, a.validateRules = function(s) {
      var l = a.getNamePath(), c = a.getValue(), d = Promise.resolve().then(function() {
        if (!a.mounted)
          return [];
        var g = a.props, S = g.validateFirst, R = S === void 0 ? !1 : S, m = g.messageVariables, y = s || {}, p = y.triggerName, C = a.getRules();
        p && (C = C.filter(function(P) {
          var h = P.validateTrigger;
          if (!h)
            return !0;
          var N = ct(h);
          return N.includes(p);
        }));
        var E = Xi(l, c, C, s, R, m);
        return E.catch(function(P) {
          return P;
        }).then(function() {
          var P = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : xe;
          if (a.validatePromise === d) {
            var h;
            a.validatePromise = null;
            var N = [], M = [];
            (h = P.forEach) === null || h === void 0 || h.call(P, function($) {
              var I = $.rule.warningOnly, b = $.errors, v = b === void 0 ? xe : b;
              I ? M.push.apply(M, B(v)) : N.push.apply(N, B(v));
            }), a.errors = N, a.warnings = M, a.triggerMetaEvent(), a.reRender();
          }
        }), E;
      });
      return a.validatePromise = d, a.dirty = !0, a.errors = xe, a.warnings = xe, a.triggerMetaEvent(), a.reRender(), d;
    }, a.isFieldValidating = function() {
      return !!a.validatePromise;
    }, a.isFieldTouched = function() {
      return a.touched;
    }, a.isFieldDirty = function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var s = a.props.fieldContext, l = s.getInternalHooks(ze), c = l.getInitialValue;
      return c(a.getNamePath()) !== void 0;
    }, a.getErrors = function() {
      return a.errors;
    }, a.getWarnings = function() {
      return a.warnings;
    }, a.isListField = function() {
      return a.props.isListField;
    }, a.isList = function() {
      return a.props.isList;
    }, a.isPreserve = function() {
      return a.props.preserve;
    }, a.getMeta = function() {
      a.prevValidating = a.isFieldValidating();
      var s = {
        touched: a.isFieldTouched(),
        validating: a.prevValidating,
        errors: a.errors,
        warnings: a.warnings,
        name: a.getNamePath()
      };
      return s;
    }, a.getOnlyChild = function(s) {
      if (typeof s == "function") {
        var l = a.getMeta();
        return V(V({}, a.getOnlyChild(s(a.getControlled(), l, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var c = ut(s);
      return c.length !== 1 || !/* @__PURE__ */ _.isValidElement(c[0]) ? {
        child: c,
        isFunction: !1
      } : {
        child: c[0],
        isFunction: !1
      };
    }, a.getValue = function(s) {
      var l = a.props.fieldContext.getFieldsValue, c = a.getNamePath();
      return qe(s || l(!0), c);
    }, a.getControlled = function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = a.props, c = l.trigger, d = l.validateTrigger, g = l.getValueFromEvent, S = l.normalize, R = l.valuePropName, m = l.getValueProps, y = l.fieldContext, p = d !== void 0 ? d : y.validateTrigger, C = a.getNamePath(), E = y.getInternalHooks, P = y.getFieldsValue, h = E(ze), N = h.dispatch, M = a.getValue(), $ = m || function(F) {
        return G({}, R, F);
      }, I = s[c], b = V(V({}, s), $(M));
      b[c] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var F, x = arguments.length, O = new Array(x), A = 0; A < x; A++)
          O[A] = arguments[A];
        g ? F = g.apply(void 0, O) : F = Ji.apply(void 0, [R].concat(O)), S && (F = S(F, M, P(!0))), N({
          type: "updateValue",
          namePath: C,
          value: F
        }), I && I.apply(void 0, O);
      };
      var v = ct(p || []);
      return v.forEach(function(F) {
        var x = b[F];
        b[F] = function() {
          x && x.apply(void 0, arguments);
          var O = a.props.rules;
          O && O.length && N({
            type: "validateField",
            namePath: C,
            triggerName: F
          });
        };
      }), b;
    }, n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(ze), u = o.initEntityValue;
      u(Rt(a));
    }
    return a;
  }
  return hr(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var u = o.getInternalHooks, s = u(ze), l = s.registerField;
        this.cancelRegisterFunc = l(this);
      }
      i === !0 && this.reRender();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
    }
  }, {
    key: "reRender",
    value: function() {
      !this.mounted || this.forceUpdate();
    }
  }, {
    key: "render",
    value: function() {
      this.state.resetCount;
      var a = this.props.children, i = this.getOnlyChild(a), o = i.child, u = i.isFunction, s;
      return u ? s = o : /* @__PURE__ */ _.isValidElement(o) ? s = /* @__PURE__ */ _.cloneElement(o, this.getControlled(o.props)) : (Ee(!o, "`children` of Field is not validate ReactElement."), s = o), /* @__PURE__ */ H(Xa, {
        children: s
      });
    }
  }]), r;
}(_.Component);
At.contextType = tr;
At.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function Zn(e) {
  var t = e.name, r = mr(e, to), n = _.useContext(tr), a = t !== void 0 ? fe(t) : void 0, i = "keep";
  return r.isListField || (i = "_".concat((a || []).join("_"))), process.env.NODE_ENV !== "production" && r.preserve === !1 && r.isListField && a.length <= 1 && Ee(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ H(At, {
    name: a,
    ...r,
    fieldContext: n
  }, i);
}
var no = /* @__PURE__ */ _.createContext(null), ao = function(t) {
  var r = t.name, n = t.initialValue, a = t.children, i = t.rules, o = t.validateTrigger, u = _.useContext(tr), s = _.useRef({
    keys: [],
    id: 0
  }), l = s.current, c = _.useMemo(function() {
    var R = fe(u.prefixName) || [];
    return [].concat(B(R), B(fe(r)));
  }, [u.prefixName, r]), d = _.useMemo(function() {
    return V(V({}, u), {}, {
      prefixName: c
    });
  }, [u, c]), g = _.useMemo(function() {
    return {
      getKey: function(m) {
        var y = c.length, p = m[y];
        return [l.keys[p], m.slice(y + 1)];
      }
    };
  }, [c]);
  if (typeof a != "function")
    return Ee(!1, "Form.List only accepts function as children."), null;
  var S = function(m, y, p) {
    var C = p.source;
    return C === "internal" ? !1 : m !== y;
  };
  return /* @__PURE__ */ H(no.Provider, {
    value: g,
    children: /* @__PURE__ */ H(tr.Provider, {
      value: d,
      children: /* @__PURE__ */ H(Zn, {
        name: [],
        shouldUpdate: S,
        rules: i,
        validateTrigger: o,
        initialValue: n,
        isList: !0,
        children: function(R, m) {
          var y = R.value, p = y === void 0 ? [] : y, C = R.onChange, E = u.getFieldValue, P = function() {
            var $ = E(c || []);
            return $ || [];
          }, h = {
            add: function($, I) {
              var b = P();
              I >= 0 && I <= b.length ? (l.keys = [].concat(B(l.keys.slice(0, I)), [l.id], B(l.keys.slice(I))), C([].concat(B(b.slice(0, I)), [$], B(b.slice(I))))) : (process.env.NODE_ENV !== "production" && (I < 0 || I > b.length) && Ee(!1, "The second parameter of the add function should be a valid positive number."), l.keys = [].concat(B(l.keys), [l.id]), C([].concat(B(b), [$]))), l.id += 1;
            },
            remove: function($) {
              var I = P(), b = new Set(Array.isArray($) ? $ : [$]);
              b.size <= 0 || (l.keys = l.keys.filter(function(v, F) {
                return !b.has(F);
              }), C(I.filter(function(v, F) {
                return !b.has(F);
              })));
            },
            move: function($, I) {
              if ($ !== I) {
                var b = P();
                $ < 0 || $ >= b.length || I < 0 || I >= b.length || (l.keys = cn(l.keys, $, I), C(cn(b, $, I)));
              }
            }
          }, N = p || [];
          return Array.isArray(N) || (N = [], process.env.NODE_ENV !== "production" && Ee(!1, "Current value of '".concat(c.join(" > "), "' is not an array type."))), a(N.map(function(M, $) {
            var I = l.keys[$];
            return I === void 0 && (l.keys[$] = l.id, I = l.keys[$], l.id += 1), {
              name: $,
              key: I,
              isListField: !0
            };
          }), h, m);
        }
      })
    })
  });
};
function io(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], a = !0, i = !1, o, u;
    try {
      for (r = r.call(e); !(a = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); a = !0)
        ;
    } catch (s) {
      i = !0, u = s;
    } finally {
      try {
        !a && r.return != null && r.return();
      } finally {
        if (i)
          throw u;
      }
    }
    return n;
  }
}
function ge(e, t) {
  return Yn(e) || io(e, t) || _t(e, t) || Gn();
}
function oo(e) {
  var t = !1, r = e.length, n = [];
  return e.length ? new Promise(function(a, i) {
    e.forEach(function(o, u) {
      o.catch(function(s) {
        return t = !0, s;
      }).then(function(s) {
        r -= 1, n[u] = s, !(r > 0) && (t && i(n), a(n));
      });
    });
  }) : Promise.resolve([]);
}
var Xn = "__@field_split__";
function Gr(e) {
  return e.map(function(t) {
    return "".concat(pe(t), ":").concat(t);
  }).join(Xn);
}
var Qe = /* @__PURE__ */ function() {
  function e() {
    pr(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return hr(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(Gr(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(Gr(r));
    }
  }, {
    key: "update",
    value: function(r, n) {
      var a = this.get(r), i = n(a);
      i ? this.set(r, i) : this.delete(r);
    }
  }, {
    key: "delete",
    value: function(r) {
      this.kvs.delete(Gr(r));
    }
  }, {
    key: "map",
    value: function(r) {
      return B(this.kvs.entries()).map(function(n) {
        var a = ge(n, 2), i = a[0], o = a[1], u = i.split(Xn);
        return r({
          key: u.map(function(s) {
            var l = s.match(/^([^:]*):(.*)$/), c = ge(l, 3), d = c[1], g = c[2];
            return d === "number" ? Number(g) : g;
          }),
          value: o
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var r = {};
      return this.map(function(n) {
        var a = n.key, i = n.value;
        return r[a.join(".")] = i, null;
      }), r;
    }
  }]), e;
}(), uo = ["name", "errors"], so = /* @__PURE__ */ hr(function e(t) {
  var r = this;
  pr(this, e), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
    return {
      getFieldValue: r.getFieldValue,
      getFieldsValue: r.getFieldsValue,
      getFieldError: r.getFieldError,
      getFieldWarning: r.getFieldWarning,
      getFieldsError: r.getFieldsError,
      isFieldsTouched: r.isFieldsTouched,
      isFieldTouched: r.isFieldTouched,
      isFieldValidating: r.isFieldValidating,
      isFieldsValidating: r.isFieldsValidating,
      resetFields: r.resetFields,
      setFields: r.setFields,
      setFieldValue: r.setFieldValue,
      setFieldsValue: r.setFieldsValue,
      validateFields: r.validateFields,
      submit: r.submit,
      _init: !0,
      getInternalHooks: r.getInternalHooks
    };
  }, this.getInternalHooks = function(n) {
    return n === ze ? (r.formHooked = !0, {
      dispatch: r.dispatch,
      initEntityValue: r.initEntityValue,
      registerField: r.registerField,
      useSubscribe: r.useSubscribe,
      setInitialValues: r.setInitialValues,
      destroyForm: r.destroyForm,
      setCallbacks: r.setCallbacks,
      setValidateMessages: r.setValidateMessages,
      getFields: r.getFields,
      setPreserve: r.setPreserve,
      getInitialValue: r.getInitialValue,
      registerWatch: r.registerWatch
    }) : (Ee(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(n) {
    r.subscribable = n;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(n, a) {
    if (r.initialValues = n || {}, a) {
      var i, o = _r({}, n, r.store);
      (i = r.prevWithoutPreserves) === null || i === void 0 || i.map(function(u) {
        var s = u.key;
        o = De(o, s, qe(n, s));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }, this.destroyForm = function() {
    var n = new Qe();
    r.getFieldEntities(!0).forEach(function(a) {
      r.isMergedPreserve(a.isPreserve()) || n.set(a.getNamePath(), !0);
    }), r.prevWithoutPreserves = n;
  }, this.getInitialValue = function(n) {
    var a = qe(r.initialValues, n);
    return n.length ? Ir(a) : a;
  }, this.setCallbacks = function(n) {
    r.callbacks = n;
  }, this.setValidateMessages = function(n) {
    r.validateMessages = n;
  }, this.setPreserve = function(n) {
    r.preserve = n;
  }, this.watchList = [], this.registerWatch = function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }, this.notifyWatch = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue();
      r.watchList.forEach(function(i) {
        i(a, n);
      });
    }
  }, this.timeoutId = null, this.warningUnhooked = function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || Ee(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }, this.updateStore = function(n) {
    r.store = n;
  }, this.getFieldEntities = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }, this.getFieldsMap = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new Qe();
    return r.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }, this.getFieldEntitiesForNamePathList = function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(i) {
      var o = fe(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: fe(i)
      };
    });
  }, this.getFieldsValue = function(n, a) {
    if (r.warningUnhooked(), n === !0 && !a)
      return r.store;
    var i = r.getFieldEntitiesForNamePathList(Array.isArray(n) ? n : null), o = [];
    return i.forEach(function(u) {
      var s, l = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (!(!n && ((s = u.isListField) === null || s === void 0 ? void 0 : s.call(u))))
        if (!a)
          o.push(l);
        else {
          var c = "getMeta" in u ? u.getMeta() : null;
          a(c) && o.push(l);
        }
    }), sn(r.store, o.map(fe));
  }, this.getFieldValue = function(n) {
    r.warningUnhooked();
    var a = fe(n);
    return qe(r.store, a);
  }, this.getFieldsError = function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: fe(n[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(n) {
    r.warningUnhooked();
    var a = fe(n), i = r.getFieldsError([a])[0];
    return i.errors;
  }, this.getFieldWarning = function(n) {
    r.warningUnhooked();
    var a = fe(n), i = r.getFieldsError([a])[0];
    return i.warnings;
  }, this.isFieldsTouched = function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], u = a[1], s, l = !1;
    a.length === 0 ? s = null : a.length === 1 ? Array.isArray(o) ? (s = o.map(fe), l = !1) : (s = null, l = o) : (s = o.map(fe), l = u);
    var c = r.getFieldEntities(!0), d = function(y) {
      return y.isFieldTouched();
    };
    if (!s)
      return l ? c.every(d) : c.some(d);
    var g = new Qe();
    s.forEach(function(m) {
      g.set(m, []);
    }), c.forEach(function(m) {
      var y = m.getNamePath();
      s.forEach(function(p) {
        p.every(function(C, E) {
          return y[E] === C;
        }) && g.update(p, function(C) {
          return [].concat(B(C), [m]);
        });
      });
    });
    var S = function(y) {
      return y.some(d);
    }, R = g.map(function(m) {
      var y = m.value;
      return y;
    });
    return l ? R.every(S) : R.some(S);
  }, this.isFieldTouched = function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }, this.isFieldsValidating = function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(fe);
    return a.some(function(o) {
      var u = o.getNamePath();
      return cr(i, u) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }, this.resetWithFieldInitialValue = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new Qe(), i = r.getFieldEntities(!0);
    i.forEach(function(s) {
      var l = s.props.initialValue, c = s.getNamePath();
      if (l !== void 0) {
        var d = a.get(c) || /* @__PURE__ */ new Set();
        d.add({
          entity: s,
          value: l
        }), a.set(c, d);
      }
    });
    var o = function(l) {
      l.forEach(function(c) {
        var d = c.props.initialValue;
        if (d !== void 0) {
          var g = c.getNamePath(), S = r.getInitialValue(g);
          if (S !== void 0)
            Ee(!1, "Form already set 'initialValues' with path '".concat(g.join("."), "'. Field can not overwrite it."));
          else {
            var R = a.get(g);
            if (R && R.size > 1)
              Ee(!1, "Multiple Field with path '".concat(g.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (R) {
              var m = r.getFieldValue(g);
              (!n.skipExist || m === void 0) && r.updateStore(De(r.store, g, B(R)[0].value));
            }
          }
        }
      });
    }, u;
    n.entities ? u = n.entities : n.namePathList ? (u = [], n.namePathList.forEach(function(s) {
      var l = a.get(s);
      if (l) {
        var c;
        (c = u).push.apply(c, B(B(l).map(function(d) {
          return d.entity;
        })));
      }
    })) : u = i, o(u);
  }, this.resetFields = function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(_r({}, r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var i = n.map(fe);
    i.forEach(function(o) {
      var u = r.getInitialValue(o);
      r.updateStore(De(r.store, o, u));
    }), r.resetWithFieldInitialValue({
      namePathList: i
    }), r.notifyObservers(a, i, {
      type: "reset"
    }), r.notifyWatch(i);
  }, this.setFields = function(n) {
    r.warningUnhooked();
    var a = r.store, i = [];
    n.forEach(function(o) {
      var u = o.name;
      o.errors;
      var s = mr(o, uo), l = fe(u);
      i.push(l), "value" in s && r.updateStore(De(r.store, l, s.value)), r.notifyObservers(a, [l], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(i);
  }, this.getFields = function() {
    var n = r.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), u = i.getMeta(), s = V(V({}, u), {}, {
        name: o,
        value: r.getFieldValue(o)
      });
      return Object.defineProperty(s, "originRCField", {
        value: !0
      }), s;
    });
    return a;
  }, this.initEntityValue = function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = qe(r.store, i);
      o === void 0 && r.updateStore(De(r.store, i, a));
    }
  }, this.isMergedPreserve = function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a != null ? a : !0;
  }, this.registerField = function(n) {
    r.fieldEntities.push(n);
    var a = n.getNamePath();
    if (r.notifyWatch([a]), n.props.initialValue !== void 0) {
      var i = r.store;
      r.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), r.notifyObservers(i, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, u) {
      var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (r.fieldEntities = r.fieldEntities.filter(function(d) {
        return d !== n;
      }), !r.isMergedPreserve(u) && (!o || s.length > 1)) {
        var l = o ? void 0 : r.getInitialValue(a);
        if (a.length && r.getFieldValue(a) !== l && r.fieldEntities.every(function(d) {
          return !Qn(d.getNamePath(), a);
        })) {
          var c = r.store;
          r.updateStore(De(c, a, l, !0)), r.notifyObservers(c, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(c, a);
        }
      }
      r.notifyWatch([a]);
    };
  }, this.dispatch = function(n) {
    switch (n.type) {
      case "updateValue": {
        var a = n.namePath, i = n.value;
        r.updateValue(a, i);
        break;
      }
      case "validateField": {
        var o = n.namePath, u = n.triggerName;
        r.validateFields([o], {
          triggerName: u
        });
        break;
      }
    }
  }, this.notifyObservers = function(n, a, i) {
    if (r.subscribable) {
      var o = V(V({}, i), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(u) {
        var s = u.onStoreChange;
        s(n, a, o);
      });
    } else
      r.forceRootUpdate();
  }, this.triggerDependenciesUpdate = function(n, a) {
    var i = r.getDependencyChildrenFields(a);
    return i.length && r.validateFields(i), r.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(B(i))
    }), i;
  }, this.updateValue = function(n, a) {
    var i = fe(n), o = r.store;
    r.updateStore(De(r.store, i, a)), r.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([i]);
    var u = r.triggerDependenciesUpdate(o, i), s = r.callbacks.onValuesChange;
    if (s) {
      var l = sn(r.store, [i]);
      s(l, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([i].concat(B(u)));
  }, this.setFieldsValue = function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var i = _r(r.store, n);
      r.updateStore(i);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }, this.setFieldValue = function(n, a) {
    r.setFields([{
      name: n,
      value: a
    }]);
  }, this.getDependencyChildrenFields = function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new Qe();
    r.getFieldEntities().forEach(function(s) {
      var l = s.props.dependencies;
      (l || []).forEach(function(c) {
        var d = fe(c);
        o.update(d, function() {
          var g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return g.add(s), g;
        });
      });
    });
    var u = function s(l) {
      var c = o.get(l) || /* @__PURE__ */ new Set();
      c.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var g = d.getNamePath();
          d.isFieldDirty() && g.length && (i.push(g), s(g));
        }
      });
    };
    return u(n), i;
  }, this.triggerOnFieldsChange = function(n, a) {
    var i = r.callbacks.onFieldsChange;
    if (i) {
      var o = r.getFields();
      if (a) {
        var u = new Qe();
        a.forEach(function(l) {
          var c = l.name, d = l.errors;
          u.set(c, d);
        }), o.forEach(function(l) {
          l.errors = u.get(l.name) || l.errors;
        });
      }
      var s = o.filter(function(l) {
        var c = l.name;
        return cr(n, c);
      });
      i(s, o);
    }
  }, this.validateFields = function(n, a) {
    r.warningUnhooked();
    var i = !!n, o = i ? n.map(fe) : [], u = [];
    r.getFieldEntities(!0).forEach(function(c) {
      if (i || o.push(c.getNamePath()), (a == null ? void 0 : a.recursive) && i) {
        var d = c.getNamePath();
        d.every(function(R, m) {
          return n[m] === R || n[m] === void 0;
        }) && o.push(d);
      }
      if (!(!c.props.rules || !c.props.rules.length)) {
        var g = c.getNamePath();
        if (!i || cr(o, g)) {
          var S = c.validateRules(V({
            validateMessages: V(V({}, zn), r.validateMessages)
          }, a));
          u.push(S.then(function() {
            return {
              name: g,
              errors: [],
              warnings: []
            };
          }).catch(function(R) {
            var m, y = [], p = [];
            return (m = R.forEach) === null || m === void 0 || m.call(R, function(C) {
              var E = C.rule.warningOnly, P = C.errors;
              E ? p.push.apply(p, B(P)) : y.push.apply(y, B(P));
            }), y.length ? Promise.reject({
              name: g,
              errors: y,
              warnings: p
            }) : {
              name: g,
              errors: y,
              warnings: p
            };
          }));
        }
      }
    });
    var s = oo(u);
    r.lastValidatePromise = s, s.catch(function(c) {
      return c;
    }).then(function(c) {
      var d = c.map(function(g) {
        var S = g.name;
        return S;
      });
      r.notifyObservers(r.store, d, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(d, c);
    });
    var l = s.then(function() {
      return r.lastValidatePromise === s ? Promise.resolve(r.getFieldsValue(o)) : Promise.reject([]);
    }).catch(function(c) {
      var d = c.filter(function(g) {
        return g && g.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(o),
        errorFields: d,
        outOfDate: r.lastValidatePromise !== s
      });
    });
    return l.catch(function(c) {
      return c;
    }), l;
  }, this.submit = function() {
    r.warningUnhooked(), r.validateFields().then(function(n) {
      var a = r.callbacks.onFinish;
      if (a)
        try {
          a(n);
        } catch (i) {
          console.error(i);
        }
    }).catch(function(n) {
      var a = r.callbacks.onFinishFailed;
      a && a(n);
    });
  }, this.forceRootUpdate = t;
});
function ea(e) {
  var t = _.useRef(), r = _.useState({}), n = ge(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var i = function() {
        a({});
      }, o = new so(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var Et = /* @__PURE__ */ _.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), fo = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = _.useContext(Et), u = _.useRef({});
  return /* @__PURE__ */ H(Et.Provider, {
    value: V(V({}, o), {}, {
      validateMessages: V(V({}, o.validateMessages), r),
      triggerFormChange: function(l, c) {
        n && n(l, {
          changedFields: c,
          forms: u.current
        }), o.triggerFormChange(l, c);
      },
      triggerFormFinish: function(l, c) {
        a && a(l, {
          values: c,
          forms: u.current
        }), o.triggerFormFinish(l, c);
      },
      registerForm: function(l, c) {
        l && (u.current = V(V({}, u.current), {}, G({}, l, c))), o.registerForm(l, c);
      },
      unregisterForm: function(l) {
        var c = V({}, u.current);
        delete c[l], u.current = c, o.unregisterForm(l);
      }
    }),
    children: i
  });
}, co = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], lo = function(t, r) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, u = t.preserve, s = t.children, l = t.component, c = l === void 0 ? "form" : l, d = t.validateMessages, g = t.validateTrigger, S = g === void 0 ? "onChange" : g, R = t.onValuesChange, m = t.onFieldsChange, y = t.onFinish, p = t.onFinishFailed, C = mr(t, co), E = _.useContext(Et), P = ea(o), h = ge(P, 1), N = h[0], M = N.getInternalHooks(ze), $ = M.useSubscribe, I = M.setInitialValues, b = M.setCallbacks, v = M.setValidateMessages, F = M.setPreserve, x = M.destroyForm;
  _.useImperativeHandle(r, function() {
    return N;
  }), _.useEffect(function() {
    return E.registerForm(n, N), function() {
      E.unregisterForm(n);
    };
  }, [E, N, n]), v(V(V({}, E.validateMessages), d)), b({
    onValuesChange: R,
    onFieldsChange: function(re) {
      if (E.triggerFormChange(n, re), m) {
        for (var oe = arguments.length, ce = new Array(oe > 1 ? oe - 1 : 0), le = 1; le < oe; le++)
          ce[le - 1] = arguments[le];
        m.apply(void 0, [re].concat(ce));
      }
    },
    onFinish: function(re) {
      E.triggerFormFinish(n, re), y && y(re);
    },
    onFinishFailed: p
  }), F(u);
  var O = _.useRef(null);
  I(a, !O.current), O.current || (O.current = !0), _.useEffect(
    function() {
      return x;
    },
    []
  );
  var A, D = typeof s == "function";
  if (D) {
    var Z = N.getFieldsValue(!0);
    A = s(Z, N);
  } else
    A = s;
  $(!D);
  var ee = _.useRef();
  _.useEffect(function() {
    Ki(ee.current || [], i || []) || N.setFields(i || []), ee.current = i;
  }, [i, N]);
  var L = _.useMemo(function() {
    return V(V({}, N), {}, {
      validateTrigger: S
    });
  }, [N, S]), z = /* @__PURE__ */ H(tr.Provider, {
    value: L,
    children: A
  });
  return c === !1 ? z : /* @__PURE__ */ H(c, {
    ...C,
    onSubmit: function(re) {
      re.preventDefault(), re.stopPropagation(), N.submit();
    },
    onReset: function(re) {
      var oe;
      re.preventDefault(), N.resetFields(), (oe = C.onReset) === null || oe === void 0 || oe.call(C, re);
    },
    children: z
  });
};
function vn(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function vo() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 ? arguments[1] : void 0, r = $n(), n = ge(r, 2), a = n[0], i = n[1], o = Mn(function() {
    return vn(a);
  }, [a]), u = ke(o);
  u.current = o;
  var s = In(tr), l = t || s, c = l && l._init;
  process.env.NODE_ENV !== "production" && Ee(c, "useWatch requires a form instance since it can not auto detect from context.");
  var d = fe(e), g = ke(d);
  return g.current = d, Ue(
    function() {
      if (!!c) {
        var S = l.getFieldsValue, R = l.getInternalHooks, m = R(ze), y = m.registerWatch, p = y(function(E) {
          var P = qe(E, g.current), h = vn(P);
          u.current !== h && (u.current = h, i(P));
        }), C = qe(S(), g.current);
        return i(C), p;
      }
    },
    []
  ), a;
}
var go = /* @__PURE__ */ _.forwardRef(lo), br = go;
br.FormProvider = fo;
br.Field = Zn;
br.List = ao;
br.useForm = ea;
br.useWatch = vo;
function po() {
}
var ra = po;
process.env.NODE_ENV !== "production" && (ra = function(t, r, n) {
  Ee(t, "[antd: ".concat(r, "] ").concat(n)), process.env.NODE_ENV === "test" && ii();
});
const wt = ra;
function Re(e, t) {
  ho(e) && (e = "100%");
  var r = mo(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), r && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function ho(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function mo(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function yo(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function wr(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function Kr(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function bo(e, t, r) {
  return {
    r: Re(e, 255) * 255,
    g: Re(t, 255) * 255,
    b: Re(r, 255) * 255
  };
}
function Jr(e, t, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * (6 * r) : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function Eo(e, t, r) {
  var n, a, i;
  if (e = Re(e, 360), t = Re(t, 100), r = Re(r, 100), t === 0)
    a = r, i = r, n = r;
  else {
    var o = r < 0.5 ? r * (1 + t) : r + t - r * t, u = 2 * r - o;
    n = Jr(u, o, e + 1 / 3), a = Jr(u, o, e), i = Jr(u, o, e - 1 / 3);
  }
  return { r: n * 255, g: a * 255, b: i * 255 };
}
function wo(e, t, r) {
  e = Re(e, 255), t = Re(t, 255), r = Re(r, 255);
  var n = Math.max(e, t, r), a = Math.min(e, t, r), i = 0, o = n, u = n - a, s = n === 0 ? 0 : u / n;
  if (n === a)
    i = 0;
  else {
    switch (n) {
      case e:
        i = (t - r) / u + (t < r ? 6 : 0);
        break;
      case t:
        i = (r - e) / u + 2;
        break;
      case r:
        i = (e - t) / u + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s, v: o };
}
function Fo(e, t, r) {
  e = Re(e, 360) * 6, t = Re(t, 100), r = Re(r, 100);
  var n = Math.floor(e), a = e - n, i = r * (1 - t), o = r * (1 - a * t), u = r * (1 - (1 - a) * t), s = n % 6, l = [r, o, i, i, u, r][s], c = [u, r, r, o, i, i][s], d = [i, i, u, r, r, o][s];
  return { r: l * 255, g: c * 255, b: d * 255 };
}
function Co(e, t, r, n) {
  var a = [
    Kr(Math.round(e).toString(16)),
    Kr(Math.round(t).toString(16)),
    Kr(Math.round(r).toString(16))
  ];
  return n && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
}
function gn(e) {
  return Ce(e) / 255;
}
function Ce(e) {
  return parseInt(e, 16);
}
var pn = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function ur(e) {
  var t = { r: 0, g: 0, b: 0 }, r = 1, n = null, a = null, i = null, o = !1, u = !1;
  return typeof e == "string" && (e = xo(e)), typeof e == "object" && (Me(e.r) && Me(e.g) && Me(e.b) ? (t = bo(e.r, e.g, e.b), o = !0, u = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : Me(e.h) && Me(e.s) && Me(e.v) ? (n = wr(e.s), a = wr(e.v), t = Fo(e.h, n, a), o = !0, u = "hsv") : Me(e.h) && Me(e.s) && Me(e.l) && (n = wr(e.s), i = wr(e.l), t = Eo(e.h, n, i), o = !0, u = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (r = e.a)), r = yo(r), {
    ok: o,
    format: e.format || u,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: r
  };
}
var So = "[-\\+]?\\d+%?", Po = "[-\\+]?\\d*\\.\\d+%?", We = "(?:".concat(Po, ")|(?:").concat(So, ")"), Qr = "[\\s|\\(]+(".concat(We, ")[,|\\s]+(").concat(We, ")[,|\\s]+(").concat(We, ")\\s*\\)?"), Zr = "[\\s|\\(]+(".concat(We, ")[,|\\s]+(").concat(We, ")[,|\\s]+(").concat(We, ")[,|\\s]+(").concat(We, ")\\s*\\)?"), Ae = {
  CSS_UNIT: new RegExp(We),
  rgb: new RegExp("rgb" + Qr),
  rgba: new RegExp("rgba" + Zr),
  hsl: new RegExp("hsl" + Qr),
  hsla: new RegExp("hsla" + Zr),
  hsv: new RegExp("hsv" + Qr),
  hsva: new RegExp("hsva" + Zr),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function xo(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (pn[e])
    e = pn[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var r = Ae.rgb.exec(e);
  return r ? { r: r[1], g: r[2], b: r[3] } : (r = Ae.rgba.exec(e), r ? { r: r[1], g: r[2], b: r[3], a: r[4] } : (r = Ae.hsl.exec(e), r ? { h: r[1], s: r[2], l: r[3] } : (r = Ae.hsla.exec(e), r ? { h: r[1], s: r[2], l: r[3], a: r[4] } : (r = Ae.hsv.exec(e), r ? { h: r[1], s: r[2], v: r[3] } : (r = Ae.hsva.exec(e), r ? { h: r[1], s: r[2], v: r[3], a: r[4] } : (r = Ae.hex8.exec(e), r ? {
    r: Ce(r[1]),
    g: Ce(r[2]),
    b: Ce(r[3]),
    a: gn(r[4]),
    format: t ? "name" : "hex8"
  } : (r = Ae.hex6.exec(e), r ? {
    r: Ce(r[1]),
    g: Ce(r[2]),
    b: Ce(r[3]),
    format: t ? "name" : "hex"
  } : (r = Ae.hex4.exec(e), r ? {
    r: Ce(r[1] + r[1]),
    g: Ce(r[2] + r[2]),
    b: Ce(r[3] + r[3]),
    a: gn(r[4] + r[4]),
    format: t ? "name" : "hex8"
  } : (r = Ae.hex3.exec(e), r ? {
    r: Ce(r[1] + r[1]),
    g: Ce(r[2] + r[2]),
    b: Ce(r[3] + r[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function Me(e) {
  return Boolean(Ae.CSS_UNIT.exec(String(e)));
}
var Fr = 2, hn = 0.16, Ro = 0.05, Oo = 0.05, To = 0.15, ta = 5, na = 4, _o = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function mn(e) {
  var t = e.r, r = e.g, n = e.b, a = wo(t, r, n);
  return {
    h: a.h * 360,
    s: a.s,
    v: a.v
  };
}
function Cr(e) {
  var t = e.r, r = e.g, n = e.b;
  return "#".concat(Co(t, r, n, !1));
}
function Ao(e, t, r) {
  var n = r / 100, a = {
    r: (t.r - e.r) * n + e.r,
    g: (t.g - e.g) * n + e.g,
    b: (t.b - e.b) * n + e.b
  };
  return a;
}
function yn(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - Fr * t : Math.round(e.h) + Fr * t : n = r ? Math.round(e.h) + Fr * t : Math.round(e.h) - Fr * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function bn(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - hn * t : t === na ? n = e.s + hn : n = e.s + Ro * t, n > 1 && (n = 1), r && t === ta && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Number(n.toFixed(2));
}
function En(e, t, r) {
  var n;
  return r ? n = e.v + Oo * t : n = e.v - To * t, n > 1 && (n = 1), Number(n.toFixed(2));
}
function Ft(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = ur(e), a = ta; a > 0; a -= 1) {
    var i = mn(n), o = Cr(ur({
      h: yn(i, a, !0),
      s: bn(i, a, !0),
      v: En(i, a, !0)
    }));
    r.push(o);
  }
  r.push(Cr(n));
  for (var u = 1; u <= na; u += 1) {
    var s = mn(n), l = Cr(ur({
      h: yn(s, u),
      s: bn(s, u),
      v: En(s, u)
    }));
    r.push(l);
  }
  return t.theme === "dark" ? _o.map(function(c) {
    var d = c.index, g = c.opacity, S = Cr(Ao(ur(t.backgroundColor || "#141414"), ur(r[d]), g * 100));
    return S;
  }) : r;
}
var Xr = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, et = {}, rt = {};
Object.keys(Xr).forEach(function(e) {
  et[e] = Ft(Xr[e]), et[e].primary = et[e][5], rt[e] = Ft(Xr[e], {
    theme: "dark",
    backgroundColor: "#141414"
  }), rt[e].primary = rt[e][5];
});
function jr() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var wn = "data-rc-order", No = "rc-util-key", Ct = /* @__PURE__ */ new Map();
function aa() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : No;
}
function Nt(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function ko(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function ia(e) {
  return Array.from((Ct.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function Fn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!jr())
    return null;
  var r = t.csp, n = t.prepend, a = document.createElement("style");
  a.setAttribute(wn, ko(n)), r != null && r.nonce && (a.nonce = r == null ? void 0 : r.nonce), a.innerHTML = e;
  var i = Nt(t), o = i.firstChild;
  if (n) {
    if (n === "queue") {
      var u = ia(i).filter(function(s) {
        return ["prepend", "prependQueue"].includes(s.getAttribute(wn));
      });
      if (u.length)
        return i.insertBefore(a, u[u.length - 1].nextSibling), a;
    }
    i.insertBefore(a, o);
  } else
    i.appendChild(a);
  return a;
}
function Vo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Nt(t);
  return ia(r).find(function(n) {
    return n.getAttribute(aa(t)) === e;
  });
}
function oa(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Nt(r);
  if (!Ct.has(n)) {
    var a = Fn("", r), i = a.parentNode;
    Ct.set(n, i), i.removeChild(a);
  }
  var o = Vo(t, r);
  if (o) {
    var u, s;
    if (((u = r.csp) === null || u === void 0 ? void 0 : u.nonce) && o.nonce !== ((s = r.csp) === null || s === void 0 ? void 0 : s.nonce)) {
      var l;
      o.nonce = (l = r.csp) === null || l === void 0 ? void 0 : l.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var c = Fn(e, r);
  return c.setAttribute(aa(r), t), c;
}
function $o(e, t) {
  Ee(e, "[@ant-design/icons] ".concat(t));
}
function Cn(e) {
  return pe(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (pe(e.icon) === "object" || typeof e.icon == "function");
}
function Sn() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        t[r] = n;
    }
    return t;
  }, {});
}
function St(e, t, r) {
  return r ? /* @__PURE__ */ dr.createElement(e.tag, V(V({
    key: t
  }, Sn(e.attrs)), r), (e.children || []).map(function(n, a) {
    return St(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ dr.createElement(e.tag, V({
    key: t
  }, Sn(e.attrs)), (e.children || []).map(function(n, a) {
    return St(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function ua(e) {
  return Ft(e)[0];
}
function sa(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var Mo = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, Io = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Mo, r = In(qn), n = r.csp;
  Ue(function() {
    oa(t, "@ant-design-icons", {
      prepend: !0,
      csp: n
    });
  }, []);
}, jo = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], lr = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Lo(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  lr.primaryColor = t, lr.secondaryColor = r || ua(t), lr.calculated = !!r;
}
function Do() {
  return V({}, lr);
}
var Lr = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, u = t.secondaryColor, s = mr(t, jo), l = lr;
  if (o && (l = {
    primaryColor: o,
    secondaryColor: u || ua(o)
  }), Io(), $o(Cn(r), "icon should be icon definiton, but got ".concat(r)), !Cn(r))
    return null;
  var c = r;
  return c && typeof c.icon == "function" && (c = V(V({}, c), {}, {
    icon: c.icon(l.primaryColor, l.secondaryColor)
  })), St(c.icon, "svg-".concat(c.name), V({
    className: n,
    onClick: a,
    style: i,
    "data-icon": c.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, s));
};
Lr.displayName = "IconReact";
Lr.getTwoToneColors = Do;
Lr.setTwoToneColors = Lo;
const kt = Lr;
function fa(e) {
  var t = sa(e), r = ge(t, 2), n = r[0], a = r[1];
  return kt.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function qo() {
  var e = kt.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Wo = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
fa("#1890ff");
var Dr = /* @__PURE__ */ _.forwardRef(function(e, t) {
  var r, n = e.className, a = e.icon, i = e.spin, o = e.rotate, u = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = mr(e, Wo), d = _.useContext(qn), g = d.prefixCls, S = g === void 0 ? "anticon" : g, R = $r(S, (r = {}, G(r, "".concat(S, "-").concat(a.name), !!a.name), G(r, "".concat(S, "-spin"), !!i || a.name === "loading"), r), n), m = u;
  m === void 0 && s && (m = -1);
  var y = o ? {
    msTransform: "rotate(".concat(o, "deg)"),
    transform: "rotate(".concat(o, "deg)")
  } : void 0, p = sa(l), C = ge(p, 2), E = C[0], P = C[1];
  return /* @__PURE__ */ H("span", {
    ...V(V({
      role: "img",
      "aria-label": a.name
    }, c), {}, {
      ref: t,
      tabIndex: m,
      onClick: s,
      className: R
    }),
    children: /* @__PURE__ */ H(kt, {
      icon: a,
      primaryColor: E,
      secondaryColor: P,
      style: y
    })
  });
});
Dr.displayName = "AntdIcon";
Dr.getTwoToneColor = qo;
Dr.setTwoToneColor = fa;
const ca = Dr;
var Uo = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
const Bo = Uo;
var la = function(t, r) {
  return /* @__PURE__ */ H(ca, {
    ...V(V({}, t), {}, {
      ref: r,
      icon: Bo
    })
  });
};
la.displayName = "LoadingOutlined";
const Pn = /* @__PURE__ */ _.forwardRef(la);
function xn(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function zo(e, t) {
  var r = {
    animationend: xn("Animation", "AnimationEnd"),
    transitionend: xn("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var Ho = zo(jr(), typeof window < "u" ? window : {}), da = {};
if (jr()) {
  var Yo = document.createElement("div");
  da = Yo.style;
}
var Sr = {};
function va(e) {
  if (Sr[e])
    return Sr[e];
  var t = Ho[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var i = r[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in da)
        return Sr[e] = t[i], Sr[e];
    }
  return "";
}
var ga = va("animationend"), pa = va("transitionend"), Go = !!(ga && pa), Rn = ga || "animationend", On = pa || "transitionend";
function Tn(e, t) {
  if (!e)
    return null;
  if (pe(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
var Ze = "none", Pr = "appear", xr = "enter", Rr = "leave", _n = "none", Ie = "prepare", Xe = "start", er = "active", Vt = "end";
function Ar(e) {
  var t = _.useRef(!1), r = _.useState(e), n = ge(r, 2), a = n[0], i = n[1];
  _.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(u, s) {
    s && t.current || i(u);
  }
  return [a, o];
}
var ha = function(t) {
  return +setTimeout(t, 16);
}, ma = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (ha = function(t) {
  return window.requestAnimationFrame(t);
}, ma = function(t) {
  return window.cancelAnimationFrame(t);
});
var An = 0, $t = /* @__PURE__ */ new Map();
function ya(e) {
  $t.delete(e);
}
function nr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  An += 1;
  var r = An;
  function n(a) {
    if (a === 0)
      ya(r), e();
    else {
      var i = ha(function() {
        n(a - 1);
      });
      $t.set(r, i);
    }
  }
  return n(t), r;
}
nr.cancel = function(e) {
  var t = $t.get(e);
  return ya(t), ma(t);
};
const Ko = function() {
  var e = _.useRef(null);
  function t() {
    nr.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = nr(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return i !== e.current;
        }
      }) : r(n, a - 1);
    });
    e.current = i;
  }
  return _.useEffect(function() {
    return function() {
      t();
    };
  }, []), [r, t];
};
var ba = jr() ? za : Ue, Nn = [Ie, Xe, er, Vt], Ea = !1, Jo = !0;
function wa(e) {
  return e === er || e === Vt;
}
const Qo = function(e, t) {
  var r = Ar(_n), n = ge(r, 2), a = n[0], i = n[1], o = Ko(), u = ge(o, 2), s = u[0], l = u[1];
  function c() {
    i(Ie, !0);
  }
  return ba(function() {
    if (a !== _n && a !== Vt) {
      var d = Nn.indexOf(a), g = Nn[d + 1], S = t(a);
      S === Ea ? i(g, !0) : s(function(R) {
        function m() {
          R.isCanceled() || i(g, !0);
        }
        S === !0 ? m() : Promise.resolve(S).then(m);
      });
    }
  }, [e, a]), _.useEffect(function() {
    return function() {
      l();
    };
  }, []), [c, a];
}, Zo = function(e) {
  var t = ke(), r = ke(e);
  r.current = e;
  var n = _.useCallback(function(o) {
    r.current(o);
  }, []);
  function a(o) {
    o && (o.removeEventListener(On, n), o.removeEventListener(Rn, n));
  }
  function i(o) {
    t.current && t.current !== o && a(t.current), o && o !== t.current && (o.addEventListener(On, n), o.addEventListener(Rn, n), t.current = o);
  }
  return _.useEffect(function() {
    return function() {
      a(t.current);
    };
  }, []), [i, a];
};
function Xo(e, t, r, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, u = o === void 0 ? !0 : o, s = n.motionLeave, l = s === void 0 ? !0 : s, c = n.motionDeadline, d = n.motionLeaveImmediately, g = n.onAppearPrepare, S = n.onEnterPrepare, R = n.onLeavePrepare, m = n.onAppearStart, y = n.onEnterStart, p = n.onLeaveStart, C = n.onAppearActive, E = n.onEnterActive, P = n.onLeaveActive, h = n.onAppearEnd, N = n.onEnterEnd, M = n.onLeaveEnd, $ = n.onVisibleChanged, I = Ar(), b = ge(I, 2), v = b[0], F = b[1], x = Ar(Ze), O = ge(x, 2), A = O[0], D = O[1], Z = Ar(null), ee = ge(Z, 2), L = ee[0], z = ee[1], te = ke(!1), re = ke(null);
  function oe() {
    return r();
  }
  var ce = ke(!1);
  function le(ae) {
    var ie = oe();
    if (!(ae && !ae.deadline && ae.target !== ie)) {
      var ue = ce.current, ye;
      A === Pr && ue ? ye = h == null ? void 0 : h(ie, ae) : A === xr && ue ? ye = N == null ? void 0 : N(ie, ae) : A === Rr && ue && (ye = M == null ? void 0 : M(ie, ae)), A !== Ze && ue && ye !== !1 && (D(Ze, !0), z(null, !0));
    }
  }
  var Ve = Zo(le), we = ge(Ve, 1), Oe = we[0], ne = _.useMemo(function() {
    var ae, ie, ue;
    switch (A) {
      case Pr:
        return ae = {}, G(ae, Ie, g), G(ae, Xe, m), G(ae, er, C), ae;
      case xr:
        return ie = {}, G(ie, Ie, S), G(ie, Xe, y), G(ie, er, E), ie;
      case Rr:
        return ue = {}, G(ue, Ie, R), G(ue, Xe, p), G(ue, er, P), ue;
      default:
        return {};
    }
  }, [A]), Te = Qo(A, function(ae) {
    if (ae === Ie) {
      var ie = ne[Ie];
      return ie ? ie(oe()) : Ea;
    }
    if (he in ne) {
      var ue;
      z(((ue = ne[he]) === null || ue === void 0 ? void 0 : ue.call(ne, oe(), null)) || null);
    }
    return he === er && (Oe(oe()), c > 0 && (clearTimeout(re.current), re.current = setTimeout(function() {
      le({
        deadline: !0
      });
    }, c))), Jo;
  }), Le = ge(Te, 2), k = Le[0], he = Le[1], Ne = wa(he);
  ce.current = Ne, ba(function() {
    F(t);
    var ae = te.current;
    if (te.current = !0, !!e) {
      var ie;
      !ae && t && u && (ie = Pr), ae && t && i && (ie = xr), (ae && !t && l || !ae && d && !t && l) && (ie = Rr), ie && (D(ie), k());
    }
  }, [t]), Ue(function() {
    (A === Pr && !u || A === xr && !i || A === Rr && !l) && D(Ze);
  }, [u, i, l]), Ue(function() {
    return function() {
      te.current = !1, clearTimeout(re.current);
    };
  }, []);
  var me = _.useRef(!1);
  Ue(function() {
    v && (me.current = !0), v !== void 0 && A === Ze && ((me.current || v) && ($ == null || $(v)), me.current = !0);
  }, [v, A]);
  var _e = L;
  return ne[Ie] && he === Xe && (_e = V({
    transition: "none"
  }, _e)), [A, he, _e, v != null ? v : t];
}
var eu = /* @__PURE__ */ function(e) {
  xt(r, e);
  var t = Ot(r);
  function r() {
    return pr(this, r), t.apply(this, arguments);
  }
  return hr(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(_.Component);
function ru(e) {
  var t = e;
  pe(e) === "object" && (t = e.transitionSupport);
  function r(a) {
    return !!(a.motionName && t);
  }
  var n = /* @__PURE__ */ _.forwardRef(function(a, i) {
    var o = a.visible, u = o === void 0 ? !0 : o, s = a.removeOnLeave, l = s === void 0 ? !0 : s, c = a.forceRender, d = a.children, g = a.motionName, S = a.leavedClassName, R = a.eventProps, m = r(a), y = ke(), p = ke();
    function C() {
      try {
        return y.current instanceof HTMLElement ? y.current : si(p.current);
      } catch {
        return null;
      }
    }
    var E = Xo(m, u, C, a), P = ge(E, 4), h = P[0], N = P[1], M = P[2], $ = P[3], I = _.useRef($);
    $ && (I.current = !0);
    var b = _.useCallback(function(Z) {
      y.current = Z, Ln(i, Z);
    }, [i]), v, F = V(V({}, R), {}, {
      visible: u
    });
    if (!d)
      v = null;
    else if (h === Ze || !r(a))
      $ ? v = d(V({}, F), b) : !l && I.current ? v = d(V(V({}, F), {}, {
        className: S
      }), b) : c ? v = d(V(V({}, F), {}, {
        style: {
          display: "none"
        }
      }), b) : v = null;
    else {
      var x, O;
      N === Ie ? O = "prepare" : wa(N) ? O = "active" : N === Xe && (O = "start"), v = d(V(V({}, F), {}, {
        className: $r(Tn(g, h), (x = {}, G(x, Tn(g, "".concat(h, "-").concat(O)), O), G(x, g, typeof g == "string"), x)),
        style: M
      }), b);
    }
    if (/* @__PURE__ */ _.isValidElement(v) && Dn(v)) {
      var A = v, D = A.ref;
      D || (v = /* @__PURE__ */ _.cloneElement(v, {
        ref: b
      }));
    }
    return /* @__PURE__ */ H(eu, {
      ref: p,
      children: v
    });
  });
  return n.displayName = "CSSMotion", n;
}
const tu = ru(Go);
var nu = function(t, r) {
  return r || (t ? "ant-".concat(t) : "ant");
}, qr = /* @__PURE__ */ _.createContext({
  getPrefixCls: nu
}), au = qr.Consumer, iu = /* @__PURE__ */ _.createContext(!1);
const ou = iu;
var uu = /* @__PURE__ */ _.createContext(void 0);
const su = uu;
var fu = _.isValidElement;
function cu(e, t, r) {
  return fu(e) ? /* @__PURE__ */ _.cloneElement(e, typeof r == "function" ? r(e.props || {}) : r) : t;
}
function Fa(e, t) {
  return cu(e, e, t);
}
var Mt = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return r;
}, lu = 0, rr = {};
function kr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, r = lu++, n = t;
  function a() {
    n -= 1, n <= 0 ? (e(), delete rr[r]) : rr[r] = nr(a);
  }
  return rr[r] = nr(a), r;
}
kr.cancel = function(t) {
  t !== void 0 && (nr.cancel(rr[t]), delete rr[t]);
};
kr.ids = rr;
var tt;
function kn(e) {
  return process.env.NODE_ENV === "test" ? !1 : !e || e.offsetParent === null || e.hidden;
}
function du(e) {
  var t = (e || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0;
}
var Ca = /* @__PURE__ */ function(e) {
  xt(r, e);
  var t = Ot(r);
  function r() {
    var n;
    return pr(this, r), n = t.apply(this, arguments), n.containerRef = /* @__PURE__ */ _.createRef(), n.animationStart = !1, n.destroyed = !1, n.onClick = function(a, i) {
      var o, u, s = n.props, l = s.insertExtraNode, c = s.disabled;
      if (!(c || !a || kn(a) || a.className.indexOf("-leave") >= 0)) {
        n.extraNode = document.createElement("div");
        var d = Rt(n), g = d.extraNode, S = n.context.getPrefixCls;
        g.className = "".concat(S(""), "-click-animating-node");
        var R = n.getAttributeName();
        if (a.setAttribute(R, "true"), i && i !== "#ffffff" && i !== "rgb(255, 255, 255)" && du(i) && !/rgba\((?:\d*, ){3}0\)/.test(i) && i !== "transparent") {
          g.style.borderColor = i;
          var m = ((o = a.getRootNode) === null || o === void 0 ? void 0 : o.call(a)) || a.ownerDocument, y = m instanceof Document ? m.body : (u = m.firstChild) !== null && u !== void 0 ? u : m;
          tt = oa(`
      [`.concat(S(""), "-click-animating-without-extra-node='true']::after, .").concat(S(""), `-click-animating-node {
        --antd-wave-shadow-color: `).concat(i, `;
      }`), "antd-wave", {
            csp: n.csp,
            attachTo: y
          });
        }
        l && a.appendChild(g), ["transition", "animation"].forEach(function(p) {
          a.addEventListener("".concat(p, "start"), n.onTransitionStart), a.addEventListener("".concat(p, "end"), n.onTransitionEnd);
        });
      }
    }, n.onTransitionStart = function(a) {
      if (!n.destroyed) {
        var i = n.containerRef.current;
        !a || a.target !== i || n.animationStart || n.resetEffect(i);
      }
    }, n.onTransitionEnd = function(a) {
      !a || a.animationName !== "fadeEffect" || n.resetEffect(a.target);
    }, n.bindAnimationEvent = function(a) {
      if (!(!a || !a.getAttribute || a.getAttribute("disabled") || a.className.indexOf("disabled") >= 0)) {
        var i = function(u) {
          if (!(u.target.tagName === "INPUT" || kn(u.target))) {
            n.resetEffect(a);
            var s = getComputedStyle(a).getPropertyValue("border-top-color") || getComputedStyle(a).getPropertyValue("border-color") || getComputedStyle(a).getPropertyValue("background-color");
            n.clickWaveTimeoutId = window.setTimeout(function() {
              return n.onClick(a, s);
            }, 0), kr.cancel(n.animationStartId), n.animationStart = !0, n.animationStartId = kr(function() {
              n.animationStart = !1;
            }, 10);
          }
        };
        return a.addEventListener("click", i, !0), {
          cancel: function() {
            a.removeEventListener("click", i, !0);
          }
        };
      }
    }, n.renderWave = function(a) {
      var i = a.csp, o = n.props.children;
      if (n.csp = i, !/* @__PURE__ */ _.isValidElement(o))
        return o;
      var u = n.containerRef;
      return Dn(o) && (u = ui(o.ref, n.containerRef)), Fa(o, {
        ref: u
      });
    }, n;
  }
  return hr(r, [{
    key: "componentDidMount",
    value: function() {
      this.destroyed = !1;
      var a = this.containerRef.current;
      !a || a.nodeType !== 1 || (this.instance = this.bindAnimationEvent(a));
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.instance && this.instance.cancel(), this.clickWaveTimeoutId && clearTimeout(this.clickWaveTimeoutId), this.destroyed = !0;
    }
  }, {
    key: "getAttributeName",
    value: function() {
      var a = this.context.getPrefixCls, i = this.props.insertExtraNode;
      return i ? "".concat(a(""), "-click-animating") : "".concat(a(""), "-click-animating-without-extra-node");
    }
  }, {
    key: "resetEffect",
    value: function(a) {
      var i = this;
      if (!(!a || a === this.extraNode || !(a instanceof Element))) {
        var o = this.props.insertExtraNode, u = this.getAttributeName();
        a.setAttribute(u, "false"), tt && (tt.innerHTML = ""), o && this.extraNode && a.contains(this.extraNode) && a.removeChild(this.extraNode), ["transition", "animation"].forEach(function(s) {
          a.removeEventListener("".concat(s, "start"), i.onTransitionStart), a.removeEventListener("".concat(s, "end"), i.onTransitionEnd);
        });
      }
    }
  }, {
    key: "render",
    value: function() {
      return /* @__PURE__ */ H(au, {
        children: this.renderWave
      });
    }
  }]), r;
}(_.Component);
Ca.contextType = qr;
var vu = /* @__PURE__ */ Ha(function(e, t) {
  return /* @__PURE__ */ H(Ca, {
    ref: t,
    ...e
  });
});
const gu = vu;
var pu = globalThis && globalThis.__rest || function(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
}, Sa = /* @__PURE__ */ _.createContext(void 0), hu = function(t) {
  var r, n = _.useContext(qr), a = n.getPrefixCls, i = n.direction, o = t.prefixCls, u = t.size, s = t.className, l = pu(t, ["prefixCls", "size", "className"]), c = a("btn-group", o), d = "";
  switch (u) {
    case "large":
      d = "lg";
      break;
    case "small":
      d = "sm";
      break;
    case "middle":
    case void 0:
      break;
    default:
      process.env.NODE_ENV !== "production" && wt(!u, "Button.Group", "Invalid prop `size`.");
  }
  var g = $r(c, (r = {}, G(r, "".concat(c, "-").concat(d), d), G(r, "".concat(c, "-rtl"), i === "rtl"), r), s);
  return /* @__PURE__ */ H(Sa.Provider, {
    value: u,
    children: /* @__PURE__ */ H("div", {
      ...l,
      className: g
    })
  });
};
const mu = hu;
var nt = function() {
  return {
    width: 0,
    opacity: 0,
    transform: "scale(0)"
  };
}, at = function(t) {
  return {
    width: t.scrollWidth,
    opacity: 1,
    transform: "scale(1)"
  };
}, yu = function(t) {
  var r = t.prefixCls, n = t.loading, a = t.existIcon, i = !!n;
  return a ? /* @__PURE__ */ H("span", {
    className: "".concat(r, "-loading-icon"),
    children: /* @__PURE__ */ H(Pn, {})
  }) : /* @__PURE__ */ H(tu, {
    visible: i,
    motionName: "".concat(r, "-loading-icon-motion"),
    removeOnLeave: !0,
    onAppearStart: nt,
    onAppearActive: at,
    onEnterStart: nt,
    onEnterActive: at,
    onLeaveStart: at,
    onLeaveActive: nt,
    children: function(o, u) {
      var s = o.className, l = o.style;
      return /* @__PURE__ */ H("span", {
        className: "".concat(r, "-loading-icon"),
        style: l,
        ref: u,
        children: /* @__PURE__ */ H(Pn, {
          className: s
        })
      });
    }
  });
};
const bu = yu;
var Eu = globalThis && globalThis.__rest || function(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
}, Vn = /^[\u4e00-\u9fa5]{2}$/, Pt = Vn.test.bind(Vn);
function wu(e) {
  return typeof e == "string";
}
function Or(e) {
  return e === "text" || e === "link";
}
function Fu(e) {
  return /* @__PURE__ */ _.isValidElement(e) && e.type === _.Fragment;
}
function Cu(e, t) {
  if (e != null) {
    var r = t ? " " : "";
    return typeof e != "string" && typeof e != "number" && wu(e.type) && Pt(e.props.children) ? Fa(e, {
      children: e.props.children.split("").join(r)
    }) : typeof e == "string" ? Pt(e) ? /* @__PURE__ */ H("span", {
      children: e.split("").join(r)
    }) : /* @__PURE__ */ H("span", {
      children: e
    }) : Fu(e) ? /* @__PURE__ */ H("span", {
      children: e
    }) : e;
  }
}
function Su(e, t) {
  var r = !1, n = [];
  return _.Children.forEach(e, function(a) {
    var i = pe(a), o = i === "string" || i === "number";
    if (r && o) {
      var u = n.length - 1, s = n[u];
      n[u] = "".concat(s).concat(a);
    } else
      n.push(a);
    r = o;
  }), _.Children.map(n, function(a) {
    return Cu(a, t);
  });
}
Mt("default", "primary", "ghost", "dashed", "link", "text");
Mt("default", "circle", "round");
Mt("submit", "button", "reset");
var Pu = function(t, r) {
  var n, a = t.loading, i = a === void 0 ? !1 : a, o = t.prefixCls, u = t.type, s = u === void 0 ? "default" : u, l = t.danger, c = t.shape, d = c === void 0 ? "default" : c, g = t.size, S = t.disabled, R = t.className, m = t.children, y = t.icon, p = t.ghost, C = p === void 0 ? !1 : p, E = t.block, P = E === void 0 ? !1 : E, h = t.htmlType, N = h === void 0 ? "button" : h, M = Eu(t, ["loading", "prefixCls", "type", "danger", "shape", "size", "disabled", "className", "children", "icon", "ghost", "block", "htmlType"]), $ = _.useContext(su), I = _.useContext(ou), b = S || I, v = _.useContext(Sa), F = _.useState(!!i), x = ge(F, 2), O = x[0], A = x[1], D = _.useState(!1), Z = ge(D, 2), ee = Z[0], L = Z[1], z = _.useContext(qr), te = z.getPrefixCls, re = z.autoInsertSpaceInButton, oe = z.direction, ce = r || /* @__PURE__ */ _.createRef(), le = function() {
    return _.Children.count(m) === 1 && !y && !Or(s);
  }, Ve = function() {
    if (!(!ce || !ce.current || re === !1)) {
      var Ye = ce.current.textContent;
      le() && Pt(Ye) ? ee || L(!0) : ee && L(!1);
    }
  }, we = typeof i == "boolean" ? i : (i == null ? void 0 : i.delay) || !0;
  _.useEffect(function() {
    var ye = null;
    return typeof we == "number" ? ye = window.setTimeout(function() {
      ye = null, A(we);
    }, we) : A(we), function() {
      ye && (window.clearTimeout(ye), ye = null);
    };
  }, [we]), _.useEffect(Ve, [ce]);
  var Oe = function(Ye) {
    var Be = t.onClick;
    if (O || b) {
      Ye.preventDefault();
      return;
    }
    Be == null || Be(Ye);
  };
  process.env.NODE_ENV !== "production" && wt(!(typeof y == "string" && y.length > 2), "Button", "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(y, "` at https://ant.design/components/icon")), process.env.NODE_ENV !== "production" && wt(!(C && Or(s)), "Button", "`link` or `text` button can't be a `ghost` button.");
  var ne = te("btn", o), Te = re !== !1, Le = {
    large: "lg",
    small: "sm",
    middle: void 0
  }, k = v || g || $, he = k && Le[k] || "", Ne = O ? "loading" : y, me = fi(M, ["navigate"]), _e = $r(ne, (n = {}, G(n, "".concat(ne, "-").concat(d), d !== "default" && d), G(n, "".concat(ne, "-").concat(s), s), G(n, "".concat(ne, "-").concat(he), he), G(n, "".concat(ne, "-icon-only"), !m && m !== 0 && !!Ne), G(n, "".concat(ne, "-background-ghost"), C && !Or(s)), G(n, "".concat(ne, "-loading"), O), G(n, "".concat(ne, "-two-chinese-chars"), ee && Te && !O), G(n, "".concat(ne, "-block"), P), G(n, "".concat(ne, "-dangerous"), !!l), G(n, "".concat(ne, "-rtl"), oe === "rtl"), G(n, "".concat(ne, "-disabled"), me.href !== void 0 && b), n), R), ae = y && !O ? y : /* @__PURE__ */ H(bu, {
    existIcon: !!y,
    prefixCls: ne,
    loading: !!O
  }), ie = m || m === 0 ? Su(m, le() && Te) : null;
  if (me.href !== void 0)
    return /* @__PURE__ */ it("a", {
      ...me,
      className: _e,
      onClick: Oe,
      ref: ce,
      children: [ae, ie]
    });
  var ue = /* @__PURE__ */ it("button", {
    ...M,
    type: N,
    className: _e,
    onClick: Oe,
    disabled: b,
    ref: ce,
    children: [ae, ie]
  });
  return Or(s) ? ue : /* @__PURE__ */ H(gu, {
    disabled: !!O,
    children: ue
  });
}, Wr = /* @__PURE__ */ _.forwardRef(Pu);
process.env.NODE_ENV !== "production" && (Wr.displayName = "Button");
Wr.Group = mu;
Wr.__ANT_BUTTON = !0;
const xu = Wr;
var Ru = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" } }] }, name: "copy", theme: "outlined" };
const Ou = Ru;
var Pa = function(t, r) {
  return /* @__PURE__ */ H(ca, {
    ...V(V({}, t), {}, {
      ref: r,
      icon: Ou
    })
  });
};
Pa.displayName = "CopyOutlined";
const Tu = /* @__PURE__ */ _.forwardRef(Pa);
var It = /* @__PURE__ */ ((e) => (e.grey4000 = "#1F1F1F", e.grey3000 = "#191F21", e.grey2000 = "#081A20", e.grey1000 = "#141414", e.grey900 = "#3A4344", e.grey800 = "#7B8185", e.grey700 = "#93989C", e.grey500 = "#C5C8CB", e.grey400 = "#DBE0DE", e.grey200 = "#F3F5F4", e.grey100 = "#F9FAFA", e.grey11 = "#101314", e.grey10 = "#191F21", e.grey9 = "#DBDBDB", e.grey8 = "#ACACAC", e.grey7 = "#7D7D7D", e.grey6 = "#5A5A5A", e.grey5b = "#434343", e.greyXY = "#31393c80", e.grey4 = "#303030", e.grey3b = "#293235", e.grey3 = "#262626", e.grey1 = "#141414", e.coldGrey = "#31393C", e.warmGrey = "#222222", e.greenOkay = "#09b89d", e.polarGreen = "#6ABE39", e.greenOkayCompliment = "#B2DFD3", e.okayBg = "#6ABE3933", e.yellowWarning = "#ffe17f", e.yellowWarningCompliment = "#FFF3CA", e.yellow5 = "#F3CC62", e.yellow6 = "#D8BD14", e.yellow7 = "#E8D639", e.yellow8 = "#F3EA62", e.yellow10 = "#FAFAB5", e.yellow11 = "#C9E75D", e.volcano7 = "#E87040", e.volcano8 = "#F3956A", e.magenta7 = "#E0529C", e.magenta8 = "#F37FB7", e.redError = "#e65a6d", e.redErrorCompliment = "#F4BAB8", e.red6 = "#D32029", e.red7 = "#E84749", e.errorBg = "#E84749", e.whitePure = "#ffffff", e.blackPure = "#000000", e.blackPearl = "#111d2c", e.black9 = "#0C0D0E", e.lime8 = "#C9E75D", e.purple8 = "#AB7AE0", e.cyan = "#58D1C9", e.cyan7 = "#33BCB7", e.cyan5 = "#138585", e.lightSeaGreen = "#13a8a8", e.blue6 = "#1890FF", e.blue7 = "#177DDC", e.blue9 = "#8DCFF8", e.blue10 = "#B7E3FA", e.geekblue4 = "#203175", e.green5 = "#3c8618", e.green6 = "#49AA19", e.green7 = "#6ABE39", e.green8 = "#8fd460", e.green9 = "#b2e58b", e.green10 = "#3E4F13", e.highlightGreen = "#33BCB7", e.selectionGradient = "linear-gradient(90deg, #3C9AE8 0%, #84E2D8 100%)", e.selectionGradientHover = "linear-gradient(90deg, #3C9AE8 50%, #84E2D8 100%)", e.highlightGradient = "linear-gradient(90deg, #113536 0%, #000000 100%)", e.highlightGradientHover = "linear-gradient(90deg, #113536 50%, #000000 100%)", e.diffBackground = "#2B2611", e.diffBackgroundHover = "#27220f", e))(It || {});
function ju({
  content: e
}) {
  const [t, r] = $n(!1);
  Ja(() => {
    r(!1);
  }, t ? 1500 : null);
  const n = Ya((a) => {
    a.stopPropagation(), navigator.clipboard.writeText(e), r(!0);
  }, [r, e]);
  return /* @__PURE__ */ it(_u, {
    children: [/* @__PURE__ */ H(Au, {
      type: "link",
      icon: /* @__PURE__ */ H(Tu, {}),
      onClick: (a) => n(a)
    }), t && /* @__PURE__ */ H(Nu, {
      children: "copied!"
    })]
  });
}
const _u = gr.div`
  display: flex;
  align-items: center;
`, Au = gr(xu)`
  display: flex;
  align-items: center;
  height: 22px;
`, Nu = gr.span`
  font-size: 10px;
  margin-left: -8px;
  color: ${It.greenOkay};
`, ku = gr.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(e) => e.$color};
`, Vu = gr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  height: inherit;
`, Lu = (e) => {
  const {
    color: t = It.blue6,
    dotNumber: r = 3
  } = e, n = Mn(() => Array.from({
    length: r
  }).map((a, i) => {
    const o = `dot_${i}`;
    return /* @__PURE__ */ H(ku, {
      $color: t
    }, o);
  }), [t, r]);
  return /* @__PURE__ */ H(Vu, {
    children: n
  });
};
export {
  ju as CopyButton,
  Lu as Dots
};
//# sourceMappingURL=lib.es.js.map
