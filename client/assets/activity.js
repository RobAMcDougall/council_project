

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
            Date: ${activityData[0].date.slice(0, 10)}
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

document.getElementById("volunteer-button").addEventListener("click", async () => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    const token = localStorage.getItem("token")
    const urlParams = new URLSearchParams(window.location.search)
    const projectId = urlParams.get('id')
    console.log(projectId)

    const response1 = await fetch(`http://localhost:3000/profiles/userInfo/${loggedInUser}`)
    
    console.log(response1)

    const userInfo = await response1.json()

    const userId = userInfo.id

    const postOptions = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: userId,
            projectid: projectId
        })
    };

    const postEndpoint = `http://localhost:3000/posts`

    try {
        const response = await fetch(postEndpoint, postOptions)
        if (response.status === 200) {
            console.log("Post successful")
        } else {
            console.error("Error posting data")
        }
    } catch (error) {
        console.error("Error posting data:", error)
    }
})


document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  