const token = "8fcf49c5f0c2678bbf40b55311c44d87";
const language = "en";

const getNews = (keyWords) => {
  if (keyWords) $("#loader").show();
  fetch(
    `https://gnews.io/api/v4/top-headlines?lang=${language}&token=${token}${keyWords ? `&q=${keyWords}` : ""}`
  )
    .then((res) => res.json())
    .then((data) => {
      // Nhập data
      $('#news div').remove();
      data?.articles?.map((article, index) => {
        if (keyWords) $("#loader").hide();
        const news = `
          <div>
            <img src="${article.image}" alt="" />
            <h4>
              <a href="${article.url}" target="_blank">${article.title}</a>
            </h4>
            <p>${article.publishedAt}</p>
            <p>${article.description}</p>
          </div>
          `;
        $("#news").append(news);
        $("#news div").addClass("content");
        $("#search").hide();
      });
    })
    .catch((err) => console.error(err));
  if (keyWords) {
    $("#input").val("");
    $("body").css("background-color", "white");
  } else {
    $("body").css("background-color", "white");
  }
}

// get data on page loaded
getNews();

$("#search-btn").on("click", () => {
  $("#search").hide();
  let keyWords = $("input").val();
  getNews(keyWords);
})

//Ẩn hiện thanh tìm kiếm
$("#find").on("click", function () {
  $("#search").show();
  $("body").css("background-color", "lightgray");
});

$("button").on("click", function () {
  $("#search").hide();
  $("body").css("background-color", "white");
});
