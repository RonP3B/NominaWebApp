const showBackendToast = (msg) => {
  Toastify({
    text: msg,
    duration: 4000,
    gravity: "top",
    position: "left",
    style: {
      background:
        "linear-gradient(87.4deg, rgb(255, 241, 165) 1.9%, rgb(200, 125, 76) 49.7%, rgb(83, 54, 54) 100.5%)",
      boxShadow:
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      color: "white",
      fontSize: "1.225rem",
      fontWeight: 500,
    },
  }).showToast();
};
