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
    cards.innerHTML = null
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
let select_cates = elementId("select_cates")
fetch(link)
.then((res) => res.json())
.then((data) => options(data))
function options(data){
    console.log(data)
    let array = data.Search
    array.map((item) => {
        let option = createTag("option")
        option.appendChild(textNode(item.Title))
        select_cates.appendChild(option)
    })
}
let input = elementId("input")
let objectSort = {
    az: function(a,b){
        if(a.Title.toLowerCase() < b.Title.toLowerCase()){
            return -1
        }else{
            return 1
        }
    },
    za: function(a,b){
        if(a.Title.toLowerCase() < b.Title.toLowerCase()){
            return 1
        }else{
            return -1
        }
    },
    rating: function(a,b){
        if(a.rating < b.rating){
            return -1
        }else{
            return 1
        }
    },
    year: function(a,b){
        if(a.Year < b.Year){
            return -1
        }else{
            return 1
        }
    }
}
let selectSorts = renderElement("#select_sorts")
console.log(selectSorts)
function handle(e){
    e.preventDefault()
    let allsArray = []
    let value = select_cates.value
    let rejex = new RegExp(value, "gi")
    let inputValue = input.value
    let rejex2 = new RegExp(inputValue, "gi")
    let selectSort = selectSorts.value
    fetch(link)
    .then((res) => res.json())
    .then((data) => {
        let array = data.Search
        if(value === "all"){
            allsArray = array
        }else if(value !== "all"){
            allsArray = array.filter((item) => item.Title.match(rejex))
        }
        allsArray = array.find((item) => item.Title.match(rejex2))
        allsArray = array.sort(objectSort[selectSort])
        console.log(allsArray)
    })
}
renderElement(".form").addEventListener("submit", handle)

let localObject = {
    name: null,
    year: null,
    img: null,
    text: "remove"
}
window.addEventListener("click", (element) => {
    if(element.target.matches(".btns")){
        let id = element.target.dataset.id
        fetch(link)
        .then((response) => response.json())
        .then((data) => {
            let array = data.Search
            for(let i = 0; i<array.length; i++){
                if(array[i].imdbID == id){
                    localObject.name = array[i].Title
                    localObject.year = array[i].Year
                    localObject.img = array[i].Poster
                    window.localStorage.setItem("javascript", JSON.stringify(localObject))       
                }
            }
        })
    }else{
        console.log(false)
    }
})
let ulList = renderElement(".ul_list") 
let titleLocal = JSON.parse(window.localStorage.getItem("javascript")).name
let imgs = JSON.parse(window.localStorage.getItem("javascript")).img
let LocalRender = (e) => {
    let li  = createTag("li")
    li.className = "d-flex justify-content-between p-2 align-items-center"
    let img = createTag("img")
    img.alt = "Usha gap"
    img.src = imgs
    li.appendChild(img)
    let h2 = createTag("h2")
    h2.textContent = titleLocal 
    li.appendChild(h2)
    let button = createTag("button")
    button.appendChild(textNode(localObject.text))
    button.className = "btn btn-danger loes"
    li.appendChild(button)
    ulList.appendChild(li)
}
LocalRender()

function removes(e){    
    let parent = e.target.parentNode
    parent.remove()
}
renderElement(".loes").addEventListener("click", removes)