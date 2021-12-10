const INITIAL_CARS = JSON.parse(DATA);
let CARS = INITIAL_CARS

const dom = {
  feed: document.getElementById('feed'),
  sortSelect: document.getElementById('sortSelect'),
  searchForm: document.getElementById('searchForm')
};
const searchFields = ['make','model','year']


render(createCardsHTML(CARS), dom.feed);
getSort();



dom.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  const query = deserializeQueryString(e.target.search.value)
  console.log(query);
  CARS = search(query, INITIAL_CARS, searchFields)
  render(createCardsHTML(CARS), dom.feed);
  e.target.reset()
})


function search(query, array, fields) {
  return array.filter(el => {
    return query.every(word => {
      return fields.some(field => {
        return String(el[field]).toLowerCase().includes(word)
      })
    })
  })
}





function deserializeQueryString(str = '') {
  return str.trim().replaceAll(/[\s]{2,}/g, ' ').toLowerCase().split(' ')
}
function getSort() {
  dom.sortSelect.addEventListener('change', (e) => {
    const select = e.target.classList.contains('sort__select');
    if (select) {
      const sortValue = e.target.value.split('/');
      const key = sortValue[0];
      const order = sortValue[1];
      createSort(key, order);
      render(createCardsHTML(CARS), dom.feed);
    }
  });
}

// sortSelect.addEventListener('change', e => {

// console.log(`Change on ${e.target.name}`, e.target.value);
// sortParams[e.target.name] = e.target.value
// console.log(sortParams);
// })

// function getSort() {
//   const selects = dom.sortSelect.querySelectorAll('.sort__select');
//   selects.forEach( select => {
//     select.addEventListener('change', (e) => {
//       const sortValue = e.target.value.split('/');
//       const key = sortValue[0];
//       const order = sortValue[1]
//       createSort(key, order)
//     })
//   })
// }

function createSort(key, order) {
  CARS.sort((a, b) => {
    return (
      String(Number(a[key]) || a[key]).localeCompare(String(Number(b[key]) || b[key]), undefined, { numeric: true }) *
      order
    );
  });
}

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
      <div class="card">
        <div class="card__photo">
            <img src="${cardData.img}" alt="${cardData.make} ${cardData.model} ${
    cardData.year
  }" width="1" height="1" loading="lazy" decoding="async"> 
            <div class="photo__top">
            ${
              (cardData.vin_check && `<div class="photo__top-code"><i class="fas fa-car"></i> Перевірено! </div>`) || ''
            }
            ${(cardData.top && `<div class="photo__top-top"><i class="fas fa-trophy"> TOP </i></div>`) || ''}
            </div>
            ${
              (cardData.views &&
                ` <div class="card-views"> 
            <i class="far fa-eye"></i>${cardData.views} </div>`) ||
              ''
            }
        </div>
        <div class="card__block">
            <a href="#!" class="card-title"> ${cardData.make} ${cardData.model} ${cardData.year} </a>
            <div class="card-price">${cardData.price} $</div>
            <ul class="card__description">
                <li class="card__description-text">
                    <i class="fas fa-tachometer-alt"></i>
                    ${cardData.mileage} км
                </li>
                <li class="card__description-text">
                    <i class="fas fa-map-marker-alt"></i>
                    ${cardData.country}
                </li>
                <li class="card__description-text">
                    <i class="fas fa-gas-pump"></i>
                    ${cardData.fuel},  ${cardData.engine_volume}л
                </li>
                <li class="card__description-text">
                    <i class="fab fa-autoprefixer"></i>
                    ${cardData.transmission}
                </li>
            </ul>
            <dl class="card__code">
                <dt class="card__code-title">
                    Vin-номер:
                    <dd class="card__code-number">
                        <i class="fas fa-tachometer-alt"></i>
                        ${cardData.vin || ' -'}
                    </dd>
                </dt>
            </dl>
            <dl class="card__seller">
              <dt class="card__seller-name">Продавець: 
                  <dd> ${cardData.seller || ' -'}</dd>
              </dt> 
              <dt class="card__seller-tel">Подзвонити:
                <dd>
                  <a href="tel:${cardData.phone || ' -'}" >
                    <span></span> ${cardData.phone || ' -'}
                  </a>
                </dd>
              </dt>
            </dl>
            <h3>Розхід</h3>
            <dl class="card__consume">
              <div>
                <dt class="card__consume-title">В дорозі:</dt> 
                <dd class="card__consume-text">${cardData.consume?.road || 'не вказано'} </dd>
              </div>
              <div>
                <dt class="card__consume-title">В місті:</dt>
                <dd class="card__consume-text">${cardData.consume?.city || 'не вказано'}</dd>
              </div>
              <div>
                <dt class="card__consume-title">Змішано:</dt>
                <dd class="card__consume-text">${cardData.consume?.mixed || 'не вказано'}</dd>
              </div>
            </dl>
            <div class="card__bottom">
              <div>
                  <div class="card__stars">${createRating(cardData.rating)}</div>
              </div>
              <div class="card__bottom-date">
                <p>Дата створення оголошення:</p>
                <p>${new Date(cardData.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
        </div>
      </div>
    `;
}

function createRating(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (rating > i + 0.5) {
      stars += '<i class="fas fa-star"></i>';
    } else if (rating > i) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// const array = [5,10,9,12,2,6,7,11,4,3]
// array.sort((a,b) => {
//   return String(a).localeCompare(String(b), undefined, {numeric: true})
// })
// console.log(array);

// const array = ['ёжик','яблоко','лес']
// array.sort((a,b) => {
//   return String(Number(a)).localeCompare(String(Number(b)), undefined, {numeric: true})
// })
// console.log(array);

// const array = [true, true, false, true, false, false];
// array.sort((a, b) => {
//   return String(Number(a)).localeCompare(String(Number(b)), undefined, { numeric: true });
// });
// console.log(array);

// uk-UA
// ru-UA
// en-GB
// en-US
// en-CA

// document.addEventListener('click', e => {
//   console.log('Click!');
// })

const children = [
  {name: 'Nick', gender: 'male', height: 165}, 
  {name: 'Ira', gender: 'female', height: 157},
  {name: 'Lera', gender: 'female', height: 140},
  {name: 'Ivan', gender: 'male', height: 160},
  {name: 'Oleh', gender: 'male', height: 163}, 
  {name: 'Lina', gender: 'female', height: 155},
  {name: 'Stas', gender: 'male', height: 161},
  {name: 'Kira', gender: 'female', height: 156},
  {name: 'Den', gender: 'male', height: 158},
  {name: 'Kris', gender: 'female', height: 164}
]

const children2 = [
  {name: 'Nick', gender: 'male', height: 165}, 
  {name: 'Ira', gender: 'female', height: 157},
  {name: 'Lera', gender: 'female', height: 140},
  {name: 'Ivan', gender: 'male', height: 160},
  {name: 'Oleh', gender: 'male', height: 163}, 
  {name: 'Lina', gender: 'female', height: 155},
  {name: 'Stas', gender: 'male', height: 161},
  {name: 'Kira', gender: 'female', height: 156},
  {name: 'Den', gender: 'male', height: 158},
  {name: 'Kris', gender: 'female', height: 164}
]

children.sort((a, b) => {
  return String(Number(a.gender)).localeCompare(String(Number(b.gender)), undefined, {numeric: true}) * -1 || 
  String(Number(a.height)).localeCompare(String(Number(b.height)), undefined, {numeric: true}) * -1 
})

children2.sort((a, b) => {
  return String(Number(a.gender)).localeCompare(String(Number(b.gender)), undefined, {numeric: true}) * 1 || 
  String(Number(a.height)).localeCompare(String(Number(b.height)), undefined, {numeric: true}) * 1
})

  console.log(children)
  console.log(children2)