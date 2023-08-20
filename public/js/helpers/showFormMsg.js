export const showFormMsg = (msg) => {
  const alertMsg = `<div class="alert alert-warning form-alert">
          <div>
            <i class="bi bi-exclamation-triangle-fill"></i>
            <label>${msg}</label>
          </div>
          <button type="button" class="btn-close" id="form-alert-btn"></button>
        </div>`;

  $(".alert-container")
    .html(alertMsg)
    .hide()
    .fadeIn(() => {
      $("html, body").animate(
        { scrollTop: $(".form-alert").offset().top },
        500
      );
    });
};
