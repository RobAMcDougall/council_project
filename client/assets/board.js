

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/')
        const data = await response.json();


        const listGroup = document.querySelector('.list-group')

        listGroup.innerHTML = ''
        data.forEach(activity => {
            

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


document.getElementById("day").addEventListener("change", async () => {
    const selectedDay = document.getElementById("day").value;

    const listGroup = document.querySelector(".list-group");
    
    const response = await fetch('http://localhost:3000/posts/')
    const data = await response.json();
    console.log(data);

    
    const filteredData = data.filter((activity) => {
        return activity.day === selectedDay;
    });

    

    
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.id}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${activity.name}</h5>
          <small>${activity.date}</small>
        </div>
        <p class="mb-1">${activity.description}</p>
        <small>${activity.day} at ${activity.time}</small>
      `;

        listGroup.appendChild(listItem);
    });
});


document.getElementById("time").addEventListener("change", async () => {
    const selectedTime = document.getElementById("time").value;

    const listGroup = document.querySelector(".list-group");

    const response = await fetch('http://localhost:3000/posts/')
    const data = await response.json();
   
    const filteredData = data.filter((activity) => {
        return activity.time === selectedTime;
    });

    
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.id}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${activity.name}</h5>
        <small>${activity.date}</small>
      </div>
      <p class="mb-1">${activity.description}</p>
      <small>${activity.Day} at ${activity.time}</small>
    `;

        listGroup.appendChild(listItem);
    });
});

document.getElementById("activity-type").addEventListener("change", async () => {
    const selectedActivityType = document.getElementById("activity-type").value;

    const listGroup = document.querySelector(".list-group");

    const response = await fetch('http://localhost:3000/posts/')
    const data = await response.json();
   
    const filteredData = data.filter((activity) => {
        return activity.type === selectedActivityType;
    });

   
    listGroup.innerHTML = "";

    filteredData.forEach((activity) => {
        const listItem = document.createElement("a");
        listItem.href = `./activity.html?id=${activity.id}`;
        listItem.classList.add("list-group-item", "list-group-item-action");

        listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${activity.name}</h5>
          <small>${activity.date}</small>
        </div>
        <p class="mb-1">${activity.description}</p>
        <small>${activity.day} at ${activity.time}</small>
      `;

        listGroup.appendChild(listItem);
    });
});


const performSearch = async (searchTerm) => {
    const listGroup = document.querySelector(".list-group");

    try {
        const response = await fetch('http://localhost:3000/posts/');
        const data = await response.json();
        

        const filteredData = data.filter((activity) => {
            return activity.name.includes(searchTerm) || activity.description.includes(searchTerm);
        });

        console.log(filteredData);

        listGroup.innerHTML = "";

        filteredData.forEach((activity) => {
            const listItem = document.createElement("a");
            listItem.href = `./activity.html?id=${activity.id}`;
            listItem.classList.add("list-group-item", "list-group-item-action");

            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${activity.name}</h5>
                    <small>${activity.date}</small>
                </div>
                <p class="mb-1">${activity.description}</p>
                <small>${activity.day} at ${activity.time}</small>
            `;

            listGroup.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


document.getElementById("search-term").addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim();
    console.log(searchTerm);

    
    performSearch(searchTerm);
});


document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  