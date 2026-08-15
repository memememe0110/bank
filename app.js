const screens=[...document.querySelectorAll(".screen")];
const nav=[...document.querySelectorAll(".nav-item")];
function show(name){
  screens.forEach(s=>s.classList.toggle("active",s.id===name));
  nav.forEach(b=>b.classList.toggle("active",b.dataset.screen===name));
  window.scrollTo(0,0);
}
nav.forEach(b=>b.addEventListener("click",()=>show(b.dataset.screen)));
document.addEventListener("gesturestart",e=>e.preventDefault());
