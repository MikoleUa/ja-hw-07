import { galleryItems } from "./gallery-items.js";

// варіант 1 (без бібліотеки)
const galleryContainer = document.querySelector(".gallery");

const galleryElements = createGalleryElements(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryElements);

function createGalleryElements(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}
function createModalElemen(imgActive, altActive) {
  return `<div class="modal"> <div class= "modal-content"> <img src="${imgActive}" alt="${altActive}"> </div></div>`;
}

let modalRef;
galleryContainer.addEventListener("click", onOpenModal);

function onOpenModal(e) {
  e.preventDefault();
  if (e.target.classList.contains("gallery__image")) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      createModalElemen(e.target.dataset.source, e.target.alt)
    );

    modalRef = document.querySelector(".modal");
    window.addEventListener("keydown", onCloseModal);
    modalRef.addEventListener("click", onCloseModalClick);
  }
}
function onCloseModal(e) {
  if (e.code === "Escape") {
    modalRef?.remove();
    window.removeEventListener("keydown", onCloseModal);
  }
}
function onCloseModalClick(e) {
  console.log(e.target);
  console.log(e.currentTarget);
  if (e.target === e.currentTarget) {
    modalRef?.remove();
    modalRef.removeEventListener("click", onCloseModalClick);
  }
}
