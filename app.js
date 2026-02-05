const navItems = document.querySelectorAll(".nav-item");
const installBanner = document.getElementById("install-banner");
const installNow = document.getElementById("install-now");
const openInstall = document.getElementById("open-install");

let deferredPrompt = null;

const sections = {
  inicio: document.querySelector(".hero"),
  servicios: document.getElementById("servicios"),
  panel: document.getElementById("panel"),
  contacto: document.getElementById("contacto"),
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    const section = sections[item.dataset.section];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBanner?.classList.add("show");
});

const triggerInstall = async () => {
  if (!deferredPrompt) {
    installBanner?.classList.add("show");
    return;
  }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBanner?.classList.remove("show");
};

installNow?.addEventListener("click", triggerInstall);
openInstall?.addEventListener("click", triggerInstall);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

const form = document.querySelector(".contact__form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  installBanner?.classList.add("show");
});
