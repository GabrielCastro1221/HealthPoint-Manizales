document.addEventListener("DOMContentLoaded", () => {
  const mainServices = document.getElementById("main-services");

  const services = [
    {
      icon: "fa-solid fa-truck-medical",
      title: "Agendar citas médicas",
      description:
        "En nuestra plataforma, los pacientes tienen la posibilidad de agendar citas médicas tanto de manera virtual como presencial. Nuestra plataforma garantiza que cada paciente pueda acceder a la atención médica de calidad que necesita.",
      keywords: "citas médicas, agendar citas, atención médica",
    },
    {
      icon: "fa-regular fa-hospital",
      title: "Perfil de doctores",
      description:
        "Cada doctor deberá diligenciar un formulario en el que se almacenará la información sobre su especialidad y los horarios disponibles para las citas médicas. Cuando el perfil sea aprobado, podrá recibir citas de sus pacientes.",
      keywords: "perfil de doctores, especialidad médica, horarios de citas",
    },
    {
      icon: "fa-regular fa-heart",
      title: "Métodos de Pago",
      description:
        "Si se agenda una cita presencial el paciente podrá realizar el pago en el sitio de la consulta médica, pero si la cita es online el pago deberá hacerse por la pasarela de pago de la plataforma para que el enlace de la video consulta se active.",
      keywords: "métodos de pago, pasarela de pago, citas médicas online",
    },
  ];

  services.forEach((service) => {
    const article = document.createElement("article");
    article.className = "inner-services";

    const iconDiv = document.createElement("div");
    iconDiv.className = "service-icon";
    iconDiv.setAttribute("role", "img");
    iconDiv.setAttribute("aria-label", service.title);

    const icon = document.createElement("i");
    icon.className = service.icon;
    icon.setAttribute("aria-hidden", "true");

    const h3 = document.createElement("h3");
    h3.textContent = service.title;
    h3.setAttribute("data-seo-keywords", service.keywords);

    const p = document.createElement("p");
    p.textContent = service.description;

    iconDiv.appendChild(icon);
    article.appendChild(iconDiv);
    article.appendChild(h3);
    article.appendChild(p);

    mainServices.appendChild(article);
  });
});
