const CARS = JSON.parse(DATA);

const dom = {
  feed: document.getElementById('feed'),
};

render(createCardsHTML(CARS), dom.feed);

function render(htmlStr, domElem, insertTo) {
  if (insertTo) {
    domElem.insertAdjacentHTML(insertTo, htmlStr);
  } else {
    domElem.innerHTML = htmlStr;
  }
}

function createCardsHTML(cardsArray) {
  return cardsArray.map((cardData) => createCardHTML(cardData)).join('');
}

function createCardHTML(cardData) {
  return `
      <div class="feed__card">
        <div class="feed__photo">
            <img src="${cardData.img}" alt="" width="1" height="1"> 
            <div class="photo-code">
                <i class="fas fa-car"></i>
                ${cardData.vin_check && 'Перевірений VIN-код' || '' }
            </div>
            <div class="photo-top">
              <i class="fas fa-trophy"></i>
              ${cardData.top && 'TOP' || '' }
            </div>
            <div class="photo-views"> 
                <i class="far fa-eye"></i>
                ${cardData.views}
            </div>
        </div>
        <div class="feed__block">
            <a href="#!" class="feed-title"> ${cardData.make} ${cardData.model} ${cardData.year} </a>
            <div class="feed-price">${cardData.price} $</div>
            <ul class="feed__description">
                <li class="feed__description-text">
                    <i class="fas fa-tachometer-alt"></i>
                    ${cardData.mileage} км
                </li>
                <li class="feed__description-text">
                    <i class="fas fa-map-marker-alt"></i>
                    ${cardData.country}
                </li>
                <li class="feed__description-text">
                    <i class="fas fa-gas-pump"></i>
                    ${cardData.fuel},  ${cardData.engine_volume}л
                </li>
                <li class="feed__description-text">
                    <i class="fab fa-autoprefixer"></i>
                    ${cardData.transmission}
                </li>
            </ul>
            <dl class="feed__code">
                <dt class="feed__code-title">
                    Серія:
                    <dd class="feed__code-number">
                        <i class="fas fa-tachometer-alt"></i>
                        ${cardData.series || ' -' }
                    </dd>
                </dt>
                <dt class="feed__code-title">
                    Vin-номер:
                    <dd class="feed__code-number">
                        <i class="fas fa-tachometer-alt"></i>
                        ${cardData.vin || ' -'}
                    </dd>
                </dt>
            </dl>
            <dl class="feed__seller">
              <dt class="feed__seller-name">Продавець: 
                  <dd> ${cardData.seller || ' -'}</dd>
              </dt> 
              <dt class="feed__seller-tel">Подзвонити:
                <dd>
                  <a href="tel:${cardData.phone || ' -'}" >
                    <span></span> ${cardData.phone || ' -'}
                  </a>
                </dd>
              </dt>
            </dl>
            <h4>Розхід</р>
            <dl class="feed__consume">
              
              <dt class="feed__consume-title">В дорозі: 
                  <dd class="feed__consume-text">${cardData.road || ' -'}</dd>
              </dt> 
              <dt class="feed__consume-title">В місті: 
                <dd class="feed__consume-text">${cardData.city || ' -'}</dd>
              </dt>
              <dt class="feed__consume-title">Змішано:
                <dd class="feed__consume-text">${cardData.mixed || ' -'}</dd>
              </dt>
            </dl>
            <div class="feed__rating">
                <div class="rating__stars" id="star">☆☆☆☆☆</div>
                <p class="rating__number">${cardData.rating}</p>
            </div>
            
        </div>
      </div>
      <div class="line"></div>
    `;
}
