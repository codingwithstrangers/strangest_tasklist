var V = (m) => {
  throw TypeError(m);
};
var A = (m, p, T) => p.has(m) || V("Cannot " + T);
var l = (m, p, T) => (
    A(m, p, "read from private field"), T ? T.call(m) : p.get(m)
  ),
  C = (m, p, T) =>
    p.has(m)
      ? V("Cannot add the same private member more than once")
      : p instanceof WeakSet
      ? p.add(m)
      : p.set(m, T),
  S = (m, p, T, _) => (
    A(m, p, "write to private field"), _ ? _.call(m, T) : p.set(m, T), T
  ),
  y = (m, p, T) => (A(m, p, "access private method"), T);
(function () {
  "use strict";
  var F, j, $, g, J, E, w, f, v, b, M, k, L;
  let m,
    p,
    T = !1;
  const _ = getComputedStyle(document.documentElement)
    .getPropertyValue("--card-gap-between")
    .slice(0, -2);
  function O() {
    const e = document.querySelector(".task-wrapper").clientHeight,
      t = document.querySelector(".task-container.primary"),
      s = t.scrollHeight,
      o = document.querySelector(".task-container.secondary");
    if (s > e && !T) {
      o.style.display = "block";
      const n = _settings.scrollSpeed.toString();
      let r = parseInt(n, 10),
        c = s + parseInt(_, 10) * 2,
        d = { duration: (c / r) * 1e3, iterations: 1, easing: "linear" },
        u = [
          { transform: "translateY(0)" },
          { transform: `translateY(-${c}px)` },
        ],
        h = [
          { transform: "translateY(0)" },
          { transform: `translateY(-${c}px)` },
        ];
      (m = t.animate(u, d)), (p = o.animate(h, d)), (T = !0), K();
    } else s <= e && ((o.style.display = "none"), W());
  }
  function W() {
    m && m.cancel(), p && p.cancel(), (T = !1);
  }
  function K() {
    m && (m.addEventListener("finish", q), m.addEventListener("cancel", q));
  }
  function q() {
    (T = !1), O();
  }
  function P(a, e) {
    a.innerText !== e &&
      ((a.style.opacity = "0"),
      setTimeout(() => {
        (a.textContent = e), (a.style.opacity = "1");
      }, 700));
  }
  function Y(a) {
    const e = document.querySelector(":root");
    for (let [t, s] of Object.entries(a))
      t.includes("FontFamily") && z(s), e.style.setProperty(Q(t), s);
  }
  function z(a) {
    window.WebFont.load({ google: { families: [`${a}:100,400,700`] } });
  }
  function Q(a) {
    return `--${a.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
  }
  class N {
    constructor(e, t) {
      (this.username = this.validateUsername(e)),
        (this.userColor = (t == null ? void 0 : t.userColor) || ""),
        (this.tasks = []);
    }
    validateUsername(e) {
      if (typeof e != "string")
        throw new Error("Username must be of type string");
      if (((e = e.trim()), e.length === 0)) throw new Error("Username invalid");
      return e;
    }
    addTask(e) {
      return this.tasks.push(e), e;
    }
    editTask(e, t) {
      let s = this.getTask(e);
      return s ? (s.setDescription(t), s) : null;
    }
    completeTask(e) {
      let t = this.getTask(e);
      return t ? (t.setCompletionStatus(!0), t) : null;
    }
    setFocusedTask(e) {
      let t = this.getTask(e);
      return t
        ? (this.tasks.forEach((s) => {
            s.setFocusStatus(!1);
          }),
          t.setFocusStatus(!0),
          t)
        : null;
    }
    deleteTask(e) {
      const t = [].concat(e).filter((o) => this.validTaskIndex(o)),
        s = [];
      return (
        (this.tasks = this.tasks.filter((o, n) =>
          t.includes(n) ? (s.push(o), !1) : !0
        )),
        s
      );
    }
    removeCompletedTasks() {
      const e = [];
      return (
        (this.tasks = this.tasks.filter((t) =>
          t.isComplete() ? (e.push(t), !1) : !0
        )),
        e
      );
    }
    getTask(e) {
      return this.validTaskIndex(e) ? this.tasks[e] : null;
    }
    getTasks() {
      return this.tasks;
    }
    validTaskIndex(e) {
      return !(
        typeof e != "number" ||
        isNaN(e) ||
        e < 0 ||
        e >= this.tasks.length
      );
    }
  }
  class R {
    constructor(e) {
      C(this, F);
      (this.description = this.validateDescription(e)),
        (this.id = y(this, F, j).call(this)),
        (this.completionStatus = !1),
        (this.focusStatus = !1);
    }
    validateDescription(e) {
      if (typeof e != "string")
        throw new Error("Task description must be of type string");
      if (((e = e.trim()), e.length === 0))
        throw new Error("Task description invalid");
      return e;
    }
    setDescription(e) {
      this.description = this.validateDescription(e);
    }
    isComplete() {
      return this.completionStatus;
    }
    setCompletionStatus(e) {
      if (typeof e != "boolean")
        throw new Error("Completion status must be of type boolean");
      this.completionStatus = e;
    }
    isFocused() {
      return this.focusStatus;
    }
    setFocusStatus(e) {
      if (typeof e != "boolean")
        throw new Error("Focus status must be of type boolean");
      this.focusStatus = e;
    }
  }
  (F = new WeakSet()),
    (j = function () {
      const e = new Date(),
        t = String(e.getDate()).padStart(2, "0"),
        s = String(e.getHours()).padStart(2, "0"),
        o = String(e.getMinutes()).padStart(2, "0"),
        n = String(e.getSeconds()).padStart(2, "0"),
        r = String(e.getMilliseconds()).padStart(3, "0"),
        c = Math.floor(Math.random() * 1e4);
      return `${t}${s}${o}${n}${r}${c}`;
    });
  class Z {
    constructor(e = "userList") {
      C(this, g);
      C(this, $);
      S(this, $, e),
        (this.tasksCompleted = 0),
        (this.totalTasks = 0),
        (this.users = y(this, g, J).call(this));
    }
    getUser(e) {
      return this.users.find((t) => t.username === e);
    }
    getAllUsers() {
      return this.users;
    }
    createUser(e, t) {
      if (this.getUser(e)) throw new Error(`${e} already exists`);
      const s = new N(e, t);
      return this.users.push(s), s;
    }
    addUserTasks(e, t) {
      const s = this.getUser(e);
      if (!s) throw new Error(`${e} does not exist`);
      const o = [].concat(t),
        n = [];
      return (
        o.forEach((r) => {
          n.push(s.addTask(new R(r))), this.totalTasks++;
        }),
        y(this, g, E).call(this),
        n
      );
    }
    editUserTask(e, t, s) {
      const o = this.getUser(e);
      if (!o) throw new Error(`${e} has no tasks`);
      const n = o.editTask(t, s);
      if (!n) throw new Error(`Task ${t} not found`);
      return y(this, g, E).call(this), n;
    }
    focusUserTask(e, t) {
      const s = this.getUser(e);
      if (!s) throw new Error(`User ${e} not found`);
      const o = s.setFocusedTask(t);
      if (!o) throw new Error(`Task ${t} not found`);
      return y(this, g, E).call(this), o;
    }
    completeUserTasks(e, t) {
      const s = this.getUser(e);
      if (!s) throw new Error(`User ${e} not found`);
      const o = [].concat(t).reduce((n, r) => {
        const c = s.getTask(r);
        return (
          c &&
            (c.isComplete() ||
              (c.setCompletionStatus(!0), this.tasksCompleted++),
            n.push(c)),
          n
        );
      }, []);
      return y(this, g, E).call(this), o;
    }
    deleteUserTasks(e, t) {
      const s = this.getUser(e);
      if (!s) throw new Error(`User ${e} not found`);
      const o = [].concat(t),
        n = s.deleteTask(o);
      return (
        s.getTasks().length === 0 && this.deleteUser(e),
        this.decreaseTaskCount(n),
        y(this, g, E).call(this),
        n
      );
    }
    checkUserTasks(e, t = "incomplete") {
      const s = this.getUser(e);
      if (!s) return new Map();
      const o = new Map();
      return (
        s.getTasks().forEach((n, r) => {
          t === "incomplete" && !n.isComplete() && o.set(r, n),
            t === "complete" && n.isComplete() && o.set(r, n);
        }),
        o
      );
    }
    clearUserList() {
      (this.users = []),
        (this.tasksCompleted = 0),
        (this.totalTasks = 0),
        y(this, g, E).call(this);
    }
    clearDoneTasks() {
      let e = [];
      return (
        this.users.forEach((t) => {
          let s = t.removeCompletedTasks();
          this.decreaseTaskCount(s), (e = e.concat(s));
        }),
        y(this, g, E).call(this),
        e
      );
    }
    deleteUser(e) {
      const t = this.users.findIndex((n) =>
        RegExp(`^${e}`, "i").test(n.username)
      );
      if (t === -1) throw new Error(`${e} not found`);
      const s = this.users[t],
        o = this.users.splice(t, 1)[0];
      return this.decreaseTaskCount(o.getTasks()), y(this, g, E).call(this), s;
    }
    decreaseTaskCount(e) {
      e.forEach((t) => {
        t.isComplete() && this.tasksCompleted--, this.totalTasks--;
      });
    }
  }
  ($ = new WeakMap()),
    (g = new WeakSet()),
    (J = function () {
      const e = [];
      let t = localStorage.getItem(l(this, $));
      return (
        t
          ? JSON.parse(t).forEach((s) => {
              const o = new N(s.username, { userColor: s.userColor });
              s.tasks.map((n) => {
                const r = o.addTask(new R(n.description));
                this.totalTasks++,
                  n.completionStatus &&
                    (r.setCompletionStatus(n.completionStatus),
                    this.tasksCompleted++),
                  n.focusStatus && r.setFocusStatus(n.focusStatus);
              }),
                e.push(o);
            })
          : localStorage.setItem(l(this, $), JSON.stringify(e)),
        e
      );
    }),
    (E = function () {
      localStorage.setItem(l(this, $), JSON.stringify(this.users));
    });
  const X = document.getElementById("audioSample");
  class ee {
    constructor(e) {
      C(this, w, null);
      C(this, f);
      C(this, v);
      C(this, b);
      C(this, M);
      (this.userList = new Z(e)),
        Y(_styles),
        S(this, f, _settings.languageCode),
        S(this, v, _settings.maxTasksPerUser),
        S(this, b, _settings.headerFeature),
        S(this, M, _settings.headerCustomText);
    }
    render() {
      this.renderTaskList(), this.renderTaskHeader();
    }
    renderTaskList() {
      if (this.userList.users.length === 0) return;
      const e = document.createDocumentFragment();
      this.userList.getAllUsers().forEach((r) => {
        const c = H(r),
          i = c.querySelector("ol");
        r.tasks.forEach((d) => {
          const u = document.createElement("li");
          u.classList.add("task"),
            (u.dataset.taskId = `${d.id}`),
            (u.innerText = d.description),
            d.isComplete() && u.classList.add("done"),
            d.isFocused() && u.classList.add("focus"),
            i.appendChild(u);
        }),
          e.appendChild(c);
      });
      const t = e.cloneNode(!0),
        s = document.querySelector(".task-container.primary");
      (s.innerHTML = ""), s.appendChild(t);
      const o = e.cloneNode(!0),
        n = document.querySelector(".task-container.secondary");
      (n.innerHTML = ""), n.appendChild(o), O();
    }
    renderTaskHeader() {
      this.renderTaskCount(),
        l(this, b).toLowerCase() === "timer"
          ? this.renderTimer()
          : l(this, b).toLowerCase() === "commands"
          ? this.renderCommandTips()
          : l(this, b).toLowerCase() === "text" &&
            this.renderCustomText(l(this, M));
    }
    renderTaskCount() {
        // Get completed and total tasks
        let completedTasks = this.userList.tasksCompleted;
        let totalTasks = this.userList.totalTasks;
    
        // Calculate the percentage of completed tasks
        let percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
        // Update the progress bar width
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    
        // Update the task count text
        const taskCountElement = document.querySelector(".task-count");
        if (taskCountElement) {
            taskCountElement.innerText = `${completedTasks}/${totalTasks}`;
        }
    
        // Move the progress image
        const progressImage = document.querySelector(".progress-image");
        if (progressImage) {
            progressImage.style.left = `${percentage}%`;
        }
    }
    
      
    renderTimer() {
      document.querySelector(".timer").classList.remove("hidden");
    }
    startTimer(e = 0, t = 10) {
      l(this, w) && clearInterval(l(this, w));
      const s = document.querySelector(".timer"),
        o = s.querySelector(".timer-title"),
        n = s.querySelector(".timer-countdown");
      let r = e * 60;
      P(o, "Focus");
      let c = !0;
      const i = () => {
        const d = Math.floor(r / 60)
            .toString()
            .padStart(2, "0"),
          u = (r % 60).toString().padStart(2, "0");
        (n.textContent = `${d}:${u}`),
          r === 0
            ? (clearInterval(l(this, w)),
              P(o, "Break"),
              (n.textContent = "00:00"),
              X.play(),
              (r = t * 60),
              c && (S(this, w, setInterval(i, 1e3)), (c = !1)))
            : r--;
      };
      S(this, w, setInterval(i, 1e3));
    }
    renderCommandTips() {
      const e = ["!task", "!edit", "!done", "!delete", "!check", "!help"],
        t = document.querySelector(".command-tips");
      t.classList.remove("hidden");
      let s = 0;
      setInterval(() => {
        const o = t.querySelector(".command-code");
        P(o, e[s]), (s = (s + 1) % e.length);
      }, 6e3);
    }
    renderCustomText(e) {
      document.querySelector(".custom-header").classList.remove("hidden"),
        (document.querySelector(".custom-text").textContent = e);
    }
    chatHandler(e, t, s, o, n) {
      t = `!${t.toLowerCase()}`;
      let r = "",
        c = "";
      try {
        if (te(o))
          if (
            l(this, b).toLowerCase() === "timer" &&
            _adminConfig.commands.timer.includes(t) &&
            o.broadcaster
          ) {
            const [i, d] = s.split("/"),
              u = parseInt(i, 10),
              h = parseInt(d, 10) || 10;
            if (isNaN(u) || u < 0 || isNaN(h) || h < 0)
              throw new Error("Invalid timer duration");
            return (
              this.startTimer(u, h),
              (r = _adminConfig.responseTo[l(this, f)].timer + " ⏲️"),
              (c = i),
              I(r, e, c)
            );
          } else {
            if (_adminConfig.commands.clearList.includes(t))
              return (
                this.userList.clearUserList(),
                this.clearListFromDOM(),
                (r = _adminConfig.responseTo[l(this, f)].clearList),
                I(r, e, c)
              );
            if (_adminConfig.commands.clearDone.includes(t))
              return (
                this.userList.clearDoneTasks().forEach(({ id: d }) => {
                  this.deleteTaskFromDOM(d);
                }),
                (r = _adminConfig.responseTo[l(this, f)].clearDone),
                I(r, e, c)
              );
            if (_adminConfig.commands.clearUser.includes(t)) {
              const i = this.userList.deleteUser(s);
              return (
                this.deleteUserFromDOM(i),
                (c = i.username),
                (r = _adminConfig.responseTo[l(this, f)].clearUser),
                I(r, e, c)
              );
            }
          }
        if (_userConfig.commands.addTask.includes(t)) {
          if (s === "") throw new Error("Task description is empty");
          let i =
            this.userList.getUser(e) ||
            this.userList.createUser(e, { userColor: n.userColor });
          const d = s.split(", ");
          i.getTasks().length + d.length > parseInt(l(this, v).toString(), 10)
            ? (r = _userConfig.responseTo[l(this, f)].maxTasksAdded)
            : (this.userList.addUserTasks(e, d).forEach((h) => {
                this.addTaskToDOM(i, h);
              }),
              (c = d
                .map((h) => `📝 "${h}"`)
                .join(", ")
                .replace(/,([^,]*)$/, " &$1")),
              (r = _userConfig.responseTo[l(this, f)].addTask));
        } else if (_userConfig.commands.editTask.includes(t)) {
          const i = s.search(new RegExp("(?<=\\d)\\s"));
          if (i === -1)
            throw new Error("Task number or description format is invalid");
          const d = s.slice(0, i),
            u = s.slice(i + 1),
            h = this.userList.editUserTask(e, U(d), u);
          this.editTaskFromDOM(h),
            (c = d),
            (r = _userConfig.responseTo[l(this, f)].editTask);
        } else if (_userConfig.commands.focusTask.includes(t)) {
          const i = U(s),
            d = this.userList.focusUserTask(e, i);
          this.focusTaskFromDOM(e, d.id),
            (c = (i + 1).toString()),
            (r = _userConfig.responseTo[l(this, f)].focusTask);
        } else if (_userConfig.commands.finishTask.includes(t)) {
          const i = s
              .split(",")
              .reduce((u, h) => (U(h) >= 0 && u.push(U(h)), u), []),
            d = this.userList.completeUserTasks(e, i);
          d.forEach(({ id: u }) => {
            this.completeTaskFromDOM(u);
          }),
            d.length === 0
              ? (r = _userConfig.responseTo[l(this, f)].noTaskFound)
              : ((c = d
                  .map((u) => `✅ "${u.description}"`)
                  .join(", ")
                  .replace(/,([^,]*)$/, " &$1")),
                (r = _userConfig.responseTo[l(this, f)].finishTask));
        } else if (_userConfig.commands.deleteTask.includes(t))
          if (((c = s), s.toLowerCase() === "all")) {
            const i = this.userList.deleteUser(e);
            this.deleteUserFromDOM(i),
              (r = _userConfig.responseTo[l(this, f)].deleteAll);
          } else {
            const i = s
                .split(",")
                .reduce((u, h) => (U(h) >= 0 && u.push(U(h)), u), []),
              d = this.userList.deleteUserTasks(e, i);
            d.forEach(({ id: u }) => {
              this.deleteTaskFromDOM(u);
            }),
              d.length === 0
                ? (r = _userConfig.responseTo[l(this, f)].noTaskFound)
                : (r = _userConfig.responseTo[l(this, f)].deleteTask);
          }
        else if (_userConfig.commands.check.includes(t)) {
          const i = this.userList.checkUserTasks(e),
            d = [];
          for (let [u, h] of i) d.push(`📝 ${u + 1}. ${h.description}`);
          (c = d.join(" ")),
            c === ""
              ? (r = _userConfig.responseTo[l(this, f)].noTaskFound)
              : (r = _userConfig.responseTo[l(this, f)].check);
        } else if (_userConfig.commands.help.includes(t))
          r = _userConfig.responseTo[l(this, f)].help;
        else if (_userConfig.commands.additional.includes(t))
          r = _userConfig.responseTo[l(this, f)].additional;
        else throw new Error("command not found");
        return I(r, e, c);
      } catch (i) {
        return I(
          _userConfig.responseTo[l(this, f)].invalidCommand,
          e,
          i.message,
          !0
        );
      }
    }
    clearListFromDOM() {
      const e = document.querySelector(".task-container.primary"),
        t = document.querySelector(".task-container.secondary");
      (e.innerHTML = ""), (t.innerHTML = ""), this.renderTaskCount();
    }
    addTaskToDOM(e, t) {
      const s = document.querySelector(".task-container.primary"),
        o = document.querySelector(".task-container.secondary");
      if (
        document.querySelectorAll(`[data-user="${e.username}"]`).length === 0
      ) {
        const i = H(e),
          d = i.cloneNode(!0);
        s.appendChild(i), o.appendChild(d);
      }
      const r = document.createElement("li");
      r.classList.add("task"),
        (r.dataset.taskId = `${t.id}`),
        (r.innerText = t.description);
      const c = r.cloneNode(!0);
      s.querySelector(`[data-user="${e.username}"] .tasks`).appendChild(r),
        o.querySelector(`[data-user="${e.username}"] .tasks`).appendChild(c),
        this.renderTaskCount(),
        O();
    }
    editTaskFromDOM(e) {
      const t = document.querySelectorAll(`[data-task-id="${e.id}"]`);
      for (const s of t) s.innerText = e.description;
    }
    completeTaskFromDOM(e) {
      const t = document.querySelectorAll(`[data-task-id="${e}"]`);
      for (const s of t) s.classList.add("done");
      this.renderTaskCount();
    }
    focusTaskFromDOM(e, t) {
      document.querySelectorAll(`[data-user="${e}"] .task`).forEach((s) => {
        s.classList.remove("focus");
      }),
        document.querySelectorAll(`[data-task-id="${t}"]`).forEach((s) => {
          s.classList.add("focus");
        });
    }
    deleteTaskFromDOM(e) {
      const t = document.querySelectorAll(`[data-task-id="${e}"]`);
      for (const s of t)
        s.parentElement.children.length === 1
          ? s.parentElement.parentElement.remove()
          : s.remove();
      this.renderTaskCount();
    }
    deleteUserFromDOM(e) {
      const { username: t, tasks: s } = e,
        o = document.querySelectorAll(`[data-user="${t}"]`);
      for (let n of o) n.remove();
      this.renderTaskCount();
    }
  }
  (w = new WeakMap()),
    (f = new WeakMap()),
    (v = new WeakMap()),
    (b = new WeakMap()),
    (M = new WeakMap());
  function I(a, e, t, s = !1) {
    return {
      message:
        _settings.botResponsePrefix +
        a.replace("{user}", e).replace("{message}", t),
      error: s,
    };
  }
  function te(a) {
    return a.broadcaster || a.mod;
  }
  function U(a) {
    return parseInt(a, 10) - 1;
  }
  function H({ username: a, userColor: e }) {
    const t = document.createElement("div");
    t.classList.add("card"), (t.dataset.user = a);
    const s = document.createElement("div");
    s.classList.add("username"),
      (s.innerText = a),
      (s.style.color = _settings.showUsernameColor ? e : ""),
      t.appendChild(s);
    const o = document.createElement("ol");
    return o.classList.add("tasks"), t.appendChild(o), t;
  }
  function se() {
    document.getElementById("modal").classList.remove("hidden"),
      document.getElementById("modal").classList.add("flex");
  }
  function re() {
    document.getElementById("modal").classList.remove("flex"),
      document.getElementById("modal").classList.add("hidden");
  }
  function oe(a) {
    const e = { command: null, parameters: null, source: null, tags: null };
    let t = 0,
      s = null,
      o = null,
      n = null,
      r = null;
    if (a[t] === "@") {
      let i = a.indexOf(" ");
      (s = a.slice(1, i)), (t = i + 1);
    }
    if (a[t] === ":") {
      t += 1;
      let i = a.indexOf(" ", t);
      (o = a.slice(t, i)), (t = i + 1);
    }
    let c = a.indexOf(":", t);
    return (
      c === -1 && (c = a.length),
      (n = a.slice(t, c).trim()),
      c !== a.length && ((t = c + 1), (r = a.slice(t))),
      (e.command = ne(n)),
      e.command === null
        ? null
        : (s !== null && (e.tags = ae(s)),
          (e.source = ie(o)),
          (e.parameters = r),
          r && r[0] === "!" && (e.command = ce(r, e.command)),
          e)
    );
  }
  function ne(a) {
    let e = null;
    const t = a.split(" ");
    switch (t[0]) {
      case "JOIN":
      case "PART":
      case "NOTICE":
      case "CLEARCHAT":
      case "HOSTTARGET":
      case "PRIVMSG":
        e = { command: t[0], channel: t[1] };
        break;
      case "PING":
        e = { command: t[0] };
        break;
      case "CAP":
        e = { command: t[0], isCapRequestEnabled: t[2] === "ACK" };
        break;
      case "GLOBALUSERSTATE":
        e = { command: t[0] };
        break;
      case "USERSTATE":
      case "ROOMSTATE":
        e = { command: t[0], channel: t[1] };
        break;
      case "RECONNECT":
        e = { command: t[0] };
        break;
      case "421":
        return console.error(`Unsupported IRC command: ${t[2]}`), null;
      case "001":
        e = { command: t[0] };
        break;
      case "002":
      case "003":
      case "004":
      case "353":
      case "366":
      case "372":
      case "375":
      case "376":
        return null;
      default:
        return console.log(`Unexpected command: ${t[0]}`), null;
    }
    return e;
  }
  function ae(a) {
    const e = { "client-nonce": null, flags: null };
    let t = {};
    return (
      a.split(";").forEach((o) => {
        let n = o.split("="),
          r = n[1] === "" ? null : n[1];
        switch (n[0]) {
          case "badges":
          case "badge-info":
            if (r) {
              let i = {};
              r.split(",").forEach((u) => {
                let h = u.split("/");
                i[h[0]] = h[1];
              }),
                (t[n[0]] = i);
            } else t[n[0]] = null;
            break;
          case "emotes":
            if (r) {
              let i = {};
              r.split("/").forEach((u) => {
                let h = u.split(":"),
                  G = [];
                h[1].split(",").forEach((Te) => {
                  let B = Te.split("-");
                  G.push({ startPosition: B[0], endPosition: B[1] });
                }),
                  (i[h[0]] = G);
              }),
                (t[n[0]] = i);
            } else t[n[0]] = null;
            break;
          case "emote-sets":
            let c = r.split(",");
            t[n[0]] = c;
            break;
          default:
            e.hasOwnProperty(n[0]) || (t[n[0]] = r);
        }
      }),
      t
    );
  }
  function ie(a) {
    if (a == null) return null;
    {
      let e = a.split("!");
      return {
        nick: e.length == 2 ? e[0] : null,
        host: e.length == 2 ? e[1] : e[0],
      };
    }
  }
  function ce(a, e) {
    let s = a.slice(0 + 1).trim(),
      o = s.indexOf(" ");
    return (
      o === -1
        ? ((e.botCommand = s.slice(0)), (e.botCommandParams = ""))
        : ((e.botCommand = s.slice(0, o)),
          (e.botCommandParams = s.slice(o).trim())),
      e
    );
  }
  class le {
    constructor() {
      this.events = new Map();
    }
    on(e, t) {
      this.events.has(e) || this.events.set(e, []), this.events.get(e).push(t);
    }
    emit(e, ...t) {
      this.events.has(e) && this.events.get(e).forEach((s) => s(...t));
    }
    off(e, t) {
      if (this.events.has(e)) {
        const s = this.events.get(e),
          o = s.indexOf(t);
        o !== -1 && (s.splice(o, 1), s.length === 0 && this.events.delete(e));
      }
    }
    once(e, t) {
      const s = (...o) => {
        t(...o), this.off(e, s);
      };
      this.on(e, s);
    }
  }
  class de extends le {
    constructor(t, { username: s, authToken: o, channel: n }, r = WebSocket) {
      super();
      C(this, k, null);
      C(this, L, 1e3);
      (this.url = t),
        (this.username = s.toLowerCase()),
        (this.channel = `#${n.toLowerCase()}`),
        (this.authToken = o.includes("oauth:") ? o : `oauth:${o}`),
        (this.WebSocketService = r);
    }
    connect() {
      S(this, k, new this.WebSocketService(this.url)),
        (l(this, k).onopen = () => {
          l(this, k).send("CAP REQ :twitch.tv/tags twitch.tv/commands"),
            l(this, k).send(`PASS ${this.authToken}`),
            l(this, k).send(`NICK ${this.username}`);
        }),
        (l(this, k).onerror = (t) => (
          console.error("websocket error: ", t), t
        )),
        (l(this, k).onmessage = (t) => {
          (t == null ? void 0 : t.data)
            .trim()
            .split(
              `\r
`
            )
            .forEach((n) => {
              const r = oe(n);
              if (r)
                switch (r.command.command) {
                  case "PRIVMSG":
                    if (r.parameters.startsWith("!")) {
                      const c = ue(r);
                      this.emit("command", c);
                    }
                    break;
                  case "PING":
                    l(this, k).send("PONG " + r.parameters);
                    break;
                  case "001":
                    l(this, k).send(`JOIN ${this.channel}`);
                    break;
                  case "JOIN":
                    console.log(`Joined ${this.channel}`),
                      S(this, L, 1e3),
                      this.emit("oauthSuccess");
                    break;
                  case "RECONNECT":
                    this.disconnect(
                      1012,
                      "The Twitch IRC server is terminating the connection for maintenance reasons."
                    );
                    break;
                  case "PART":
                    console.error(
                      "The channel must have banned (/ban) the bot."
                    ),
                      l(this, k).close();
                    break;
                  case "NOTICE":
                    console.error(`${r.parameters}; left ${this.channel}`),
                      this.emit("oauthError"),
                      l(this, k).send(`PART ${this.channel}`);
                    break;
                }
            });
        }),
        (l(this, k).onclose = (t) => {
          switch (t.code) {
            case 1e3:
              console.log("Connection closed normally.");
              break;
            case 1006:
              console.error(
                `Connection dropped. Reconnecting in ${l(
                  this,
                  L
                )} milliseconds...`
              );
              let s = l(this, L);
              setTimeout(() => {
                this.connect();
              }, s),
                S(this, L, l(this, L) * 2);
              break;
            case 1012:
              console.log("Switching  servers..."), this.connect();
              break;
            default:
              console.error(`Unhandled code: ${t.code}. Reason: ${t.reason}`);
          }
        });
    }
    say(t, s) {
      var o;
      if (
        ((o = l(this, k)) == null ? void 0 : o.readyState) === WebSocket.OPEN
      ) {
        const r = [
          s ? `@reply-parent-msg-id=${s}` : "",
          "PRIVMSG",
          this.channel,
          `:${t}`,
        ]
          .join(" ")
          .trim();
        l(this, k).send(r);
      } else console.error("Connection is not open");
    }
    disconnect(t = 1e3, s = "") {
      l(this, k).close(t, s);
    }
  }
  (k = new WeakMap()), (L = new WeakMap());
  function ue(a) {
    var e, t;
    return {
      user: a.tags["display-name"],
      command: a.command.botCommand,
      message: a.command.botCommandParams || "",
      flags: {
        broadcaster: !!((e = a.tags.badges) != null && e.broadcaster),
        mod: !!((t = a.tags.badges) != null && t.moderator),
      },
      extra: { userColor: a.tags.color, messageId: a.tags.id },
    };
  }
  function he(a) {
    a.emit("command", {
      user: "adminUser",
      command: "clearList",
      message: "",
      flags: { broadcaster: !0, mod: !1 },
      extra: { userColor: "#FF0000", messageId: `${D()}` },
    });
    const e = [
        "red",
        "coral",
        "springGreen",
        "lightSeaGreen",
        "slateBlue",
        "hotpink",
        "violet",
        "orange",
        "darkTurquoise",
        "dodgerblue",
        "blueviolet",
      ],
      { maxTasksPerUser: t } = _settings;
    for (let s = 1; s <= 5; s++) {
      const o = `Username${s}`,
        n = e[s - 1];
      for (let r = 0; r < t; r++) {
        const c = {
          user: o,
          command: "task",
          message: `test task description ${
            r === 2 ? "longer text example" : ""
          }`,
          flags: { broadcaster: !0, mod: !1 },
          extra: { userColor: n, messageId: `${D()}` },
        };
        setTimeout(() => {
          a.emit("command", c);
        }, 1e3 * s + r * 100);
      }
      setTimeout(() => {
        const r = {
          user: o,
          command: "done",
          message: "1",
          flags: { broadcaster: !0, mod: !1 },
          extra: { userColor: n, messageId: `${D()}` },
        };
        a.emit("command", r);
      }, 1e3 * s + 1e4);
    }
  }
  function D() {
    return `${Math.floor(Math.random() * 1e9)}`;
  }
  const {
      twitch_channel: me,
      twitch_oauth: fe,
      twitch_username: pe,
    } = _authConfig,
    ke = "ws://irc-ws.chat.twitch.tv:80",
    x = new de(ke, { username: pe, authToken: fe, channel: me });
  window.addEventListener("load", () => {
    let a = "userList";
    _settings.testMode &&
      (console.log("Test mode enabled"), (a = "testUserList"));
    const e = new ee(a);
    e.render(),
      x.on("command", (t) => {
        const { user: s, command: o, message: n, flags: r, extra: c } = t,
          i = e.chatHandler(s, o, n, r, c);
        i.error ? console.error(i.message) : x.say(i.message, c.messageId);
      }),
      x.on("oauthError", () => {
        se();
      }),
      x.on("oauthSuccess", () => {
        re();
      }),
      x.connect(),
      _settings.testMode && he(x);
  });
})();
