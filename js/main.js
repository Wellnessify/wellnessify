(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".ring").forEach(function (ring) {
    var strong = ring.querySelector(".count");
    if (!strong) return;
    var end = parseInt(ring.style.getPropertyValue("--end"), 10);
    if (!end) return;
    strong.textContent = String(end);
    ring._score = end;
  });

  var anims = document.querySelectorAll(".anim");
  function play(el) {
    if (el.classList.contains("in")) return;
    el.classList.add("in");
    if (reduce) return;
    el.querySelectorAll(".ring").forEach(function (ring) {
      var strong = ring.querySelector(".count");
      var end = ring._score;
      if (!strong || !end) return;
      var start = performance.now();
      var dur = 1100;
      function frame(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        strong.textContent = String(Math.round(end * eased));
        if (t < 1) requestAnimationFrame(frame);
      }
      strong.textContent = "0";
      requestAnimationFrame(frame);
    });
  }

  if (anims.length && "IntersectionObserver" in window) {
    var animObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          play(entry.target);
          animObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.28 }
    );
    anims.forEach(function (el) { animObserver.observe(el); });
  } else {
    anims.forEach(play);
  }

  var reveals = document.querySelectorAll(".reveal");
  if (!reduce && reveals.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  var stage = document.getElementById("stage");
  var viewport = document.querySelector(".stage-viewport");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!reduce && finePointer && stage && viewport) {
    viewport.addEventListener("pointermove", function (event) {
      if (window.innerWidth < 980) return;
      var rect = viewport.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.querySelectorAll("[data-depth]").forEach(function (el) {
        var depth = Number(el.getAttribute("data-depth")) || 0;
        el.style.setProperty("--px", (x * depth).toFixed(1) + "px");
        el.style.setProperty("--py", (y * depth).toFixed(1) + "px");
      });
    });
    viewport.addEventListener("pointerleave", function () {
      stage.querySelectorAll("[data-depth]").forEach(function (el) {
        el.style.setProperty("--px", "0px");
        el.style.setProperty("--py", "0px");
      });
    });
  }

  var deviceLinks = document.querySelectorAll(".device-nav a");
  if (deviceLinks.length && "IntersectionObserver" in window) {
    var currentObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          deviceLinks.forEach(function (link) {
            var on = link.getAttribute("href") === "#" + entry.target.id;
            if (on) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 }
    );
    deviceLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) currentObserver.observe(section);
    });
  }
})();
