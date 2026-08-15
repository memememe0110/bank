const screens=[...document.querySelectorAll(".screen")];
const nav=[...document.querySelectorAll(".nav-item")];
function show(name){
  screens.forEach(s=>s.classList.toggle("active",s.id===name));
  nav.forEach(b=>b.classList.toggle("active",b.dataset.screen===name));
  window.scrollTo(0,0);
}
nav.forEach(b=>b.addEventListener("click",()=>show(b.dataset.screen)));
document.addEventListener("gesturestart",e=>e.preventDefault());


/* v13: iOS zoom prevention */
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gestureend", function (e) {
  e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener("touchend", function (e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 350) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

document.addEventListener("dblclick", function (e) {
  e.preventDefault();
}, { passive: false });
