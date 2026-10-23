(function () {
  "use strict";

  var s = typeof SITE !== "undefined" ? SITE : null;
  if (!s) return;

  // AAAAAAAAAAAAAAAAAAA
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  function link(label, url) {
    var a = el("a", label);
    a.href = url;
    if (!/^(https?:|mailto:)/i.test(url)) a.removeAttribute("href");
    if (/^https?:/i.test(url)) a.rel = "noopener";
    return a;
  }

  document.title = s.name;
  $("wordmark").textContent = "~/" + s.username;
  setMeta('meta[name="description"]', s.description);
  setMeta('meta[property="og:title"]', s.name);
  setMeta('meta[property="og:description"]', s.description);
  if (s.url) {
    addMeta("og:url", s.url);
  }

  function setMeta(sel, val) {
    var m = document.querySelector(sel);
    if (m) m.setAttribute("content", val);
  }
  function addMeta(prop, val) {
    var m = document.createElement("meta");
    m.setAttribute("property", prop);
    m.setAttribute("content", val);
    document.head.appendChild(m);
  }

  s.intro.forEach(function (t) { $("intro").appendChild(el("p", t)); });

  var list = $("project-list");
  s.projects.forEach(function (p) {
    var li = el("li", "", "project");
    li.appendChild(el("h3", p.name));
    li.appendChild(el("p", p.description));

    var meta = el("div", "", "meta");
    if (p.status) meta.appendChild(el("span", p.status));
    if (p.tech && p.tech.length) meta.appendChild(el("span", p.tech.join(", ")));
    if (p.repo) meta.appendChild(link("repo", p.repo));
    if (p.demo) meta.appendChild(link("demo", p.demo));
    li.appendChild(meta);
    list.appendChild(li);
  });
  if (!s.projects.length) $("projects").hidden = true;

  s.about.forEach(function (t) { $("about-text").appendChild(el("p", t)); });
  (s.uses || []).forEach(function (u) {
    $("uses").appendChild(el("dt", u.label));
    $("uses").appendChild(el("dd", u.value));
  });
  if (s.tech && s.tech.length) {
    $("uses").appendChild(el("dt", "tech"));
    $("uses").appendChild(el("dd", s.tech.join(", ")));
  }

  if (s.now && s.now.length) {
    $("now").hidden = false;
    s.now.forEach(function (t) { $("now-list").appendChild(el("li", t)); });
  }

  var c = s.contact || {};
  var cl = $("contact-list");
  if (c.email) {
    var li = el("li");
    li.appendChild(link(c.email, "mailto:" + c.email));
    cl.appendChild(li);
  }
  (c.links || []).forEach(function (l) {
    var li2 = el("li");
    li2.appendChild(link(l.label, l.url));
    cl.appendChild(li2);
  });
  if (!cl.children.length) cl.appendChild(el("li", "nothing here yet. add your links in site.config.js"));

  $("footer-text").textContent = "© " + s.name + ", " + new Date().getFullYear() + ". All Rights Reserved. " + s.signoff;
  // me when the code compiles (it doesn't compile, it's javascript)
})();
