

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/')
        const data = await response.json();
        
        console.log(data)

        const listGroup = document.querySelector('.list-group')

        listGroup.innerHTML = ''
        data.forEach(activity => {
            

            const listItem = document.createElement('a')
            listItem.href = `./activity.html?id=${activity.id}`
            listItem.classList.add('list-group-item', 'list-group-item-action')
            
            console.log(activity.date)


            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${activity.name}</h5>
                    <small>${activity.date.slice(0, 10)}</small>
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



// document.getElementById("time").addEventListener("change", async () => {
//     const selectedTime = document.getElementById("time").value;

//     const listGroup = document.querySelector(".list-group");

//     const response = await fetch('http://localhost:3000/posts/')
//     const data = await response.json();
   
//     const filteredData = data.filter((activity) => {
//         return activity.time === selectedTime;
//     });

    
//     listGroup.innerHTML = "";

//     filteredData.forEach((activity) => {
//         const listItem = document.createElement("a");
//         listItem.href = `./activity.html?id=${activity.id}`;
//         listItem.classList.add("list-group-item", "list-group-item-action");

//         listItem.innerHTML = `
//       <div class="d-flex w-100 justify-content-between">
//         <h5 class="mb-1">${activity.name}</h5>
//         <small>${activity.date}</small>
//       </div>
//       <p class="mb-1">${activity.description}</p>
//       <small>${activity.Day} at ${activity.time}</small>
//     `;

//         listGroup.appendChild(listItem);
//     });
// });


document.getElementById("time").addEventListener("change", async () => {
    const selectedTime = document.getElementById("time").value;

    const listGroup = document.querySelector(".list-group");

    const response = await fetch('http://localhost:3000/posts/')
    const data = await response.json();
   
    const filteredData = data.filter((activity) => {
        if (selectedTime === "Morning") {
            return activity.time >= "09:00" && activity.time <= "12:00";
        } else if (selectedTime === "Afternoon") {
            return activity.time >= "12:00" && activity.time <= "17:00";
        } else if (selectedTime === "Evening") {
            return activity.time >= "17:00" && activity.time <= "24:00";
        }
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


document.getElementById("activity-type").addEventListener("change", async () => {
    const selectedActivityType = document.getElementById("activity-type").value;

    const listGroup = document.querySelector(".list-group");

    const response = await fetch('http://localhost:3000/posts/')
    const data = await response.json();
    console.log(selectedActivityType)
   
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



const daySelect = document.getElementById('day');
const timeSelect = document.getElementById('time');
const activityTypeSelect = document.getElementById('activity-type');

daySelect.addEventListener('change', () => {
    timeSelect.selectedIndex = 0;
    activityTypeSelect.selectedIndex = 0;
});

timeSelect.addEventListener('change', () => {
    daySelect.selectedIndex = 0;
    activityTypeSelect.selectedIndex = 0;
});

activityTypeSelect.addEventListener('change', () => {
    daySelect.selectedIndex = 0;
    timeSelect.selectedIndex = 0;
});

const searchTermInput = document.getElementById("search-term");

searchTermInput.addEventListener("input", () => {
  const daySelect = document.getElementById("day");
  const timeSelect = document.getElementById("time");
  const activityTypeSelect = document.getElementById("activity-type");

  daySelect.selectedIndex = 0;
  timeSelect.selectedIndex = 0;
  activityTypeSelect.selectedIndex = 0;
});


document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
  