// buttons 
const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        const data = await response.json()
        displayCategories(data.categories)
    }
    catch (error) {
        console.log(error);
    }
}
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container')
    for (let cat of categories) {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideo(${cat.category_id})" class="btn btn-sm border-none bg-[#25252526] hover:bg-[#FF1F3D] hover:text-white"> ${cat.category}</button>
        `
        categoryContainer.appendChild(categoryDiv)
    }
}
loadCategories()



// videos 
const loadVideos = async (searchText = '') => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        const data = await response.json()
        {
            removeActiveClass()
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)
        }
    }
    catch (error) {
        console.log(error)
    }

}
loadVideos()

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML = ''
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center mt-6 md:mt-16 space-y-2">
            <img class="w-28 md:w-32" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl md:text-[32px] font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `
        return
    }
    videos.forEach(video => {
        const videoDiv = document.createElement('div')
        videoDiv.innerHTML = `
        <div>
           <div class="relative">
            <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
            <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">${video.others['posted_date']}</span >
           </div >
            <div class="flex items-center gap-4 mt-3">
                <img class="w-10 h-10 rounded-full" src="${video.authors[0]['profile_picture']}" alt="">
                <h3 class="font-bold">${video.title}</h3>
            </div>
            <div class="flex items-center gap-2 mx-auto pl-14">
                <small class="text-sm text-[#171717B3]">${video.authors[0]['profile_name']}</small>
                <small class="w-4">${video.authors[0].verified == true ? ` <img src="./assets/verified.png" alt="">` : ``}</small>
            </div>
            <small class="pl-14 text-sm text-[#171717B3]">${video.others.views} Views</small>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block mt-3">Show Details</button>
        </div >

    `
        videoContainer.appendChild(videoDiv)
    });
}

const loadCategoryVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url).then(res => res.json()).then(data => {
        removeActiveClass()
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add('active')
        displayVideos(data.category)
        console.log(clickedButton);
    })
}

const removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName('active')
    for (let btn of activeButtons) btn.classList.remove('active')
}

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            displayVideoDetails(data.video)
        })

}
const displayVideoDetails = (video) => {
    document.getElementById('video_details').showModal()
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
        <div>
           <div class="relative">
            <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
            <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">${video.others['posted_date']}</span>
           </div>
            <div class="flex items-center gap-4 mt-3">
                <img class="w-10 h-10 rounded-full" src="${video.authors[0]['profile_picture']}" alt="">
                <h3 class="font-bold">${video.title}</h3>
            </div>
            <div class="flex items-center gap-2 mx-auto pl-14">
                
            <small class="text-sm text-[#171717B3]">${video.description} Views</small>
            </div>
            
        </div>
        `
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    const input = e.target.value
    loadVideos(input)
})

const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('video-container').classList.add('hidden')
}