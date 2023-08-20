export const filterEmployees = (input) => {
  const filteredValue = $(input).val().toLowerCase();
  const filteredWords = filteredValue.split(" ");

  const filteredCards = $(".employee-card").filter(function () {
    const cardName = $(this).find("h4").text().toLowerCase();
    return filteredWords.every((word) => cardName.indexOf(word) !== -1);
  });

  if (filteredCards.length === 0) {
    $(".grid-container").hide();
    $(".no-employees.filtered").show();
  } else {
    $(".grid-container").show();
    $(".no-employees.filtered").hide();
    $(".employee-card").hide();
    filteredCards.show();
  }
};
