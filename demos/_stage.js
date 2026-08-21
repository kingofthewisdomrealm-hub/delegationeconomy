/* Delegation Economy — shared stage behaviour.
 *
 * One job: let the speaker kill the screen.
 *
 * A visual aid that stays up after its moment competes with the speaker for the
 * room. Press B or Escape (or click the black) to blank the screen instantly, so
 * each aid appears for its beat and then gets out of the way.
 *
 * Disabled in ?embed=1 — website visitors have no use for a blackout key.
 */
(function () {
  var isEmbed = new URLSearchParams(location.search).has('embed');
  if (isEmbed) {
    document.body.classList.add('embed');
    return;
  }

  var veil = document.createElement('div');
  veil.className = 'blackout';
  veil.setAttribute('aria-hidden', 'true');
  veil.innerHTML = '<span>press any key</span>';
  document.body.appendChild(veil);

  var hint = document.createElement('div');
  hint.className = 'stage-hint';
  hint.textContent = 'space / → reveal · B or esc blackout';
  document.body.appendChild(hint);

  // Show the key reminder briefly, then get it off the screen. Moving the
  // mouse brings it back, so it is there when you are looking for it.
  var hintTimer;
  function nudgeHint() {
    hint.classList.remove('is-gone');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hint.classList.add('is-gone'); }, 4000);
  }
  nudgeHint();
  document.addEventListener('mousemove', nudgeHint);

  var dark = false;

  function setDark(v) {
    dark = v;
    veil.classList.toggle('is-on', dark);
  }

  // Capture phase on window, so this runs before any demo's own keydown handler
  // no matter what order the scripts happen to load in.
  window.addEventListener('keydown', function (e) {
    var k = e.key.toLowerCase();

    if (k === 'b' || k === 'escape') {
      e.preventDefault();
      e.stopImmediatePropagation();
      setDark(!dark);
      return;
    }

    // Any key clears a blackout, so a fumbled remote never strands you in the dark.
    // Stopping propagation keeps that keypress from ALSO advancing the reveal, so
    // coming out of black costs one press and does not skip a beat.
    if (dark) {
      e.preventDefault();
      e.stopImmediatePropagation();
      setDark(false);
    }
  }, true);

  veil.addEventListener('click', function () { setDark(false); });

  // Expose for demos that want to blank on their own schedule.
  window.StageBlackout = setDark;
})();
