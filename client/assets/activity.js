document.addEventListener("DOMContentLoaded", async () => {
    try {

        const urlParams = new URLSearchParams(window.location.search)
        const activityId = urlParams.get('id')

        const response = await fetch(`http://localhost:3000/posts/activityId/${activityId}`)
        const activityData = await response.json()


        document.querySelector('.display-4').textContent = activityData.ActivityName
        document.querySelector('.lead').textContent = activityData.Description

    
        const relevantSkills = document.querySelector('.col-md-6 p')
        relevantSkills.textContent = `Icons for ${activityData.ActivityType} and names of skills`


        const scheduleInfo = document.querySelector('.col-md-6 p')
        scheduleInfo.innerHTML = `
            ${activityData.Day} ${activityData.Date} ${activityData.Time}
        `

        const contactInfo = document.querySelector('.card-text')
        contactInfo.innerHTML = `
            ${activityData.OrgansationName}<br>
            ${activityData.Email}<br>
            ${activityData.Phone}<br>
        `

    } catch (error) {
        console.error('Error fetching activity data:', error)
    }
})

document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  