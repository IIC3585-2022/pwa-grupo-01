function getNews() {
  fetch("/news")
    .then(res => res.json())
    .then(function(allNews) {
      const newsContainer = document.querySelector(".news")
      allNews.forEach(function(news) {
        newsContainer.innerHTML += displayNews(news)
      })
    });
}

function displayNews(news) {
  return `
  <div class="card-panel news white row" data-id="${news.id}">
    <img src="/images/news.png" alt="news thumb">
    <div class="news-details">
      <div class="news-title">${news.title}</div>
      <div class="news-body">${news.body}</div>
    </div>
    <div class="news-delete">
      <i class="material-icons" data-id="${news.id}">delete_outline</i>
    </div>
  </div>
  `;
}

// remove news from dom
const removeNews = (id) => {
  const news = document.querySelector(`.news[data-id="${id}"]`);
  news.remove();
}

// add news
const form = document.querySelector('form');
form.addEventListener('submit', async evt => {
    evt.preventDefault();

    let news = {
        title: form.title.value,
        body: form.body.value,
    };

    news = await fetch("/news", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(news)
    }).then(res => res.json())
    console.log(news);
    //socket.emit("news", news);

    form.title.value = '';
    form.body.value = '';

    const newsContainer = document.querySelector(".news")
    newsContainer.innerHTML += displayNews(news)

})

// delete news
const newsContainer = document.querySelector('.news');
newsContainer.addEventListener('click', evt => {
    // console.log(evt)
    if (evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        console.log(id);
        fetch("/news/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id
          })
        }).then(function(){
          console.log(`removing ${id}`)
          removeNews(id);
        })
    }
})

getNews()