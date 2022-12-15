import { galleryItems } from "./gallery-items.js";

const refGaleryElements = document.querySelector(".gallery");

refGaleryElements.addEventListener("click", onClick);

refGaleryElements.insertAdjacentHTML(
  "afterbegin",
  createElementGalery(galleryItems)
);

let currentIndex = 0;

function onClick(event) {
  event.preventDefault();

  if (event.target.classList.contains("gallery__image")) {
    getCurrentIndex();
    refGaleryElements.insertAdjacentHTML(
      "afterbegin",
      createModal(currentIndex)
    );
    refreshActiveDot(currentIndex);
  }
  if (event.target.classList.contains("dots-link")) {
    currentIndex = onClickDot(event);
    changeImageInModal(currentIndex);
    refreshActiveDot(currentIndex);
  }
  if (event.target.dataset.action === "prev") {
    currentIndex = decrement(currentIndex);
    changeImageInModal(currentIndex);
    refreshActiveDot(currentIndex);
  }
  if (event.target.dataset.action === "next") {
    currentIndex = increment(currentIndex);
    changeImageInModal(currentIndex);
    refreshActiveDot(currentIndex);
  }
  if (event.target.classList.contains("modal")) onCloseModal();
  window.addEventListener("keydown", onEscCloseModal);
}
function getCurrentIndex() {
  if (event.target.classList.contains("gallery__image"))
    return (currentIndex = galleryItems.findIndex(
      (e) => e.preview === event.target.getAttribute("src")
    ));
}
function createModal(currentIndex) {
  const { preview, original, description } = galleryItems[currentIndex];

  return `<div class='modal'>
<div class = 'modal-content '>
  <img src="${original}" alt="${description}">
<div class = 'btnControl'>
<button class = 'btn-prev' data-action = 'prev'>&#10094</button>
<button class = 'btn-next' data-action = 'next'> &#10095</button>
</div>
<div class = 'dots'>${galleryItems
    .map(({ original }, i) => {
      return `<a class = 'dots-link' href = '${original}'>${i + 1}</a>`;
    })
    .join("")} </div>
</div>
</div>`;
}
function createElementGalery(galleryItems) {
  return galleryItems.reduce((acc, { preview, original, description }) => {
    return (
      acc +
      ` <li> <a class="gallery__item" href="${original}">
      <img loading = 'lazy' class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    </li>`
    );
  }, "");
}
function onCloseModal() {
  const modal = document.querySelector(".modal");
  modal?.remove();
  window.removeEventListener("keydown", onEscCloseModal);
}
function onEscCloseModal() {
  if (event.code === "Escape") onCloseModal();
}
function increment(numberOfIndex) {
  return numberOfIndex >= galleryItems.length - 1
    ? (numberOfIndex = 0)
    : (numberOfIndex += 1);
}
function decrement(numberOfIndex) {
  return numberOfIndex === 0
    ? (numberOfIndex = galleryItems.length - 1)
    : (numberOfIndex -= 1);
}
function changeImageInModal(numberOfIndex) {
  const imgModalRef = document.querySelector(".modal-content > img");
  const { preview, original, description } = galleryItems[numberOfIndex];
  imgModalRef.src = original;
}
function onClickDot(e) {
  const dotsRef = document.querySelectorAll(".dots-link ");

  return [...dotsRef].indexOf(e.target);
}
function refreshActiveDot(numberOfIndex) {
  const dotsRef = document.querySelectorAll(".dots-link ");
  const activeDot = document.querySelector(".dot-active ");

  activeDot?.classList.remove("dot-active");
  dotsRef[numberOfIndex].classList.add("dot-active");
}
