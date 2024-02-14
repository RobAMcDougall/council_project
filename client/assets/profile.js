document.addEventListener("DOMContentLoaded", async () => {
    const loggedInUser =localStorage.getItem("loggedInUser");

    const token = localStorage.getItem("token");

    if (token) {
        const options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const profileEndpoint = `http://localhost:3000/profiles/userInfo/${loggedInUser}`;

        try {
            const response = await fetch(profileEndpoint, options);

            if (response.status === 200) {
                const userProfile = await response.json();
                displayUserProfile(userProfile);
            } else {
                console.error("Error fetching profile information");
            }
        } catch (error) {
            console.error("Error fetching profile information:", error);
        }
    } else {
        console.error("Token not available");
    }
});