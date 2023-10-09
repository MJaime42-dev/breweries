let timer
let deleteFirstPhotoDelay



async function start () {
try {
    const response = await fetch("https://api.openbrewerydb.org/v1/breweries")
const data = await response.json()
createBreweryList(data.message)
} catch(e) {
console.log("There was a problem fetching the brewery list.")
    }
}

start()

function createBreweryList(breweryList) {
    document.getElementById("breweries").innerHTML = `
    <select onchange="loadByBrewery(this.value)">
            <option>Choose a brewery</option>
             ${Object.keys(breweryList).map(function (breweries) {
                    return `<option>${breweries}</option>`
             }).join('')}

    </select>
    `

}

async function loadByBrewery(breed) {
    if (breed !="Choose a brewery") {
       const response = await fetch(`https://api.openbrewerydb.org/${breweries}/breweries`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image:url('${images[0]}')"></div>
    <div class="slide" style="background-image:url('${images[1]}')"></div>
    `
    currentPosition += 2
    if (images.length == 2) currentPosition = 0 
    timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image:url('${images[0]}')"></div>
        <div class="slide"></div>
    
        `
    }
    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image:url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= images.lenght) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}