const news = document.querySelector('.news');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add news form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render news data
const renderNew = (data, id) => {

  const html = `
  <div class="card-panel news white row" data-id="${id}">
    <img src="/img/news.png" alt="news thumb">
    <div class="news-details">
      <div class="news-title">${data.title}</div>
      <div class="news-body">${data.body}</div>
    </div>
    <div class="news-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div>
  `;

  news.innerHTML += html;

}

// remove news from dom
const removeNew = (id) => {
  const news = document.querySelector(`.news[data-id=${id}]`);
  news.remove();
}