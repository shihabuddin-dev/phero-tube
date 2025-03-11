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
        <button class="btn btn-sm border-none bg-[#25252526] hover:bg-[#FF1F3D] hover:text-white"> ${cat.category}</button>
        `
        categoryContainer.appendChild(categoryDiv)
    }
}
loadCategories()



// videos 
const loadVideos = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        const data = await response.json()
        displayVideos(data.videos)
    }
    catch (error) {
        console.log(error)
    }
}
loadVideos()

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container')
    videos.forEach(video => {
        const videoDiv = document.createElement('div')
        videoDiv.innerHTML = `
        <div>
           <div class="relative">
            <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
            <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">${video.others['posted_date']}</span>
           </div>
            <div class="flex items-center gap-4 mt-3">
                <img class="w-10 h-10 rounded-full" src="${video.authors[0]['profile_picture']}" alt="">
                <h3 class="font-bold">Shape of You</h3>
            </div>
            <div class="flex items-center gap-2 mx-auto pl-14">
                <small class="text-sm text-[#171717B3]">${video.authors[0]['profile_name']}</small>
                <img class="w-4" src="assets/verified.png" alt="">
            </div>
            <small class="pl-14 text-sm text-[#171717B3]">${video.others.views} Views</small>
        </div>
        
        `
        videoContainer.appendChild(videoDiv)
    });
}

