document.addEventListener("DOMContentLoaded", async () => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    const token = localStorage.getItem("token")

  

    

    const profileEndpoint = `http://localhost:3000/profiles/userInfo/${loggedInUser}`
    const upcomingOpportunitiesEndpoint = `http://localhost:3000/profiles/upcoming/${loggedInUser}`
   

    try {
        const [profileResponse, upcomingOpportunitiesResponse] = await Promise.all([
            fetch(profileEndpoint),
            fetch(upcomingOpportunitiesEndpoint)
        ])

        if (profileResponse.status === 200) {
            const userProfile = await profileResponse.json()
            displayUserProfile(userProfile)
        } else {
            console.error("Error fetching profile information")
        }

        if (upcomingOpportunitiesResponse.status === 200) {
            const upcomingOpportunities = await upcomingOpportunitiesResponse.json();
            displayUpcomingOpportunities(upcomingOpportunities)
        } else {
            console.error("Error fetching upcoming opportunities")
        }
    
    } catch (error) {
        console.error("Error fetching data:", error)
    }
})

const displayUserProfile = (userProfile) => {
    document.getElementById('nameLabel').innerText += ' ' + userProfile.username
    document.getElementById('contactInfoLabel').innerText += ' ' + userProfile.email
}

const displayUpcomingOpportunities = (upcomingOpportunities) => {
    console.log(`LOOK HERE FOOL £{upcomingOpportunities}`)
    const upcomingOpportunity1 = upcomingOpportunities[0]
    
    document.getElementById('upcomingOpportunity1').innerHTML = `
        <p>Name of Activity: ${upcomingOpportunity1.activityname}</p>
    `

    const upcomingOpportunity2 = upcomingOpportunities[1]
    
    document.getElementById('upcomingOpportunity2').innerHTML = `
        <p>Name of Activity: ${upcomingOpportunity2.activityname}</p>
    `
}



document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  