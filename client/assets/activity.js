document.addEventListener("DOMContentLoaded", async () => {
    try {

        const urlParams = new URLSearchParams(window.location.search)
        const activityId = urlParams.get('id')

        const response = await fetch(`http://localhost:3000/posts/activityId/${activityId}`)
        const activityData = await response.json()
        console.log(activityData)


        document.querySelector('.display-4').textContent = activityData[0].name
        document.querySelector('.lead').textContent = activityData[0].description

    
        const relevantSkills = document.querySelector('#skills')
        relevantSkills.textContent = `${activityData[0].type}`


        const scheduleInfo = document.querySelector('#schedule')
        scheduleInfo.innerHTML = `
            <h2>Schedule</h2>
            Day: ${activityData[0].day}
            <br>
            Date: ${activityData[0].date}
            <br>
            Time: ${activityData[0].time}
        
        `

        const contactInfo = document.querySelector('.card-text')
        contactInfo.innerHTML = `
            ${activityData[0].organizationname}<br>
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
  