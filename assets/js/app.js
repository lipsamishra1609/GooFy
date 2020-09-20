/*var keyword = localStorage.getItem("storageName");*/
const GIPHY_KEY = 'ENTER_YOUR_API_KEY';

function home(){
  window.location.replace("index.html");
}

(function () {
  function giphySearch(keyword) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=16`)
      .then(response => response.json());
  }

  function appendImage(img) {
    let $div = $('<div class="img-wrapper"></div>');
    $('<div class="inner"></div>').append(img).appendTo($div);
    $('#thumbs').append($div)
  }

  function showLoader() {
    $('.loader-wrapper').addClass('shown');
  }

  function hideLoader() {
    $('.loader-wrapper').removeClass('shown');
  }

  function onImgLoad(img) {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
    });
  }

  (function listenOnFormSubmit() {
    $('#searchForm').submit(async (ev) => {
      ev.preventDefault();

      let $input = $('#searchInput');

      main($input.val());
    });
  })();

  async function main(keyword) {
    var keyword = localStorage.getItem("storageName");
    const result = await giphySearch(keyword);
    $('#thumbs').html('');
    showLoader();
    let promises = [];
    result.data.forEach(gif => {
      let img = new Image();
      img.src = gif.images.original.url;
      promises.push(onImgLoad(img));
      appendImage(img);
    });

    await Promise.all(promises);
    hideLoader();
  }
})();
