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
    const upcomingOpportunity1 = upcomingOpportunities[0]

    document.getElementById('upcomingOpportunity1').innerHTML = `
        <p>${upcomingOpportunity1.activityname}</p>
    `

    const upcomingOpportunity2 = upcomingOpportunities[1]

    document.getElementById('upcomingOpportunity2').innerHTML = `
        <p>${upcomingOpportunity2.activityname}</p>
    `
}
const showSkillInput = () => {
    document.getElementById('addSkillButton').style.display = 'none';
    document.getElementById('skillInputContainer').style.display = 'block';
}

const submitSkill = async () => {

    const skillInputValue = document.getElementById('skillInput').value;
    console.log(skillInputValue)

    const response = await fetch(
        `http://localhost:3000/profiles/skills/${localStorage.getItem(
            "loggedInUser"
        )}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "skills": [skillInputValue],
            }),
        }
    );

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        const error = await response.text();
        console.log(error);
    }



    document.getElementById('skillInput').value = '';


    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('skillInputContainer').style.display = 'none';


    document.getElementById('addSkillButton').style.display = 'block';

}


const showSubmitButton = () => {
    document.getElementById("addButton").style.display = "none";
    document.getElementById("aboutMeText").style.display = "block";
    document.getElementById("aboutMeText").readOnly = false;
    document.getElementById("submitButton").style.display = "block";
}
const submitDescription = async () => {

    let description = document.getElementById("aboutMeText").value;
    



    const response = await fetch(
        `http://localhost:3000/profiles/aboutMe/${localStorage.getItem(
            "loggedInUser"
        )}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "aboutme": description,
            }),
        }
    );

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        const error = await response.text();
        console.log(error);
    }

    document.getElementById("addButton").style.display = "block";
    document.getElementById("aboutMeText").style.display = "none";
    document.getElementById("aboutMeText").readOnly = true;
    document.getElementById("submitButton").style.display = "none";
}



document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
