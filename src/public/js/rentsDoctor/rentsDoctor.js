document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-create-rent-container");
  const openModalButton = document.getElementById("modal-create-rent");
  const closeModalButton = modal.querySelector(".close-modal");
  const createForm = document.getElementById("create-rent-form");

  const addImageButton = document.getElementById("add-image");
  const galleryContainer = document.getElementById("photo-inputs");

  // Abrir modal
  openModalButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  });

  // Cerrar modal
  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.display = "none";
  });

  // Cerrar modal si se hace click fuera de la ventana
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
    }
  });

  // Agregar más imágenes a la galería
  addImageButton.addEventListener("click", () => {
    const newInputContainer = document.createElement("div");
    newInputContainer.classList.add("file-input-container");

    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.name = "photos";
    newInput.accept = "image/*";
    newInput.classList.add("gallery-input");

    const newLabel = document.createElement("label");
    newLabel.classList.add("file-input-label");
    newLabel.innerHTML = '<i class="fas fa-plus"></i>';
    
    newInputContainer.appendChild(newInput);
    newInputContainer.appendChild(newLabel);
    galleryContainer.appendChild(newInputContainer);
  });

  // Manejo de envío de formulario
  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();


    // Crear FormData con los valores del formulario
    const formData = new FormData(createForm);
    
    // Añadir el doctorId y category a FormData // Asegurarse de enviar el ID del doctor
    formData.append("category", document.getElementById("category").value);  // Enviar la categoría

    try {
      const response = await fetch("/api/v1/rent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear la renta");
      }

      const data = await response.json();
      console.log("Renta creada con éxito:", data);
      Toastify({
        text: "Renta creada con éxito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        background: "#4CAF50",
      }).showToast();

      modal.classList.add("hidden");
      modal.style.display = "none";

      fetchDoctorProfile(); 
    } catch (error) {
      console.error("Error:", error.message);
      Toastify({
        text: "Error al crear la renta",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        background: "#FF0000",
      }).showToast();
    }
  });

  const rentsContainer = document.getElementById("rents-card-container");
  const rents = JSON.parse(localStorage.getItem("rents")) || [];
  const doctorId = localStorage.getItem("_id");
console.log(doctorId)
  rents.forEach((rent) => {
    const rentElement = document.createElement("div");
    rentElement.classList.add("rent-item");
    rentElement.innerHTML = `
      <div class="rent-image">
        <img src="${rent.img}" alt="${rent.title}">
      </div>
      <div class="rent-details">
        <h3>${rent.title}</h3>
        <p>${rent.description}</p>
        <p><strong>Precio:</strong> $${rent.price}</p>
        <p><strong>Dimensiones:</strong> ${rent.dimension}²</p>
        <p><strong>Dirección:</strong> ${rent.address}</p>
        <p><strong>Estado:</strong> ${rent.status}</p>
      </div>
    `;
    rentsContainer.appendChild(rentElement);
  });
});
