// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"events.js":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.addEventListener("DOMContentLoaded", function () {
  var panelInbox = document.querySelector(".panel-inbox");
  var panelOpciones = document.getElementById("opciones");
  var enCategorias = true;
  var btnAtras = document.getElementById("btn-atras");
  var panelEntrada = document.querySelector(".panel-entrada");
  window.enviar = function () {
    var val = document.getElementById("msj").value.trim();
    if (val.toLowerCase() == "opciones") {
      agregarMensajeUsuario(val);
      simularRespuestaBot(val);
    } else {
      agregarMensajeUsuario(val);
      simularRespuestaBot(val);
    }
    document.getElementById("msj").value = "";
    scrollToBottom();
  };
  window.seleccionarCategoria = function (categoria) {
    enCategorias = false;
    agregarMensajeUsuario(categoria);
    cargarPreguntas(categoria);
    btnAtras.style.display = "flex";
    scrollToBottom();
  };
  window.seleccionarOpcion = function (opcion) {
    agregarMensajeUsuario(opcion);
    simularRespuestaBot(opcion);
  };
  window.cerrarBot = function () {
    panelEntrada.style.display = "none";
    panelOpciones.style.display = "none";
    var msj = "Cerrar";
    agregarMensajeUsuario(msj);
    simularRespuestaBot(msj);
    scrollToBottom();
  };
  window.iniciarConversacion = function () {
    var msj = "Iniciar";
    document.getElementById("msj").value = "";
    panelInbox.innerHTML = "";
    panelOpciones.innerHTML = "";
    agregarMensajeUsuario(msj);
    simularRespuestaBot(msj);
    panelEntrada.style.display = "flex";
    panelOpciones.style.display = "grid";
    enCategorias = true;
    scrollToBottom();
  };
  function cargarCategorias() {
    panelOpciones.innerHTML = "";
    panelOpciones.style.display = "grid";
    fetch("dataset/cargarCategorias.php").then(function (response) {
      return response.text();
    }).then(function (html) {
      panelOpciones.innerHTML = html;
    }).catch(function (error) {
      console.error("Error al cargar las categorías:", error);
    });
  }
  function agregarMensajeUsuario(mensaje) {
    var msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-chat", "user-message");
    var p = document.createElement("p");
    p.textContent = mensaje;
    msgDiv.appendChild(p);
    panelInbox.appendChild(msgDiv);
    panelInbox.scrollTop = panelInbox.scrollHeight;
  }
  function cargarPreguntas(categoria) {
    fetch("dataset/consulta.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "categoria=".concat(encodeURIComponent(categoria))
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      panelOpciones.innerHTML = "";
      data.preguntas.forEach(function (pregunta) {
        var btn = document.createElement("button");
        btn.classList.add("opcion");
        btn.textContent = pregunta;
        btn.onclick = function () {
          return seleccionarOpcion(pregunta);
        };
        panelOpciones.appendChild(btn);
      });
    }).catch(function (error) {
      console.error("Error:", error);
    });
  }
  var valida = false;
  function simularRespuestaBot(_x) {
    return _simularRespuestaBot.apply(this, arguments);
  }
  function _simularRespuestaBot() {
    _simularRespuestaBot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(opcion) {
      var loadingDiv;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            loadingDiv = document.createElement("div");
            loadingDiv.classList.add("msg-chat", "bot-typing");
            loadingDiv.innerHTML = "<p>Escribiendo...</p>";
            panelInbox.appendChild(loadingDiv);
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var intencion, response;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!(opcion.toLowerCase() === "opciones")) {
                      _context.next = 8;
                      break;
                    }
                    loadingDiv.remove();
                    panelOpciones.style.display = "none";
                    mostrarRespuestaBot(" Claro, aquí te muestro el panel de opciones, elige una para iniciar! 🤩");
                    cargarCategorias();
                    valida = true;
                    _context.next = 21;
                    break;
                  case 8:
                    panelOpciones.innerHTML = "";
                    panelOpciones.style.display = "none";
                    btnAtras.style.display = "none";
                    if (valida) {
                      _context.next = 20;
                      break;
                    }
                    _context.next = 14;
                    return predecirIntencion(opcion);
                  case 14:
                    intencion = _context.sent;
                    _context.next = 17;
                    return fetch("procesarIntencion.php", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      body: "intencion=".concat(intencion, "&userInput=").concat(encodeURIComponent(opcion))
                    }).then(function (res) {
                      return res.json();
                    });
                  case 17:
                    response = _context.sent;
                    loadingDiv.remove();
                    mostrarRespuestaBot(response.respuesta); // Mostrar la respuesta del backend
                  case 20:
                    if (valida) {
                      fetch("dataset/consulta.php", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "opcion=".concat(encodeURIComponent(opcion))
                      }).then(function (response) {
                        return response.json();
                      }).then(function (data) {
                        loadingDiv.remove();
                        mostrarRespuestaBot(data.respuesta);
                      });
                      valida = false;
                    }
                  case 21:
                    scrollToBottom();
                  case 22:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })), 2000);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _simularRespuestaBot.apply(this, arguments);
  }
  function mostrarRespuestaBot(respuesta) {
    var msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-chat", "bot-message");
    var p = document.createElement("p");
    p.textContent = respuesta;
    msgDiv.appendChild(p);
    panelInbox.appendChild(msgDiv);
    panelInbox.scrollTop = panelInbox.scrollHeight;
  }
  window.mostrarCategorias = function () {
    document.getElementById("msj").value = "";
    panelOpciones.innerHTML = "";
    btnAtras.style.display = "none";
    cargarCategorias();
    enCategorias = true;
    scrollToBottom();
  };
  function scrollToBottom() {
    var panelText = document.getElementById("panel-text");
    panelText.scrollTop = panelText.scrollHeight;
  }
  var preguntasList = document.querySelector(".preguntas-list");
  var preguntas = [];
  var preguntasPorPagina = 4;
  var currentIndex = 0;
  var cargarPregunta = function cargarPregunta() {
    fetch("dataset/cargarPreguntas.php").then(function (response) {
      return response.text();
    }).then(function (data) {
      preguntasList.innerHTML = data;
      preguntas = document.querySelectorAll(".preguntas-list li");
      rotatePreguntas();
    }).catch(function (error) {
      return console.error("Error cargando las preguntas:", error);
    });
  };
  var rotatePreguntas = function rotatePreguntas() {
    if (preguntas.length === 0) return;

    // Ocultar todas las preguntas
    preguntas.forEach(function (pregunta) {
      pregunta.classList.remove("active");
      pregunta.classList.add("hidden");
    });

    // Mostrar las preguntas actuales
    for (var i = 0; i < preguntasPorPagina; i++) {
      var index = (currentIndex + i) % preguntas.length;
      preguntas[index].classList.add("active");
      preguntas[index].classList.remove("hidden");
    }

    // Actualizar el índice para la siguiente rotación
    currentIndex = (currentIndex + preguntasPorPagina) % preguntas.length;

    // Ajustar la altura del contenedor de preguntas
    ajustarAlturaPreguntas();
  };
  var ajustarAlturaPreguntas = function ajustarAlturaPreguntas() {
    var preguntasActivas = document.querySelectorAll(".preguntas-list li.active");
    var alturaTotal = 0;
    preguntasActivas.forEach(function (pregunta) {
      alturaTotal += pregunta.offsetHeight + 20; // 20px de margen entre preguntas
    });
    preguntasList.style.height = "".concat(alturaTotal, "px");
  };
  cargarPregunta();
  setInterval(rotatePreguntas, 7000); // Rotar cada 7 segundos
});

//Apartado de Buzon de mensaje
document.getElementById("form-sugerencia").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("form-sugerencia").style.display = "none";
  document.getElementById("animacion-carga").style.display = "flex";
  var formData = new FormData(this);
  fetch("sugiere.php", {
    method: "POST",
    body: formData
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    console.log(data);
    document.querySelector(".mensaje-enviado").textContent = "Mensaje enviado ✅";

    // Ocultar la animación después de 3 segundos y mostrar el formulario nuevamente
    setTimeout(function () {
      document.getElementById("animacion-carga").style.display = "none";
      document.getElementById("form-sugerencia").style.display = "block";
      document.getElementById("form-sugerencia").reset(); // Limpiar el formulario
    }, 3000);
  }).catch(function (error) {
    console.error("Error:", error);
    document.querySelector(".mensaje-enviado").textContent = "Error al enviar el mensaje 😥";
  });
});
},{}],"C:/Users/Alejandro/AppData/Local/nvm/v23.10.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58360" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["C:/Users/Alejandro/AppData/Local/nvm/v23.10.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","events.js"], null)
//# sourceMappingURL=/events.25620d30.js.map