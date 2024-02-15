document.addEventListener("DOMContentLoaded", async () => {

    var today = new Date();

    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();

    posts.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    const indexOfNearestPost = posts.findIndex(function (post) {
        return new Date(post.date) >= today;
    });

    var nearestPosts = posts.slice(indexOfNearestPost, indexOfNearestPost + 2);

    document.getElementById('urgent-job-name1').innerHTML = nearestPosts[0].name;
    document.getElementById('urgent-job-date1').innerHTML = nearestPosts[0].date.slice(0, 10);
    document.getElementById('urgent-job-name2').innerHTML = nearestPosts[1].name;
    document.getElementById('urgent-job-date2').innerHTML = nearestPosts[1].date.slice(0, 10);;
});



document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.assign("index.html");
});
