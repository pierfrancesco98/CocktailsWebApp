
const nav = document.querySelector('header');

window.addEventListener('scroll', () => {
if(window.scrollY >= 180) {
    nav.classList.add('active');
}else {
    nav.classList.remove('active');
}
});
let globalData = null;
const container = document.querySelector('.card-container');
const buttons = document.querySelectorAll('.btn');



let cocktailCategory ='Ordinary_Drink'; 

function createCocktailCards(cocktailData) {
  const pageSlice = cocktailData.drinks.slice(0, 10);
  console.log(pageSlice);
  pageSlice.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-header">
        <h4>${data.strDrink}</h4>
        <i class="fas fa-heart"></i>
      </div>
      <img id="${data.idDrink}" src="${data.strDrinkThumb}">
    `;
    container.append(card);
    document.getElementById(data.idDrink).addEventListener('click', async (event) => {
      console.log(event.target.id);
   /*   try {
        const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${event.target.id}`);
        const result = await response.json();
      } catch (error) {
        console.error(error);
      }*/
    });
  });
}


async function fetchDataAndCreateCards(cocktailCategory) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cocktailCategory}`);
    const result = await response.json();
    globalData = result;
    container.innerHTML = ''; 
    createCocktailCards(globalData);
  } catch (error) {
    console.error(error);
  }
}

let activeButton = document.querySelector('.btn.active');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.id);
    if (activeButton) {
      activeButton.classList.remove('active'); 
    }
    cocktailCategory = event.target.id;
    fetchDataAndCreateCards(cocktailCategory);
    activeButton = event.target; 
    activeButton.classList.add('active'); 
  });
});


fetchDataAndCreateCards(cocktailCategory);

//https://www.thecocktaildb.com/
