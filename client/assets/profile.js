document.addEventListener("DOMContentLoaded", async () => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    const token = localStorage.getItem("token")

    if (!token) {
        console.error("Token not available")
        return;
    }

    const options = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const profileEndpoint = `http://localhost:3000/profiles/userInfo/${loggedInUser}`
    const upcomingOpportunitiesEndpoint = `http://localhost:3000/profiles/upcoming/${loggedInUser}`
    const previousOpportunitiesEndpoint = `http://localhost:3000/profiles/previous/${loggedInUser}`

    try {
        const [profileResponse, upcomingOpportunitiesResponse, previousOpportunitiesResponse] = await Promise.all([
            fetch(profileEndpoint, options),
            fetch(upcomingOpportunitiesEndpoint, options),
            fetch(previousOpportunitiesEndpoint, options)
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
        if (previousOpportunitiesResponse.status === 200) {
            const previousOpportunities = await previousOpportunitiesResponse.json();
            displayPreviousOpportunities(previousOpportunities)
        } else {
            console.error("Error fetching previous opportunities")
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
    const upcomingOpportunity1 = upcomingOpportunities[0]
    
    document.getElementById('upcomingOpportunity1').innerHTML = `
        <p>Name of Activity: ${upcomingOpportunity1.activityName}</p>
    `

    const upcomingOpportunity2 = upcomingOpportunities[1]
    
    document.getElementById('upcomingOpportunity2').innerHTML = `
        <p>Name of Activity: ${upcomingOpportunity2.activityName}</p>
    `
}

const displayPreviousOpportunities = (previousOpportunities) => {

    const previousOpportunity1 = previousOpportunities[0]
    document.getElementById('previousOpportunity1').innerHTML = `
        <p>Name of Activity: ${previousOpportunity1.activityName}</p>
    `

    const previousOpportunity2 = previousOpportunities[1];
    document.getElementById('previousOpportunity2').innerHTML = `
        <p>Name of Activity: ${previousOpportunity2.activityName}</p>
    `
}