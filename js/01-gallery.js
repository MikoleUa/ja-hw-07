import { galleryItems } from "./gallery-items.js";

// Варіант 2 (з бібліотекою)
const galaryContainer = document.querySelector(".gallery");
const createdGalleryElements = createGalleryElements(galleryItems);
galaryContainer.insertAdjacentHTML("afterbegin", createdGalleryElements);
function createGalleryElements(galleryItems) {
  return galleryItems.reduce((acc, { original, preview, description }) => {
    return (
      acc +
      `<div class="gallery__item">
     <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
    );
  }, "");
}
let elem = {};
galaryContainer.onclick = (e) => {
  e.preventDefault();
  if (e.target.dataset.source) {
    elem = createOriginalImg(e.target);
    elem.show();
    window.addEventListener("keydown", closeModalByKey);
  }
};
function createOriginalImg(data) {
  return basicLightbox.create(
    `<img src="${data.dataset.source}" alt="${data.getAttribute("alt")}">`
  );
}
function closeModalByKey(e) {
  if (e.code === "Escape") elem.close();
  window.removeEventListener("keydown", closeModalByKey);
}
