document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.getElementById("mainImg");
  const galleryImages = document.querySelectorAll("#gallery img");
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      mainImg.src = img.src;
      galleryImages.forEach((image) => image.classList.remove("active"));
      img.classList.add("active");
    });
  });
});
