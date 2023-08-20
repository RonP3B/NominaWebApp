export const collapseForm = () => {
  const plus = "M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z";
  const minus = "M19 12.998H5v-2h14z";

  $("#btn-collapse path").attr(
    "d",
    $("#btn-collapse path").attr("d") === plus ? minus : plus
  );

  $("#collapse-form").slideToggle();
};
