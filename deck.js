(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var n = slides.length;
  var i = 0;
  var wheelLock = false;
  var touchStart = null;
  var kickerEl = null;
  var count = document.getElementById("count");
  var progress = document.getElementById("progress");
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var dots = document.getElementById("dots");
  var inner = document.querySelector(".inner");

  var label = document.createElement("p");
  label.className = "kicker";
  inner.insertBefore(label, inner.firstChild);
  kickerEl = label;

  slides.forEach(function (_, idx) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "dot";
    b.setAttribute("aria-label", "Go to slide " + (idx + 1));
    b.addEventListener("click", function () { go(idx); });
    dots.appendChild(b);
  });

  function go(nextIndex) {
    i = Math.max(0, Math.min(n - 1, nextIndex));
    slides.forEach(function (s, idx) { s.classList.toggle("on", idx === i); });
    Array.prototype.forEach.call(dots.children, function (d, idx) {
      d.classList.toggle("on", idx === i);
    });
    kickerEl.textContent = slides[i].getAttribute("data-kicker") || "";
    count.textContent = String(i + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
    progress.style.width = ((i + 1) / n * 100) + "%";
    prev.disabled = i === 0;
    next.disabled = i === n - 1;
  }

  prev.addEventListener("click", function () { go(i - 1); });
  next.addEventListener("click", function () { go(i + 1); });

  window.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      go(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(n - 1);
    }
  });

  document.getElementById("deck").addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaY) < 40 || wheelLock) return;
    wheelLock = true;
    go(i + (e.deltaY > 0 ? 1 : -1));
    setTimeout(function () { wheelLock = false; }, 520);
  }, { passive: true });

  document.getElementById("deck").addEventListener("touchstart", function (e) {
    touchStart = e.changedTouches[0] ? e.changedTouches[0].clientX : null;
  }, { passive: true });
  document.getElementById("deck").addEventListener("touchend", function (e) {
    if (touchStart == null || !e.changedTouches[0]) return;
    var delta = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 48) go(i + (delta < 0 ? 1 : -1));
    touchStart = null;
  });

  go(0);

  var FORM_ENDPOINT = "https://formspree.io/f/mgawddar";
  var FALLBACK = "joey@delegationeconomy.fyi";
  var form = document.getElementById("signupForm");
  var input = document.getElementById("email");
  var status = document.getElementById("formStatus");
  var button = form.querySelector("button.go");

  function say(msg, kind) {
    status.innerHTML = msg;
    status.className = "status " + (kind || "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value || value.indexOf("@") < 1 || value.lastIndexOf(".") < value.indexOf("@")) {
      say("That address doesn’t look right — check it and try again.", "warn");
      input.focus();
      return;
    }
    button.disabled = true;
    say("Sending…");
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: value })
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      form.reset();
      say("Got it. The brief is on its way.", "ok");
    }).catch(function () {
      say('That didn’t go through. Email <a href="mailto:' + FALLBACK + '">' + FALLBACK + "</a>.", "warn");
    }).then(function () {
      button.disabled = false;
    });
  });
})();
