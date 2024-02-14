document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/')
        const data = await response.json()
        const listGroup = document.querySelector('.list-group')
        data.forEach(activity => {
            const listItem = document.createElement('a');
            listItem.classList.add('list-group-item', 'list-group-item-action')

            
            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${activity.ActivityName}</h5>
                    <small>${activity.Date}</small>
                </div>
                <p class="mb-1">${activity.Description}</p>
                <small>${activity.Day} at ${activity.Time}</small>
            `
            listGroup.appendChild(listItem)
        })
    } catch (error) {
        console.error(error)
    }
})