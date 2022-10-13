let API_KEY = '1f410500'
let title = "Football"
let page = 2
let link = `https://www.omdbapi.com/?&apikey=${API_KEY}&s=${title}&p=${2}`
// fetch(link)
// console.log(fetch(link))
// Promise peding => Va'da kutilmoqda
let template = renderElement("template").content
let cards = renderElement(".cardss")
fetch(link)
.then((response) => response.json())
.then((data) => renderCard(data))
function renderCard (data){
    console.log(data)
    let arr = data.Search.slice(0, 10)
    for(let i = 0; i<arr.length; i++){
        let cloun = template.cloneNode(true)
        let img = cloun.querySelector(".card-img-top")
        img.src = arr[i].Poster
        let title = cloun.querySelector(".card-title")
        title.textContent = arr[i].Title
        let year = cloun.querySelector(".year")
        year.textContent = arr[i].Year
        let localBtn = cloun.querySelector("#btn_1")
        localBtn.dataset.id = arr[i].imdbID
        let bookBtn = cloun.querySelector("#btn_2")
        bookBtn.dataset.id = arr[i].imdbID
        cards.appendChild(cloun)
    }    
}

