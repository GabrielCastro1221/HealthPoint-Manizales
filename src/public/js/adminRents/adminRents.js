document.addEventListener("DOMContentLoaded", async () => {
  const rentsCardContainer = document.getElementById("rents-card-container");

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/v1/rent", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (
      data.status === true &&
      Array.isArray(data.rentas) &&
      data.rentas.length > 0
    ) {
      data.rentas.forEach((rent) => {
        const rentCard = document.createElement("div");
        rentCard.classList.add("rents-card");

        rentCard.innerHTML = `
  <div class="rents-photo">
    <img src="${
      rent.img || "https://via.placeholder.com/150?text=No+Image"
    }" alt="Imagen de la renta">
  </div>
  <div class="rents-info">
    <h2>${rent.title}</h2>
    <p><strong>Descripción:</strong> ${rent.description}</p>
    <p><strong>Precio:</strong> $${rent.price}</p>
    <p><strong>Dimensiones:</strong> ${rent.dimension}²</p>
    <p><strong>Dirección:</strong> ${rent.address}</p>
    <p><strong>Estado de aprobación:</strong> <span class="rent-status">${
      rent.isApproved
    }</span></p>
    <p><strong>Estado:</strong> <span class="">${rent.status}</span></p>
    <div class="btn-rents">
      <button class="approveRent" data-id="${rent._id}">Aprobar</button>
      <button class="cancelRent" data-id="${rent._id}">Cancelar</button>
      <button class="deleteRent" data-id="${rent._id}">Eliminar</button>
    </div>
  </div>
`;

        const approveButton = rentCard.querySelector(".approveRent");
        approveButton.addEventListener("click", async (event) => {
          const rentId = event.target.dataset.id;

          try {
            const approveResponse = await fetch(
              `/api/v1/rent/${rentId}/approval-status`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const approveData = await approveResponse.json();

            if (approveResponse.ok) {
              const rentStatusElement = rentCard.querySelector(".rent-status");
              rentStatusElement.textContent = "aprobado";
              Toastify({
                text: "Renta aprobada con éxito",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#4CAF50",
              }).showToast();
            } else {
              Toastify({
                text: `Error al aprobar la renta: ${approveData.message}`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#FF0000",
              }).showToast();
            }
          } catch (err) {
            console.error("Error al aprobar la renta:", err);
            Toastify({
              text: "Error al aprobar la renta",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              background: "#FF0000",
            }).showToast();
          }
        });

        const cancelButton = rentCard.querySelector(".cancelRent");
        cancelButton.addEventListener("click", async (event) => {
          const rentId = event.target.dataset.id;

          try {
            const cancelResponse = await fetch(
              `/api/v1/rent/${rentId}/cancelled-status`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const cancelData = await cancelResponse.json();

            if (cancelResponse.ok) {
              const rentStatusElement = rentCard.querySelector(".rent-status");
              rentStatusElement.textContent = "cancelado";
              Toastify({
                text: "Renta cancelada con éxito",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#FF0000",
              }).showToast();
            } else {
              Toastify({
                text: `Error al cancelar la renta: ${cancelData.message}`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#FF0000",
              }).showToast();
            }
          } catch (err) {
            console.error("Error al cancelar la renta:", err);
            Toastify({
              text: "Error al cancelar la renta",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              background: "#FF0000",
            }).showToast();
          }
        });

        const deleteButton = rentCard.querySelector(".deleteRent");
        deleteButton.addEventListener("click", async (event) => {
          const rentId = event.target.dataset.id;

          try {
            const deleteResponse = await fetch(`/api/v1/rent/${rentId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            const deleteData = await deleteResponse.json();

            if (deleteResponse.ok) {
              rentsCardContainer.removeChild(rentCard);
              Toastify({
                text: "Renta eliminada con éxito",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#FF0000",
              }).showToast();
            } else {
              Toastify({
                text: `Error al eliminar la renta: ${deleteData.message}`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                background: "#FF0000",
              }).showToast();
            }
          } catch (err) {
            console.error("Error al eliminar la renta:", err);
            Toastify({
              text: "Error al eliminar la renta",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              background: "#FF0000",
            }).showToast();
          }
        });

        rentsCardContainer.appendChild(rentCard);
      });
    } else {
      console.log("No se encontraron rentas o la respuesta es incorrecta.");
      Toastify({
        text: "No se encontraron rentas.",
        background: "linear-gradient(to right, #ff5f6d, #ffc3a0)",
        className: "error",
        position: "right",
        duration: 3000,
      }).showToast();
    }
  } catch (error) {
    console.error("Error fetching rents:", error);
    Toastify({
      text: "Error al cargar los datos de las rentas.",
      background: "linear-gradient(to right, #ff5f6d, #ffc3a0)",
      className: "error",
      position: "right",
      duration: 3000,
    }).showToast();
  }
});
