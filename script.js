const toTop = document.getElementById("toTop");

function toggle() {
  if (!toTop) return;
  if (window.scrollY > 200) toTop.classList.add("show");
  else toTop.classList.remove("show");
}
if (toTop) {
  toTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
window.addEventListener("scroll", toggle);
window.addEventListener("load", toggle);
toggle();

// ===============================================
// ENQUIRY MODAL LOGIC
// ===============================================

const enquiryModal = document.getElementById("enquiryModal");
const modalClose = document.querySelector(".enquiry-modal .modal-close");
const enquiryLinks = document.querySelectorAll(".enquiry-link, .enquriy-btn");

function openEnquiryModal(e) {
  if (e) e.preventDefault();
  if (enquiryModal) {
    enquiryModal.classList.add("show");
    enquiryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  }
}

function closeEnquiryModal() {
  if (enquiryModal) {
    enquiryModal.classList.remove("show");
    enquiryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  }
}

enquiryLinks.forEach(link => {
  link.addEventListener("click", openEnquiryModal);
});

if (modalClose) {
  modalClose.addEventListener("click", closeEnquiryModal);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeEnquiryModal();
});

document.addEventListener("click", function (e) {
  const header = e.target.closest(".dropdown-header");
  if (header) {
    const container = header.closest(".dropdown-container");
    const isOpen = container.classList.contains("open");
    
    document.querySelectorAll(".dropdown-container").forEach(c => {
      if (c !== container) {
        c.classList.remove("open");
        const list = c.querySelector(".dropdown-list");
        if (list) list.style.display = "none";
        const arrow = c.querySelector(".arrow");
        if (arrow) arrow.classList.remove("rotate");
      }
    });

    container.classList.toggle("open");
    const list = container.querySelector(".dropdown-list");
    const arrow = container.querySelector(".arrow");
    if (list) list.style.display = container.classList.contains("open") ? "block" : "none";
    if (arrow) arrow.classList.toggle("rotate", container.classList.contains("open"));
    return;
  }
  
  if (!e.target.closest(".dropdown-container")) {
    document.querySelectorAll(".dropdown-container").forEach(c => {
      c.classList.remove("open");
      const list = c.querySelector(".dropdown-list");
      if (list) list.style.display = "none";
      const arrow = c.querySelector(".arrow");
      if (arrow) arrow.classList.remove("rotate");
    });
  }
});

window.selectItem = function(value) {
  const selected = document.getElementById("selected");
  const dropdown = document.getElementById("dropdownList");
  const arrow = document.getElementById("arrow");
  
  if (selected) {
    selected.innerText = value;
    selected.style.color = "#333";
  }
  if (dropdown) dropdown.style.display = "none";
  if (arrow) arrow.classList.remove("rotate");
  const container = dropdown.closest(".dropdown-container");
  if (container) container.classList.remove("open");
};

window.selectItemModal = function(value, el) {
  const container = el.closest(".dropdown-container");
  const selected = container.querySelector(".selected-text");
  const dropdown = container.querySelector(".dropdown-list");
  const arrow = container.querySelector(".arrow");
  
  if (selected) {
    selected.innerText = value;
    selected.style.color = "#333";
  }
  if (dropdown) dropdown.style.display = "none";
  if (arrow) arrow.classList.remove("rotate");
  if (container) container.classList.remove("open");
};

// ===============================================
// MOBILE MENU LOGIC
// ===============================================

(function () {
  const btn = document.querySelector(".hamburger");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.querySelector(".mobile-menu .mobile-close");

  function openMenu() {
    if (!menu || !btn) return;
    if (!btn.dataset.orig) btn.dataset.orig = btn.innerHTML;
    btn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
    btn.setAttribute("aria-label", "Close menu");
    btn.classList.add("open");
    menu.classList.add("show");
    menu.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  }

  function closeMenu() {
    if (!menu || !btn) return;
    if (btn.dataset.orig) btn.innerHTML = btn.dataset.orig;
    btn.setAttribute("aria-label", "Open menu");
    btn.classList.remove("open");
    menu.classList.remove("show");
    menu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  }

  if (btn) {
    btn.addEventListener("click", function () {
      if (menu && menu.classList.contains("show")) closeMenu();
      else openMenu();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();

