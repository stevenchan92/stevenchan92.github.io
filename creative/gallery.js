(function () {
  const strip = document.querySelector('.gallery-strip[data-manifest]');
  if (!strip) return;

  fetch(strip.dataset.manifest)
    .then(function (r) { return r.json(); })
    .then(function (files) {
      strip.innerHTML = files.map(function (f) {
        return [
          '<div class="gallery-item">',
          '  <div class="img-wrapper">',
          '    <img src="img/' + f + '" alt="" loading="lazy">',
          '  </div>',
          '  <p class="caption">—</p>',
          '</div>'
        ].join('\n');
      }).join('\n');
    });

  // Drag-to-scroll
  var isDown = false, startX, scrollLeft;
  strip.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
  });
  strip.addEventListener('mouseleave', function () { isDown = false; });
  strip.addEventListener('mouseup',    function () { isDown = false; });
  strip.addEventListener('mousemove',  function (e) {
    if (!isDown) return;
    e.preventDefault();
    strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX);
  });

  // Block right-click context menu over images
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('.img-wrapper')) e.preventDefault();
  });
}());
