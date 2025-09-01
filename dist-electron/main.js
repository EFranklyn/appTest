var kd = Object.defineProperty;
var Md = (e, t, r) => t in e ? kd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var V = (e, t, r) => Md(e, typeof t != "symbol" ? t + "" : t, r);
import ht, { app as Nn, BrowserWindow as pc, dialog as zo } from "electron";
import { createRequire as jd } from "node:module";
import { fileURLToPath as Bd } from "node:url";
import ft from "node:path";
import Fe from "fs";
import qd from "constants";
import qr from "stream";
import Vn from "util";
import mc from "assert";
import K from "path";
import Hr from "child_process";
import zn from "events";
import Gr from "crypto";
import gc from "tty";
import vt from "os";
import or from "url";
import Hd from "string_decoder";
import yc from "zlib";
import Ec from "http";
import Gd from "https";
var be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = {}, xt = {}, Oe = {};
Oe.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Oe.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var ot = qd, Vd = process.cwd, $n = null, zd = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return $n || ($n = Vd.call(process)), $n;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Gs = process.chdir;
  process.chdir = function(e) {
    $n = null, Gs.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Gs);
}
var Yd = Xd;
function Xd(e) {
  ot.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, h, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), zd === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(h, p, v) {
      var E = Date.now(), _ = 0;
      c(h, p, function A(b) {
        if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - E < 6e4) {
          setTimeout(function() {
            e.stat(p, function(D, x) {
              D && D.code === "ENOENT" ? c(h, p, A) : v(b);
            });
          }, _), _ < 100 && (_ += 10);
          return;
        }
        v && v(b);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(h, p, v, E, _, A) {
      var b;
      if (A && typeof A == "function") {
        var D = 0;
        b = function(x, B, q) {
          if (x && x.code === "EAGAIN" && D < 10)
            return D++, c.call(e, h, p, v, E, _, b);
          A.apply(this, arguments);
        };
      }
      return c.call(e, h, p, v, E, _, b);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, h, p, v, E) {
      for (var _ = 0; ; )
        try {
          return c.call(e, u, h, p, v, E);
        } catch (A) {
          if (A.code === "EAGAIN" && _ < 10) {
            _++;
            continue;
          }
          throw A;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(u, h, p) {
      c.open(
        u,
        ot.O_WRONLY | ot.O_SYMLINK,
        h,
        function(v, E) {
          if (v) {
            p && p(v);
            return;
          }
          c.fchmod(E, h, function(_) {
            c.close(E, function(A) {
              p && p(_ || A);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, h) {
      var p = c.openSync(u, ot.O_WRONLY | ot.O_SYMLINK, h), v = !0, E;
      try {
        E = c.fchmodSync(p, h), v = !1;
      } finally {
        if (v)
          try {
            c.closeSync(p);
          } catch {
          }
        else
          c.closeSync(p);
      }
      return E;
    };
  }
  function r(c) {
    ot.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, h, p, v) {
      c.open(u, ot.O_SYMLINK, function(E, _) {
        if (E) {
          v && v(E);
          return;
        }
        c.futimes(_, h, p, function(A) {
          c.close(_, function(b) {
            v && v(A || b);
          });
        });
      });
    }, c.lutimesSync = function(u, h, p) {
      var v = c.openSync(u, ot.O_SYMLINK), E, _ = !0;
      try {
        E = c.futimesSync(v, h, p), _ = !1;
      } finally {
        if (_)
          try {
            c.closeSync(v);
          } catch {
          }
        else
          c.closeSync(v);
      }
      return E;
    }) : c.futimes && (c.lutimes = function(u, h, p, v) {
      v && process.nextTick(v);
    }, c.lutimesSync = function() {
    });
  }
  function n(c) {
    return c && function(u, h, p) {
      return c.call(e, u, h, function(v) {
        f(v) && (v = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, h) {
      try {
        return c.call(e, u, h);
      } catch (p) {
        if (!f(p)) throw p;
      }
    };
  }
  function o(c) {
    return c && function(u, h, p, v) {
      return c.call(e, u, h, p, function(E) {
        f(E) && (E = null), v && v.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(u, h, p) {
      try {
        return c.call(e, u, h, p);
      } catch (v) {
        if (!f(v)) throw v;
      }
    };
  }
  function a(c) {
    return c && function(u, h, p) {
      typeof h == "function" && (p = h, h = null);
      function v(E, _) {
        _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return h ? c.call(e, u, h, v) : c.call(e, u, v);
    };
  }
  function l(c) {
    return c && function(u, h) {
      var p = h ? c.call(e, u, h) : c.call(e, u);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function f(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var Ws = qr.Stream, Jd = Kd;
function Kd(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Ws.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
      var f = s[a];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, u) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Ws.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
      var l = o[s];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Qd = eh, Zd = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function eh(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Zd(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ie = Fe, th = Yd, rh = Jd, nh = Qd, dn = Vn, ye, Fn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ye = Symbol.for("graceful-fs.queue"), Fn = Symbol.for("graceful-fs.previous")) : (ye = "___graceful-fs.queue", Fn = "___graceful-fs.previous");
function ih() {
}
function vc(e, t) {
  Object.defineProperty(e, ye, {
    get: function() {
      return t;
    }
  });
}
var Dt = ih;
dn.debuglog ? Dt = dn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Dt = function() {
  var e = dn.format.apply(dn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ie[ye]) {
  var oh = be[ye] || [];
  vc(ie, oh), ie.close = function(e) {
    function t(r, n) {
      return e.call(ie, r, function(i) {
        i || Vs(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Fn, {
      value: e
    }), t;
  }(ie.close), ie.closeSync = function(e) {
    function t(r) {
      e.apply(ie, arguments), Vs();
    }
    return Object.defineProperty(t, Fn, {
      value: e
    }), t;
  }(ie.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Dt(ie[ye]), mc.equal(ie[ye].length, 0);
  });
}
be[ye] || vc(be, ie[ye]);
var $e = Yo(nh(ie));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ie.__patched && ($e = Yo(ie), ie.__patched = !0);
function Yo(e) {
  th(e), e.gracefulify = Yo, e.createReadStream = B, e.createWriteStream = q;
  var t = e.readFile;
  e.readFile = r;
  function r(y, z, H) {
    return typeof z == "function" && (H = z, z = null), M(y, z, H);
    function M(Q, R, O, I) {
      return t(Q, R, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? jt([M, [Q, R, O], C, I || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(y, z, H, M) {
    return typeof H == "function" && (M = H, H = null), Q(y, z, H, M);
    function Q(R, O, I, C, N) {
      return n(R, O, I, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? jt([Q, [R, O, I, C], P, N || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(y, z, H, M) {
    return typeof H == "function" && (M = H, H = null), Q(y, z, H, M);
    function Q(R, O, I, C, N) {
      return o(R, O, I, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? jt([Q, [R, O, I, C], P, N || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l(y, z, H, M) {
    return typeof H == "function" && (M = H, H = 0), Q(y, z, H, M);
    function Q(R, O, I, C, N) {
      return a(R, O, I, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? jt([Q, [R, O, I, C], P, N || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u(y, z, H) {
    typeof z == "function" && (H = z, z = null);
    var M = c.test(process.version) ? function(O, I, C, N) {
      return f(O, Q(
        O,
        I,
        C,
        N
      ));
    } : function(O, I, C, N) {
      return f(O, I, Q(
        O,
        I,
        C,
        N
      ));
    };
    return M(y, z, H);
    function Q(R, O, I, C) {
      return function(N, P) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? jt([
          M,
          [R, O, I],
          N,
          C || Date.now(),
          Date.now()
        ]) : (P && P.sort && P.sort(), typeof I == "function" && I.call(this, N, P));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = rh(e);
    A = h.ReadStream, D = h.WriteStream;
  }
  var p = e.ReadStream;
  p && (A.prototype = Object.create(p.prototype), A.prototype.open = b);
  var v = e.WriteStream;
  v && (D.prototype = Object.create(v.prototype), D.prototype.open = x), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return A;
    },
    set: function(y) {
      A = y;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return D;
    },
    set: function(y) {
      D = y;
    },
    enumerable: !0,
    configurable: !0
  });
  var E = A;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return E;
    },
    set: function(y) {
      E = y;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = D;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return _;
    },
    set: function(y) {
      _ = y;
    },
    enumerable: !0,
    configurable: !0
  });
  function A(y, z) {
    return this instanceof A ? (p.apply(this, arguments), this) : A.apply(Object.create(A.prototype), arguments);
  }
  function b() {
    var y = this;
    ae(y.path, y.flags, y.mode, function(z, H) {
      z ? (y.autoClose && y.destroy(), y.emit("error", z)) : (y.fd = H, y.emit("open", H), y.read());
    });
  }
  function D(y, z) {
    return this instanceof D ? (v.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
  }
  function x() {
    var y = this;
    ae(y.path, y.flags, y.mode, function(z, H) {
      z ? (y.destroy(), y.emit("error", z)) : (y.fd = H, y.emit("open", H));
    });
  }
  function B(y, z) {
    return new e.ReadStream(y, z);
  }
  function q(y, z) {
    return new e.WriteStream(y, z);
  }
  var j = e.open;
  e.open = ae;
  function ae(y, z, H, M) {
    return typeof H == "function" && (M = H, H = null), Q(y, z, H, M);
    function Q(R, O, I, C, N) {
      return j(R, O, I, function(P, k) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? jt([Q, [R, O, I, C], P, N || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  return e;
}
function jt(e) {
  Dt("ENQUEUE", e[0].name, e[1]), ie[ye].push(e), Xo();
}
var hn;
function Vs() {
  for (var e = Date.now(), t = 0; t < ie[ye].length; ++t)
    ie[ye][t].length > 2 && (ie[ye][t][3] = e, ie[ye][t][4] = e);
  Xo();
}
function Xo() {
  if (clearTimeout(hn), hn = void 0, ie[ye].length !== 0) {
    var e = ie[ye].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Dt("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Dt("TIMEOUT", t.name, r);
      var s = r.pop();
      typeof s == "function" && s.call(null, n);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), f = Math.min(l * 1.2, 100);
      a >= f ? (Dt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ie[ye].push(e);
    }
    hn === void 0 && (hn = setTimeout(Xo, 0));
  }
}
(function(e) {
  const t = Oe.fromCallback, r = $e, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((s) => r.exists(i, s));
  }, e.read = function(i, o, s, a, l, f) {
    return typeof f == "function" ? r.read(i, o, s, a, l, f) : new Promise((c, u) => {
      r.read(i, o, s, a, l, (h, p, v) => {
        if (h) return u(h);
        c({ bytesRead: p, buffer: v });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? r.write(i, o, ...s) : new Promise((a, l) => {
      r.write(i, o, ...s, (f, c, u) => {
        if (f) return l(f);
        a({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? r.writev(i, o, ...s) : new Promise((a, l) => {
      r.writev(i, o, ...s, (f, c, u) => {
        if (f) return l(f);
        a({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(xt);
var Jo = {}, wc = {};
const sh = K;
wc.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(sh.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const _c = xt, { checkPath: Sc } = wc, Ac = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Jo.makeDir = async (e, t) => (Sc(e), _c.mkdir(e, {
  mode: Ac(t),
  recursive: !0
}));
Jo.makeDirSync = (e, t) => (Sc(e), _c.mkdirSync(e, {
  mode: Ac(t),
  recursive: !0
}));
const ah = Oe.fromPromise, { makeDir: lh, makeDirSync: Ti } = Jo, Ci = ah(lh);
var Xe = {
  mkdirs: Ci,
  mkdirsSync: Ti,
  // alias
  mkdirp: Ci,
  mkdirpSync: Ti,
  ensureDir: Ci,
  ensureDirSync: Ti
};
const ch = Oe.fromPromise, bc = xt;
function uh(e) {
  return bc.access(e).then(() => !0).catch(() => !1);
}
var Lt = {
  pathExists: ch(uh),
  pathExistsSync: bc.existsSync
};
const Zt = $e;
function fh(e, t, r, n) {
  Zt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Zt.futimes(o, t, r, (s) => {
      Zt.close(o, (a) => {
        n && n(s || a);
      });
    });
  });
}
function dh(e, t, r) {
  const n = Zt.openSync(e, "r+");
  return Zt.futimesSync(n, t, r), Zt.closeSync(n);
}
var Tc = {
  utimesMillis: fh,
  utimesMillisSync: dh
};
const tr = xt, he = K, hh = Vn;
function ph(e, t, r) {
  const n = r.dereference ? (i) => tr.stat(i, { bigint: !0 }) : (i) => tr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function mh(e, t, r) {
  let n;
  const i = r.dereference ? (s) => tr.statSync(s, { bigint: !0 }) : (s) => tr.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: n };
}
function gh(e, t, r, n, i) {
  hh.callbackify(ph)(e, t, n, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (Wr(a, l)) {
        const f = he.basename(e), c = he.basename(t);
        return r === "move" && f !== c && f.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Ko(e, t) ? i(new Error(Yn(e, t, r))) : i(null, { srcStat: a, destStat: l });
  });
}
function yh(e, t, r, n) {
  const { srcStat: i, destStat: o } = mh(e, t, n);
  if (o) {
    if (Wr(i, o)) {
      const s = he.basename(e), a = he.basename(t);
      if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ko(e, t))
    throw new Error(Yn(e, t, r));
  return { srcStat: i, destStat: o };
}
function Cc(e, t, r, n, i) {
  const o = he.resolve(he.dirname(e)), s = he.resolve(he.dirname(r));
  if (s === o || s === he.parse(s).root) return i();
  tr.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : Wr(t, l) ? i(new Error(Yn(e, r, n))) : Cc(e, t, s, n, i));
}
function Oc(e, t, r, n) {
  const i = he.resolve(he.dirname(e)), o = he.resolve(he.dirname(r));
  if (o === i || o === he.parse(o).root) return;
  let s;
  try {
    s = tr.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Wr(t, s))
    throw new Error(Yn(e, r, n));
  return Oc(e, t, o, n);
}
function Wr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ko(e, t) {
  const r = he.resolve(e).split(he.sep).filter((i) => i), n = he.resolve(t).split(he.sep).filter((i) => i);
  return r.reduce((i, o, s) => i && n[s] === o, !0);
}
function Yn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var sr = {
  checkPaths: gh,
  checkPathsSync: yh,
  checkParentPaths: Cc,
  checkParentPathsSync: Oc,
  isSrcSubdir: Ko,
  areIdentical: Wr
};
const Ie = $e, Or = K, Eh = Xe.mkdirs, vh = Lt.pathExists, wh = Tc.utimesMillis, $r = sr;
function _h(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), $r.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: s, destStat: a } = o;
    $r.checkParentPaths(e, s, t, "copy", (l) => l ? n(l) : r.filter ? $c(zs, a, e, t, r, n) : zs(a, e, t, r, n));
  });
}
function zs(e, t, r, n, i) {
  const o = Or.dirname(r);
  vh(o, (s, a) => {
    if (s) return i(s);
    if (a) return xn(e, t, r, n, i);
    Eh(o, (l) => l ? i(l) : xn(e, t, r, n, i));
  });
}
function $c(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((s) => s ? e(t, r, n, i, o) : o(), (s) => o(s));
}
function Sh(e, t, r, n, i) {
  return n.filter ? $c(xn, e, t, r, n, i) : xn(e, t, r, n, i);
}
function xn(e, t, r, n, i) {
  (n.dereference ? Ie.stat : Ie.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Rh(a, e, t, r, n, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Ah(a, e, t, r, n, i) : a.isSymbolicLink() ? Dh(e, t, r, n, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Ah(e, t, r, n, i, o) {
  return t ? bh(e, r, n, i, o) : Rc(e, r, n, i, o);
}
function bh(e, t, r, n, i) {
  if (n.overwrite)
    Ie.unlink(r, (o) => o ? i(o) : Rc(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function Rc(e, t, r, n, i) {
  Ie.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? Th(e.mode, t, r, i) : Xn(r, e.mode, i));
}
function Th(e, t, r, n) {
  return Ch(e) ? Oh(r, e, (i) => i ? n(i) : Ys(e, t, r, n)) : Ys(e, t, r, n);
}
function Ch(e) {
  return (e & 128) === 0;
}
function Oh(e, t, r) {
  return Xn(e, t | 128, r);
}
function Ys(e, t, r, n) {
  $h(t, r, (i) => i ? n(i) : Xn(r, e, n));
}
function Xn(e, t, r) {
  return Ie.chmod(e, t, r);
}
function $h(e, t, r) {
  Ie.stat(e, (n, i) => n ? r(n) : wh(t, i.atime, i.mtime, r));
}
function Rh(e, t, r, n, i, o) {
  return t ? Pc(r, n, i, o) : Ph(e.mode, r, n, i, o);
}
function Ph(e, t, r, n, i) {
  Ie.mkdir(r, (o) => {
    if (o) return i(o);
    Pc(t, r, n, (s) => s ? i(s) : Xn(r, e, i));
  });
}
function Pc(e, t, r, n) {
  Ie.readdir(e, (i, o) => i ? n(i) : Ic(o, e, t, r, n));
}
function Ic(e, t, r, n, i) {
  const o = e.pop();
  return o ? Ih(e, o, t, r, n, i) : i();
}
function Ih(e, t, r, n, i, o) {
  const s = Or.join(r, t), a = Or.join(n, t);
  $r.checkPaths(s, a, "copy", i, (l, f) => {
    if (l) return o(l);
    const { destStat: c } = f;
    Sh(c, s, a, i, (u) => u ? o(u) : Ic(e, r, n, i, o));
  });
}
function Dh(e, t, r, n, i) {
  Ie.readlink(t, (o, s) => {
    if (o) return i(o);
    if (n.dereference && (s = Or.resolve(process.cwd(), s)), e)
      Ie.readlink(r, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Ie.symlink(s, r, i) : i(a) : (n.dereference && (l = Or.resolve(process.cwd(), l)), $r.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && $r.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : Nh(s, r, i)));
    else
      return Ie.symlink(s, r, i);
  });
}
function Nh(e, t, r) {
  Ie.unlink(t, (n) => n ? r(n) : Ie.symlink(e, t, r));
}
var Fh = _h;
const _e = $e, Rr = K, xh = Xe.mkdirsSync, Lh = Tc.utimesMillisSync, Pr = sr;
function Uh(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Pr.checkPathsSync(e, t, "copy", r);
  return Pr.checkParentPathsSync(e, n, t, "copy"), kh(i, e, t, r);
}
function kh(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Rr.dirname(r);
  return _e.existsSync(i) || xh(i), Dc(e, t, r, n);
}
function Mh(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Dc(e, t, r, n);
}
function Dc(e, t, r, n) {
  const o = (n.dereference ? _e.statSync : _e.lstatSync)(t);
  if (o.isDirectory()) return Vh(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return jh(o, e, t, r, n);
  if (o.isSymbolicLink()) return Xh(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function jh(e, t, r, n, i) {
  return t ? Bh(e, r, n, i) : Nc(e, r, n, i);
}
function Bh(e, t, r, n) {
  if (n.overwrite)
    return _e.unlinkSync(r), Nc(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Nc(e, t, r, n) {
  return _e.copyFileSync(t, r), n.preserveTimestamps && qh(e.mode, t, r), Qo(r, e.mode);
}
function qh(e, t, r) {
  return Hh(e) && Gh(r, e), Wh(t, r);
}
function Hh(e) {
  return (e & 128) === 0;
}
function Gh(e, t) {
  return Qo(e, t | 128);
}
function Qo(e, t) {
  return _e.chmodSync(e, t);
}
function Wh(e, t) {
  const r = _e.statSync(e);
  return Lh(t, r.atime, r.mtime);
}
function Vh(e, t, r, n, i) {
  return t ? Fc(r, n, i) : zh(e.mode, r, n, i);
}
function zh(e, t, r, n) {
  return _e.mkdirSync(r), Fc(t, r, n), Qo(r, e);
}
function Fc(e, t, r) {
  _e.readdirSync(e).forEach((n) => Yh(n, e, t, r));
}
function Yh(e, t, r, n) {
  const i = Rr.join(t, e), o = Rr.join(r, e), { destStat: s } = Pr.checkPathsSync(i, o, "copy", n);
  return Mh(s, i, o, n);
}
function Xh(e, t, r, n) {
  let i = _e.readlinkSync(t);
  if (n.dereference && (i = Rr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = _e.readlinkSync(r);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return _e.symlinkSync(i, r);
      throw s;
    }
    if (n.dereference && (o = Rr.resolve(process.cwd(), o)), Pr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (_e.statSync(r).isDirectory() && Pr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Jh(i, r);
  } else
    return _e.symlinkSync(i, r);
}
function Jh(e, t) {
  return _e.unlinkSync(t), _e.symlinkSync(e, t);
}
var Kh = Uh;
const Qh = Oe.fromCallback;
var Zo = {
  copy: Qh(Fh),
  copySync: Kh
};
const Xs = $e, xc = K, ee = mc, Ir = process.platform === "win32";
function Lc(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Xs[r], r = r + "Sync", e[r] = e[r] || Xs[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function es(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), ee(e, "rimraf: missing path"), ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), ee.strictEqual(typeof r, "function", "rimraf: callback function required"), ee(t, "rimraf: invalid options argument provided"), ee.strictEqual(typeof t, "object", "rimraf: options should be object"), Lc(t), Js(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const s = n * 100;
        return setTimeout(() => Js(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Js(e, t, r) {
  ee(e), ee(t), ee(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Ir)
      return Ks(e, t, n, r);
    if (i && i.isDirectory())
      return Rn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return Ir ? Ks(e, t, o, r) : Rn(e, t, o, r);
        if (o.code === "EISDIR")
          return Rn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Ks(e, t, r, n) {
  ee(e), ee(t), ee(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, s) => {
      o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? Rn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Qs(e, t, r) {
  let n;
  ee(e), ee(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Pn(e, t, r) : t.unlinkSync(e);
}
function Rn(e, t, r, n) {
  ee(e), ee(t), ee(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Zh(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function Zh(e, t, r) {
  ee(e), ee(t), ee(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((a) => {
      es(xc.join(e, a), t, (l) => {
        if (!s) {
          if (l) return r(s = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Uc(e, t) {
  let r;
  t = t || {}, Lc(t), ee(e, "rimraf: missing path"), ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), ee(t, "rimraf: missing options"), ee.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ir && Qs(e, t, n);
  }
  try {
    r && r.isDirectory() ? Pn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ir ? Qs(e, t, n) : Pn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Pn(e, t, n);
  }
}
function Pn(e, t, r) {
  ee(e), ee(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      ep(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function ep(e, t) {
  if (ee(e), ee(t), t.readdirSync(e).forEach((r) => Uc(xc.join(e, r), t)), Ir) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var tp = es;
es.sync = Uc;
const Ln = $e, rp = Oe.fromCallback, kc = tp;
function np(e, t) {
  if (Ln.rm) return Ln.rm(e, { recursive: !0, force: !0 }, t);
  kc(e, t);
}
function ip(e) {
  if (Ln.rmSync) return Ln.rmSync(e, { recursive: !0, force: !0 });
  kc.sync(e);
}
var Jn = {
  remove: rp(np),
  removeSync: ip
};
const op = Oe.fromPromise, Mc = xt, jc = K, Bc = Xe, qc = Jn, Zs = op(async function(t) {
  let r;
  try {
    r = await Mc.readdir(t);
  } catch {
    return Bc.mkdirs(t);
  }
  return Promise.all(r.map((n) => qc.remove(jc.join(t, n))));
});
function ea(e) {
  let t;
  try {
    t = Mc.readdirSync(e);
  } catch {
    return Bc.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = jc.join(e, r), qc.removeSync(r);
  });
}
var sp = {
  emptyDirSync: ea,
  emptydirSync: ea,
  emptyDir: Zs,
  emptydir: Zs
};
const ap = Oe.fromCallback, Hc = K, ct = $e, Gc = Xe;
function lp(e, t) {
  function r() {
    ct.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  ct.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Hc.dirname(e);
    ct.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? Gc.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(s);
      a.isDirectory() ? r() : ct.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function cp(e) {
  let t;
  try {
    t = ct.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Hc.dirname(e);
  try {
    ct.statSync(r).isDirectory() || ct.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Gc.mkdirsSync(r);
    else throw n;
  }
  ct.writeFileSync(e, "");
}
var up = {
  createFile: ap(lp),
  createFileSync: cp
};
const fp = Oe.fromCallback, Wc = K, lt = $e, Vc = Xe, dp = Lt.pathExists, { areIdentical: zc } = sr;
function hp(e, t, r) {
  function n(i, o) {
    lt.link(i, o, (s) => {
      if (s) return r(s);
      r(null);
    });
  }
  lt.lstat(t, (i, o) => {
    lt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), r(s);
      if (o && zc(a, o)) return r(null);
      const l = Wc.dirname(t);
      dp(l, (f, c) => {
        if (f) return r(f);
        if (c) return n(e, t);
        Vc.mkdirs(l, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function pp(e, t) {
  let r;
  try {
    r = lt.lstatSync(t);
  } catch {
  }
  try {
    const o = lt.lstatSync(e);
    if (r && zc(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Wc.dirname(t);
  return lt.existsSync(n) || Vc.mkdirsSync(n), lt.linkSync(e, t);
}
var mp = {
  createLink: fp(hp),
  createLinkSync: pp
};
const ut = K, Ar = $e, gp = Lt.pathExists;
function yp(e, t, r) {
  if (ut.isAbsolute(e))
    return Ar.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = ut.dirname(t), i = ut.join(n, e);
    return gp(i, (o, s) => o ? r(o) : s ? r(null, {
      toCwd: i,
      toDst: e
    }) : Ar.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), r(a)) : r(null, {
      toCwd: e,
      toDst: ut.relative(n, e)
    })));
  }
}
function Ep(e, t) {
  let r;
  if (ut.isAbsolute(e)) {
    if (r = Ar.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = ut.dirname(t), i = ut.join(n, e);
    if (r = Ar.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Ar.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: ut.relative(n, e)
    };
  }
}
var vp = {
  symlinkPaths: yp,
  symlinkPathsSync: Ep
};
const Yc = $e;
function wp(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Yc.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function _p(e, t) {
  let r;
  if (t) return t;
  try {
    r = Yc.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Sp = {
  symlinkType: wp,
  symlinkTypeSync: _p
};
const Ap = Oe.fromCallback, Xc = K, je = xt, Jc = Xe, bp = Jc.mkdirs, Tp = Jc.mkdirsSync, Kc = vp, Cp = Kc.symlinkPaths, Op = Kc.symlinkPathsSync, Qc = Sp, $p = Qc.symlinkType, Rp = Qc.symlinkTypeSync, Pp = Lt.pathExists, { areIdentical: Zc } = sr;
function Ip(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, je.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      je.stat(e),
      je.stat(t)
    ]).then(([s, a]) => {
      if (Zc(s, a)) return n(null);
      ta(e, t, r, n);
    }) : ta(e, t, r, n);
  });
}
function ta(e, t, r, n) {
  Cp(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, $p(o.toCwd, r, (s, a) => {
      if (s) return n(s);
      const l = Xc.dirname(t);
      Pp(l, (f, c) => {
        if (f) return n(f);
        if (c) return je.symlink(e, t, a, n);
        bp(l, (u) => {
          if (u) return n(u);
          je.symlink(e, t, a, n);
        });
      });
    });
  });
}
function Dp(e, t, r) {
  let n;
  try {
    n = je.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = je.statSync(e), l = je.statSync(t);
    if (Zc(a, l)) return;
  }
  const i = Op(e, t);
  e = i.toDst, r = Rp(i.toCwd, r);
  const o = Xc.dirname(t);
  return je.existsSync(o) || Tp(o), je.symlinkSync(e, t, r);
}
var Np = {
  createSymlink: Ap(Ip),
  createSymlinkSync: Dp
};
const { createFile: ra, createFileSync: na } = up, { createLink: ia, createLinkSync: oa } = mp, { createSymlink: sa, createSymlinkSync: aa } = Np;
var Fp = {
  // file
  createFile: ra,
  createFileSync: na,
  ensureFile: ra,
  ensureFileSync: na,
  // link
  createLink: ia,
  createLinkSync: oa,
  ensureLink: ia,
  ensureLinkSync: oa,
  // symlink
  createSymlink: sa,
  createSymlinkSync: aa,
  ensureSymlink: sa,
  ensureSymlinkSync: aa
};
function xp(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function Lp(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ts = { stringify: xp, stripBom: Lp };
let rr;
try {
  rr = $e;
} catch {
  rr = Fe;
}
const Kn = Oe, { stringify: eu, stripBom: tu } = ts;
async function Up(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || rr, n = "throws" in t ? t.throws : !0;
  let i = await Kn.fromCallback(r.readFile)(e, t);
  i = tu(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (n)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return o;
}
const kp = Kn.fromPromise(Up);
function Mp(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || rr, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = tu(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function jp(e, t, r = {}) {
  const n = r.fs || rr, i = eu(t, r);
  await Kn.fromCallback(n.writeFile)(e, i, r);
}
const Bp = Kn.fromPromise(jp);
function qp(e, t, r = {}) {
  const n = r.fs || rr, i = eu(t, r);
  return n.writeFileSync(e, i, r);
}
const Hp = {
  readFile: kp,
  readFileSync: Mp,
  writeFile: Bp,
  writeFileSync: qp
};
var Gp = Hp;
const pn = Gp;
var Wp = {
  // jsonfile exports
  readJson: pn.readFile,
  readJsonSync: pn.readFileSync,
  writeJson: pn.writeFile,
  writeJsonSync: pn.writeFileSync
};
const Vp = Oe.fromCallback, br = $e, ru = K, nu = Xe, zp = Lt.pathExists;
function Yp(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = ru.dirname(e);
  zp(i, (o, s) => {
    if (o) return n(o);
    if (s) return br.writeFile(e, t, r, n);
    nu.mkdirs(i, (a) => {
      if (a) return n(a);
      br.writeFile(e, t, r, n);
    });
  });
}
function Xp(e, ...t) {
  const r = ru.dirname(e);
  if (br.existsSync(r))
    return br.writeFileSync(e, ...t);
  nu.mkdirsSync(r), br.writeFileSync(e, ...t);
}
var rs = {
  outputFile: Vp(Yp),
  outputFileSync: Xp
};
const { stringify: Jp } = ts, { outputFile: Kp } = rs;
async function Qp(e, t, r = {}) {
  const n = Jp(t, r);
  await Kp(e, n, r);
}
var Zp = Qp;
const { stringify: em } = ts, { outputFileSync: tm } = rs;
function rm(e, t, r) {
  const n = em(t, r);
  tm(e, n, r);
}
var nm = rm;
const im = Oe.fromPromise, Ce = Wp;
Ce.outputJson = im(Zp);
Ce.outputJsonSync = nm;
Ce.outputJSON = Ce.outputJson;
Ce.outputJSONSync = Ce.outputJsonSync;
Ce.writeJSON = Ce.writeJson;
Ce.writeJSONSync = Ce.writeJsonSync;
Ce.readJSON = Ce.readJson;
Ce.readJSONSync = Ce.readJsonSync;
var om = Ce;
const sm = $e, Po = K, am = Zo.copy, iu = Jn.remove, lm = Xe.mkdirp, cm = Lt.pathExists, la = sr;
function um(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  la.checkPaths(e, t, "move", r, (o, s) => {
    if (o) return n(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    la.checkParentPaths(e, a, t, "move", (f) => {
      if (f) return n(f);
      if (fm(t)) return ca(e, t, i, l, n);
      lm(Po.dirname(t), (c) => c ? n(c) : ca(e, t, i, l, n));
    });
  });
}
function fm(e) {
  const t = Po.dirname(e);
  return Po.parse(t).root === t;
}
function ca(e, t, r, n, i) {
  if (n) return Oi(e, t, r, i);
  if (r)
    return iu(t, (o) => o ? i(o) : Oi(e, t, r, i));
  cm(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : Oi(e, t, r, i));
}
function Oi(e, t, r, n) {
  sm.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : dm(e, t, r, n) : n());
}
function dm(e, t, r, n) {
  am(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : iu(e, n));
}
var hm = um;
const ou = $e, Io = K, pm = Zo.copySync, su = Jn.removeSync, mm = Xe.mkdirpSync, ua = sr;
function gm(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = ua.checkPathsSync(e, t, "move", r);
  return ua.checkParentPathsSync(e, i, t, "move"), ym(t) || mm(Io.dirname(t)), Em(e, t, n, o);
}
function ym(e) {
  const t = Io.dirname(e);
  return Io.parse(t).root === t;
}
function Em(e, t, r, n) {
  if (n) return $i(e, t, r);
  if (r)
    return su(t), $i(e, t, r);
  if (ou.existsSync(t)) throw new Error("dest already exists.");
  return $i(e, t, r);
}
function $i(e, t, r) {
  try {
    ou.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return vm(e, t, r);
  }
}
function vm(e, t, r) {
  return pm(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), su(e);
}
var wm = gm;
const _m = Oe.fromCallback;
var Sm = {
  move: _m(hm),
  moveSync: wm
}, wt = {
  // Export promiseified graceful-fs:
  ...xt,
  // Export extra methods:
  ...Zo,
  ...sp,
  ...Fp,
  ...om,
  ...Xe,
  ...Sm,
  ...rs,
  ...Lt,
  ...Jn
}, et = {}, pt = {}, pe = {}, mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.CancellationError = mt.CancellationToken = void 0;
const Am = zn;
class bm extends Am.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Do());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let s = null;
      if (n = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          o(new Do());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (a) => {
        s = a;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
mt.CancellationToken = bm;
class Do extends Error {
  constructor() {
    super("cancelled");
  }
}
mt.CancellationError = Do;
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.newError = Tm;
function Tm(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Te = {}, No = { exports: {} }, mn = { exports: {} }, Ri, fa;
function Cm() {
  if (fa) return Ri;
  fa = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Ri = function(c, u) {
    u = u || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return s(c);
    if (h === "number" && isFinite(c))
      return u.long ? l(c) : a(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (u) {
        var h = parseFloat(u[1]), p = (u[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(c) {
    var u = Math.abs(c);
    return u >= n ? Math.round(c / n) + "d" : u >= r ? Math.round(c / r) + "h" : u >= t ? Math.round(c / t) + "m" : u >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var u = Math.abs(c);
    return u >= n ? f(c, u, n, "day") : u >= r ? f(c, u, r, "hour") : u >= t ? f(c, u, t, "minute") : u >= e ? f(c, u, e, "second") : c + " ms";
  }
  function f(c, u, h, p) {
    var v = u >= h * 1.5;
    return Math.round(c / h) + " " + p + (v ? "s" : "");
  }
  return Ri;
}
var Pi, da;
function au() {
  if (da) return Pi;
  da = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = a, n.enable = o, n.enabled = l, n.humanize = Cm(), n.destroy = c, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let h = 0;
      for (let p = 0; p < u.length; p++)
        h = (h << 5) - h + u.charCodeAt(p), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let h, p = null, v, E;
      function _(...A) {
        if (!_.enabled)
          return;
        const b = _, D = Number(/* @__PURE__ */ new Date()), x = D - (h || D);
        b.diff = x, b.prev = h, b.curr = D, h = D, A[0] = n.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
        let B = 0;
        A[0] = A[0].replace(/%([a-zA-Z%])/g, (j, ae) => {
          if (j === "%%")
            return "%";
          B++;
          const y = n.formatters[ae];
          if (typeof y == "function") {
            const z = A[B];
            j = y.call(b, z), A.splice(B, 1), B--;
          }
          return j;
        }), n.formatArgs.call(b, A), (b.log || n.log).apply(b, A);
      }
      return _.namespace = u, _.useColors = n.useColors(), _.color = n.selectColor(u), _.extend = i, _.destroy = n.destroy, Object.defineProperty(_, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (v !== n.namespaces && (v = n.namespaces, E = n.enabled(u)), E),
        set: (A) => {
          p = A;
        }
      }), typeof n.init == "function" && n.init(_), _;
    }
    function i(u, h) {
      const p = n(this.namespace + (typeof h > "u" ? ":" : h) + u);
      return p.log = this.log, p;
    }
    function o(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const h = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of h)
        p[0] === "-" ? n.skips.push(p.slice(1)) : n.names.push(p);
    }
    function s(u, h) {
      let p = 0, v = 0, E = -1, _ = 0;
      for (; p < u.length; )
        if (v < h.length && (h[v] === u[p] || h[v] === "*"))
          h[v] === "*" ? (E = v, _ = p, v++) : (p++, v++);
        else if (E !== -1)
          v = E + 1, _++, p = _;
        else
          return !1;
      for (; v < h.length && h[v] === "*"; )
        v++;
      return v === h.length;
    }
    function a() {
      const u = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), u;
    }
    function l(u) {
      for (const h of n.skips)
        if (s(u, h))
          return !1;
      for (const h of n.names)
        if (s(u, h))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Pi = e, Pi;
}
var ha;
function Om() {
  return ha || (ha = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      l.splice(1, 0, f, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (u = c));
      }), l.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = au()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(mn, mn.exports)), mn.exports;
}
var gn = { exports: {} }, Ii, pa;
function $m() {
  return pa || (pa = 1, Ii = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Ii;
}
var Di, ma;
function Rm() {
  if (ma) return Di;
  ma = 1;
  const e = vt, t = gc, r = $m(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function s(l, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !f && i === void 0)
      return 0;
    const c = i || 0;
    if (n.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : c;
  }
  function a(l) {
    const f = s(l, l && l.isTTY);
    return o(f);
  }
  return Di = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Di;
}
var ga;
function Pm() {
  return ga || (ga = 1, function(e, t) {
    const r = gc, n = Vn;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = Rm();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, p) => {
      const v = p.substring(6).toLowerCase().replace(/_([a-z])/g, (_, A) => A.toUpperCase());
      let E = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), h[v] = E, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: p, useColors: v } = this;
      if (v) {
        const E = this.color, _ = "\x1B[3" + (E < 8 ? E : "8;5;" + E), A = `  ${_};1m${p} \x1B[0m`;
        h[0] = A + h[0].split(`
`).join(`
` + A), h.push(_ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = s() + p + " " + h[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let v = 0; v < p.length; v++)
        h.inspectOpts[p[v]] = t.inspectOpts[p[v]];
    }
    e.exports = au()(t);
    const { formatters: u } = e.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(gn, gn.exports)), gn.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? No.exports = Om() : No.exports = Pm();
var Im = No.exports, Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.ProgressCallbackTransform = void 0;
const Dm = qr;
class Nm extends Dm.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Vr.ProgressCallbackTransform = Nm;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.DigestTransform = Te.HttpExecutor = Te.HttpError = void 0;
Te.createHttpError = Fo;
Te.parseJson = Bm;
Te.configureRequestOptionsFromUrl = cu;
Te.configureRequestUrl = is;
Te.safeGetHeader = er;
Te.configureRequestOptions = kn;
Te.safeStringifyJson = Mn;
const Fm = Gr, xm = Im, Lm = Fe, Um = qr, lu = or, km = mt, ya = ar, Mm = Vr, gr = (0, xm.default)("electron-builder");
function Fo(e, t = null) {
  return new ns(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Mn(e.headers), t);
}
const jm = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class ns extends Error {
  constructor(t, r = `HTTP error: ${jm.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Te.HttpError = ns;
function Bm(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Un {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new km.CancellationToken(), n) {
    kn(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      gr(i);
      const { headers: s, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...s
        },
        ...a
      };
    }
    return this.doApiRequest(t, r, (s) => s.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return gr.enabled && gr(`Request: ${Mn(t)}`), r.createPromise((o, s, a) => {
      const l = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, o, s, i, n);
        } catch (c) {
          s(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, s, t.timeout), this.addRedirectHandlers(l, t, s, i, (f) => {
        this.doApiRequest(f, r, n, i).then(o).catch(s);
      }), n(l, s), a(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, s, a) {
    var l;
    if (gr.enabled && gr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Mn(r)}`), t.statusCode === 404) {
      o(Fo(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = f >= 300 && f < 400, u = er(t, "location");
    if (c && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Un.prepareRedirectUrlOptions(u, r), n, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (p) => h += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = er(t, "content-type"), v = p != null && (Array.isArray(p) ? p.find((E) => E.includes("json")) != null : p.includes("json"));
          o(Fo(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (p) {
        o(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const s = [], a = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      is(t, a), kn(a), this.doDownload(a, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, f) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), l.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const s = er(o, "location");
      if (s != null) {
        n < this.maxRedirects ? this.doDownload(Un.prepareRedirectUrlOptions(s, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Hm(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = cu(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new lu.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof ns && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Te.HttpExecutor = Un;
function cu(e, t) {
  const r = kn(t);
  return is(new lu.URL(e), r), r;
}
function is(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class xo extends Um.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Fm.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, ya.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ya.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Te.DigestTransform = xo;
function qm(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function er(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Hm(e, t) {
  if (!qm(er(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const s = er(t, "content-length");
    s != null && r.push(new Mm.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new xo(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new xo(e.options.sha2, "sha256", "hex"));
  const i = (0, Lm.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const s of r)
    s.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), o = o.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function kn(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Mn(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.MemoLazy = void 0;
class Gm {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && uu(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Qn.MemoLazy = Gm;
function uu(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => uu(e[s], t[s]));
  }
  return e === t;
}
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.githubUrl = Wm;
Zn.getS3LikeProviderBaseUrl = Vm;
function Wm(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Vm(e) {
  const t = e.provider;
  if (t === "s3")
    return zm(e);
  if (t === "spaces")
    return Ym(e);
  throw new Error(`Not supported provider: ${t}`);
}
function zm(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return fu(t, e.path);
}
function fu(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Ym(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return fu(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.retry = du;
const Xm = mt;
async function du(e, t, r, n = 0, i = 0, o) {
  var s;
  const a = new Xm.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((s = o == null ? void 0 : o(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await du(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.parseDn = Jm;
function Jm(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const a = e[s];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        s++;
        const l = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(l) ? n += e[s] : (s++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && a === "=") {
        r = n, n = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (n.length === 0)
        continue;
      if (s > i) {
        let l = s;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    n += a;
  }
  return o;
}
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.nil = nr.UUID = void 0;
const hu = Gr, pu = ar, Km = "options.name must be either a string or a Buffer", Ea = (0, hu.randomBytes)(16);
Ea[0] = Ea[0] | 1;
const In = {}, X = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  In[t] = e, X[e] = t;
}
class Ft {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Ft.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Qm(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Zm(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (In[t[14] + t[15]] & 240) >> 4,
        variant: va((In[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: va((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, pu.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = In[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
nr.UUID = Ft;
Ft.OID = Ft.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function va(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Tr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Tr || (Tr = {}));
function Qm(e, t, r, n, i = Tr.ASCII) {
  const o = (0, hu.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, pu.newError)(Km, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case Tr.BINARY:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, l = a;
      break;
    case Tr.OBJECT:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, l = new Ft(a);
      break;
    default:
      l = X[a[0]] + X[a[1]] + X[a[2]] + X[a[3]] + "-" + X[a[4]] + X[a[5]] + "-" + X[a[6] & 15 | r] + X[a[7]] + "-" + X[a[8] & 63 | 128] + X[a[9]] + "-" + X[a[10]] + X[a[11]] + X[a[12]] + X[a[13]] + X[a[14]] + X[a[15]];
      break;
  }
  return l;
}
function Zm(e) {
  return X[e[0]] + X[e[1]] + X[e[2]] + X[e[3]] + "-" + X[e[4]] + X[e[5]] + "-" + X[e[6]] + X[e[7]] + "-" + X[e[8]] + X[e[9]] + "-" + X[e[10]] + X[e[11]] + X[e[12]] + X[e[13]] + X[e[14]] + X[e[15]];
}
nr.nil = new Ft("00000000-0000-0000-0000-000000000000");
var zr = {}, mu = {};
(function(e) {
  (function(t) {
    t.parser = function(m, d) {
      return new n(m, d);
    }, t.SAXParser = n, t.SAXStream = c, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(m, d) {
      if (!(this instanceof n))
        return new n(m, d);
      var T = this;
      o(T), T.q = T.c = "", T.bufferCheckPosition = t.MAX_BUFFER_LENGTH, T.opt = d || {}, T.opt.lowercase = T.opt.lowercase || T.opt.lowercasetags, T.looseCase = T.opt.lowercase ? "toLowerCase" : "toUpperCase", T.tags = [], T.closed = T.closedRoot = T.sawRoot = !1, T.tag = T.error = null, T.strict = !!m, T.noscript = !!(m || T.opt.noscript), T.state = y.BEGIN, T.strictEntities = T.opt.strictEntities, T.ENTITIES = T.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), T.attribList = [], T.opt.xmlns && (T.ns = Object.create(E)), T.opt.unquotedAttributeValues === void 0 && (T.opt.unquotedAttributeValues = !m), T.trackPosition = T.opt.position !== !1, T.trackPosition && (T.position = T.line = T.column = 0), H(T, "onready");
    }
    Object.create || (Object.create = function(m) {
      function d() {
      }
      d.prototype = m;
      var T = new d();
      return T;
    }), Object.keys || (Object.keys = function(m) {
      var d = [];
      for (var T in m) m.hasOwnProperty(T) && d.push(T);
      return d;
    });
    function i(m) {
      for (var d = Math.max(t.MAX_BUFFER_LENGTH, 10), T = 0, S = 0, J = r.length; S < J; S++) {
        var re = m[r[S]].length;
        if (re > d)
          switch (r[S]) {
            case "textNode":
              Q(m);
              break;
            case "cdata":
              M(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              M(m, "onscript", m.script), m.script = "";
              break;
            default:
              O(m, "Max buffer length exceeded: " + r[S]);
          }
        T = Math.max(T, re);
      }
      var oe = t.MAX_BUFFER_LENGTH - T;
      m.bufferCheckPosition = oe + m.position;
    }
    function o(m) {
      for (var d = 0, T = r.length; d < T; d++)
        m[r[d]] = "";
    }
    function s(m) {
      Q(m), m.cdata !== "" && (M(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (M(m, "onscript", m.script), m.script = "");
    }
    n.prototype = {
      end: function() {
        I(this);
      },
      write: Ge,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var l = t.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function f(m, d) {
      return new c(m, d);
    }
    function c(m, d) {
      if (!(this instanceof c))
        return new c(m, d);
      a.apply(this), this._parser = new n(m, d), this.writable = !0, this.readable = !0;
      var T = this;
      this._parser.onend = function() {
        T.emit("end");
      }, this._parser.onerror = function(S) {
        T.emit("error", S), T._parser.error = null;
      }, this._decoder = null, l.forEach(function(S) {
        Object.defineProperty(T, "on" + S, {
          get: function() {
            return T._parser["on" + S];
          },
          set: function(J) {
            if (!J)
              return T.removeAllListeners(S), T._parser["on" + S] = J, J;
            T.on(S, J);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(a.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(m) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m)) {
        if (!this._decoder) {
          var d = Hd.StringDecoder;
          this._decoder = new d("utf8");
        }
        m = this._decoder.write(m);
      }
      return this._parser.write(m.toString()), this.emit("data", m), !0;
    }, c.prototype.end = function(m) {
      return m && m.length && this.write(m), this._parser.end(), !0;
    }, c.prototype.on = function(m, d) {
      var T = this;
      return !T._parser["on" + m] && l.indexOf(m) !== -1 && (T._parser["on" + m] = function() {
        var S = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        S.splice(0, 0, m), T.emit.apply(T, S);
      }), a.prototype.on.call(T, m, d);
    };
    var u = "[CDATA[", h = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", E = { xml: p, xmlns: v }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, b = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function x(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function B(m) {
      return m === '"' || m === "'";
    }
    function q(m) {
      return m === ">" || x(m);
    }
    function j(m, d) {
      return m.test(d);
    }
    function ae(m, d) {
      return !j(m, d);
    }
    var y = 0;
    t.STATE = {
      BEGIN: y++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: y++,
      // leading whitespace
      TEXT: y++,
      // general stuff
      TEXT_ENTITY: y++,
      // &amp and such.
      OPEN_WAKA: y++,
      // <
      SGML_DECL: y++,
      // <!BLARG
      SGML_DECL_QUOTED: y++,
      // <!BLARG foo "bar
      DOCTYPE: y++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: y++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: y++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: y++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: y++,
      // <!-
      COMMENT: y++,
      // <!--
      COMMENT_ENDING: y++,
      // <!-- blah -
      COMMENT_ENDED: y++,
      // <!-- blah --
      CDATA: y++,
      // <![CDATA[ something
      CDATA_ENDING: y++,
      // ]
      CDATA_ENDING_2: y++,
      // ]]
      PROC_INST: y++,
      // <?hi
      PROC_INST_BODY: y++,
      // <?hi there
      PROC_INST_ENDING: y++,
      // <?hi "there" ?
      OPEN_TAG: y++,
      // <strong
      OPEN_TAG_SLASH: y++,
      // <strong /
      ATTRIB: y++,
      // <a
      ATTRIB_NAME: y++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: y++,
      // <a foo _
      ATTRIB_VALUE: y++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: y++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: y++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: y++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: y++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: y++,
      // <foo bar=&quot
      CLOSE_TAG: y++,
      // </a
      CLOSE_TAG_SAW_WHITE: y++,
      // </a   >
      SCRIPT: y++,
      // <script> ...
      SCRIPT_ENDING: y++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(m) {
      var d = t.ENTITIES[m], T = typeof d == "number" ? String.fromCharCode(d) : d;
      t.ENTITIES[m] = T;
    });
    for (var z in t.STATE)
      t.STATE[t.STATE[z]] = z;
    y = t.STATE;
    function H(m, d, T) {
      m[d] && m[d](T);
    }
    function M(m, d, T) {
      m.textNode && Q(m), H(m, d, T);
    }
    function Q(m) {
      m.textNode = R(m.opt, m.textNode), m.textNode && H(m, "ontext", m.textNode), m.textNode = "";
    }
    function R(m, d) {
      return m.trim && (d = d.trim()), m.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function O(m, d) {
      return Q(m), m.trackPosition && (d += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), d = new Error(d), m.error = d, H(m, "onerror", d), m;
    }
    function I(m) {
      return m.sawRoot && !m.closedRoot && C(m, "Unclosed root tag"), m.state !== y.BEGIN && m.state !== y.BEGIN_WHITESPACE && m.state !== y.TEXT && O(m, "Unexpected end"), Q(m), m.c = "", m.closed = !0, H(m, "onend"), n.call(m, m.strict, m.opt), m;
    }
    function C(m, d) {
      if (typeof m != "object" || !(m instanceof n))
        throw new Error("bad call to strictFail");
      m.strict && O(m, d);
    }
    function N(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var d = m.tags[m.tags.length - 1] || m, T = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (T.ns = d.ns), m.attribList.length = 0, M(m, "onopentagstart", T);
    }
    function P(m, d) {
      var T = m.indexOf(":"), S = T < 0 ? ["", m] : m.split(":"), J = S[0], re = S[1];
      return d && m === "xmlns" && (J = "xmlns", re = ""), { prefix: J, local: re };
    }
    function k(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var d = P(m.attribName, !0), T = d.prefix, S = d.local;
        if (T === "xmlns")
          if (S === "xml" && m.attribValue !== p)
            C(
              m,
              "xml: prefix must be bound to " + p + `
Actual: ` + m.attribValue
            );
          else if (S === "xmlns" && m.attribValue !== v)
            C(
              m,
              "xmlns: prefix must be bound to " + v + `
Actual: ` + m.attribValue
            );
          else {
            var J = m.tag, re = m.tags[m.tags.length - 1] || m;
            J.ns === re.ns && (J.ns = Object.create(re.ns)), J.ns[S] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, M(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function Y(m, d) {
      if (m.opt.xmlns) {
        var T = m.tag, S = P(m.tagName);
        T.prefix = S.prefix, T.local = S.local, T.uri = T.ns[S.prefix] || "", T.prefix && !T.uri && (C(m, "Unbound namespace prefix: " + JSON.stringify(m.tagName)), T.uri = S.prefix);
        var J = m.tags[m.tags.length - 1] || m;
        T.ns && J.ns !== T.ns && Object.keys(T.ns).forEach(function(rn) {
          M(m, "onopennamespace", {
            prefix: rn,
            uri: T.ns[rn]
          });
        });
        for (var re = 0, oe = m.attribList.length; re < oe; re++) {
          var me = m.attribList[re], ve = me[0], tt = me[1], ce = P(ve, !0), ke = ce.prefix, yi = ce.local, tn = ke === "" ? "" : T.ns[ke] || "", fr = {
            name: ve,
            value: tt,
            prefix: ke,
            local: yi,
            uri: tn
          };
          ke && ke !== "xmlns" && !tn && (C(m, "Unbound namespace prefix: " + JSON.stringify(ke)), fr.uri = ke), m.tag.attributes[ve] = fr, M(m, "onattribute", fr);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!d, m.sawRoot = !0, m.tags.push(m.tag), M(m, "onopentag", m.tag), d || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = y.SCRIPT : m.state = y.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function G(m) {
      if (!m.tagName) {
        C(m, "Weird empty close tag."), m.textNode += "</>", m.state = y.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = y.SCRIPT;
          return;
        }
        M(m, "onscript", m.script), m.script = "";
      }
      var d = m.tags.length, T = m.tagName;
      m.strict || (T = T[m.looseCase]());
      for (var S = T; d--; ) {
        var J = m.tags[d];
        if (J.name !== S)
          C(m, "Unexpected close tag");
        else
          break;
      }
      if (d < 0) {
        C(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = y.TEXT;
        return;
      }
      m.tagName = T;
      for (var re = m.tags.length; re-- > d; ) {
        var oe = m.tag = m.tags.pop();
        m.tagName = m.tag.name, M(m, "onclosetag", m.tagName);
        var me = {};
        for (var ve in oe.ns)
          me[ve] = oe.ns[ve];
        var tt = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && oe.ns !== tt.ns && Object.keys(oe.ns).forEach(function(ce) {
          var ke = oe.ns[ce];
          M(m, "onclosenamespace", { prefix: ce, uri: ke });
        });
      }
      d === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = y.TEXT;
    }
    function Z(m) {
      var d = m.entity, T = d.toLowerCase(), S, J = "";
      return m.ENTITIES[d] ? m.ENTITIES[d] : m.ENTITIES[T] ? m.ENTITIES[T] : (d = T, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), S = parseInt(d, 16), J = S.toString(16)) : (d = d.slice(1), S = parseInt(d, 10), J = S.toString(10))), d = d.replace(/^0+/, ""), isNaN(S) || J.toLowerCase() !== d ? (C(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(S));
    }
    function fe(m, d) {
      d === "<" ? (m.state = y.OPEN_WAKA, m.startTagPosition = m.position) : x(d) || (C(m, "Non-whitespace before first tag."), m.textNode = d, m.state = y.TEXT);
    }
    function U(m, d) {
      var T = "";
      return d < m.length && (T = m.charAt(d)), T;
    }
    function Ge(m) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return O(
          d,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return I(d);
      typeof m == "object" && (m = m.toString());
      for (var T = 0, S = ""; S = U(m, T++), d.c = S, !!S; )
        switch (d.trackPosition && (d.position++, S === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
          case y.BEGIN:
            if (d.state = y.BEGIN_WHITESPACE, S === "\uFEFF")
              continue;
            fe(d, S);
            continue;
          case y.BEGIN_WHITESPACE:
            fe(d, S);
            continue;
          case y.TEXT:
            if (d.sawRoot && !d.closedRoot) {
              for (var J = T - 1; S && S !== "<" && S !== "&"; )
                S = U(m, T++), S && d.trackPosition && (d.position++, S === `
` ? (d.line++, d.column = 0) : d.column++);
              d.textNode += m.substring(J, T - 1);
            }
            S === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = y.OPEN_WAKA, d.startTagPosition = d.position) : (!x(S) && (!d.sawRoot || d.closedRoot) && C(d, "Text data outside of root node."), S === "&" ? d.state = y.TEXT_ENTITY : d.textNode += S);
            continue;
          case y.SCRIPT:
            S === "<" ? d.state = y.SCRIPT_ENDING : d.script += S;
            continue;
          case y.SCRIPT_ENDING:
            S === "/" ? d.state = y.CLOSE_TAG : (d.script += "<" + S, d.state = y.SCRIPT);
            continue;
          case y.OPEN_WAKA:
            if (S === "!")
              d.state = y.SGML_DECL, d.sgmlDecl = "";
            else if (!x(S)) if (j(_, S))
              d.state = y.OPEN_TAG, d.tagName = S;
            else if (S === "/")
              d.state = y.CLOSE_TAG, d.tagName = "";
            else if (S === "?")
              d.state = y.PROC_INST, d.procInstName = d.procInstBody = "";
            else {
              if (C(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                var re = d.position - d.startTagPosition;
                S = new Array(re).join(" ") + S;
              }
              d.textNode += "<" + S, d.state = y.TEXT;
            }
            continue;
          case y.SGML_DECL:
            if (d.sgmlDecl + S === "--") {
              d.state = y.COMMENT, d.comment = "", d.sgmlDecl = "";
              continue;
            }
            d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = y.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + S, d.sgmlDecl = "") : (d.sgmlDecl + S).toUpperCase() === u ? (M(d, "onopencdata"), d.state = y.CDATA, d.sgmlDecl = "", d.cdata = "") : (d.sgmlDecl + S).toUpperCase() === h ? (d.state = y.DOCTYPE, (d.doctype || d.sawRoot) && C(
              d,
              "Inappropriately located doctype declaration"
            ), d.doctype = "", d.sgmlDecl = "") : S === ">" ? (M(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = y.TEXT) : (B(S) && (d.state = y.SGML_DECL_QUOTED), d.sgmlDecl += S);
            continue;
          case y.SGML_DECL_QUOTED:
            S === d.q && (d.state = y.SGML_DECL, d.q = ""), d.sgmlDecl += S;
            continue;
          case y.DOCTYPE:
            S === ">" ? (d.state = y.TEXT, M(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += S, S === "[" ? d.state = y.DOCTYPE_DTD : B(S) && (d.state = y.DOCTYPE_QUOTED, d.q = S));
            continue;
          case y.DOCTYPE_QUOTED:
            d.doctype += S, S === d.q && (d.q = "", d.state = y.DOCTYPE);
            continue;
          case y.DOCTYPE_DTD:
            S === "]" ? (d.doctype += S, d.state = y.DOCTYPE) : S === "<" ? (d.state = y.OPEN_WAKA, d.startTagPosition = d.position) : B(S) ? (d.doctype += S, d.state = y.DOCTYPE_DTD_QUOTED, d.q = S) : d.doctype += S;
            continue;
          case y.DOCTYPE_DTD_QUOTED:
            d.doctype += S, S === d.q && (d.state = y.DOCTYPE_DTD, d.q = "");
            continue;
          case y.COMMENT:
            S === "-" ? d.state = y.COMMENT_ENDING : d.comment += S;
            continue;
          case y.COMMENT_ENDING:
            S === "-" ? (d.state = y.COMMENT_ENDED, d.comment = R(d.opt, d.comment), d.comment && M(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + S, d.state = y.COMMENT);
            continue;
          case y.COMMENT_ENDED:
            S !== ">" ? (C(d, "Malformed comment"), d.comment += "--" + S, d.state = y.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = y.DOCTYPE_DTD : d.state = y.TEXT;
            continue;
          case y.CDATA:
            S === "]" ? d.state = y.CDATA_ENDING : d.cdata += S;
            continue;
          case y.CDATA_ENDING:
            S === "]" ? d.state = y.CDATA_ENDING_2 : (d.cdata += "]" + S, d.state = y.CDATA);
            continue;
          case y.CDATA_ENDING_2:
            S === ">" ? (d.cdata && M(d, "oncdata", d.cdata), M(d, "onclosecdata"), d.cdata = "", d.state = y.TEXT) : S === "]" ? d.cdata += "]" : (d.cdata += "]]" + S, d.state = y.CDATA);
            continue;
          case y.PROC_INST:
            S === "?" ? d.state = y.PROC_INST_ENDING : x(S) ? d.state = y.PROC_INST_BODY : d.procInstName += S;
            continue;
          case y.PROC_INST_BODY:
            if (!d.procInstBody && x(S))
              continue;
            S === "?" ? d.state = y.PROC_INST_ENDING : d.procInstBody += S;
            continue;
          case y.PROC_INST_ENDING:
            S === ">" ? (M(d, "onprocessinginstruction", {
              name: d.procInstName,
              body: d.procInstBody
            }), d.procInstName = d.procInstBody = "", d.state = y.TEXT) : (d.procInstBody += "?" + S, d.state = y.PROC_INST_BODY);
            continue;
          case y.OPEN_TAG:
            j(A, S) ? d.tagName += S : (N(d), S === ">" ? Y(d) : S === "/" ? d.state = y.OPEN_TAG_SLASH : (x(S) || C(d, "Invalid character in tag name"), d.state = y.ATTRIB));
            continue;
          case y.OPEN_TAG_SLASH:
            S === ">" ? (Y(d, !0), G(d)) : (C(d, "Forward-slash in opening tag not followed by >"), d.state = y.ATTRIB);
            continue;
          case y.ATTRIB:
            if (x(S))
              continue;
            S === ">" ? Y(d) : S === "/" ? d.state = y.OPEN_TAG_SLASH : j(_, S) ? (d.attribName = S, d.attribValue = "", d.state = y.ATTRIB_NAME) : C(d, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME:
            S === "=" ? d.state = y.ATTRIB_VALUE : S === ">" ? (C(d, "Attribute without value"), d.attribValue = d.attribName, k(d), Y(d)) : x(S) ? d.state = y.ATTRIB_NAME_SAW_WHITE : j(A, S) ? d.attribName += S : C(d, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME_SAW_WHITE:
            if (S === "=")
              d.state = y.ATTRIB_VALUE;
            else {
              if (x(S))
                continue;
              C(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", M(d, "onattribute", {
                name: d.attribName,
                value: ""
              }), d.attribName = "", S === ">" ? Y(d) : j(_, S) ? (d.attribName = S, d.state = y.ATTRIB_NAME) : (C(d, "Invalid attribute name"), d.state = y.ATTRIB);
            }
            continue;
          case y.ATTRIB_VALUE:
            if (x(S))
              continue;
            B(S) ? (d.q = S, d.state = y.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || O(d, "Unquoted attribute value"), d.state = y.ATTRIB_VALUE_UNQUOTED, d.attribValue = S);
            continue;
          case y.ATTRIB_VALUE_QUOTED:
            if (S !== d.q) {
              S === "&" ? d.state = y.ATTRIB_VALUE_ENTITY_Q : d.attribValue += S;
              continue;
            }
            k(d), d.q = "", d.state = y.ATTRIB_VALUE_CLOSED;
            continue;
          case y.ATTRIB_VALUE_CLOSED:
            x(S) ? d.state = y.ATTRIB : S === ">" ? Y(d) : S === "/" ? d.state = y.OPEN_TAG_SLASH : j(_, S) ? (C(d, "No whitespace between attributes"), d.attribName = S, d.attribValue = "", d.state = y.ATTRIB_NAME) : C(d, "Invalid attribute name");
            continue;
          case y.ATTRIB_VALUE_UNQUOTED:
            if (!q(S)) {
              S === "&" ? d.state = y.ATTRIB_VALUE_ENTITY_U : d.attribValue += S;
              continue;
            }
            k(d), S === ">" ? Y(d) : d.state = y.ATTRIB;
            continue;
          case y.CLOSE_TAG:
            if (d.tagName)
              S === ">" ? G(d) : j(A, S) ? d.tagName += S : d.script ? (d.script += "</" + d.tagName, d.tagName = "", d.state = y.SCRIPT) : (x(S) || C(d, "Invalid tagname in closing tag"), d.state = y.CLOSE_TAG_SAW_WHITE);
            else {
              if (x(S))
                continue;
              ae(_, S) ? d.script ? (d.script += "</" + S, d.state = y.SCRIPT) : C(d, "Invalid tagname in closing tag.") : d.tagName = S;
            }
            continue;
          case y.CLOSE_TAG_SAW_WHITE:
            if (x(S))
              continue;
            S === ">" ? G(d) : C(d, "Invalid characters in closing tag");
            continue;
          case y.TEXT_ENTITY:
          case y.ATTRIB_VALUE_ENTITY_Q:
          case y.ATTRIB_VALUE_ENTITY_U:
            var oe, me;
            switch (d.state) {
              case y.TEXT_ENTITY:
                oe = y.TEXT, me = "textNode";
                break;
              case y.ATTRIB_VALUE_ENTITY_Q:
                oe = y.ATTRIB_VALUE_QUOTED, me = "attribValue";
                break;
              case y.ATTRIB_VALUE_ENTITY_U:
                oe = y.ATTRIB_VALUE_UNQUOTED, me = "attribValue";
                break;
            }
            if (S === ";") {
              var ve = Z(d);
              d.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ve) ? (d.entity = "", d.state = oe, d.write(ve)) : (d[me] += ve, d.entity = "", d.state = oe);
            } else j(d.entity.length ? D : b, S) ? d.entity += S : (C(d, "Invalid character in entity name"), d[me] += "&" + d.entity + S, d.entity = "", d.state = oe);
            continue;
          default:
            throw new Error(d, "Unknown state: " + d.state);
        }
      return d.position >= d.bufferCheckPosition && i(d), d;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, d = Math.floor, T = function() {
        var S = 16384, J = [], re, oe, me = -1, ve = arguments.length;
        if (!ve)
          return "";
        for (var tt = ""; ++me < ve; ) {
          var ce = Number(arguments[me]);
          if (!isFinite(ce) || // `NaN`, `+Infinity`, or `-Infinity`
          ce < 0 || // not a valid Unicode code point
          ce > 1114111 || // not a valid Unicode code point
          d(ce) !== ce)
            throw RangeError("Invalid code point: " + ce);
          ce <= 65535 ? J.push(ce) : (ce -= 65536, re = (ce >> 10) + 55296, oe = ce % 1024 + 56320, J.push(re, oe)), (me + 1 === ve || J.length > S) && (tt += m.apply(null, J), J.length = 0);
        }
        return tt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: T,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = T;
    }();
  })(e);
})(mu);
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.XElement = void 0;
zr.parseXml = ng;
const eg = mu, yn = ar;
class gu {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, yn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!rg(t))
      throw (0, yn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, yn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, yn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (wa(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => wa(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
zr.XElement = gu;
const tg = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function rg(e) {
  return tg.test(e);
}
function wa(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function ng(e) {
  let t = null;
  const r = eg.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new gu(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const s = n[n.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = u;
  var t = mt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = ar;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Te;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Qn;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Vr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = Zn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } });
  var a = os;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var l = ss;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var f = nr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var c = zr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(pe);
var Ee = {}, as = {}, Be = {};
function yu(e) {
  return typeof e > "u" || e === null;
}
function ig(e) {
  return typeof e == "object" && e !== null;
}
function og(e) {
  return Array.isArray(e) ? e : yu(e) ? [] : [e];
}
function sg(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function ag(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function lg(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Be.isNothing = yu;
Be.isObject = ig;
Be.toArray = og;
Be.repeat = ag;
Be.isNegativeZero = lg;
Be.extend = sg;
function Eu(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Dr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Eu(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Dr.prototype = Object.create(Error.prototype);
Dr.prototype.constructor = Dr;
Dr.prototype.toString = function(t) {
  return this.name + ": " + Eu(this, t);
};
var Yr = Dr, _r = Be;
function Ni(e, t, r, n, i) {
  var o = "", s = "", a = Math.floor(i / 2) - 1;
  return n - t > a && (o = " ... ", t = n - a + o.length), r - n > a && (s = " ...", r = n + a - s.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + s,
    pos: n - t + o.length
    // relative position
  };
}
function Fi(e, t) {
  return _r.repeat(" ", t - e.length) + e;
}
function cg(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, s = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = n.length - 2);
  s < 0 && (s = n.length - 1);
  var a = "", l, f, c = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(s - l < 0); l++)
    f = Ni(
      e.buffer,
      n[s - l],
      i[s - l],
      e.position - (n[s] - n[s - l]),
      u
    ), a = _r.repeat(" ", t.indent) + Fi((e.line - l + 1).toString(), c) + " | " + f.str + `
` + a;
  for (f = Ni(e.buffer, n[s], i[s], e.position, u), a += _r.repeat(" ", t.indent) + Fi((e.line + 1).toString(), c) + " | " + f.str + `
`, a += _r.repeat("-", t.indent + c + 3 + f.pos) + `^
`, l = 1; l <= t.linesAfter && !(s + l >= i.length); l++)
    f = Ni(
      e.buffer,
      n[s + l],
      i[s + l],
      e.position - (n[s] - n[s + l]),
      u
    ), a += _r.repeat(" ", t.indent) + Fi((e.line + l + 1).toString(), c) + " | " + f.str + `
`;
  return a.replace(/\n$/, "");
}
var ug = cg, _a = Yr, fg = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], dg = [
  "scalar",
  "sequence",
  "mapping"
];
function hg(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function pg(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (fg.indexOf(r) === -1)
      throw new _a('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = hg(t.styleAliases || null), dg.indexOf(this.kind) === -1)
    throw new _a('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Re = pg, yr = Yr, xi = Re;
function Sa(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, s) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = s);
    }), r[i] = n;
  }), r;
}
function mg() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Lo(e) {
  return this.extend(e);
}
Lo.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof xi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new yr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof xi))
      throw new yr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new yr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new yr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof xi))
      throw new yr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Lo.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Sa(i, "implicit"), i.compiledExplicit = Sa(i, "explicit"), i.compiledTypeMap = mg(i.compiledImplicit, i.compiledExplicit), i;
};
var vu = Lo, gg = Re, wu = new gg("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), yg = Re, _u = new yg("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Eg = Re, Su = new Eg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), vg = vu, Au = new vg({
  explicit: [
    wu,
    _u,
    Su
  ]
}), wg = Re;
function _g(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Sg() {
  return null;
}
function Ag(e) {
  return e === null;
}
var bu = new wg("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: _g,
  construct: Sg,
  predicate: Ag,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), bg = Re;
function Tg(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Cg(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Og(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Tu = new bg("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Tg,
  construct: Cg,
  predicate: Og,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), $g = Be, Rg = Re;
function Pg(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Ig(e) {
  return 48 <= e && e <= 55;
}
function Dg(e) {
  return 48 <= e && e <= 57;
}
function Ng(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Pg(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Ig(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!Dg(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function Fg(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function xg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !$g.isNegativeZero(e);
}
var Cu = new Rg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Ng,
  construct: Fg,
  predicate: xg,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Ou = Be, Lg = Re, Ug = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function kg(e) {
  return !(e === null || !Ug.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Mg(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var jg = /^[-+]?[0-9]+e/;
function Bg(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Ou.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), jg.test(r) ? r.replace("e", ".e") : r;
}
function qg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Ou.isNegativeZero(e));
}
var $u = new Lg("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: kg,
  construct: Mg,
  predicate: qg,
  represent: Bg,
  defaultStyle: "lowercase"
}), Ru = Au.extend({
  implicit: [
    bu,
    Tu,
    Cu,
    $u
  ]
}), Pu = Ru, Hg = Re, Iu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Du = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Gg(e) {
  return e === null ? !1 : Iu.exec(e) !== null || Du.exec(e) !== null;
}
function Wg(e) {
  var t, r, n, i, o, s, a, l = 0, f = null, c, u, h;
  if (t = Iu.exec(e), t === null && (t = Du.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], s = +t[5], a = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], u = +(t[11] || 0), f = (c * 60 + u) * 6e4, t[9] === "-" && (f = -f)), h = new Date(Date.UTC(r, n, i, o, s, a, l)), f && h.setTime(h.getTime() - f), h;
}
function Vg(e) {
  return e.toISOString();
}
var Nu = new Hg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Gg,
  construct: Wg,
  instanceOf: Date,
  represent: Vg
}), zg = Re;
function Yg(e) {
  return e === "<<" || e === null;
}
var Fu = new zg("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Yg
}), Xg = Re, ls = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Jg(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = ls;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Kg(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = ls, s = 0, a = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : r === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : r === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Qg(e) {
  var t = "", r = 0, n, i, o = e.length, s = ls;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]) : i === 2 ? (t += s[r >> 10 & 63], t += s[r >> 4 & 63], t += s[r << 2 & 63], t += s[64]) : i === 1 && (t += s[r >> 2 & 63], t += s[r << 4 & 63], t += s[64], t += s[64]), t;
}
function Zg(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var xu = new Xg("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Jg,
  construct: Kg,
  predicate: Zg,
  represent: Qg
}), e0 = Re, t0 = Object.prototype.hasOwnProperty, r0 = Object.prototype.toString;
function n0(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, s, a = e;
  for (r = 0, n = a.length; r < n; r += 1) {
    if (i = a[r], s = !1, r0.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (t0.call(i, o))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function i0(e) {
  return e !== null ? e : [];
}
var Lu = new e0("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: n0,
  construct: i0
}), o0 = Re, s0 = Object.prototype.toString;
function a0(e) {
  if (e === null) return !0;
  var t, r, n, i, o, s = e;
  for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
    if (n = s[t], s0.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function l0(e) {
  if (e === null) return [];
  var t, r, n, i, o, s = e;
  for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
    n = s[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var Uu = new o0("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: a0,
  construct: l0
}), c0 = Re, u0 = Object.prototype.hasOwnProperty;
function f0(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (u0.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function d0(e) {
  return e !== null ? e : {};
}
var ku = new c0("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: f0,
  construct: d0
}), cs = Pu.extend({
  implicit: [
    Nu,
    Fu
  ],
  explicit: [
    xu,
    Lu,
    Uu,
    ku
  ]
}), Pt = Be, Mu = Yr, h0 = ug, p0 = cs, gt = Object.prototype.hasOwnProperty, jn = 1, ju = 2, Bu = 3, Bn = 4, Li = 1, m0 = 2, Aa = 3, g0 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, y0 = /[\x85\u2028\u2029]/, E0 = /[,\[\]\{\}]/, qu = /^(?:!|!!|![a-z\-]+!)$/i, Hu = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ba(e) {
  return Object.prototype.toString.call(e);
}
function ze(e) {
  return e === 10 || e === 13;
}
function Nt(e) {
  return e === 9 || e === 32;
}
function De(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Yt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function v0(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function w0(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function _0(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Ta(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function S0(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Gu = new Array(256), Wu = new Array(256);
for (var Bt = 0; Bt < 256; Bt++)
  Gu[Bt] = Ta(Bt) ? 1 : 0, Wu[Bt] = Ta(Bt);
function A0(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || p0, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Vu(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = h0(r), new Mu(t, r);
}
function L(e, t) {
  throw Vu(e, t);
}
function qn(e, t) {
  e.onWarning && e.onWarning.call(null, Vu(e, t));
}
var Ca = {
  YAML: function(t, r, n) {
    var i, o, s;
    t.version !== null && L(t, "duplication of %YAML directive"), n.length !== 1 && L(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && L(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), s = parseInt(i[2], 10), o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && qn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && L(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], qu.test(i) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), gt.call(t.tagMap, i) && L(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Hu.test(o) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function dt(e, t, r, n) {
  var i, o, s, a;
  if (t < r) {
    if (a = e.input.slice(t, r), n)
      for (i = 0, o = a.length; i < o; i += 1)
        s = a.charCodeAt(i), s === 9 || 32 <= s && s <= 1114111 || L(e, "expected valid JSON character");
    else g0.test(a) && L(e, "the stream contains non-printable characters");
    e.result += a;
  }
}
function Oa(e, t, r, n) {
  var i, o, s, a;
  for (Pt.isObject(r) || L(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), s = 0, a = i.length; s < a; s += 1)
    o = i[s], gt.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Xt(e, t, r, n, i, o, s, a, l) {
  var f, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, c = i.length; f < c; f += 1)
      Array.isArray(i[f]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && ba(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && ba(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (f = 0, c = o.length; f < c; f += 1)
        Oa(e, t, o[f], r);
    else
      Oa(e, t, o, r);
  else
    !e.json && !gt.call(r, i) && gt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, L(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function us(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function le(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Nt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (ze(i))
      for (us(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && qn(e, "deficient indentation"), n;
}
function ei(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || De(r)));
}
function fs(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Pt.repeat(`
`, t - 1));
}
function b0(e, t, r) {
  var n, i, o, s, a, l, f, c, u = e.kind, h = e.result, p;
  if (p = e.input.charCodeAt(e.position), De(p) || Yt(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), De(i) || r && Yt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), De(i) || r && Yt(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), De(n))
        break;
    } else {
      if (e.position === e.lineStart && ei(e) || r && Yt(p))
        break;
      if (ze(p))
        if (l = e.line, f = e.lineStart, c = e.lineIndent, le(e, !1, -1), e.lineIndent >= t) {
          a = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = s, e.line = l, e.lineStart = f, e.lineIndent = c;
          break;
        }
    }
    a && (dt(e, o, s, !1), fs(e, e.line - l), o = s = e.position, a = !1), Nt(p) || (s = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return dt(e, o, s, !1), e.result ? !0 : (e.kind = u, e.result = h, !1);
}
function T0(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (dt(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else ze(r) ? (dt(e, n, i, !0), fs(e, le(e, !1, t)), n = i = e.position) : e.position === e.lineStart && ei(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function C0(e, t) {
  var r, n, i, o, s, a;
  if (a = e.input.charCodeAt(e.position), a !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
    if (a === 34)
      return dt(e, r, e.position, !0), e.position++, !0;
    if (a === 92) {
      if (dt(e, r, e.position, !0), a = e.input.charCodeAt(++e.position), ze(a))
        le(e, !1, t);
      else if (a < 256 && Gu[a])
        e.result += Wu[a], e.position++;
      else if ((s = w0(a)) > 0) {
        for (i = s, o = 0; i > 0; i--)
          a = e.input.charCodeAt(++e.position), (s = v0(a)) >= 0 ? o = (o << 4) + s : L(e, "expected hexadecimal character");
        e.result += S0(o), e.position++;
      } else
        L(e, "unknown escape sequence");
      r = n = e.position;
    } else ze(a) ? (dt(e, r, n, !0), fs(e, le(e, !1, t)), r = n = e.position) : e.position === e.lineStart && ei(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function O0(e, t) {
  var r = !0, n, i, o, s = e.tag, a, l = e.anchor, f, c, u, h, p, v = /* @__PURE__ */ Object.create(null), E, _, A, b;
  if (b = e.input.charCodeAt(e.position), b === 91)
    c = 93, p = !1, a = [];
  else if (b === 123)
    c = 125, p = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (le(e, !0, t), b = e.input.charCodeAt(e.position), b === c)
      return e.position++, e.tag = s, e.anchor = l, e.kind = p ? "mapping" : "sequence", e.result = a, !0;
    r ? b === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), _ = E = A = null, u = h = !1, b === 63 && (f = e.input.charCodeAt(e.position + 1), De(f) && (u = h = !0, e.position++, le(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, ir(e, t, jn, !1, !0), _ = e.tag, E = e.result, le(e, !0, t), b = e.input.charCodeAt(e.position), (h || e.line === n) && b === 58 && (u = !0, b = e.input.charCodeAt(++e.position), le(e, !0, t), ir(e, t, jn, !1, !0), A = e.result), p ? Xt(e, a, v, _, E, A, n, i, o) : u ? a.push(Xt(e, null, v, _, E, A, n, i, o)) : a.push(E), le(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (r = !0, b = e.input.charCodeAt(++e.position)) : r = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function $0(e, t) {
  var r, n, i = Li, o = !1, s = !1, a = t, l = 0, f = !1, c, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Li === i ? i = u === 43 ? Aa : m0 : L(e, "repeat of a chomping mode identifier");
    else if ((c = _0(u)) >= 0)
      c === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? L(e, "repeat of an indentation width identifier") : (a = t + c - 1, s = !0);
    else
      break;
  if (Nt(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (Nt(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!ze(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (us(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!s && e.lineIndent > a && (a = e.lineIndent), ze(u)) {
      l++;
      continue;
    }
    if (e.lineIndent < a) {
      i === Aa ? e.result += Pt.repeat(`
`, o ? 1 + l : l) : i === Li && o && (e.result += `
`);
      break;
    }
    for (n ? Nt(u) ? (f = !0, e.result += Pt.repeat(`
`, o ? 1 + l : l)) : f ? (f = !1, e.result += Pt.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += Pt.repeat(`
`, l) : e.result += Pt.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, r = e.position; !ze(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    dt(e, r, e.position, !1);
  }
  return !0;
}
function $a(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], s, a = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(l !== 45 || (s = e.input.charCodeAt(e.position + 1), !De(s)))); ) {
    if (a = !0, e.position++, le(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, ir(e, t, Bu, !1, !0), o.push(e.result), le(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return a ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function R0(e, t, r) {
  var n, i, o, s, a, l, f = e.tag, c = e.anchor, u = {}, h = /* @__PURE__ */ Object.create(null), p = null, v = null, E = null, _ = !1, A = !1, b;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), b = e.input.charCodeAt(e.position); b !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (b === 63 || b === 58) && De(n))
      b === 63 ? (_ && (Xt(e, u, h, p, v, null, s, a, l), p = v = E = null), A = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, b = n;
    else {
      if (s = e.line, a = e.lineStart, l = e.position, !ir(e, r, ju, !1, !0))
        break;
      if (e.line === o) {
        for (b = e.input.charCodeAt(e.position); Nt(b); )
          b = e.input.charCodeAt(++e.position);
        if (b === 58)
          b = e.input.charCodeAt(++e.position), De(b) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (Xt(e, u, h, p, v, null, s, a, l), p = v = E = null), A = !0, _ = !1, i = !1, p = e.tag, v = e.result;
        else if (A)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = c, !0;
      } else if (A)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (_ && (s = e.line, a = e.lineStart, l = e.position), ir(e, t, Bn, !0, i) && (_ ? v = e.result : E = e.result), _ || (Xt(e, u, h, p, v, E, s, a, l), p = v = E = null), le(e, !0, -1), b = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && b !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && Xt(e, u, h, p, v, null, s, a, l), A && (e.tag = f, e.anchor = c, e.kind = "mapping", e.result = u), A;
}
function P0(e) {
  var t, r = !1, n = !1, i, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 33) return !1;
  if (e.tag !== null && L(e, "duplication of a tag property"), s = e.input.charCodeAt(++e.position), s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 ? (n = !0, i = "!!", s = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), s = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !De(s); )
      s === 33 && (n ? L(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), qu.test(i) || L(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), s = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), E0.test(o) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Hu.test(o) && L(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : gt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : L(e, 'undeclared tag handle "' + i + '"'), !0;
}
function I0(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && L(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !De(r) && !Yt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function D0(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !De(n) && !Yt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), gt.call(e.anchorMap, r) || L(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], le(e, !0, -1), !0;
}
function ir(e, t, r, n, i) {
  var o, s, a, l = 1, f = !1, c = !1, u, h, p, v, E, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = s = a = Bn === r || Bu === r, n && le(e, !0, -1) && (f = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; P0(e) || I0(e); )
      le(e, !0, -1) ? (f = !0, a = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : a = !1;
  if (a && (a = f || i), (l === 1 || Bn === r) && (jn === r || ju === r ? E = t : E = t + 1, _ = e.position - e.lineStart, l === 1 ? a && ($a(e, _) || R0(e, _, E)) || O0(e, E) ? c = !0 : (s && $0(e, E) || T0(e, E) || C0(e, E) ? c = !0 : D0(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : b0(e, E, jn === r) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = a && $a(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, h = e.implicitTypes.length; u < h; u += 1)
      if (v = e.implicitTypes[u], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (gt.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, p = e.typeMap.multi[e.kind || "fallback"], u = 0, h = p.length; u < h; u += 1)
        if (e.tag.slice(0, p[u].tag.length) === p[u].tag) {
          v = p[u];
          break;
        }
    v || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function N0(e) {
  var t = e.position, r, n, i, o = !1, s;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (s = e.input.charCodeAt(e.position)) !== 0 && (le(e, !0, -1), s = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !De(s); )
      s = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && L(e, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; Nt(s); )
        s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do
          s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !ze(s));
        break;
      }
      if (ze(s)) break;
      for (r = e.position; s !== 0 && !De(s); )
        s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    s !== 0 && us(e), gt.call(Ca, n) ? Ca[n](e, n, i) : qn(e, 'unknown document directive "' + n + '"');
  }
  if (le(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, le(e, !0, -1)) : o && L(e, "directives end mark is expected"), ir(e, e.lineIndent - 1, Bn, !1, !0), le(e, !0, -1), e.checkLineBreaks && y0.test(e.input.slice(t, e.position)) && qn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && ei(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, le(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    L(e, "end of the stream or a document separator is expected");
  else
    return;
}
function zu(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new A0(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, L(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    N0(r);
  return r.documents;
}
function F0(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = zu(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function x0(e, t) {
  var r = zu(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Mu("expected a single document in the stream, but found more");
  }
}
as.loadAll = F0;
as.load = x0;
var Yu = {}, ti = Be, Xr = Yr, L0 = cs, Xu = Object.prototype.toString, Ju = Object.prototype.hasOwnProperty, ds = 65279, U0 = 9, Nr = 10, k0 = 13, M0 = 32, j0 = 33, B0 = 34, Uo = 35, q0 = 37, H0 = 38, G0 = 39, W0 = 42, Ku = 44, V0 = 45, Hn = 58, z0 = 61, Y0 = 62, X0 = 63, J0 = 64, Qu = 91, Zu = 93, K0 = 96, ef = 123, Q0 = 124, tf = 125, Se = {};
Se[0] = "\\0";
Se[7] = "\\a";
Se[8] = "\\b";
Se[9] = "\\t";
Se[10] = "\\n";
Se[11] = "\\v";
Se[12] = "\\f";
Se[13] = "\\r";
Se[27] = "\\e";
Se[34] = '\\"';
Se[92] = "\\\\";
Se[133] = "\\N";
Se[160] = "\\_";
Se[8232] = "\\L";
Se[8233] = "\\P";
var Z0 = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], ey = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ty(e, t) {
  var r, n, i, o, s, a, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    s = n[i], a = String(t[s]), s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)), l = e.compiledTypeMap.fallback[s], l && Ju.call(l.styleAliases, a) && (a = l.styleAliases[a]), r[s] = a;
  return r;
}
function ry(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Xr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + ti.repeat("0", n - t.length) + t;
}
var ny = 1, Fr = 2;
function iy(e) {
  this.schema = e.schema || L0, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = ti.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ty(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Fr : ny, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ra(e, t) {
  for (var r = ti.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
    i = e.indexOf(`
`, n), i === -1 ? (s = e.slice(n), n = a) : (s = e.slice(n, i + 1), n = i + 1), s.length && s !== `
` && (o += r), o += s;
  return o;
}
function ko(e, t) {
  return `
` + ti.repeat(" ", e.indent * t);
}
function oy(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Gn(e) {
  return e === M0 || e === U0;
}
function xr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== ds || 65536 <= e && e <= 1114111;
}
function Pa(e) {
  return xr(e) && e !== ds && e !== k0 && e !== Nr;
}
function Ia(e, t, r) {
  var n = Pa(e), i = n && !Gn(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Ku && e !== Qu && e !== Zu && e !== ef && e !== tf) && e !== Uo && !(t === Hn && !i) || Pa(t) && !Gn(t) && e === Uo || t === Hn && i
  );
}
function sy(e) {
  return xr(e) && e !== ds && !Gn(e) && e !== V0 && e !== X0 && e !== Hn && e !== Ku && e !== Qu && e !== Zu && e !== ef && e !== tf && e !== Uo && e !== H0 && e !== W0 && e !== j0 && e !== Q0 && e !== z0 && e !== Y0 && e !== G0 && e !== B0 && e !== q0 && e !== J0 && e !== K0;
}
function ay(e) {
  return !Gn(e) && e !== Hn;
}
function Sr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function rf(e) {
  var t = /^\n* /;
  return t.test(e);
}
var nf = 1, Mo = 2, of = 3, sf = 4, zt = 5;
function ly(e, t, r, n, i, o, s, a) {
  var l, f = 0, c = null, u = !1, h = !1, p = n !== -1, v = -1, E = sy(Sr(e, 0)) && ay(Sr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Sr(e, l), !xr(f))
        return zt;
      E = E && Ia(f, c, a), c = f;
    }
  else {
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Sr(e, l), f === Nr)
        u = !0, p && (h = h || // Foldable line = too long, and not more-indented.
        l - v - 1 > n && e[v + 1] !== " ", v = l);
      else if (!xr(f))
        return zt;
      E = E && Ia(f, c, a), c = f;
    }
    h = h || p && l - v - 1 > n && e[v + 1] !== " ";
  }
  return !u && !h ? E && !s && !i(e) ? nf : o === Fr ? zt : Mo : r > 9 && rf(e) ? zt : s ? o === Fr ? zt : Mo : h ? sf : of;
}
function cy(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Fr ? '""' : "''";
    if (!e.noCompatMode && (Z0.indexOf(t) !== -1 || ey.test(t)))
      return e.quotingType === Fr ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(f) {
      return oy(e, f);
    }
    switch (ly(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case nf:
        return t;
      case Mo:
        return "'" + t.replace(/'/g, "''") + "'";
      case of:
        return "|" + Da(t, e.indent) + Na(Ra(t, o));
      case sf:
        return ">" + Da(t, e.indent) + Na(Ra(uy(t, s), o));
      case zt:
        return '"' + fy(t) + '"';
      default:
        throw new Xr("impossible error: invalid scalar style");
    }
  }();
}
function Da(e, t) {
  var r = rf(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Na(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function uy(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Fa(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s; s = r.exec(e); ) {
    var a = s[1], l = s[2];
    o = l[0] === " ", n += a + (!i && !o && l !== "" ? `
` : "") + Fa(l, t), i = o;
  }
  return n;
}
function Fa(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; n = r.exec(e); )
    a = n.index, a - i > t && (o = s > i ? s : a, l += `
` + e.slice(i, o), i = o + 1), s = a;
  return l += `
`, e.length - i > t && s > i ? l += e.slice(i, s) + `
` + e.slice(s + 1) : l += e.slice(i), l.slice(1);
}
function fy(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Sr(e, i), n = Se[r], !n && xr(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || ry(r);
  return t;
}
function dy(e, t, r) {
  var n = "", i = e.tag, o, s, a;
  for (o = 0, s = r.length; o < s; o += 1)
    a = r[o], e.replacer && (a = e.replacer.call(r, String(o), a)), (Ze(e, t, a, !1, !1) || typeof a > "u" && Ze(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function xa(e, t, r, n) {
  var i = "", o = e.tag, s, a, l;
  for (s = 0, a = r.length; s < a; s += 1)
    l = r[s], e.replacer && (l = e.replacer.call(r, String(s), l)), (Ze(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Ze(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += ko(e, t)), e.dump && Nr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function hy(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), s, a, l, f, c;
  for (s = 0, a = o.length; s < a; s += 1)
    c = "", n !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[s], f = r[l], e.replacer && (f = e.replacer.call(r, l, f)), Ze(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ze(e, t, f, !1, !1) && (c += e.dump, n += c));
  e.tag = i, e.dump = "{" + n + "}";
}
function py(e, t, r, n) {
  var i = "", o = e.tag, s = Object.keys(r), a, l, f, c, u, h;
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Xr("sortKeys must be a boolean or a function");
  for (a = 0, l = s.length; a < l; a += 1)
    h = "", (!n || i !== "") && (h += ko(e, t)), f = s[a], c = r[f], e.replacer && (c = e.replacer.call(r, f, c)), Ze(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Nr === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, u && (h += ko(e, t)), Ze(e, t + 1, c, !0, u) && (e.dump && Nr === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function La(e, t, r) {
  var n, i, o, s, a, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
    if (a = i[o], (a.instanceOf || a.predicate) && (!a.instanceOf || typeof t == "object" && t instanceof a.instanceOf) && (!a.predicate || a.predicate(t))) {
      if (r ? a.multi && a.representName ? e.tag = a.representName(t) : e.tag = a.tag : e.tag = "?", a.represent) {
        if (l = e.styleMap[a.tag] || a.defaultStyle, Xu.call(a.represent) === "[object Function]")
          n = a.represent(t, l);
        else if (Ju.call(a.represent, l))
          n = a.represent[l](t, l);
        else
          throw new Xr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Ze(e, t, r, n, i, o, s) {
  e.tag = null, e.dump = r, La(e, r, !1) || La(e, r, !0);
  var a = Xu.call(e.dump), l = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var c = a === "[object Object]" || a === "[object Array]", u, h;
  if (c && (u = e.duplicates.indexOf(r), h = u !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (c && h && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), a === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (py(e, t, e.dump, i), h && (e.dump = "&ref_" + u + e.dump)) : (hy(e, t, e.dump), h && (e.dump = "&ref_" + u + " " + e.dump));
    else if (a === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? xa(e, t - 1, e.dump, i) : xa(e, t, e.dump, i), h && (e.dump = "&ref_" + u + e.dump)) : (dy(e, t, e.dump), h && (e.dump = "&ref_" + u + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && cy(e, e.dump, t, o, l);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Xr("unacceptable kind of an object to dump " + a);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function my(e, t) {
  var r = [], n = [], i, o;
  for (jo(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function jo(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        jo(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        jo(e[n[i]], t, r);
}
function gy(e, t) {
  t = t || {};
  var r = new iy(t);
  r.noRefs || my(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ze(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Yu.dump = gy;
var af = as, yy = Yu;
function hs(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ee.Type = Re;
Ee.Schema = vu;
Ee.FAILSAFE_SCHEMA = Au;
Ee.JSON_SCHEMA = Ru;
Ee.CORE_SCHEMA = Pu;
Ee.DEFAULT_SCHEMA = cs;
Ee.load = af.load;
Ee.loadAll = af.loadAll;
Ee.dump = yy.dump;
Ee.YAMLException = Yr;
Ee.types = {
  binary: xu,
  float: $u,
  map: Su,
  null: bu,
  pairs: Uu,
  set: ku,
  timestamp: Nu,
  bool: Tu,
  int: Cu,
  merge: Fu,
  omap: Lu,
  seq: _u,
  str: wu
};
Ee.safeLoad = hs("safeLoad", "load");
Ee.safeLoadAll = hs("safeLoadAll", "loadAll");
Ee.safeDump = hs("safeDump", "dump");
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.Lazy = void 0;
class Ey {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
ri.Lazy = Ey;
var Bo = { exports: {} };
const vy = "2.0.0", lf = 256, wy = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, _y = 16, Sy = lf - 6, Ay = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ni = {
  MAX_LENGTH: lf,
  MAX_SAFE_COMPONENT_LENGTH: _y,
  MAX_SAFE_BUILD_LENGTH: Sy,
  MAX_SAFE_INTEGER: wy,
  RELEASE_TYPES: Ay,
  SEMVER_SPEC_VERSION: vy,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const by = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ii = by;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = ni, o = ii;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], f = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], v = (_) => {
    for (const [A, b] of p)
      _ = _.split(`${A}*`).join(`${A}{0,${b}}`).split(`${A}+`).join(`${A}{1,${b}}`);
    return _;
  }, E = (_, A, b) => {
    const D = v(A), x = u++;
    o(_, x, A), c[_] = x, l[x] = A, f[x] = D, s[x] = new RegExp(A, b ? "g" : void 0), a[x] = new RegExp(D, b ? "g" : void 0);
  };
  E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), E("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${h}+`), E("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), E("FULL", `^${l[c.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), E("LOOSE", `^${l[c.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), E("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), E("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", l[c.COERCE], !0), E("COERCERTLFULL", l[c.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", E("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", E("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Bo, Bo.exports);
var Jr = Bo.exports;
const Ty = Object.freeze({ loose: !0 }), Cy = Object.freeze({}), Oy = (e) => e ? typeof e != "object" ? Ty : e : Cy;
var ps = Oy;
const Ua = /^[0-9]+$/, cf = (e, t) => {
  const r = Ua.test(e), n = Ua.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, $y = (e, t) => cf(t, e);
var uf = {
  compareIdentifiers: cf,
  rcompareIdentifiers: $y
};
const En = ii, { MAX_LENGTH: ka, MAX_SAFE_INTEGER: vn } = ni, { safeRe: wn, t: _n } = Jr, Ry = ps, { compareIdentifiers: qt } = uf;
let Py = class Ve {
  constructor(t, r) {
    if (r = Ry(r), t instanceof Ve) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > ka)
      throw new TypeError(
        `version is longer than ${ka} characters`
      );
    En("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? wn[_n.LOOSE] : wn[_n.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > vn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > vn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > vn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < vn)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (En("SemVer.compare", this.version, this.options, t), !(t instanceof Ve)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Ve(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Ve || (t = new Ve(t, this.options)), qt(this.major, t.major) || qt(this.minor, t.minor) || qt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Ve || (t = new Ve(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (En("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return qt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Ve || (t = new Ve(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (En("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return qt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? wn[_n.PRERELEASELOOSE] : wn[_n.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), qt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Pe = Py;
const Ma = Pe, Iy = (e, t, r = !1) => {
  if (e instanceof Ma)
    return e;
  try {
    return new Ma(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var lr = Iy;
const Dy = lr, Ny = (e, t) => {
  const r = Dy(e, t);
  return r ? r.version : null;
};
var Fy = Ny;
const xy = lr, Ly = (e, t) => {
  const r = xy(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Uy = Ly;
const ja = Pe, ky = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new ja(
      e instanceof ja ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var My = ky;
const Ba = lr, jy = (e, t) => {
  const r = Ba(e, null, !0), n = Ba(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, s = o ? r : n, a = o ? n : r, l = !!s.prerelease.length;
  if (!!a.prerelease.length && !l) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(s) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return r.major !== n.major ? c + "major" : r.minor !== n.minor ? c + "minor" : r.patch !== n.patch ? c + "patch" : "prerelease";
};
var By = jy;
const qy = Pe, Hy = (e, t) => new qy(e, t).major;
var Gy = Hy;
const Wy = Pe, Vy = (e, t) => new Wy(e, t).minor;
var zy = Vy;
const Yy = Pe, Xy = (e, t) => new Yy(e, t).patch;
var Jy = Xy;
const Ky = lr, Qy = (e, t) => {
  const r = Ky(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Zy = Qy;
const qa = Pe, eE = (e, t, r) => new qa(e, r).compare(new qa(t, r));
var qe = eE;
const tE = qe, rE = (e, t, r) => tE(t, e, r);
var nE = rE;
const iE = qe, oE = (e, t) => iE(e, t, !0);
var sE = oE;
const Ha = Pe, aE = (e, t, r) => {
  const n = new Ha(e, r), i = new Ha(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var ms = aE;
const lE = ms, cE = (e, t) => e.sort((r, n) => lE(r, n, t));
var uE = cE;
const fE = ms, dE = (e, t) => e.sort((r, n) => fE(n, r, t));
var hE = dE;
const pE = qe, mE = (e, t, r) => pE(e, t, r) > 0;
var oi = mE;
const gE = qe, yE = (e, t, r) => gE(e, t, r) < 0;
var gs = yE;
const EE = qe, vE = (e, t, r) => EE(e, t, r) === 0;
var ff = vE;
const wE = qe, _E = (e, t, r) => wE(e, t, r) !== 0;
var df = _E;
const SE = qe, AE = (e, t, r) => SE(e, t, r) >= 0;
var ys = AE;
const bE = qe, TE = (e, t, r) => bE(e, t, r) <= 0;
var Es = TE;
const CE = ff, OE = df, $E = oi, RE = ys, PE = gs, IE = Es, DE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return CE(e, r, n);
    case "!=":
      return OE(e, r, n);
    case ">":
      return $E(e, r, n);
    case ">=":
      return RE(e, r, n);
    case "<":
      return PE(e, r, n);
    case "<=":
      return IE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var hf = DE;
const NE = Pe, FE = lr, { safeRe: Sn, t: An } = Jr, xE = (e, t) => {
  if (e instanceof NE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Sn[An.COERCEFULL] : Sn[An.COERCE]);
  else {
    const l = t.includePrerelease ? Sn[An.COERCERTLFULL] : Sn[An.COERCERTL];
    let f;
    for (; (f = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), l.lastIndex = f.index + f[1].length + f[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", s = t.includePrerelease && r[5] ? `-${r[5]}` : "", a = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return FE(`${n}.${i}.${o}${s}${a}`, t);
};
var LE = xE;
class UE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var kE = UE, Ui, Ga;
function He() {
  if (Ga) return Ui;
  Ga = 1;
  const e = /\s+/g;
  class t {
    constructor(O, I) {
      if (I = i(I), O instanceof t)
        return O.loose === !!I.loose && O.includePrerelease === !!I.includePrerelease ? O : new t(O.raw, I);
      if (O instanceof o)
        return this.raw = O.value, this.set = [[O]], this.formatted = void 0, this;
      if (this.options = I, this.loose = !!I.loose, this.includePrerelease = !!I.includePrerelease, this.raw = O.trim().replace(e, " "), this.set = this.raw.split("||").map((C) => this.parseRange(C.trim())).filter((C) => C.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const C = this.set[0];
        if (this.set = this.set.filter((N) => !E(N[0])), this.set.length === 0)
          this.set = [C];
        else if (this.set.length > 1) {
          for (const N of this.set)
            if (N.length === 1 && _(N[0])) {
              this.set = [N];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let O = 0; O < this.set.length; O++) {
          O > 0 && (this.formatted += "||");
          const I = this.set[O];
          for (let C = 0; C < I.length; C++)
            C > 0 && (this.formatted += " "), this.formatted += I[C].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(O) {
      const C = ((this.options.includePrerelease && p) | (this.options.loose && v)) + ":" + O, N = n.get(C);
      if (N)
        return N;
      const P = this.options.loose, k = P ? l[f.HYPHENRANGELOOSE] : l[f.HYPHENRANGE];
      O = O.replace(k, M(this.options.includePrerelease)), s("hyphen replace", O), O = O.replace(l[f.COMPARATORTRIM], c), s("comparator trim", O), O = O.replace(l[f.TILDETRIM], u), s("tilde trim", O), O = O.replace(l[f.CARETTRIM], h), s("caret trim", O);
      let Y = O.split(" ").map((U) => b(U, this.options)).join(" ").split(/\s+/).map((U) => H(U, this.options));
      P && (Y = Y.filter((U) => (s("loose invalid filter", U, this.options), !!U.match(l[f.COMPARATORLOOSE])))), s("range list", Y);
      const G = /* @__PURE__ */ new Map(), Z = Y.map((U) => new o(U, this.options));
      for (const U of Z) {
        if (E(U))
          return [U];
        G.set(U.value, U);
      }
      G.size > 1 && G.has("") && G.delete("");
      const fe = [...G.values()];
      return n.set(C, fe), fe;
    }
    intersects(O, I) {
      if (!(O instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((C) => A(C, I) && O.set.some((N) => A(N, I) && C.every((P) => N.every((k) => P.intersects(k, I)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(O) {
      if (!O)
        return !1;
      if (typeof O == "string")
        try {
          O = new a(O, this.options);
        } catch {
          return !1;
        }
      for (let I = 0; I < this.set.length; I++)
        if (Q(this.set[I], O, this.options))
          return !0;
      return !1;
    }
  }
  Ui = t;
  const r = kE, n = new r(), i = ps, o = si(), s = ii, a = Pe, {
    safeRe: l,
    t: f,
    comparatorTrimReplace: c,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = Jr, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: v } = ni, E = (R) => R.value === "<0.0.0-0", _ = (R) => R.value === "", A = (R, O) => {
    let I = !0;
    const C = R.slice();
    let N = C.pop();
    for (; I && C.length; )
      I = C.every((P) => N.intersects(P, O)), N = C.pop();
    return I;
  }, b = (R, O) => (s("comp", R, O), R = q(R, O), s("caret", R), R = x(R, O), s("tildes", R), R = ae(R, O), s("xrange", R), R = z(R, O), s("stars", R), R), D = (R) => !R || R.toLowerCase() === "x" || R === "*", x = (R, O) => R.trim().split(/\s+/).map((I) => B(I, O)).join(" "), B = (R, O) => {
    const I = O.loose ? l[f.TILDELOOSE] : l[f.TILDE];
    return R.replace(I, (C, N, P, k, Y) => {
      s("tilde", R, C, N, P, k, Y);
      let G;
      return D(N) ? G = "" : D(P) ? G = `>=${N}.0.0 <${+N + 1}.0.0-0` : D(k) ? G = `>=${N}.${P}.0 <${N}.${+P + 1}.0-0` : Y ? (s("replaceTilde pr", Y), G = `>=${N}.${P}.${k}-${Y} <${N}.${+P + 1}.0-0`) : G = `>=${N}.${P}.${k} <${N}.${+P + 1}.0-0`, s("tilde return", G), G;
    });
  }, q = (R, O) => R.trim().split(/\s+/).map((I) => j(I, O)).join(" "), j = (R, O) => {
    s("caret", R, O);
    const I = O.loose ? l[f.CARETLOOSE] : l[f.CARET], C = O.includePrerelease ? "-0" : "";
    return R.replace(I, (N, P, k, Y, G) => {
      s("caret", R, N, P, k, Y, G);
      let Z;
      return D(P) ? Z = "" : D(k) ? Z = `>=${P}.0.0${C} <${+P + 1}.0.0-0` : D(Y) ? P === "0" ? Z = `>=${P}.${k}.0${C} <${P}.${+k + 1}.0-0` : Z = `>=${P}.${k}.0${C} <${+P + 1}.0.0-0` : G ? (s("replaceCaret pr", G), P === "0" ? k === "0" ? Z = `>=${P}.${k}.${Y}-${G} <${P}.${k}.${+Y + 1}-0` : Z = `>=${P}.${k}.${Y}-${G} <${P}.${+k + 1}.0-0` : Z = `>=${P}.${k}.${Y}-${G} <${+P + 1}.0.0-0`) : (s("no pr"), P === "0" ? k === "0" ? Z = `>=${P}.${k}.${Y}${C} <${P}.${k}.${+Y + 1}-0` : Z = `>=${P}.${k}.${Y}${C} <${P}.${+k + 1}.0-0` : Z = `>=${P}.${k}.${Y} <${+P + 1}.0.0-0`), s("caret return", Z), Z;
    });
  }, ae = (R, O) => (s("replaceXRanges", R, O), R.split(/\s+/).map((I) => y(I, O)).join(" ")), y = (R, O) => {
    R = R.trim();
    const I = O.loose ? l[f.XRANGELOOSE] : l[f.XRANGE];
    return R.replace(I, (C, N, P, k, Y, G) => {
      s("xRange", R, C, N, P, k, Y, G);
      const Z = D(P), fe = Z || D(k), U = fe || D(Y), Ge = U;
      return N === "=" && Ge && (N = ""), G = O.includePrerelease ? "-0" : "", Z ? N === ">" || N === "<" ? C = "<0.0.0-0" : C = "*" : N && Ge ? (fe && (k = 0), Y = 0, N === ">" ? (N = ">=", fe ? (P = +P + 1, k = 0, Y = 0) : (k = +k + 1, Y = 0)) : N === "<=" && (N = "<", fe ? P = +P + 1 : k = +k + 1), N === "<" && (G = "-0"), C = `${N + P}.${k}.${Y}${G}`) : fe ? C = `>=${P}.0.0${G} <${+P + 1}.0.0-0` : U && (C = `>=${P}.${k}.0${G} <${P}.${+k + 1}.0-0`), s("xRange return", C), C;
    });
  }, z = (R, O) => (s("replaceStars", R, O), R.trim().replace(l[f.STAR], "")), H = (R, O) => (s("replaceGTE0", R, O), R.trim().replace(l[O.includePrerelease ? f.GTE0PRE : f.GTE0], "")), M = (R) => (O, I, C, N, P, k, Y, G, Z, fe, U, Ge) => (D(C) ? I = "" : D(N) ? I = `>=${C}.0.0${R ? "-0" : ""}` : D(P) ? I = `>=${C}.${N}.0${R ? "-0" : ""}` : k ? I = `>=${I}` : I = `>=${I}${R ? "-0" : ""}`, D(Z) ? G = "" : D(fe) ? G = `<${+Z + 1}.0.0-0` : D(U) ? G = `<${Z}.${+fe + 1}.0-0` : Ge ? G = `<=${Z}.${fe}.${U}-${Ge}` : R ? G = `<${Z}.${fe}.${+U + 1}-0` : G = `<=${G}`, `${I} ${G}`.trim()), Q = (R, O, I) => {
    for (let C = 0; C < R.length; C++)
      if (!R[C].test(O))
        return !1;
    if (O.prerelease.length && !I.includePrerelease) {
      for (let C = 0; C < R.length; C++)
        if (s(R[C].semver), R[C].semver !== o.ANY && R[C].semver.prerelease.length > 0) {
          const N = R[C].semver;
          if (N.major === O.major && N.minor === O.minor && N.patch === O.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ui;
}
var ki, Wa;
function si() {
  if (Wa) return ki;
  Wa = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, u) {
      if (u = r(u), c instanceof t) {
        if (c.loose === !!u.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), s("comparator", c, u), this.options = u, this.loose = !!u.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(c) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = c.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (s("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new a(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, u) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, u).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, u).test(c.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, u) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, u) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  ki = t;
  const r = ps, { safeRe: n, t: i } = Jr, o = hf, s = ii, a = Pe, l = He();
  return ki;
}
const ME = He(), jE = (e, t, r) => {
  try {
    t = new ME(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ai = jE;
const BE = He(), qE = (e, t) => new BE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var HE = qE;
const GE = Pe, WE = He(), VE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new WE(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!n || i.compare(s) === -1) && (n = s, i = new GE(n, r));
  }), n;
};
var zE = VE;
const YE = Pe, XE = He(), JE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new XE(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!n || i.compare(s) === 1) && (n = s, i = new YE(n, r));
  }), n;
};
var KE = JE;
const Mi = Pe, QE = He(), Va = oi, ZE = (e, t) => {
  e = new QE(e, t);
  let r = new Mi("0.0.0");
  if (e.test(r) || (r = new Mi("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((s) => {
      const a = new Mi(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Va(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!r || Va(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var ev = ZE;
const tv = He(), rv = (e, t) => {
  try {
    return new tv(e, t).range || "*";
  } catch {
    return null;
  }
};
var nv = rv;
const iv = Pe, pf = si(), { ANY: ov } = pf, sv = He(), av = ai, za = oi, Ya = gs, lv = Es, cv = ys, uv = (e, t, r, n) => {
  e = new iv(e, n), t = new sv(t, n);
  let i, o, s, a, l;
  switch (r) {
    case ">":
      i = za, o = lv, s = Ya, a = ">", l = ">=";
      break;
    case "<":
      i = Ya, o = cv, s = za, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (av(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const c = t.set[f];
    let u = null, h = null;
    if (c.forEach((p) => {
      p.semver === ov && (p = new pf(">=0.0.0")), u = u || p, h = h || p, i(p.semver, u.semver, n) ? u = p : s(p.semver, h.semver, n) && (h = p);
    }), u.operator === a || u.operator === l || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === l && s(e, h.semver))
      return !1;
  }
  return !0;
};
var vs = uv;
const fv = vs, dv = (e, t, r) => fv(e, t, ">", r);
var hv = dv;
const pv = vs, mv = (e, t, r) => pv(e, t, "<", r);
var gv = mv;
const Xa = He(), yv = (e, t, r) => (e = new Xa(e, r), t = new Xa(t, r), e.intersects(t, r));
var Ev = yv;
const vv = ai, wv = qe;
var _v = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const s = e.sort((c, u) => wv(c, u, r));
  for (const c of s)
    vv(c, t, r) ? (o = c, i || (i = c)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const a = [];
  for (const [c, u] of n)
    c === u ? a.push(c) : !u && c === s[0] ? a.push("*") : u ? c === s[0] ? a.push(`<=${u}`) : a.push(`${c} - ${u}`) : a.push(`>=${c}`);
  const l = a.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < f.length ? l : t;
};
const Ja = He(), ws = si(), { ANY: ji } = ws, Er = ai, _s = qe, Sv = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Ja(e, r), t = new Ja(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = bv(i, o, r);
      if (n = n || s !== null, s)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Av = [new ws(">=0.0.0-0")], Ka = [new ws(">=0.0.0")], bv = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ji) {
    if (t.length === 1 && t[0].semver === ji)
      return !0;
    r.includePrerelease ? e = Av : e = Ka;
  }
  if (t.length === 1 && t[0].semver === ji) {
    if (r.includePrerelease)
      return !0;
    t = Ka;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = Qa(i, p, r) : p.operator === "<" || p.operator === "<=" ? o = Za(o, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = _s(i.semver, o.semver, r), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !Er(p, String(i), r) || o && !Er(p, String(o), r))
      return null;
    for (const v of t)
      if (!Er(p, String(v), r))
        return !1;
    return !0;
  }
  let a, l, f, c, u = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const p of t) {
    if (c = c || p.operator === ">" || p.operator === ">=", f = f || p.operator === "<" || p.operator === "<=", i) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === ">" || p.operator === ">=") {
        if (a = Qa(i, p, r), a === p && a !== i)
          return !1;
      } else if (i.operator === ">=" && !Er(i.semver, String(p), r))
        return !1;
    }
    if (o) {
      if (u && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === u.major && p.semver.minor === u.minor && p.semver.patch === u.patch && (u = !1), p.operator === "<" || p.operator === "<=") {
        if (l = Za(o, p, r), l === p && l !== o)
          return !1;
      } else if (o.operator === "<=" && !Er(o.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && f && !o && s !== 0 || o && c && !i && s !== 0 || h || u);
}, Qa = (e, t, r) => {
  if (!e)
    return t;
  const n = _s(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Za = (e, t, r) => {
  if (!e)
    return t;
  const n = _s(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Tv = Sv;
const Bi = Jr, el = ni, Cv = Pe, tl = uf, Ov = lr, $v = Fy, Rv = Uy, Pv = My, Iv = By, Dv = Gy, Nv = zy, Fv = Jy, xv = Zy, Lv = qe, Uv = nE, kv = sE, Mv = ms, jv = uE, Bv = hE, qv = oi, Hv = gs, Gv = ff, Wv = df, Vv = ys, zv = Es, Yv = hf, Xv = LE, Jv = si(), Kv = He(), Qv = ai, Zv = HE, ew = zE, tw = KE, rw = ev, nw = nv, iw = vs, ow = hv, sw = gv, aw = Ev, lw = _v, cw = Tv;
var mf = {
  parse: Ov,
  valid: $v,
  clean: Rv,
  inc: Pv,
  diff: Iv,
  major: Dv,
  minor: Nv,
  patch: Fv,
  prerelease: xv,
  compare: Lv,
  rcompare: Uv,
  compareLoose: kv,
  compareBuild: Mv,
  sort: jv,
  rsort: Bv,
  gt: qv,
  lt: Hv,
  eq: Gv,
  neq: Wv,
  gte: Vv,
  lte: zv,
  cmp: Yv,
  coerce: Xv,
  Comparator: Jv,
  Range: Kv,
  satisfies: Qv,
  toComparators: Zv,
  maxSatisfying: ew,
  minSatisfying: tw,
  minVersion: rw,
  validRange: nw,
  outside: iw,
  gtr: ow,
  ltr: sw,
  intersects: aw,
  simplifyRange: lw,
  subset: cw,
  SemVer: Cv,
  re: Bi.re,
  src: Bi.src,
  tokens: Bi.t,
  SEMVER_SPEC_VERSION: el.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: el.RELEASE_TYPES,
  compareIdentifiers: tl.compareIdentifiers,
  rcompareIdentifiers: tl.rcompareIdentifiers
}, Kr = {}, Wn = { exports: {} };
Wn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", f = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", h = "[object Error]", p = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", _ = "[object Number]", A = "[object Null]", b = "[object Object]", D = "[object Promise]", x = "[object Proxy]", B = "[object RegExp]", q = "[object Set]", j = "[object String]", ae = "[object Symbol]", y = "[object Undefined]", z = "[object WeakMap]", H = "[object ArrayBuffer]", M = "[object DataView]", Q = "[object Float32Array]", R = "[object Float64Array]", O = "[object Int8Array]", I = "[object Int16Array]", C = "[object Int32Array]", N = "[object Uint8Array]", P = "[object Uint8ClampedArray]", k = "[object Uint16Array]", Y = "[object Uint32Array]", G = /[\\^$.*+?()[\]{}|]/g, Z = /^\[object .+?Constructor\]$/, fe = /^(?:0|[1-9]\d*)$/, U = {};
  U[Q] = U[R] = U[O] = U[I] = U[C] = U[N] = U[P] = U[k] = U[Y] = !0, U[a] = U[l] = U[H] = U[c] = U[M] = U[u] = U[h] = U[p] = U[E] = U[_] = U[b] = U[B] = U[q] = U[j] = U[z] = !1;
  var Ge = typeof be == "object" && be && be.Object === Object && be, m = typeof self == "object" && self && self.Object === Object && self, d = Ge || m || Function("return this")(), T = t && !t.nodeType && t, S = T && !0 && e && !e.nodeType && e, J = S && S.exports === T, re = J && Ge.process, oe = function() {
    try {
      return re && re.binding && re.binding("util");
    } catch {
    }
  }(), me = oe && oe.isTypedArray;
  function ve(g, w) {
    for (var $ = -1, F = g == null ? 0 : g.length, te = 0, W = []; ++$ < F; ) {
      var se = g[$];
      w(se, $, g) && (W[te++] = se);
    }
    return W;
  }
  function tt(g, w) {
    for (var $ = -1, F = w.length, te = g.length; ++$ < F; )
      g[te + $] = w[$];
    return g;
  }
  function ce(g, w) {
    for (var $ = -1, F = g == null ? 0 : g.length; ++$ < F; )
      if (w(g[$], $, g))
        return !0;
    return !1;
  }
  function ke(g, w) {
    for (var $ = -1, F = Array(g); ++$ < g; )
      F[$] = w($);
    return F;
  }
  function yi(g) {
    return function(w) {
      return g(w);
    };
  }
  function tn(g, w) {
    return g.has(w);
  }
  function fr(g, w) {
    return g == null ? void 0 : g[w];
  }
  function rn(g) {
    var w = -1, $ = Array(g.size);
    return g.forEach(function(F, te) {
      $[++w] = [te, F];
    }), $;
  }
  function Lf(g, w) {
    return function($) {
      return g(w($));
    };
  }
  function Uf(g) {
    var w = -1, $ = Array(g.size);
    return g.forEach(function(F) {
      $[++w] = F;
    }), $;
  }
  var kf = Array.prototype, Mf = Function.prototype, nn = Object.prototype, Ei = d["__core-js_shared__"], Cs = Mf.toString, We = nn.hasOwnProperty, Os = function() {
    var g = /[^.]+$/.exec(Ei && Ei.keys && Ei.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), $s = nn.toString, jf = RegExp(
    "^" + Cs.call(We).replace(G, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Rs = J ? d.Buffer : void 0, on = d.Symbol, Ps = d.Uint8Array, Is = nn.propertyIsEnumerable, Bf = kf.splice, St = on ? on.toStringTag : void 0, Ds = Object.getOwnPropertySymbols, qf = Rs ? Rs.isBuffer : void 0, Hf = Lf(Object.keys, Object), vi = Mt(d, "DataView"), dr = Mt(d, "Map"), wi = Mt(d, "Promise"), _i = Mt(d, "Set"), Si = Mt(d, "WeakMap"), hr = Mt(Object, "create"), Gf = Tt(vi), Wf = Tt(dr), Vf = Tt(wi), zf = Tt(_i), Yf = Tt(Si), Ns = on ? on.prototype : void 0, Ai = Ns ? Ns.valueOf : void 0;
  function At(g) {
    var w = -1, $ = g == null ? 0 : g.length;
    for (this.clear(); ++w < $; ) {
      var F = g[w];
      this.set(F[0], F[1]);
    }
  }
  function Xf() {
    this.__data__ = hr ? hr(null) : {}, this.size = 0;
  }
  function Jf(g) {
    var w = this.has(g) && delete this.__data__[g];
    return this.size -= w ? 1 : 0, w;
  }
  function Kf(g) {
    var w = this.__data__;
    if (hr) {
      var $ = w[g];
      return $ === n ? void 0 : $;
    }
    return We.call(w, g) ? w[g] : void 0;
  }
  function Qf(g) {
    var w = this.__data__;
    return hr ? w[g] !== void 0 : We.call(w, g);
  }
  function Zf(g, w) {
    var $ = this.__data__;
    return this.size += this.has(g) ? 0 : 1, $[g] = hr && w === void 0 ? n : w, this;
  }
  At.prototype.clear = Xf, At.prototype.delete = Jf, At.prototype.get = Kf, At.prototype.has = Qf, At.prototype.set = Zf;
  function Je(g) {
    var w = -1, $ = g == null ? 0 : g.length;
    for (this.clear(); ++w < $; ) {
      var F = g[w];
      this.set(F[0], F[1]);
    }
  }
  function ed() {
    this.__data__ = [], this.size = 0;
  }
  function td(g) {
    var w = this.__data__, $ = an(w, g);
    if ($ < 0)
      return !1;
    var F = w.length - 1;
    return $ == F ? w.pop() : Bf.call(w, $, 1), --this.size, !0;
  }
  function rd(g) {
    var w = this.__data__, $ = an(w, g);
    return $ < 0 ? void 0 : w[$][1];
  }
  function nd(g) {
    return an(this.__data__, g) > -1;
  }
  function id(g, w) {
    var $ = this.__data__, F = an($, g);
    return F < 0 ? (++this.size, $.push([g, w])) : $[F][1] = w, this;
  }
  Je.prototype.clear = ed, Je.prototype.delete = td, Je.prototype.get = rd, Je.prototype.has = nd, Je.prototype.set = id;
  function bt(g) {
    var w = -1, $ = g == null ? 0 : g.length;
    for (this.clear(); ++w < $; ) {
      var F = g[w];
      this.set(F[0], F[1]);
    }
  }
  function od() {
    this.size = 0, this.__data__ = {
      hash: new At(),
      map: new (dr || Je)(),
      string: new At()
    };
  }
  function sd(g) {
    var w = ln(this, g).delete(g);
    return this.size -= w ? 1 : 0, w;
  }
  function ad(g) {
    return ln(this, g).get(g);
  }
  function ld(g) {
    return ln(this, g).has(g);
  }
  function cd(g, w) {
    var $ = ln(this, g), F = $.size;
    return $.set(g, w), this.size += $.size == F ? 0 : 1, this;
  }
  bt.prototype.clear = od, bt.prototype.delete = sd, bt.prototype.get = ad, bt.prototype.has = ld, bt.prototype.set = cd;
  function sn(g) {
    var w = -1, $ = g == null ? 0 : g.length;
    for (this.__data__ = new bt(); ++w < $; )
      this.add(g[w]);
  }
  function ud(g) {
    return this.__data__.set(g, n), this;
  }
  function fd(g) {
    return this.__data__.has(g);
  }
  sn.prototype.add = sn.prototype.push = ud, sn.prototype.has = fd;
  function rt(g) {
    var w = this.__data__ = new Je(g);
    this.size = w.size;
  }
  function dd() {
    this.__data__ = new Je(), this.size = 0;
  }
  function hd(g) {
    var w = this.__data__, $ = w.delete(g);
    return this.size = w.size, $;
  }
  function pd(g) {
    return this.__data__.get(g);
  }
  function md(g) {
    return this.__data__.has(g);
  }
  function gd(g, w) {
    var $ = this.__data__;
    if ($ instanceof Je) {
      var F = $.__data__;
      if (!dr || F.length < r - 1)
        return F.push([g, w]), this.size = ++$.size, this;
      $ = this.__data__ = new bt(F);
    }
    return $.set(g, w), this.size = $.size, this;
  }
  rt.prototype.clear = dd, rt.prototype.delete = hd, rt.prototype.get = pd, rt.prototype.has = md, rt.prototype.set = gd;
  function yd(g, w) {
    var $ = cn(g), F = !$ && Dd(g), te = !$ && !F && bi(g), W = !$ && !F && !te && qs(g), se = $ || F || te || W, de = se ? ke(g.length, String) : [], ge = de.length;
    for (var ne in g)
      We.call(g, ne) && !(se && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ne == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      te && (ne == "offset" || ne == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      W && (ne == "buffer" || ne == "byteLength" || ne == "byteOffset") || // Skip index properties.
      Od(ne, ge))) && de.push(ne);
    return de;
  }
  function an(g, w) {
    for (var $ = g.length; $--; )
      if (ks(g[$][0], w))
        return $;
    return -1;
  }
  function Ed(g, w, $) {
    var F = w(g);
    return cn(g) ? F : tt(F, $(g));
  }
  function pr(g) {
    return g == null ? g === void 0 ? y : A : St && St in Object(g) ? Td(g) : Id(g);
  }
  function Fs(g) {
    return mr(g) && pr(g) == a;
  }
  function xs(g, w, $, F, te) {
    return g === w ? !0 : g == null || w == null || !mr(g) && !mr(w) ? g !== g && w !== w : vd(g, w, $, F, xs, te);
  }
  function vd(g, w, $, F, te, W) {
    var se = cn(g), de = cn(w), ge = se ? l : nt(g), ne = de ? l : nt(w);
    ge = ge == a ? b : ge, ne = ne == a ? b : ne;
    var Ne = ge == b, Me = ne == b, we = ge == ne;
    if (we && bi(g)) {
      if (!bi(w))
        return !1;
      se = !0, Ne = !1;
    }
    if (we && !Ne)
      return W || (W = new rt()), se || qs(g) ? Ls(g, w, $, F, te, W) : Ad(g, w, ge, $, F, te, W);
    if (!($ & i)) {
      var xe = Ne && We.call(g, "__wrapped__"), Le = Me && We.call(w, "__wrapped__");
      if (xe || Le) {
        var it = xe ? g.value() : g, Ke = Le ? w.value() : w;
        return W || (W = new rt()), te(it, Ke, $, F, W);
      }
    }
    return we ? (W || (W = new rt()), bd(g, w, $, F, te, W)) : !1;
  }
  function wd(g) {
    if (!Bs(g) || Rd(g))
      return !1;
    var w = Ms(g) ? jf : Z;
    return w.test(Tt(g));
  }
  function _d(g) {
    return mr(g) && js(g.length) && !!U[pr(g)];
  }
  function Sd(g) {
    if (!Pd(g))
      return Hf(g);
    var w = [];
    for (var $ in Object(g))
      We.call(g, $) && $ != "constructor" && w.push($);
    return w;
  }
  function Ls(g, w, $, F, te, W) {
    var se = $ & i, de = g.length, ge = w.length;
    if (de != ge && !(se && ge > de))
      return !1;
    var ne = W.get(g);
    if (ne && W.get(w))
      return ne == w;
    var Ne = -1, Me = !0, we = $ & o ? new sn() : void 0;
    for (W.set(g, w), W.set(w, g); ++Ne < de; ) {
      var xe = g[Ne], Le = w[Ne];
      if (F)
        var it = se ? F(Le, xe, Ne, w, g, W) : F(xe, Le, Ne, g, w, W);
      if (it !== void 0) {
        if (it)
          continue;
        Me = !1;
        break;
      }
      if (we) {
        if (!ce(w, function(Ke, Ct) {
          if (!tn(we, Ct) && (xe === Ke || te(xe, Ke, $, F, W)))
            return we.push(Ct);
        })) {
          Me = !1;
          break;
        }
      } else if (!(xe === Le || te(xe, Le, $, F, W))) {
        Me = !1;
        break;
      }
    }
    return W.delete(g), W.delete(w), Me;
  }
  function Ad(g, w, $, F, te, W, se) {
    switch ($) {
      case M:
        if (g.byteLength != w.byteLength || g.byteOffset != w.byteOffset)
          return !1;
        g = g.buffer, w = w.buffer;
      case H:
        return !(g.byteLength != w.byteLength || !W(new Ps(g), new Ps(w)));
      case c:
      case u:
      case _:
        return ks(+g, +w);
      case h:
        return g.name == w.name && g.message == w.message;
      case B:
      case j:
        return g == w + "";
      case E:
        var de = rn;
      case q:
        var ge = F & i;
        if (de || (de = Uf), g.size != w.size && !ge)
          return !1;
        var ne = se.get(g);
        if (ne)
          return ne == w;
        F |= o, se.set(g, w);
        var Ne = Ls(de(g), de(w), F, te, W, se);
        return se.delete(g), Ne;
      case ae:
        if (Ai)
          return Ai.call(g) == Ai.call(w);
    }
    return !1;
  }
  function bd(g, w, $, F, te, W) {
    var se = $ & i, de = Us(g), ge = de.length, ne = Us(w), Ne = ne.length;
    if (ge != Ne && !se)
      return !1;
    for (var Me = ge; Me--; ) {
      var we = de[Me];
      if (!(se ? we in w : We.call(w, we)))
        return !1;
    }
    var xe = W.get(g);
    if (xe && W.get(w))
      return xe == w;
    var Le = !0;
    W.set(g, w), W.set(w, g);
    for (var it = se; ++Me < ge; ) {
      we = de[Me];
      var Ke = g[we], Ct = w[we];
      if (F)
        var Hs = se ? F(Ct, Ke, we, w, g, W) : F(Ke, Ct, we, g, w, W);
      if (!(Hs === void 0 ? Ke === Ct || te(Ke, Ct, $, F, W) : Hs)) {
        Le = !1;
        break;
      }
      it || (it = we == "constructor");
    }
    if (Le && !it) {
      var un = g.constructor, fn = w.constructor;
      un != fn && "constructor" in g && "constructor" in w && !(typeof un == "function" && un instanceof un && typeof fn == "function" && fn instanceof fn) && (Le = !1);
    }
    return W.delete(g), W.delete(w), Le;
  }
  function Us(g) {
    return Ed(g, xd, Cd);
  }
  function ln(g, w) {
    var $ = g.__data__;
    return $d(w) ? $[typeof w == "string" ? "string" : "hash"] : $.map;
  }
  function Mt(g, w) {
    var $ = fr(g, w);
    return wd($) ? $ : void 0;
  }
  function Td(g) {
    var w = We.call(g, St), $ = g[St];
    try {
      g[St] = void 0;
      var F = !0;
    } catch {
    }
    var te = $s.call(g);
    return F && (w ? g[St] = $ : delete g[St]), te;
  }
  var Cd = Ds ? function(g) {
    return g == null ? [] : (g = Object(g), ve(Ds(g), function(w) {
      return Is.call(g, w);
    }));
  } : Ld, nt = pr;
  (vi && nt(new vi(new ArrayBuffer(1))) != M || dr && nt(new dr()) != E || wi && nt(wi.resolve()) != D || _i && nt(new _i()) != q || Si && nt(new Si()) != z) && (nt = function(g) {
    var w = pr(g), $ = w == b ? g.constructor : void 0, F = $ ? Tt($) : "";
    if (F)
      switch (F) {
        case Gf:
          return M;
        case Wf:
          return E;
        case Vf:
          return D;
        case zf:
          return q;
        case Yf:
          return z;
      }
    return w;
  });
  function Od(g, w) {
    return w = w ?? s, !!w && (typeof g == "number" || fe.test(g)) && g > -1 && g % 1 == 0 && g < w;
  }
  function $d(g) {
    var w = typeof g;
    return w == "string" || w == "number" || w == "symbol" || w == "boolean" ? g !== "__proto__" : g === null;
  }
  function Rd(g) {
    return !!Os && Os in g;
  }
  function Pd(g) {
    var w = g && g.constructor, $ = typeof w == "function" && w.prototype || nn;
    return g === $;
  }
  function Id(g) {
    return $s.call(g);
  }
  function Tt(g) {
    if (g != null) {
      try {
        return Cs.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function ks(g, w) {
    return g === w || g !== g && w !== w;
  }
  var Dd = Fs(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Fs : function(g) {
    return mr(g) && We.call(g, "callee") && !Is.call(g, "callee");
  }, cn = Array.isArray;
  function Nd(g) {
    return g != null && js(g.length) && !Ms(g);
  }
  var bi = qf || Ud;
  function Fd(g, w) {
    return xs(g, w);
  }
  function Ms(g) {
    if (!Bs(g))
      return !1;
    var w = pr(g);
    return w == p || w == v || w == f || w == x;
  }
  function js(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= s;
  }
  function Bs(g) {
    var w = typeof g;
    return g != null && (w == "object" || w == "function");
  }
  function mr(g) {
    return g != null && typeof g == "object";
  }
  var qs = me ? yi(me) : _d;
  function xd(g) {
    return Nd(g) ? yd(g) : Sd(g);
  }
  function Ld() {
    return [];
  }
  function Ud() {
    return !1;
  }
  e.exports = Fd;
})(Wn, Wn.exports);
var uw = Wn.exports;
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.DownloadedUpdateHelper = void 0;
Kr.createTempUpdateFile = mw;
const fw = Gr, dw = Fe, rl = uw, $t = wt, Cr = K;
class hw {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Cr.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return rl(this.versionInfo, r) && rl(this.fileInfo.info, n.info) && await (0, $t.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, s) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, $t.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, $t.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, $t.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, $t.readJson)(n);
    } catch (f) {
      let c = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${f.message})`), r.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = Cr.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, $t.pathExists)(a))
      return r.info("Cached update file doesn't exist"), null;
    const l = await pw(a);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, a);
  }
  getUpdateInfoFile() {
    return Cr.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Kr.DownloadedUpdateHelper = hw;
function pw(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const s = (0, fw.createHash)(t);
    s.on("error", o).setEncoding(r), (0, dw.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function mw(e, t, r) {
  let n = 0, i = Cr.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, $t.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${s}`), i = Cr.join(t, `${n++}-${e}`);
    }
  return i;
}
var li = {}, Ss = {};
Object.defineProperty(Ss, "__esModule", { value: !0 });
Ss.getAppCacheDir = yw;
const qi = K, gw = vt;
function yw() {
  const e = (0, gw.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || qi.join(e, "AppData", "Local") : process.platform === "darwin" ? t = qi.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || qi.join(e, ".cache"), t;
}
Object.defineProperty(li, "__esModule", { value: !0 });
li.ElectronAppAdapter = void 0;
const nl = K, Ew = Ss;
class vw {
  constructor(t = ht.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? nl.join(process.resourcesPath, "app-update.yml") : nl.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Ew.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
li.ElectronAppAdapter = vw;
var gf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = pe;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return ht.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((l, f, c) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: c,
          callback: (h) => {
            h == null ? l(s) : f(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const a = ht.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, l, f) {
      o.on("redirect", (c, u, h) => {
        o.abort(), l > this.maxRedirects ? a(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(h, s));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(gf);
var Qr = {}, Ue = {}, ww = "[object Symbol]", yf = /[\\^$.*+?()[\]{}|]/g, _w = RegExp(yf.source), Sw = typeof be == "object" && be && be.Object === Object && be, Aw = typeof self == "object" && self && self.Object === Object && self, bw = Sw || Aw || Function("return this")(), Tw = Object.prototype, Cw = Tw.toString, il = bw.Symbol, ol = il ? il.prototype : void 0, sl = ol ? ol.toString : void 0;
function Ow(e) {
  if (typeof e == "string")
    return e;
  if (Rw(e))
    return sl ? sl.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function $w(e) {
  return !!e && typeof e == "object";
}
function Rw(e) {
  return typeof e == "symbol" || $w(e) && Cw.call(e) == ww;
}
function Pw(e) {
  return e == null ? "" : Ow(e);
}
function Iw(e) {
  return e = Pw(e), e && _w.test(e) ? e.replace(yf, "\\$&") : e;
}
var Dw = Iw;
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.newBaseUrl = Fw;
Ue.newUrlFromBase = qo;
Ue.getChannelFilename = xw;
Ue.blockmapFiles = Lw;
const Ef = or, Nw = Dw;
function Fw(e) {
  const t = new Ef.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function qo(e, t, r = !1) {
  const n = new Ef.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function xw(e) {
  return `${e}.yml`;
}
function Lw(e, t, r) {
  const n = qo(`${e.pathname}.blockmap`, e);
  return [qo(`${e.pathname.replace(new RegExp(Nw(r), "g"), t)}.blockmap`, e), n];
}
var ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.Provider = void 0;
ue.findFile = Mw;
ue.parseUpdateInfo = jw;
ue.getFileList = vf;
ue.resolveFiles = Bw;
const yt = pe, Uw = Ee, al = Ue;
class kw {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, yt.configureRequestUrl)(t, n), n;
  }
}
ue.Provider = kw;
function Mw(e, t, r) {
  if (e.length === 0)
    throw (0, yt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function jw(e, t, r) {
  if (e == null)
    throw (0, yt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, Uw.load)(e);
  } catch (i) {
    throw (0, yt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function vf(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, yt.newError)(`No files provided: ${(0, yt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Bw(e, t, r = (n) => n) {
  const i = vf(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, yt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, yt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, al.newUrlFromBase)(r(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, al.newUrlFromBase)(r(s.path), t).href
  }), i;
}
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.GenericProvider = void 0;
const ll = pe, Hi = Ue, Gi = ue;
class qw extends Gi.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Hi.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Hi.getChannelFilename)(this.channel), r = (0, Hi.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Gi.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof ll.HttpError && i.statusCode === 404)
          throw (0, ll.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, s) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (a) {
              s(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Gi.resolveFiles)(t, this.baseUrl);
  }
}
Qr.GenericProvider = qw;
var ci = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.BitbucketProvider = void 0;
const cl = pe, Wi = Ue, Vi = ue;
class Hw extends Vi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Wi.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new cl.CancellationToken(), r = (0, Wi.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Wi.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Vi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, cl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Vi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ui.BitbucketProvider = Hw;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.GitHubProvider = Et.BaseGitHubProvider = void 0;
Et.computeReleaseNotes = _f;
const Qe = pe, Jt = mf, Gw = or, Kt = Ue, Ho = ue, zi = /\/tag\/([^/]+)$/;
class wf extends Ho.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Kt.newBaseUrl)((0, Qe.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Kt.newBaseUrl)((0, Qe.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Et.BaseGitHubProvider = wf;
class Ww extends wf {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const s = new Qe.CancellationToken(), a = await this.httpRequest((0, Kt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, Qe.parseXml)(a);
    let f = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Jt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          c = zi.exec(f.element("link").attribute("href"))[1];
        else
          for (const A of l.getElements("entry")) {
            const b = zi.exec(A.element("link").attribute("href"));
            if (b === null)
              continue;
            const D = b[1], x = ((n = Jt.prerelease(D)) === null || n === void 0 ? void 0 : n[0]) || null, B = !_ || ["alpha", "beta"].includes(_), q = x !== null && !["alpha", "beta"].includes(String(x));
            if (B && !q && !(_ === "beta" && x === "alpha")) {
              c = D;
              break;
            }
            if (x && x === _) {
              c = D;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const _ of l.getElements("entry"))
          if (zi.exec(_.element("link").attribute("href"))[1] === c) {
            f = _;
            break;
          }
      }
    } catch (_) {
      throw (0, Qe.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Qe.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", p = "";
    const v = async (_) => {
      h = (0, Kt.getChannelFilename)(_), p = (0, Kt.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const A = this.createRequestOptions(p);
      try {
        return await this.executor.request(A, s);
      } catch (b) {
        throw b instanceof Qe.HttpError && b.statusCode === 404 ? (0, Qe.newError)(`Cannot find ${h} in the latest release artifacts (${p}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = Jt.prerelease(c)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((o = Jt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await v(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        u = await v(this.getDefaultChannelName());
      else
        throw _;
    }
    const E = (0, Ho.parseUpdateInfo)(u, h, p);
    return E.releaseName == null && (E.releaseName = f.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = _f(this.updater.currentVersion, this.updater.fullChangelog, l, f)), {
      tag: c,
      ...E
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Kt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Gw.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Qe.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Ho.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Et.GitHubProvider = Ww;
function ul(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function _f(e, t, r, n) {
  if (!t)
    return ul(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Jt.lt(e, s) && i.push({
      version: s,
      note: ul(o)
    });
  }
  return i.sort((o, s) => Jt.rcompare(o.version, s.version));
}
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.KeygenProvider = void 0;
const fl = pe, Yi = Ue, Xi = ue;
class Vw extends Xi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Yi.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new fl.CancellationToken(), r = (0, Yi.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Yi.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Xi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, fl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Xi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
fi.KeygenProvider = Vw;
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.PrivateGitHubProvider = void 0;
const Ht = pe, zw = Ee, Yw = K, dl = or, hl = Ue, Xw = Et, Jw = ue;
class Kw extends Xw.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Ht.CancellationToken(), r = (0, hl.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((a) => a.name === r);
    if (i == null)
      throw (0, Ht.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new dl.URL(i.url);
    let s;
    try {
      s = (0, zw.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof Ht.HttpError && a.statusCode === 404 ? (0, Ht.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return s.assets = n.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, hl.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((s) => s.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Ht.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Jw.getFileList)(t).map((r) => {
      const n = Yw.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Ht.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new dl.URL(i.url),
        info: r
      };
    });
  }
}
di.PrivateGitHubProvider = Kw;
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.isUrlProbablySupportMultiRangeRequests = Sf;
ci.createClient = r_;
const bn = pe, Qw = ui, pl = Qr, Zw = Et, e_ = fi, t_ = di;
function Sf(e) {
  return !e.includes("s3.amazonaws.com");
}
function r_(e, t, r) {
  if (typeof e == "string")
    throw (0, bn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Zw.GitHubProvider(i, t, r) : new t_.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Qw.BitbucketProvider(e, t, r);
    case "keygen":
      return new e_.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new pl.GenericProvider({
        provider: "generic",
        url: (0, bn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new pl.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Sf(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, bn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, bn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var hi = {}, Zr = {}, cr = {}, Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.OperationKind = void 0;
Ut.computeOperations = n_;
var It;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(It || (Ut.OperationKind = It = {}));
function n_(e, t, r) {
  const n = gl(e.files), i = gl(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, f = n.get(l);
  if (f == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: p } = o_(n.get(l), f.offset, r);
  let v = s.offset;
  for (let E = 0; E < c.checksums.length; v += c.sizes[E], E++) {
    const _ = c.sizes[E], A = c.checksums[E];
    let b = h.get(A);
    b != null && p.get(A) !== _ && (r.warn(`Checksum ("${A}") matches, but size differs (old: ${p.get(A)}, new: ${_})`), b = void 0), b === void 0 ? (u++, o != null && o.kind === It.DOWNLOAD && o.end === v ? o.end += _ : (o = {
      kind: It.DOWNLOAD,
      start: v,
      end: v + _
      // oldBlocks: null,
    }, ml(o, a, A, E))) : o != null && o.kind === It.COPY && o.end === b ? o.end += _ : (o = {
      kind: It.COPY,
      start: b,
      end: b + _
      // oldBlocks: [checksum]
    }, ml(o, a, A, E));
  }
  return u > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const i_ = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function ml(e, t, r, n) {
  if (i_ && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${It[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function o_(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], l = e.sizes[s], f = i.get(a);
    if (f === void 0)
      n.set(a, o), i.set(a, l);
    else if (r.debug != null) {
      const c = f === l ? "(same size)" : `(size: ${f}, this size: ${l})`;
      r.debug(`${a} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function gl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.DataSplitter = void 0;
cr.copyData = Af;
const Tn = pe, s_ = Fe, a_ = qr, l_ = Ut, yl = Buffer.from(`\r
\r
`);
var at;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(at || (at = {}));
function Af(e, t, r, n, i) {
  const o = (0, s_.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class c_ extends a_.Writable {
  constructor(t, r, n, i, o, s) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = at.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Tn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === at.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = at.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === at.BODY)
          this.readState = at.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Tn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, Tn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = at.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== l_.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Af(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(yl, r);
    if (n !== -1)
      return n + yl.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Tn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), o();
      });
    });
  }
}
cr.DataSplitter = c_;
var pi = {};
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.executeTasksUsingMultipleRangeRequests = u_;
pi.checkIsRangesSupported = Wo;
const Go = pe, El = cr, vl = Ut;
function u_(e, t, r, n, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const a = s + 1e3;
    f_(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: n
    }, r, () => o(a), i);
  };
  return o;
}
function f_(e, t, r, n, i) {
  let o = "bytes=", s = 0;
  const a = /* @__PURE__ */ new Map(), l = [];
  for (let u = t.start; u < t.end; u++) {
    const h = t.tasks[u];
    h.kind === vl.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, a.set(s, u), s++, l.push(h.end - h.start));
  }
  if (s <= 1) {
    const u = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const p = t.tasks[h++];
      if (p.kind === vl.OperationKind.COPY)
        (0, El.copyData)(p, r, t.oldFileFd, i, () => u(h));
      else {
        const v = e.createRequestOptions();
        v.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const E = e.httpExecutor.createRequest(v, (_) => {
          Wo(_, i) && (_.pipe(r, {
            end: !1
          }), _.once("end", () => u(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(E, i), E.end();
      }
    };
    u(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(f, (u) => {
    if (!Wo(u, i))
      return;
    const h = (0, Go.safeGetHeader)(u, "content-type"), p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const v = new El.DataSplitter(r, t, a, p[1] || p[2], l, n);
    v.on("error", i), u.pipe(v), u.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function Wo(e, t) {
  if (e.statusCode >= 400)
    return t((0, Go.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Go.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var mi = {};
Object.defineProperty(mi, "__esModule", { value: !0 });
mi.ProgressDifferentialDownloadCallbackTransform = void 0;
const d_ = qr;
var Qt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Qt || (Qt = {}));
class h_ extends d_.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Qt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Qt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Qt.COPY;
  }
  beginRangeDownload() {
    this.operationType = Qt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
mi.ProgressDifferentialDownloadCallbackTransform = h_;
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.DifferentialDownloader = void 0;
const vr = pe, Ji = wt, p_ = Fe, m_ = cr, g_ = or, Cn = Ut, wl = pi, y_ = mi;
class E_ {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, vr.configureRequestUrl)(this.options.newUrl, t), (0, vr.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, Cn.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const l of i) {
      const f = l.end - l.start;
      l.kind === Cn.OperationKind.DOWNLOAD ? o += f : s += f;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return n.info(`Full: ${_l(a)}, To download: ${_l(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, Ji.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, Ji.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, Ji.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, p_.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const A = [];
        let b = 0;
        for (const x of t)
          x.kind === Cn.OperationKind.DOWNLOAD && (A.push(x.end - x.start), b += x.end - x.start);
        const D = {
          expectedByteCounts: A,
          grandTotal: b
        };
        f = new y_.ProgressDifferentialDownloadCallbackTransform(D, this.options.cancellationToken, this.options.onProgress), l.push(f);
      }
      const c = new vr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            c.validate();
          } catch (A) {
            a(A);
            return;
          }
          s(void 0);
        });
      }), l.push(o);
      let u = null;
      for (const A of l)
        A.on("error", a), u == null ? u = A : u = u.pipe(A);
      const h = l[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, wl.executeTasksUsingMultipleRangeRequests)(this, t, h, n, a), p(0);
        return;
      }
      let v = 0, E = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const _ = this.createRequestOptions();
      _.redirect = "manual", p = (A) => {
        var b, D;
        if (A >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const x = t[A++];
        if (x.kind === Cn.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, m_.copyData)(x, h, n, a, () => p(A));
          return;
        }
        const B = `bytes=${x.start}-${x.end - 1}`;
        _.headers.range = B, (D = (b = this.logger) === null || b === void 0 ? void 0 : b.debug) === null || D === void 0 || D.call(b, `download range: ${B}`), f && f.beginRangeDownload();
        const q = this.httpExecutor.createRequest(_, (j) => {
          j.on("error", a), j.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), j.statusCode >= 400 && a((0, vr.createHttpError)(j)), j.pipe(h, {
            end: !1
          }), j.once("end", () => {
            f && f.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => p(A), 1e3)) : p(A);
          });
        });
        q.on("redirect", (j, ae, y) => {
          this.logger.info(`Redirect to ${v_(y)}`), E = y, (0, vr.configureRequestUrl)(new g_.URL(E), _), q.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(q, a), q.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (s) => {
      s.copy(n, o), o += s.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (s) => {
        (0, wl.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", r), s.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Zr.DifferentialDownloader = E_;
function _l(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function v_(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(hi, "__esModule", { value: !0 });
hi.GenericDifferentialDownloader = void 0;
const w_ = Zr;
class __ extends w_.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
hi.GenericDifferentialDownloader = __;
var _t = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = pe;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      n(this.emitter, "login", o);
    }
    progress(o) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      n(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      n(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = r;
  function n(i, o, s) {
    i.on(o, s);
  }
})(_t);
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.NoOpLogger = pt.AppUpdater = void 0;
const Ae = pe, S_ = Gr, A_ = vt, b_ = zn, Gt = wt, T_ = Ee, Ki = ri, Ot = K, Rt = mf, Sl = Kr, C_ = li, Al = gf, O_ = Qr, Qi = ci, $_ = yc, R_ = Ue, P_ = hi, Wt = _t;
class As extends b_.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Ae.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Ae.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, Al.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new bf();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Ki.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Wt.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this.clientPromise = null, this.stagingUserIdPromise = new Ki.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Ki.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), r == null ? (this.app = new C_.ElectronAppAdapter(), this.httpExecutor = new Al.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Rt.parse)(n);
    if (i == null)
      throw (0, Ae.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = I_(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new O_.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, Qi.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, Qi.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = As.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new ht.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, s = Ae.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${s}, user id: ${i}`), s < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Rt.parse)(t.version);
    if (r == null)
      throw (0, Ae.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Rt.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const o = (0, Rt.gt)(r, n), s = (0, Rt.lt)(r, n);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, A_.release)();
    if (r)
      try {
        if ((0, Rt.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, Qi.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new Ae.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Ae.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Ae.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Ae.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof Ae.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Wt.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, T_.load)(await (0, Gt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Ot.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Gt.readFile)(t, "utf-8");
      if (Ae.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = Ae.UUID.v5((0, S_.randomBytes)(4096), Ae.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Gt.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Ot.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Sl.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Wt.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (b) => this.emit(Wt.DOWNLOAD_PROGRESS, b));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = r.packageInfo;
    function a() {
      const b = decodeURIComponent(t.fileInfo.url.pathname);
      return b.endsWith(`.${t.fileExtension}`) ? Ot.basename(b) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), f = l.cacheDirForPendingUpdate;
    await (0, Gt.mkdir)(f, { recursive: !0 });
    const c = a();
    let u = Ot.join(f, c);
    const h = s == null ? null : Ot.join(f, `package-${o}${Ot.extname(s.path) || ".7z"}`), p = async (b) => (await l.setDownloadedFile(u, h, i, r, c, b), await t.done({
      ...i,
      downloadedFile: u
    }), h == null ? [u] : [u, h]), v = this._logger, E = await l.validateDownloadedPath(u, i, r, v);
    if (E != null)
      return u = E, await p(!1);
    const _ = async () => (await l.clear().catch(() => {
    }), await (0, Gt.unlink)(u).catch(() => {
    })), A = await (0, Sl.createTempUpdateFile)(`temp-${c}`, f, v);
    try {
      await t.task(A, n, h, _), await (0, Ae.retry)(() => (0, Gt.rename)(A, u), 60, 500, 0, 0, (b) => b instanceof Error && /^EBUSY:/.test(b.message));
    } catch (b) {
      throw await _(), b instanceof Ae.CancellationError && (v.info("cancelled"), this.emit("update-cancelled", i)), b;
    }
    return v.info(`New version ${o} has been downloaded to ${u}`), await p(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const s = (0, R_.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const a = async (c) => {
        const u = await this.httpExecutor.downloadToBuffer(c, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (u == null || u.length === 0)
          throw new Error(`Blockmap "${c.href}" is empty`);
        try {
          return JSON.parse((0, $_.gunzipSync)(u).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${c.href}", error: ${h}`);
        }
      }, l = {
        newUrl: t.url,
        oldFile: Ot.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Wt.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (c) => this.emit(Wt.DOWNLOAD_PROGRESS, c));
      const f = await Promise.all(s.map((c) => a(c)));
      return await new P_.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(f[0], f[1]), !1;
    } catch (s) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), this._testOnlyOptions != null)
        throw s;
      return !0;
    }
  }
}
pt.AppUpdater = As;
function I_(e) {
  const t = (0, Rt.prerelease)(e);
  return t != null && t.length > 0;
}
class bf {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
pt.NoOpLogger = bf;
Object.defineProperty(et, "__esModule", { value: !0 });
et.BaseUpdater = void 0;
const bl = Hr, D_ = pt;
class N_ extends D_.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      ht.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, o = n == null ? null : n.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, bl.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: s, stdout: a, stderr: l } = i;
    if (o != null)
      throw this._logger.error(l), o;
    if (s != null && s !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${s}`);
    return a.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((o, s) => {
      try {
        const a = { stdio: i, env: n, detached: !0 }, l = (0, bl.spawn)(t, r, a);
        l.on("error", (f) => {
          s(f);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
et.BaseUpdater = N_;
var Lr = {}, en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Vt = wt, F_ = Zr, x_ = yc;
class L_ extends F_.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = Tf(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await U_(this.options.oldFile), i);
  }
}
en.FileWithEmbeddedBlockMapDifferentialDownloader = L_;
function Tf(e) {
  return JSON.parse((0, x_.inflateRawSync)(e).toString());
}
async function U_(e) {
  const t = await (0, Vt.open)(e, "r");
  try {
    const r = (await (0, Vt.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Vt.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Vt.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Vt.close)(t), Tf(i);
  } catch (r) {
    throw await (0, Vt.close)(t), r;
  }
}
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.AppImageUpdater = void 0;
const Tl = pe, Cl = Hr, k_ = wt, M_ = Fe, wr = K, j_ = et, B_ = en, q_ = ue, Ol = _t;
class H_ extends j_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, q_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, Tl.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, s, i, r, t)) && await this.httpExecutor.download(n.url, i, o), await (0, k_.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, o) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(Ol.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Ol.DOWNLOAD_PROGRESS, a)), await new B_.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, Tl.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, M_.unlinkSync)(r);
    let n;
    const i = wr.basename(r), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    wr.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = wr.join(wr.dirname(r), wr.basename(o)), (0, Cl.execFileSync)("mv", ["-f", o, n]), n !== r && this.emit("appimage-filename-updated", n);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Cl.execFileSync)(n, [], { env: s })), !0;
  }
}
Lr.AppImageUpdater = H_;
var Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.DebUpdater = void 0;
const G_ = et, W_ = ue, $l = _t;
class V_ extends G_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, W_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount($l.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit($l.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Ur.DebUpdater = V_;
var kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.PacmanUpdater = void 0;
const z_ = et, Rl = _t, Y_ = ue;
class X_ extends z_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Y_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Rl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Rl.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
kr.PacmanUpdater = X_;
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.RpmUpdater = void 0;
const J_ = et, Pl = _t, K_ = ue;
class Q_ extends J_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, K_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Pl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Pl.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let s;
    return i ? s = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Mr.RpmUpdater = Q_;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.MacUpdater = void 0;
const Il = pe, Zi = wt, Z_ = Fe, Dl = K, eS = Ec, tS = pt, rS = ue, Nl = Hr, Fl = Gr;
class nS extends tS.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = ht.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, Nl.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (u) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, Nl.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), s = s || h;
    } catch (u) {
      n.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    s = s || process.arch === "arm64" || o;
    const a = (u) => {
      var h;
      return u.url.pathname.includes("arm64") || ((h = u.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    s && r.some(a) ? r = r.filter((u) => s === a(u)) : r = r.filter((u) => !a(u));
    const l = (0, rS.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, Il.newError)(`ZIP file not provided: ${(0, Il.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (u, h) => {
        const p = Dl.join(this.downloadedUpdateHelper.cacheDir, c), v = () => (0, Zi.pathExistsSync)(p) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let E = !0;
        v() && (E = await this.differentialDownloadInstaller(l, t, u, f, c)), E && await this.httpExecutor.download(l.url, u, h);
      },
      done: async (u) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = Dl.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, Zi.copyFile)(u.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, u);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Zi.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, eS.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const l = (f) => {
      const c = f.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((f, c) => {
      const u = (0, Fl.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), p = `/${(0, Fl.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (v, E) => {
        const _ = v.url;
        if (s.info(`${_} requested`), _ === "/") {
          if (!v.headers.authorization || v.headers.authorization.indexOf("Basic ") === -1) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), s.warn("No authenthication info");
            return;
          }
          const D = v.headers.authorization.split(" ")[1], x = Buffer.from(D, "base64").toString("ascii"), [B, q] = x.split(":");
          if (B !== "autoupdater" || q !== u) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const j = Buffer.from(`{ "url": "${l(this.server)}${p}" }`);
          E.writeHead(200, { "Content-Type": "application/json", "Content-Length": j.length }), E.end(j);
          return;
        }
        if (!_.startsWith(p)) {
          s.warn(`${_} requested, but not supported`), E.writeHead(404), E.end();
          return;
        }
        s.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let A = !1;
        E.on("finish", () => {
          A || (this.nativeUpdater.removeListener("error", c), f([]));
        });
        const b = (0, Z_.createReadStream)(i);
        b.on("error", (D) => {
          try {
            E.end();
          } catch (x) {
            s.warn(`cannot end response: ${x}`);
          }
          A = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${D}`));
        }), E.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), b.pipe(E);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : f([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
jr.MacUpdater = nS;
var Br = {}, bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
bs.verifySignature = oS;
const xl = pe, Cf = Hr, iS = vt, Ll = K;
function oS(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, Cf.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, a, l) => {
      var f;
      try {
        if (s != null || l) {
          eo(r, s, l, i), n(null);
          return;
        }
        const c = sS(a);
        if (c.Status === 0) {
          try {
            const v = Ll.normalize(c.Path), E = Ll.normalize(t);
            if (r.info(`LiteralPath: ${v}. Update Path: ${E}`), v !== E) {
              eo(r, new Error(`LiteralPath of ${v} is different than ${E}`), l, i), n(null);
              return;
            }
          } catch (v) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = v.message) !== null && f !== void 0 ? f : v.stack}`);
          }
          const h = (0, xl.parseDn)(c.SignerCertificate.Subject);
          let p = !1;
          for (const v of e) {
            const E = (0, xl.parseDn)(v);
            if (E.size ? p = Array.from(E.keys()).every((A) => E.get(A) === h.get(A)) : v === h.get("CN") && (r.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (h, p) => h === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (c) {
        eo(r, c, null, i), n(null);
        return;
      }
    });
  });
}
function sS(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function eo(e, t, r, n) {
  if (aS()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Cf.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function aS() {
  const e = iS.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.NsisUpdater = void 0;
const On = pe, Ul = K, lS = et, cS = en, kl = _t, uS = ue, fS = wt, dS = bs, Ml = or;
class hS extends lS.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, dS.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, uS.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, o, s, a) => {
        const l = n.packageInfo, f = l != null && s != null;
        if (f && t.disableWebInstaller)
          throw (0, On.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, On.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await a(), (0, On.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, l, s, r))
          try {
            await this.httpExecutor.download(new Ml.URL(l.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (u) {
            try {
              await (0, fS.unlink)(s);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(Ul.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(r, n).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? ht.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new Ml.URL(r.path),
        oldFile: Ul.join(this.downloadedUpdateHelper.cacheDir, On.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(kl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(kl.DOWNLOAD_PROGRESS, s)), await new cS.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Br.NsisUpdater = hS;
(function(e) {
  var t = be && be.__createBinding || (Object.create ? function(_, A, b, D) {
    D === void 0 && (D = b);
    var x = Object.getOwnPropertyDescriptor(A, b);
    (!x || ("get" in x ? !A.__esModule : x.writable || x.configurable)) && (x = { enumerable: !0, get: function() {
      return A[b];
    } }), Object.defineProperty(_, D, x);
  } : function(_, A, b, D) {
    D === void 0 && (D = b), _[D] = A[b];
  }), r = be && be.__exportStar || function(_, A) {
    for (var b in _) b !== "default" && !Object.prototype.hasOwnProperty.call(A, b) && t(A, _, b);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = wt, i = K;
  var o = et;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = pt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = ue;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var l = Lr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var f = Ur;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var c = kr;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var u = Mr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var h = jr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var p = Br;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), r(_t, e);
  let v;
  function E() {
    if (process.platform === "win32")
      v = new Br.NsisUpdater();
    else if (process.platform === "darwin")
      v = new jr.MacUpdater();
    else {
      v = new Lr.AppImageUpdater();
      try {
        const _ = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(_))
          return v;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const A = (0, n.readFileSync)(_).toString().trim();
        switch (console.info("Found package-type:", A), A) {
          case "deb":
            v = new Ur.DebUpdater();
            break;
          case "rpm":
            v = new Mr.RpmUpdater();
            break;
          case "pacman":
            v = new kr.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (_) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", _.message);
      }
    }
    return v;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => v || E()
  });
})(Ye);
var Dn = { exports: {} }, to = { exports: {} }, jl;
function Of() {
  return jl || (jl = 1, function(e) {
    let t = {};
    try {
      t = require("electron");
    } catch {
    }
    t.ipcRenderer && r(t), e.exports = r;
    function r({ contextBridge: n, ipcRenderer: i }) {
      if (!i)
        return;
      i.on("__ELECTRON_LOG_IPC__", (s, a) => {
        window.postMessage({ cmd: "message", ...a });
      }), i.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((s) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${s.message}`
      )));
      const o = {
        sendToMain(s) {
          try {
            i.send("__ELECTRON_LOG__", s);
          } catch (a) {
            console.error("electronLog.sendToMain ", a, "data:", s), i.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: a == null ? void 0 : a.message, stack: a == null ? void 0 : a.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...s) {
          o.sendToMain({ data: s, level: "info" });
        }
      };
      for (const s of ["error", "warn", "info", "verbose", "debug", "silly"])
        o[s] = (...a) => o.sendToMain({
          data: a,
          level: s
        });
      if (n && process.contextIsolated)
        try {
          n.exposeInMainWorld("__electronLog", o);
        } catch {
        }
      typeof window == "object" ? window.__electronLog = o : __electronLog = o;
    }
  }(to)), to.exports;
}
var ro = { exports: {} }, no, Bl;
function pS() {
  if (Bl) return no;
  Bl = 1, no = e;
  function e(t) {
    return Object.defineProperties(r, {
      defaultLabel: { value: "", writable: !0 },
      labelPadding: { value: !0, writable: !0 },
      maxLabelLength: { value: 0, writable: !0 },
      labelLength: {
        get() {
          switch (typeof r.labelPadding) {
            case "boolean":
              return r.labelPadding ? r.maxLabelLength : 0;
            case "number":
              return r.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function r(n) {
      r.maxLabelLength = Math.max(r.maxLabelLength, n.length);
      const i = {};
      for (const o of t.levels)
        i[o] = (...s) => t.logData(s, { level: o, scope: n });
      return i.log = i.info, i;
    }
  }
  return no;
}
var io, ql;
function mS() {
  if (ql) return io;
  ql = 1;
  class e {
    constructor({ processMessage: r }) {
      this.processMessage = r, this.buffer = [], this.enabled = !1, this.begin = this.begin.bind(this), this.commit = this.commit.bind(this), this.reject = this.reject.bind(this);
    }
    addMessage(r) {
      this.buffer.push(r);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = !1, this.buffer.forEach((r) => this.processMessage(r)), this.buffer = [];
    }
    reject() {
      this.enabled = !1, this.buffer = [];
    }
  }
  return io = e, io;
}
var oo, Hl;
function $f() {
  if (Hl) return oo;
  Hl = 1;
  const e = pS(), t = mS(), n = class n {
    constructor({
      allowUnknownLevel: o = !1,
      dependencies: s = {},
      errorHandler: a,
      eventLogger: l,
      initializeFn: f,
      isDev: c = !1,
      levels: u = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId: h,
      transportFactories: p = {},
      variables: v
    } = {}) {
      V(this, "dependencies", {});
      V(this, "errorHandler", null);
      V(this, "eventLogger", null);
      V(this, "functions", {});
      V(this, "hooks", []);
      V(this, "isDev", !1);
      V(this, "levels", null);
      V(this, "logId", null);
      V(this, "scope", null);
      V(this, "transports", {});
      V(this, "variables", {});
      this.addLevel = this.addLevel.bind(this), this.create = this.create.bind(this), this.initialize = this.initialize.bind(this), this.logData = this.logData.bind(this), this.processMessage = this.processMessage.bind(this), this.allowUnknownLevel = o, this.buffering = new t(this), this.dependencies = s, this.initializeFn = f, this.isDev = c, this.levels = u, this.logId = h, this.scope = e(this), this.transportFactories = p, this.variables = v || {};
      for (const E of this.levels)
        this.addLevel(E, !1);
      this.log = this.info, this.functions.log = this.log, this.errorHandler = a, a == null || a.setOptions({ ...s, logFn: this.error }), this.eventLogger = l, l == null || l.setOptions({ ...s, logger: this });
      for (const [E, _] of Object.entries(p))
        this.transports[E] = _(this, s);
      n.instances[h] = this;
    }
    static getInstance({ logId: o }) {
      return this.instances[o] || this.instances.default;
    }
    addLevel(o, s = this.levels.length) {
      s !== !1 && this.levels.splice(s, 0, o), this[o] = (...a) => this.logData(a, { level: o }), this.functions[o] = this[o];
    }
    catchErrors(o) {
      return this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      ), this.errorHandler.startCatching(o);
    }
    create(o) {
      return typeof o == "string" && (o = { logId: o }), new n({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...o
      });
    }
    compareLevels(o, s, a = this.levels) {
      const l = a.indexOf(o), f = a.indexOf(s);
      return f === -1 || l === -1 ? !0 : f <= l;
    }
    initialize(o = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...o });
    }
    logData(o, s = {}) {
      this.buffering.enabled ? this.buffering.addMessage({ data: o, date: /* @__PURE__ */ new Date(), ...s }) : this.processMessage({ data: o, ...s });
    }
    processMessage(o, { transports: s = this.transports } = {}) {
      if (o.cmd === "errorHandler") {
        this.errorHandler.handle(o.error, {
          errorName: o.errorName,
          processType: "renderer",
          showDialog: !!o.showDialog
        });
        return;
      }
      let a = o.level;
      this.allowUnknownLevel || (a = this.levels.includes(o.level) ? o.level : "info");
      const l = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...o,
        level: a,
        variables: {
          ...this.variables,
          ...o.variables
        }
      };
      for (const [f, c] of this.transportEntries(s))
        if (!(typeof c != "function" || c.level === !1) && this.compareLevels(c.level, o.level))
          try {
            const u = this.hooks.reduce((h, p) => h && p(h, c, f), l);
            u && c({ ...u, data: [...u.data] });
          } catch (u) {
            this.processInternalErrorFn(u);
          }
    }
    processInternalErrorFn(o) {
    }
    transportEntries(o = this.transports) {
      return (Array.isArray(o) ? o : Object.entries(o)).map((a) => {
        switch (typeof a) {
          case "string":
            return this.transports[a] ? [a, this.transports[a]] : null;
          case "function":
            return [a.name, a];
          default:
            return Array.isArray(a) ? a : null;
        }
      }).filter(Boolean);
    }
  };
  V(n, "instances", {});
  let r = n;
  return oo = r, oo;
}
var so, Gl;
function gS() {
  if (Gl) return so;
  Gl = 1;
  const e = console.error;
  class t {
    constructor({ logFn: n = null } = {}) {
      V(this, "logFn", null);
      V(this, "onError", null);
      V(this, "showDialog", !1);
      V(this, "preventDefault", !0);
      this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.startCatching = this.startCatching.bind(this), this.logFn = n;
    }
    handle(n, {
      logFn: i = this.logFn,
      errorName: o = "",
      onError: s = this.onError,
      showDialog: a = this.showDialog
    } = {}) {
      try {
        (s == null ? void 0 : s({ error: n, errorName: o, processType: "renderer" })) !== !1 && i({ error: n, errorName: o, showDialog: a });
      } catch {
        e(n);
      }
    }
    setOptions({ logFn: n, onError: i, preventDefault: o, showDialog: s }) {
      typeof n == "function" && (this.logFn = n), typeof i == "function" && (this.onError = i), typeof o == "boolean" && (this.preventDefault = o), typeof s == "boolean" && (this.showDialog = s);
    }
    startCatching({ onError: n, showDialog: i } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: n, showDialog: i }), window.addEventListener("error", (o) => {
        var s;
        this.preventDefault && ((s = o.preventDefault) == null || s.call(o)), this.handleError(o.error || o);
      }), window.addEventListener("unhandledrejection", (o) => {
        var s;
        this.preventDefault && ((s = o.preventDefault) == null || s.call(o)), this.handleRejection(o.reason || o);
      }));
    }
    handleError(n) {
      this.handle(n, { errorName: "Unhandled" });
    }
    handleRejection(n) {
      const i = n instanceof Error ? n : new Error(JSON.stringify(n));
      this.handle(i, { errorName: "Unhandled rejection" });
    }
  }
  return so = t, so;
}
var ao, Wl;
function kt() {
  if (Wl) return ao;
  Wl = 1, ao = { transform: e };
  function e({
    logger: t,
    message: r,
    transport: n,
    initialData: i = (r == null ? void 0 : r.data) || [],
    transforms: o = n == null ? void 0 : n.transforms
  }) {
    return o.reduce((s, a) => typeof a == "function" ? a({ data: s, logger: t, message: r, transport: n }) : s, i);
  }
  return ao;
}
var lo, Vl;
function yS() {
  if (Vl) return lo;
  Vl = 1;
  const { transform: e } = kt();
  lo = r;
  const t = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function r(i) {
    return Object.assign(o, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      transforms: [n],
      writeFn({ message: { level: s, data: a } }) {
        const l = t[s] || t.info;
        setTimeout(() => l(...a));
      }
    });
    function o(s) {
      o.writeFn({
        message: { ...s, data: e({ logger: i, message: s, transport: o }) }
      });
    }
  }
  function n({
    data: i = [],
    logger: o = {},
    message: s = {},
    transport: a = {}
  }) {
    if (typeof a.format == "function")
      return a.format({
        data: i,
        level: (s == null ? void 0 : s.level) || "info",
        logger: o,
        message: s,
        transport: a
      });
    if (typeof a.format != "string")
      return i;
    i.unshift(a.format), typeof i[1] == "string" && i[1].match(/%[1cdfiOos]/) && (i = [`${i[0]}${i[1]}`, ...i.slice(2)]);
    const l = s.date || /* @__PURE__ */ new Date();
    return i[0] = i[0].replace(/\{(\w+)}/g, (f, c) => {
      var u, h;
      switch (c) {
        case "level":
          return s.level;
        case "logId":
          return s.logId;
        case "scope": {
          const p = s.scope || ((u = o.scope) == null ? void 0 : u.defaultLabel);
          return p ? ` (${p})` : "";
        }
        case "text":
          return "";
        case "y":
          return l.getFullYear().toString(10);
        case "m":
          return (l.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return l.getDate().toString(10).padStart(2, "0");
        case "h":
          return l.getHours().toString(10).padStart(2, "0");
        case "i":
          return l.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return l.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return l.getMilliseconds().toString(10).padStart(3, "0");
        case "iso":
          return l.toISOString();
        default:
          return ((h = s.variables) == null ? void 0 : h[c]) || f;
      }
    }).trim(), i;
  }
  return lo;
}
var co, zl;
function ES() {
  if (zl) return co;
  zl = 1;
  const { transform: e } = kt();
  co = r;
  const t = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function r(o) {
    return Object.assign(s, {
      depth: 5,
      transforms: [i]
    });
    function s(a) {
      if (!window.__electronLog) {
        o.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        const l = e({
          initialData: a,
          logger: o,
          message: a,
          transport: s
        });
        __electronLog.sendToMain(l);
      } catch (l) {
        o.transports.console({
          data: ["electronLog.transports.ipc", l, "data:", a.data],
          level: "error"
        });
      }
    }
  }
  function n(o) {
    return Object(o) !== o;
  }
  function i({
    data: o,
    depth: s,
    seen: a = /* @__PURE__ */ new WeakSet(),
    transport: l = {}
  } = {}) {
    const f = s || l.depth || 5;
    return a.has(o) ? "[Circular]" : f < 1 ? n(o) ? o : Array.isArray(o) ? "[Array]" : `[${typeof o}]` : ["function", "symbol"].includes(typeof o) ? o.toString() : n(o) ? o : t.has(o.constructor) ? `[${o.constructor.name}]` : Array.isArray(o) ? o.map((c) => i({
      data: c,
      depth: f - 1,
      seen: a
    })) : o instanceof Date ? o.toISOString() : o instanceof Error ? o.stack : o instanceof Map ? new Map(
      Array.from(o).map(([c, u]) => [
        i({ data: c, depth: f - 1, seen: a }),
        i({ data: u, depth: f - 1, seen: a })
      ])
    ) : o instanceof Set ? new Set(
      Array.from(o).map(
        (c) => i({ data: c, depth: f - 1, seen: a })
      )
    ) : (a.add(o), Object.fromEntries(
      Object.entries(o).map(
        ([c, u]) => [
          c,
          i({ data: u, depth: f - 1, seen: a })
        ]
      )
    ));
  }
  return co;
}
var Yl;
function vS() {
  return Yl || (Yl = 1, function(e) {
    const t = $f(), r = gS(), n = yS(), i = ES();
    typeof process == "object" && process.type === "browser" && console.warn(
      "electron-log/renderer is loaded in the main process. It could cause unexpected behaviour."
    ), e.exports = o(), e.exports.Logger = t, e.exports.default = e.exports;
    function o() {
      const s = new t({
        allowUnknownLevel: !0,
        errorHandler: new r(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: n,
          ipc: i
        },
        variables: {
          processType: "renderer"
        }
      });
      return s.errorHandler.setOptions({
        logFn({ error: a, errorName: l, showDialog: f }) {
          s.transports.console({
            data: [l, a].filter(Boolean),
            level: "error"
          }), s.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: a == null ? void 0 : a.cause,
              code: a == null ? void 0 : a.code,
              name: a == null ? void 0 : a.name,
              message: a == null ? void 0 : a.message,
              stack: a == null ? void 0 : a.stack
            },
            errorName: l,
            logId: s.logId,
            showDialog: f
          });
        }
      }), typeof window == "object" && window.addEventListener("message", (a) => {
        const { cmd: l, logId: f, ...c } = a.data || {}, u = t.getInstance({ logId: f });
        l === "message" && u.processMessage(c, { transports: ["console"] });
      }), new Proxy(s, {
        get(a, l) {
          return typeof a[l] < "u" ? a[l] : (...f) => s.logData(f, { level: l });
        }
      });
    }
  }(ro)), ro.exports;
}
var uo, Xl;
function wS() {
  if (Xl) return uo;
  Xl = 1;
  const e = Fe, t = K;
  uo = {
    findAndReadPackageJson: r,
    tryReadJsonAt: n
  };
  function r() {
    return n(s()) || n(o()) || n(process.resourcesPath, "app.asar") || n(process.resourcesPath, "app") || n(process.cwd()) || { name: void 0, version: void 0 };
  }
  function n(...a) {
    if (a[0])
      try {
        const l = t.join(...a), f = i("package.json", l);
        if (!f)
          return;
        const c = JSON.parse(e.readFileSync(f, "utf8")), u = (c == null ? void 0 : c.productName) || (c == null ? void 0 : c.name);
        return !u || u.toLowerCase() === "electron" ? void 0 : u ? { name: u, version: c == null ? void 0 : c.version } : void 0;
      } catch {
        return;
      }
  }
  function i(a, l) {
    let f = l;
    for (; ; ) {
      const c = t.parse(f), u = c.root, h = c.dir;
      if (e.existsSync(t.join(f, a)))
        return t.resolve(t.join(f, a));
      if (f === u)
        return null;
      f = h;
    }
  }
  function o() {
    const a = process.argv.filter((f) => f.indexOf("--user-data-dir=") === 0);
    return a.length === 0 || typeof a[0] != "string" ? null : a[0].replace("--user-data-dir=", "");
  }
  function s() {
    var a;
    try {
      return (a = require.main) == null ? void 0 : a.filename;
    } catch {
      return;
    }
  }
  return uo;
}
var fo, Jl;
function Rf() {
  if (Jl) return fo;
  Jl = 1;
  const e = Hr, t = vt, r = K, n = wS();
  class i {
    constructor() {
      V(this, "appName");
      V(this, "appPackageJson");
      V(this, "platform", process.platform);
    }
    getAppLogPath(s = this.getAppName()) {
      return this.platform === "darwin" ? r.join(this.getSystemPathHome(), "Library/Logs", s) : r.join(this.getAppUserDataPath(s), "logs");
    }
    getAppName() {
      var a;
      const s = this.appName || ((a = this.getAppPackageJson()) == null ? void 0 : a.name);
      if (!s)
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      return s;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      return typeof this.appPackageJson != "object" && (this.appPackageJson = n.findAndReadPackageJson()), this.appPackageJson;
    }
    getAppUserDataPath(s = this.getAppName()) {
      return s ? r.join(this.getSystemPathAppData(), s) : void 0;
    }
    getAppVersion() {
      var s;
      return (s = this.getAppPackageJson()) == null ? void 0 : s.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const s = Number(t.release().split(".")[0]);
      return s <= 19 ? `10.${s - 4}` : s - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let s = t.type().replace("_", " "), a = t.release();
      return s === "Darwin" && (s = "macOS", a = this.getMacOsVersion()), `${s} ${a}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const s = this.getAppName(), a = this.getAppVersion(), l = this;
      return {
        appData: this.getSystemPathAppData(),
        appName: s,
        appVersion: a,
        get electronDefaultDir() {
          return l.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(s),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(s)
      };
    }
    getSystemPathAppData() {
      const s = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin":
          return r.join(s, "Library/Application Support");
        case "win32":
          return process.env.APPDATA || r.join(s, "AppData/Roaming");
        default:
          return process.env.XDG_CONFIG_HOME || r.join(s, ".config");
      }
    }
    getSystemPathHome() {
      var s;
      return ((s = t.homedir) == null ? void 0 : s.call(t)) || process.env.HOME;
    }
    getSystemPathTemp() {
      return t.tmpdir();
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: void 0,
        os: this.getOsVersion()
      };
    }
    isDev() {
      return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
    }
    isElectron() {
      return !!process.versions.electron;
    }
    onAppEvent(s, a) {
    }
    onAppReady(s) {
      s();
    }
    onEveryWebContentsEvent(s, a) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(s, a) {
    }
    onIpcInvoke(s, a) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(s, a = console.error) {
      const f = { darwin: "open", win32: "start", linux: "xdg-open" }[process.platform] || "xdg-open";
      e.exec(`${f} ${s}`, {}, (c) => {
        c && a(c);
      });
    }
    setAppName(s) {
      this.appName = s;
    }
    setPlatform(s) {
      this.platform = s;
    }
    setPreloadFileForSessions({
      filePath: s,
      // eslint-disable-line no-unused-vars
      includeFutureSession: a = !0,
      // eslint-disable-line no-unused-vars
      getSessions: l = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(s, a) {
    }
    showErrorBox(s, a) {
    }
  }
  return fo = i, fo;
}
var ho, Kl;
function _S() {
  if (Kl) return ho;
  Kl = 1;
  const e = K, t = Rf();
  class r extends t {
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron: o } = {}) {
      super();
      /**
       * @type {typeof Electron}
       */
      V(this, "electron");
      this.electron = o;
    }
    getAppName() {
      var s, a;
      let o;
      try {
        o = this.appName || ((s = this.electron.app) == null ? void 0 : s.name) || ((a = this.electron.app) == null ? void 0 : a.getName());
      } catch {
      }
      return o || super.getAppName();
    }
    getAppUserDataPath(o) {
      return this.getPath("userData") || super.getAppUserDataPath(o);
    }
    getAppVersion() {
      var s;
      let o;
      try {
        o = (s = this.electron.app) == null ? void 0 : s.getVersion();
      } catch {
      }
      return o || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(o) {
      var s;
      try {
        return (s = this.electron.app) == null ? void 0 : s.getPath(o);
      } catch {
        return;
      }
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: `Electron ${process.versions.electron}`,
        os: this.getOsVersion()
      };
    }
    getSystemPathAppData() {
      return this.getPath("appData") || super.getSystemPathAppData();
    }
    isDev() {
      var o;
      return ((o = this.electron.app) == null ? void 0 : o.isPackaged) !== void 0 ? !this.electron.app.isPackaged : typeof process.execPath == "string" ? e.basename(process.execPath).toLowerCase().startsWith("electron") : super.isDev();
    }
    onAppEvent(o, s) {
      var a;
      return (a = this.electron.app) == null || a.on(o, s), () => {
        var l;
        (l = this.electron.app) == null || l.off(o, s);
      };
    }
    onAppReady(o) {
      var s, a, l;
      (s = this.electron.app) != null && s.isReady() ? o() : (a = this.electron.app) != null && a.once ? (l = this.electron.app) == null || l.once("ready", o) : o();
    }
    onEveryWebContentsEvent(o, s) {
      var l, f, c;
      return (f = (l = this.electron.webContents) == null ? void 0 : l.getAllWebContents()) == null || f.forEach((u) => {
        u.on(o, s);
      }), (c = this.electron.app) == null || c.on("web-contents-created", a), () => {
        var u, h;
        (u = this.electron.webContents) == null || u.getAllWebContents().forEach((p) => {
          p.off(o, s);
        }), (h = this.electron.app) == null || h.off("web-contents-created", a);
      };
      function a(u, h) {
        h.on(o, s);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(o, s) {
      var a;
      (a = this.electron.ipcMain) == null || a.on(o, s);
    }
    onIpcInvoke(o, s) {
      var a, l;
      (l = (a = this.electron.ipcMain) == null ? void 0 : a.handle) == null || l.call(a, o, s);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(o, s = console.error) {
      var a;
      (a = this.electron.shell) == null || a.openExternal(o).catch(s);
    }
    setPreloadFileForSessions({
      filePath: o,
      includeFutureSession: s = !0,
      getSessions: a = () => {
        var l;
        return [(l = this.electron.session) == null ? void 0 : l.defaultSession];
      }
    }) {
      for (const f of a().filter(Boolean))
        l(f);
      s && this.onAppEvent("session-created", (f) => {
        l(f);
      });
      function l(f) {
        typeof f.registerPreloadScript == "function" ? f.registerPreloadScript({
          filePath: o,
          id: "electron-log-preload",
          type: "frame"
        }) : f.setPreloads([...f.getPreloads(), o]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(o, s) {
      var a, l;
      (l = (a = this.electron.BrowserWindow) == null ? void 0 : a.getAllWindows()) == null || l.forEach((f) => {
        var c, u;
        ((c = f.webContents) == null ? void 0 : c.isDestroyed()) === !1 && ((u = f.webContents) == null ? void 0 : u.isCrashed()) === !1 && f.webContents.send(o, s);
      });
    }
    showErrorBox(o, s) {
      var a;
      (a = this.electron.dialog) == null || a.showErrorBox(o, s);
    }
  }
  return ho = r, ho;
}
var po, Ql;
function SS() {
  if (Ql) return po;
  Ql = 1;
  const e = Fe, t = vt, r = K, n = Of();
  let i = !1, o = !1;
  po = {
    initialize({
      externalApi: l,
      getSessions: f,
      includeFutureSession: c,
      logger: u,
      preload: h = !0,
      spyRendererConsole: p = !1
    }) {
      l.onAppReady(() => {
        try {
          h && s({
            externalApi: l,
            getSessions: f,
            includeFutureSession: c,
            logger: u,
            preloadOption: h
          }), p && a({ externalApi: l, logger: u });
        } catch (v) {
          u.warn(v);
        }
      });
    }
  };
  function s({
    externalApi: l,
    getSessions: f,
    includeFutureSession: c,
    logger: u,
    preloadOption: h
  }) {
    let p = typeof h == "string" ? h : void 0;
    if (i) {
      u.warn(new Error("log.initialize({ preload }) already called").stack);
      return;
    }
    i = !0;
    try {
      p = r.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!p || !e.existsSync(p)) {
      p = r.join(
        l.getAppUserDataPath() || t.tmpdir(),
        "electron-log-preload.js"
      );
      const v = `
      try {
        (${n.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      e.writeFileSync(p, v, "utf8");
    }
    l.setPreloadFileForSessions({
      filePath: p,
      includeFutureSession: c,
      getSessions: f
    });
  }
  function a({ externalApi: l, logger: f }) {
    if (o) {
      f.warn(
        new Error("log.initialize({ spyRendererConsole }) already called").stack
      );
      return;
    }
    o = !0;
    const c = ["debug", "info", "warn", "error"];
    l.onEveryWebContentsEvent(
      "console-message",
      (u, h, p) => {
        f.processMessage({
          data: [p],
          level: c[h],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return po;
}
var mo, Zl;
function AS() {
  if (Zl) return mo;
  Zl = 1;
  class e {
    constructor({
      externalApi: n,
      logFn: i = void 0,
      onError: o = void 0,
      showDialog: s = void 0
    } = {}) {
      V(this, "externalApi");
      V(this, "isActive", !1);
      V(this, "logFn");
      V(this, "onError");
      V(this, "showDialog", !0);
      this.createIssue = this.createIssue.bind(this), this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.setOptions({ externalApi: n, logFn: i, onError: o, showDialog: s }), this.startCatching = this.startCatching.bind(this), this.stopCatching = this.stopCatching.bind(this);
    }
    handle(n, {
      logFn: i = this.logFn,
      onError: o = this.onError,
      processType: s = "browser",
      showDialog: a = this.showDialog,
      errorName: l = ""
    } = {}) {
      var f;
      n = t(n);
      try {
        if (typeof o == "function") {
          const c = ((f = this.externalApi) == null ? void 0 : f.getVersions()) || {}, u = this.createIssue;
          if (o({
            createIssue: u,
            error: n,
            errorName: l,
            processType: s,
            versions: c
          }) === !1)
            return;
        }
        l ? i(l, n) : i(n), a && !l.includes("rejection") && this.externalApi && this.externalApi.showErrorBox(
          `A JavaScript error occurred in the ${s} process`,
          n.stack
        );
      } catch {
        console.error(n);
      }
    }
    setOptions({ externalApi: n, logFn: i, onError: o, showDialog: s }) {
      typeof n == "object" && (this.externalApi = n), typeof i == "function" && (this.logFn = i), typeof o == "function" && (this.onError = o), typeof s == "boolean" && (this.showDialog = s);
    }
    startCatching({ onError: n, showDialog: i } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: n, showDialog: i }), process.on("uncaughtException", this.handleError), process.on("unhandledRejection", this.handleRejection));
    }
    stopCatching() {
      this.isActive = !1, process.removeListener("uncaughtException", this.handleError), process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(n, i) {
      var o;
      (o = this.externalApi) == null || o.openUrl(
        `${n}?${new URLSearchParams(i).toString()}`
      );
    }
    handleError(n) {
      this.handle(n, { errorName: "Unhandled" });
    }
    handleRejection(n) {
      const i = n instanceof Error ? n : new Error(JSON.stringify(n));
      this.handle(i, { errorName: "Unhandled rejection" });
    }
  }
  function t(r) {
    if (r instanceof Error)
      return r;
    if (r && typeof r == "object") {
      if (r.message)
        return Object.assign(new Error(r.message), r);
      try {
        return new Error(JSON.stringify(r));
      } catch (n) {
        return new Error(`Couldn't normalize error ${String(r)}: ${n}`);
      }
    }
    return new Error(`Can't normalize error ${String(r)}`);
  }
  return mo = e, mo;
}
var go, ec;
function bS() {
  if (ec) return go;
  ec = 1;
  class e {
    constructor(r = {}) {
      V(this, "disposers", []);
      V(this, "format", "{eventSource}#{eventName}:");
      V(this, "formatters", {
        app: {
          "certificate-error": ({ args: r }) => this.arrayToObject(r.slice(1, 4), [
            "url",
            "error",
            "certificate"
          ]),
          "child-process-gone": ({ args: r }) => r.length === 1 ? r[0] : r,
          "render-process-gone": ({ args: [r, n] }) => n && typeof n == "object" ? { ...n, ...this.getWebContentsDetails(r) } : []
        },
        webContents: {
          "console-message": ({ args: [r, n, i, o] }) => {
            if (!(r < 3))
              return { message: n, source: `${o}:${i}` };
          },
          "did-fail-load": ({ args: r }) => this.arrayToObject(r, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "did-fail-provisional-load": ({ args: r }) => this.arrayToObject(r, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "plugin-crashed": ({ args: r }) => this.arrayToObject(r, ["name", "version"]),
          "preload-error": ({ args: r }) => this.arrayToObject(r, ["preloadPath", "error"])
        }
      });
      V(this, "events", {
        app: {
          "certificate-error": !0,
          "child-process-gone": !0,
          "render-process-gone": !0
        },
        webContents: {
          // 'console-message': true,
          "did-fail-load": !0,
          "did-fail-provisional-load": !0,
          "plugin-crashed": !0,
          "preload-error": !0,
          unresponsive: !0
        }
      });
      V(this, "externalApi");
      V(this, "level", "error");
      V(this, "scope", "");
      this.setOptions(r);
    }
    setOptions({
      events: r,
      externalApi: n,
      level: i,
      logger: o,
      format: s,
      formatters: a,
      scope: l
    }) {
      typeof r == "object" && (this.events = r), typeof n == "object" && (this.externalApi = n), typeof i == "string" && (this.level = i), typeof o == "object" && (this.logger = o), (typeof s == "string" || typeof s == "function") && (this.format = s), typeof a == "object" && (this.formatters = a), typeof l == "string" && (this.scope = l);
    }
    startLogging(r = {}) {
      this.setOptions(r), this.disposeListeners();
      for (const n of this.getEventNames(this.events.app))
        this.disposers.push(
          this.externalApi.onAppEvent(n, (...i) => {
            this.handleEvent({ eventSource: "app", eventName: n, handlerArgs: i });
          })
        );
      for (const n of this.getEventNames(this.events.webContents))
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            n,
            (...i) => {
              this.handleEvent(
                { eventSource: "webContents", eventName: n, handlerArgs: i }
              );
            }
          )
        );
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(r, n) {
      const i = {};
      return n.forEach((o, s) => {
        i[o] = r[s];
      }), r.length > n.length && (i.unknownArgs = r.slice(n.length)), i;
    }
    disposeListeners() {
      this.disposers.forEach((r) => r()), this.disposers = [];
    }
    formatEventLog({ eventName: r, eventSource: n, handlerArgs: i }) {
      var u;
      const [o, ...s] = i;
      if (typeof this.format == "function")
        return this.format({ args: s, event: o, eventName: r, eventSource: n });
      const a = (u = this.formatters[n]) == null ? void 0 : u[r];
      let l = s;
      if (typeof a == "function" && (l = a({ args: s, event: o, eventName: r, eventSource: n })), !l)
        return;
      const f = {};
      return Array.isArray(l) ? f.args = l : typeof l == "object" && Object.assign(f, l), n === "webContents" && Object.assign(f, this.getWebContentsDetails(o == null ? void 0 : o.sender)), [this.format.replace("{eventSource}", n === "app" ? "App" : "WebContents").replace("{eventName}", r), f];
    }
    getEventNames(r) {
      return !r || typeof r != "object" ? [] : Object.entries(r).filter(([n, i]) => i).map(([n]) => n);
    }
    getWebContentsDetails(r) {
      if (!(r != null && r.loadURL))
        return {};
      try {
        return {
          webContents: {
            id: r.id,
            url: r.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName: r, eventSource: n, handlerArgs: i }) {
      var s;
      const o = this.formatEventLog({ eventName: r, eventSource: n, handlerArgs: i });
      if (o) {
        const a = this.scope ? this.logger.scope(this.scope) : this.logger;
        (s = a == null ? void 0 : a[this.level]) == null || s.call(a, ...o);
      }
    }
  }
  return go = e, go;
}
var yo, tc;
function Pf() {
  if (tc) return yo;
  tc = 1;
  const { transform: e } = kt();
  yo = {
    concatFirstStringElements: t,
    formatScope: n,
    formatText: o,
    formatVariables: i,
    timeZoneFromOffset: r,
    format({ message: s, logger: a, transport: l, data: f = s == null ? void 0 : s.data }) {
      switch (typeof l.format) {
        case "string":
          return e({
            message: s,
            logger: a,
            transforms: [i, n, o],
            transport: l,
            initialData: [l.format, ...f]
          });
        case "function":
          return l.format({
            data: f,
            level: (s == null ? void 0 : s.level) || "info",
            logger: a,
            message: s,
            transport: l
          });
        default:
          return f;
      }
    }
  };
  function t({ data: s }) {
    return typeof s[0] != "string" || typeof s[1] != "string" || s[0].match(/%[1cdfiOos]/) ? s : [`${s[0]} ${s[1]}`, ...s.slice(2)];
  }
  function r(s) {
    const a = Math.abs(s), l = s > 0 ? "-" : "+", f = Math.floor(a / 60).toString().padStart(2, "0"), c = (a % 60).toString().padStart(2, "0");
    return `${l}${f}:${c}`;
  }
  function n({ data: s, logger: a, message: l }) {
    const { defaultLabel: f, labelLength: c } = (a == null ? void 0 : a.scope) || {}, u = s[0];
    let h = l.scope;
    h || (h = f);
    let p;
    return h === "" ? p = c > 0 ? "".padEnd(c + 3) : "" : typeof h == "string" ? p = ` (${h})`.padEnd(c + 3) : p = "", s[0] = u.replace("{scope}", p), s;
  }
  function i({ data: s, message: a }) {
    let l = s[0];
    if (typeof l != "string")
      return s;
    l = l.replace("{level}]", `${a.level}]`.padEnd(6, " "));
    const f = a.date || /* @__PURE__ */ new Date();
    return s[0] = l.replace(/\{(\w+)}/g, (c, u) => {
      var h;
      switch (u) {
        case "level":
          return a.level || "info";
        case "logId":
          return a.logId;
        case "y":
          return f.getFullYear().toString(10);
        case "m":
          return (f.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return f.getDate().toString(10).padStart(2, "0");
        case "h":
          return f.getHours().toString(10).padStart(2, "0");
        case "i":
          return f.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return f.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return f.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return r(f.getTimezoneOffset());
        case "iso":
          return f.toISOString();
        default:
          return ((h = a.variables) == null ? void 0 : h[u]) || c;
      }
    }).trim(), s;
  }
  function o({ data: s }) {
    const a = s[0];
    if (typeof a != "string")
      return s;
    if (a.lastIndexOf("{text}") === a.length - 6)
      return s[0] = a.replace(/\s?{text}/, ""), s[0] === "" && s.shift(), s;
    const f = a.split("{text}");
    let c = [];
    return f[0] !== "" && c.push(f[0]), c = c.concat(s.slice(1)), f[1] !== "" && c.push(f[1]), c;
  }
  return yo;
}
var Eo = { exports: {} }, rc;
function gi() {
  return rc || (rc = 1, function(e) {
    const t = Vn;
    e.exports = {
      serialize: n,
      maxDepth({ data: i, transport: o, depth: s = (o == null ? void 0 : o.depth) ?? 6 }) {
        if (!i)
          return i;
        if (s < 1)
          return Array.isArray(i) ? "[array]" : typeof i == "object" && i ? "[object]" : i;
        if (Array.isArray(i))
          return i.map((l) => e.exports.maxDepth({
            data: l,
            depth: s - 1
          }));
        if (typeof i != "object" || i && typeof i.toISOString == "function")
          return i;
        if (i === null)
          return null;
        if (i instanceof Error)
          return i;
        const a = {};
        for (const l in i)
          Object.prototype.hasOwnProperty.call(i, l) && (a[l] = e.exports.maxDepth({
            data: i[l],
            depth: s - 1
          }));
        return a;
      },
      toJSON({ data: i }) {
        return JSON.parse(JSON.stringify(i, r()));
      },
      toString({ data: i, transport: o }) {
        const s = (o == null ? void 0 : o.inspectOptions) || {}, a = i.map((l) => {
          if (l !== void 0)
            try {
              const f = JSON.stringify(l, r(), "  ");
              return f === void 0 ? void 0 : JSON.parse(f);
            } catch {
              return l;
            }
        });
        return t.formatWithOptions(s, ...a);
      }
    };
    function r(i = {}) {
      const o = /* @__PURE__ */ new WeakSet();
      return function(s, a) {
        if (typeof a == "object" && a !== null) {
          if (o.has(a))
            return;
          o.add(a);
        }
        return n(s, a, i);
      };
    }
    function n(i, o, s = {}) {
      const a = (s == null ? void 0 : s.serializeMapAndSet) !== !1;
      return o instanceof Error ? o.stack : o && (typeof o == "function" ? `[function] ${o.toString()}` : o instanceof Date ? o.toISOString() : a && o instanceof Map && Object.fromEntries ? Object.fromEntries(o) : a && o instanceof Set && Array.from ? Array.from(o) : o);
    }
  }(Eo)), Eo.exports;
}
var vo, nc;
function Ts() {
  if (nc) return vo;
  nc = 1, vo = {
    transformStyles: n,
    applyAnsiStyles({ data: i }) {
      return n(i, t, r);
    },
    removeStyles({ data: i }) {
      return n(i, () => "");
    }
  };
  const e = {
    unset: "\x1B[0m",
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m",
    gray: "\x1B[90m"
  };
  function t(i) {
    const o = i.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return e[o] || "";
  }
  function r(i) {
    return i + e.unset;
  }
  function n(i, o, s) {
    const a = {};
    return i.reduce((l, f, c, u) => {
      if (a[c])
        return l;
      if (typeof f == "string") {
        let h = c, p = !1;
        f = f.replace(/%[1cdfiOos]/g, (v) => {
          if (h += 1, v !== "%c")
            return v;
          const E = u[h];
          return typeof E == "string" ? (a[h] = !0, p = !0, o(E, f)) : v;
        }), p && s && (f = s(f));
      }
      return l.push(f), l;
    }, []);
  }
  return vo;
}
var wo, ic;
function TS() {
  if (ic) return wo;
  ic = 1;
  const {
    concatFirstStringElements: e,
    format: t
  } = Pf(), { maxDepth: r, toJSON: n } = gi(), {
    applyAnsiStyles: i,
    removeStyles: o
  } = Ts(), { transform: s } = kt(), a = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  wo = c;
  const f = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
  Object.assign(c, {
    DEFAULT_FORMAT: f
  });
  function c(E) {
    return Object.assign(_, {
      colorMap: {
        error: "red",
        warn: "yellow",
        info: "cyan",
        verbose: "unset",
        debug: "gray",
        silly: "gray",
        default: "unset"
      },
      format: f,
      level: "silly",
      transforms: [
        u,
        t,
        p,
        e,
        r,
        n
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message: A }) {
        (a[A.level] || a.info)(...A.data);
      }
    });
    function _(A) {
      const b = s({ logger: E, message: A, transport: _ });
      _.writeFn({
        message: { ...A, data: b }
      });
    }
  }
  function u({ data: E, message: _, transport: A }) {
    return typeof A.format != "string" || !A.format.includes("%c") ? E : [
      `color:${v(_.level, A)}`,
      "color:unset",
      ...E
    ];
  }
  function h(E, _) {
    if (typeof E == "boolean")
      return E;
    const b = _ === "error" || _ === "warn" ? process.stderr : process.stdout;
    return b && b.isTTY;
  }
  function p(E) {
    const { message: _, transport: A } = E;
    return (h(A.useStyles, _.level) ? i : o)(E);
  }
  function v(E, _) {
    return _.colorMap[E] || _.colorMap.default;
  }
  return wo;
}
var _o, oc;
function If() {
  if (oc) return _o;
  oc = 1;
  const e = zn, t = Fe, r = vt;
  class n extends e {
    constructor({
      path: a,
      writeOptions: l = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync: f = !1
    }) {
      super();
      V(this, "asyncWriteQueue", []);
      V(this, "bytesWritten", 0);
      V(this, "hasActiveAsyncWriting", !1);
      V(this, "path", null);
      V(this, "initialSize");
      V(this, "writeOptions", null);
      V(this, "writeAsync", !1);
      this.path = a, this.writeOptions = l, this.writeAsync = f;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        return t.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        }), this.reset(), !0;
      } catch (a) {
        return a.code === "ENOENT" ? !0 : (this.emit("error", a, this), !1);
      }
    }
    crop(a) {
      try {
        const l = i(this.path, a || 4096);
        this.clear(), this.writeLine(`[log cropped]${r.EOL}${l}`);
      } catch (l) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${l.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0)
        try {
          const a = t.statSync(this.path);
          this.initialSize = a.size;
        } catch {
          this.initialSize = 0;
        }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(a) {
      this.bytesWritten += Buffer.byteLength(a, this.writeOptions.encoding);
    }
    isNull() {
      return !1;
    }
    nextAsyncWrite() {
      const a = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0)
        return;
      const l = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [], this.hasActiveAsyncWriting = !0, t.writeFile(this.path, l, this.writeOptions, (f) => {
        a.hasActiveAsyncWriting = !1, f ? a.emit(
          "error",
          new Error(`Couldn't write to ${a.path}. ${f.message}`),
          this
        ) : a.increaseBytesWrittenCounter(l), a.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0, this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(a) {
      if (a += r.EOL, this.writeAsync) {
        this.asyncWriteQueue.push(a), this.nextAsyncWrite();
        return;
      }
      try {
        t.writeFileSync(this.path, a, this.writeOptions), this.increaseBytesWrittenCounter(a);
      } catch (l) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${l.message}`),
          this
        );
      }
    }
  }
  _o = n;
  function i(o, s) {
    const a = Buffer.alloc(s), l = t.statSync(o), f = Math.min(l.size, s), c = Math.max(0, l.size - s), u = t.openSync(o, "r"), h = t.readSync(u, a, 0, f, c);
    return t.closeSync(u), a.toString("utf8", 0, h);
  }
  return _o;
}
var So, sc;
function CS() {
  if (sc) return So;
  sc = 1;
  const e = If();
  class t extends e {
    clear() {
    }
    crop() {
    }
    getSize() {
      return 0;
    }
    isNull() {
      return !0;
    }
    writeLine() {
    }
  }
  return So = t, So;
}
var Ao, ac;
function OS() {
  if (ac) return Ao;
  ac = 1;
  const e = zn, t = Fe, r = K, n = If(), i = CS();
  class o extends e {
    constructor() {
      super();
      V(this, "store", {});
      this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath: l, writeOptions: f = {}, writeAsync: c = !1 }) {
      let u;
      try {
        if (l = r.resolve(l), this.store[l])
          return this.store[l];
        u = this.createFile({ filePath: l, writeOptions: f, writeAsync: c });
      } catch (h) {
        u = new i({ path: l }), this.emitError(h, u);
      }
      return u.on("error", this.emitError), this.store[l] = u, u;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath: l, writeOptions: f, writeAsync: c }) {
      return this.testFileWriting({ filePath: l, writeOptions: f }), new n({ path: l, writeOptions: f, writeAsync: c });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(l, f) {
      this.emit("error", l, f);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath: l, writeOptions: f }) {
      t.mkdirSync(r.dirname(l), { recursive: !0 }), t.writeFileSync(l, "", { flag: "a", mode: f.mode });
    }
  }
  return Ao = o, Ao;
}
var bo, lc;
function $S() {
  if (lc) return bo;
  lc = 1;
  const e = Fe, t = vt, r = K, n = OS(), { transform: i } = kt(), { removeStyles: o } = Ts(), {
    format: s,
    concatFirstStringElements: a
  } = Pf(), { toString: l } = gi();
  bo = c;
  const f = new n();
  function c(h, { registry: p = f, externalApi: v } = {}) {
    let E;
    return p.listenerCount("error") < 1 && p.on("error", (B, q) => {
      b(`Can't write to ${q}`, B);
    }), Object.assign(_, {
      fileName: u(h.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile: D,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs: x,
      sync: !0,
      transforms: [o, s, a, l],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn(B) {
        const q = B.toString(), j = r.parse(q);
        try {
          e.renameSync(q, r.join(j.dir, `${j.name}.old${j.ext}`));
        } catch (ae) {
          b("Could not rotate log", ae);
          const y = Math.round(_.maxSize / 4);
          B.crop(Math.min(y, 256 * 1024));
        }
      },
      resolvePathFn(B) {
        return r.join(B.libraryDefaultDir, B.fileName);
      },
      setAppName(B) {
        h.dependencies.externalApi.setAppName(B);
      }
    });
    function _(B) {
      const q = D(B);
      _.maxSize > 0 && q.size > _.maxSize && (_.archiveLogFn(q), q.reset());
      const ae = i({ logger: h, message: B, transport: _ });
      q.writeLine(ae);
    }
    function A() {
      E || (E = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            v.getPathVariables()
          ),
          fileName: {
            get() {
              return _.fileName;
            },
            enumerable: !0
          }
        }
      ), typeof _.archiveLog == "function" && (_.archiveLogFn = _.archiveLog, b("archiveLog is deprecated. Use archiveLogFn instead")), typeof _.resolvePath == "function" && (_.resolvePathFn = _.resolvePath, b("resolvePath is deprecated. Use resolvePathFn instead")));
    }
    function b(B, q = null, j = "error") {
      const ae = [`electron-log.transports.file: ${B}`];
      q && ae.push(q), h.transports.console({ data: ae, date: /* @__PURE__ */ new Date(), level: j });
    }
    function D(B) {
      A();
      const q = _.resolvePathFn(E, B);
      return p.provide({
        filePath: q,
        writeAsync: !_.sync,
        writeOptions: _.writeOptions
      });
    }
    function x({ fileFilter: B = (q) => q.endsWith(".log") } = {}) {
      A();
      const q = r.dirname(_.resolvePathFn(E));
      return e.existsSync(q) ? e.readdirSync(q).map((j) => r.join(q, j)).filter(B).map((j) => {
        try {
          return {
            path: j,
            lines: e.readFileSync(j, "utf8").split(t.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean) : [];
    }
  }
  function u(h = process.type) {
    switch (h) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return bo;
}
var To, cc;
function RS() {
  if (cc) return To;
  cc = 1;
  const { maxDepth: e, toJSON: t } = gi(), { transform: r } = kt();
  To = n;
  function n(i, { externalApi: o }) {
    return Object.assign(s, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: i.isDev ? "silly" : !1,
      transforms: [t, e]
    }), o != null && o.isElectron() ? s : void 0;
    function s(a) {
      var l;
      ((l = a == null ? void 0 : a.variables) == null ? void 0 : l.processType) !== "renderer" && (o == null || o.sendIpc(s.eventId, {
        ...a,
        data: r({ logger: i, message: a, transport: s })
      }));
    }
  }
  return To;
}
var Co, uc;
function PS() {
  if (uc) return Co;
  uc = 1;
  const e = Ec, t = Gd, { transform: r } = kt(), { removeStyles: n } = Ts(), { toJSON: i, maxDepth: o } = gi();
  Co = s;
  function s(a) {
    return Object.assign(l, {
      client: { name: "electron-application" },
      depth: 6,
      level: !1,
      requestOptions: {},
      transforms: [n, i, o],
      makeBodyFn({ message: f }) {
        return JSON.stringify({
          client: l.client,
          data: f.data,
          date: f.date.getTime(),
          level: f.level,
          scope: f.scope,
          variables: f.variables
        });
      },
      processErrorFn({ error: f }) {
        a.processMessage(
          {
            data: [`electron-log: can't POST ${l.url}`, f],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl: f, requestOptions: c, body: u }) {
        const p = (f.startsWith("https:") ? t : e).request(f, {
          method: "POST",
          ...c,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": u.length,
            ...c.headers
          }
        });
        return p.write(u), p.end(), p;
      }
    });
    function l(f) {
      if (!l.url)
        return;
      const c = l.makeBodyFn({
        logger: a,
        message: { ...f, data: r({ logger: a, message: f, transport: l }) },
        transport: l
      }), u = l.sendRequestFn({
        serverUrl: l.url,
        requestOptions: l.requestOptions,
        body: Buffer.from(c, "utf8")
      });
      u.on("error", (h) => l.processErrorFn({
        error: h,
        logger: a,
        message: f,
        request: u,
        transport: l
      }));
    }
  }
  return Co;
}
var Oo, fc;
function Df() {
  if (fc) return Oo;
  fc = 1;
  const e = $f(), t = AS(), r = bS(), n = TS(), i = $S(), o = RS(), s = PS();
  Oo = a;
  function a({ dependencies: l, initializeFn: f }) {
    var u;
    const c = new e({
      dependencies: l,
      errorHandler: new t(),
      eventLogger: new r(),
      initializeFn: f,
      isDev: (u = l.externalApi) == null ? void 0 : u.isDev(),
      logId: "default",
      transportFactories: {
        console: n,
        file: i,
        ipc: o,
        remote: s
      },
      variables: {
        processType: "main"
      }
    });
    return c.default = c, c.Logger = e, c.processInternalErrorFn = (h) => {
      c.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", h],
          level: "error"
        }
      });
    }, c;
  }
  return Oo;
}
var $o, dc;
function IS() {
  if (dc) return $o;
  dc = 1;
  const e = ht, t = _S(), { initialize: r } = SS(), n = Df(), i = new t({ electron: e }), o = n({
    dependencies: { externalApi: i },
    initializeFn: r
  });
  $o = o, i.onIpc("__ELECTRON_LOG__", (a, l) => {
    l.scope && o.Logger.getInstance(l).scope(l.scope);
    const f = new Date(l.date);
    s({
      ...l,
      date: f.getTime() ? f : /* @__PURE__ */ new Date()
    });
  }), i.onIpcInvoke("__ELECTRON_LOG__", (a, { cmd: l = "", logId: f }) => {
    switch (l) {
      case "getOptions":
        return {
          levels: o.Logger.getInstance({ logId: f }).levels,
          logId: f
        };
      default:
        return s({ data: [`Unknown cmd '${l}'`], level: "error" }), {};
    }
  });
  function s(a) {
    var l;
    (l = o.Logger.getInstance(a)) == null || l.processMessage(a);
  }
  return $o;
}
var Ro, hc;
function DS() {
  if (hc) return Ro;
  hc = 1;
  const e = Rf(), t = Df(), r = new e();
  return Ro = t({
    dependencies: { externalApi: r }
  }), Ro;
}
const NS = typeof process > "u" || process.type === "renderer" || process.type === "worker", FS = typeof process == "object" && process.type === "browser";
NS ? (Of(), Dn.exports = vS()) : FS ? Dn.exports = IS() : Dn.exports = DS();
var xS = Dn.exports;
const ur = /* @__PURE__ */ Wd(xS);
Ye.autoUpdater.logger = ur;
Ye.autoUpdater.logger.transports.file.level = "debug";
ur.info("🚀 App iniciado, logger funcionando!");
jd(import.meta.url);
const Nf = ft.dirname(Bd(import.meta.url));
process.env.APP_ROOT = ft.join(Nf, "..");
const Vo = process.env.VITE_DEV_SERVER_URL, nA = ft.join(process.env.APP_ROOT, "dist-electron"), Ff = ft.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Vo ? ft.join(process.env.APP_ROOT, "public") : Ff;
let st;
function xf() {
  st = new pc({
    icon: ft.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ft.join(Nf, "preload.mjs")
    }
  }), st.webContents.on("did-finish-load", () => {
    st == null || st.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Vo ? st.loadURL(Vo) : st.loadFile(ft.join(Ff, "index.html"));
}
Nn.on("window-all-closed", () => {
  process.platform !== "darwin" && (Nn.quit(), st = null);
});
Nn.on("activate", () => {
  pc.getAllWindows().length === 0 && xf();
});
Nn.on("ready", () => {
  xf(), Ye.autoUpdater.checkForUpdatesAndNotify();
});
Ye.autoUpdater.on("checking-for-update", () => {
  ur.info("🔍 verificando updates...");
});
Ye.autoUpdater.on("update-available", (e) => {
  ur.info(`📦 update disponível: ${e.version}`), zo.showMessageBox({
    type: "info",
    title: "Update disponível",
    message: "Uma nova versão foi encontrada, será baixada em segundo plano."
  });
});
Ye.autoUpdater.on("update-not-available", () => {
  ur.info("✅ nenhum update disponível."), zo.showMessageBox({
    type: "info",
    title: "Update indisponível",
    message: "Uma nova versão não foi encontrada."
  });
});
Ye.autoUpdater.on("update-downloaded", () => {
  zo.showMessageBox({
    type: "question",
    buttons: ["Reiniciar agora", "Depois"],
    defaultId: 0,
    message: "Update baixado. Deseja reiniciar agora para aplicar?"
  }).then((e) => {
    e.response === 0 && Ye.autoUpdater.quitAndInstall();
  });
});
Ye.autoUpdater.on("error", (e) => {
  ur.error("❌ erro no autoUpdater:", e);
});
export {
  nA as MAIN_DIST,
  Ff as RENDERER_DIST,
  Vo as VITE_DEV_SERVER_URL
};
