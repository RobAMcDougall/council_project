document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/')
        const data = await response.json();


        const listGroup = document.querySelector('.list-group')

        listGroup.innerHTML = ''
        data.forEach(activity => {
            console.log(activity)

            const listItem = document.createElement('a')
            listItem.href = `./activity.html?id=${activity.id}`
            listItem.classList.add('list-group-item', 'list-group-item-action')


            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${activity.name}</h5>
                    <small>${activity.date}</small>
                </div>
                <p class="mb-1">${activity.description}</p>
                <small>${activity.day} at ${activity.time}</small>
            `


            listGroup.appendChild(listItem);
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})


document.getElementById("day").addEventListener("change", () => {
    const selectedDay = document.getElementById("day").value;

    const listGroup = document.querySelector(".list-group");

    
    const filteredData = data.filter((activity) => {
        return activity.Day === selectedDay;
    });

    
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.ProjectID}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${activity.ActivityName}</h5>
          <small>${activity.Date}</small>
        </div>
        <p class="mb-1">${activity.Description}</p>
        <small>${activity.Day} at ${activity.Time}</small>
      `;

        listGroup.appendChild(listItem);
    });
});


document.getElementById("time").addEventListener("change", () => {
    const selectedTime = document.getElementById("time").value;

    const listGroup = document.querySelector(".list-group");

   
    const filteredData = data.filter((activity) => {
        return activity.Time === selectedTime;
    });

    
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.ProjectID}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${activity.ActivityName}</h5>
        <small>${activity.Date}</small>
      </div>
      <p class="mb-1">${activity.Description}</p>
      <small>${activity.Day} at ${activity.Time}</small>
    `;

        listGroup.appendChild(listItem);
    });
});

document.getElementById("activity-type").addEventListener("change", () => {
    const selectedActivityType = document.getElementById("activity-type").value;

    const listGroup = document.querySelector(".list-group");

   
    const filteredData = data.filter((activity) => {
        return activity.ActivityType === selectedActivityType;
    });

   
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.ProjectID}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${activity.ActivityName}</h5>
          <small>${activity.Date}</small>
        </div>
        <p class="mb-1">${activity.Description}</p>
        <small>${activity.Day} at ${activity.Time}</small>
      `;

        listGroup.appendChild(listItem);
    });
});

document.getElementById("search-bar").addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = document.getElementById("search-term").value;

    const listGroup = document.querySelector(".list-group");

   
    const filteredData = data.filter((activity) => {
        return activity.ActivityName.includes(searchTerm) || activity.Description.includes(searchTerm);
    });

    
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.ProjectID}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${activity.ActivityName}</h5>
        <small>${activity.Date}</small>
      </div>
      <p class="mb-1">${activity.Description}</p>
      <small>${activity.Day} at ${activity.Time}</small>
    `;

        listGroup.appendChild(listItem);
    });
});

document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  