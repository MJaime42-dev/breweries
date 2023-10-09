let timer
let deleteFirstPhotoDelay



async function start () {
try {
    const response = await fetch("https://randomfox.ca/images/59.jpg")
createFoxList(data.message)
} catch(e) {
console.log("There was a problem fetching the fox list.")
    }
}

start()

function createFoxList(foxList) {
    document.getElementById("foxes").innerHTML = `
    <select onchange="loadByFox(this.value)">
            <option>Choose a fox</option>
             ${Object.keys(foxList).map(function (foxes) {
                    return `<option>${foxes}</option>`
             }).join('')}

    </select>
    `

}

async function loadByFox(foxes) {
    if (foxes!="Choose a fox") {
       const response = await fetch(`https://randomfox.ca/${foxes}/images/59.jpg`)
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