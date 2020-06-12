// default movies if no movies saved in local storage
const defaultMovies = [{ "title": "Star Wars", "year": 1977, "rating": "PG" },
    { "title": "The Empire Strikes Back", "year": 1980, "rating": "PG" },
    { "title": "The Revenge of the Jedi", "year": 1983, "rating": "PG" }
];

/** movies crud application class */
class CrudApp {

    /**
     * Constructs a new crud app
     * @param {object} container
     */
    constructor(container) {

        // adds container to the html page
        this.container = container;
        document.body.appendChild(container);

        // reads the content of the server
        this.read();
    }

    /**
     * Displays contents of movies array in container
     */
    read() {

        // gets json array from server
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var itemArray = {};

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                itemArray = JSON.parse(this.responseText).wishItems;
                displayItems(itemArray);
            }
        });

        xhr.open("GET", encodeURI(`https://fa19server.appspot.com/api/wishlists/myWishlist?access_token=${userInfo.accessToken}`));
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(null);
    }

    /**
     * Adds a movie to the list with title, year, and rating
     * @param {string} title Title of movie
     * @param {number} year year of movie
     * @param {string} rating rating of movie
     */
    add(item, price, category, image, comment) {

        var data = encodeURI(`item=${item}&price=${price}&category=${category}&image=${image}&comment=${comment}`);
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                crudApp.read();
            }
        });

        xhr.open("POST", encodeURI(`https://fa19server.appspot.com/api/wishlists?access_token=${userInfo.accessToken}`));
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
    }

    /**
     * Replaces values of movie at index i with title, year, rating
     * @param {string} title Title of movie
     * @param {number} year Year of movie
     * @param {string} rating Rating of movie
     * @param {number} index Index of movie in movies array
     */
    edit(item, price, category, image, comment, itemID) {

        var data = encodeURI(`item=${item}&price=${price}&category=${category}&image=${image}&comment=${comment}`);
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                crudApp.read();
            }
        });

        xhr.open("POST", encodeURI(`https://fa19server.appspot.com/api/wishlists/${itemID}/replace?access_token=${userInfo.accessToken}`));
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
    }

    /**
     * Deletes movie at index
     * @param {number} itemID
     */
    delete(itemID) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                crudApp.read();
            }
        });

        xhr.open("DELETE", `https://fa19server.appspot.com/api/wishlists/${itemID}?access_token=${userInfo.accessToken}`);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(null);
    }
}

function displayItems(itemArray) {
    var dataText = '';

    // adds data from each movie to the html using the template string
    for (var i = 0; i < itemArray.length; i++) {

        // adds movie's data to a li element in the container
        dataText += `<div class="itemBox">
                        <h2>${itemArray[i].item}</h2>
                        <div class="imageBox"> <img src='${itemArray[i].image.split("<PLUS>").join("+")}'> </div>
                        <h3> Price: $${itemArray[i].price}</h3>
                        <h4> Category: ${itemArray[i].category}</h4>
                        <p> Comment: ${itemArray[i].comment}</p>
                        <div class="buttons">
                            <span onclick="displayDialog('editItem', '${itemArray[i].id}');">Edit</span>
                            <span onclick="displayDialog('deleteItem', '${itemArray[i].id}');">Delete</span>
                        </div>
                     </div>
                    `;
    }

    if (itemArray.length == 0) {
        dataText += "<div class='noItems'>No items saved.</div>"
    }

    // sets the content of the list element to the generated html content
    this.container.innerHTML = dataText;
}

function logoutUser() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4 || this.response === 200) {
            localStorage.removeItem("userInfo");
            window.location.href = "login.html";
        }
    });

    xhr.open("POST", encodeURI(`https://fa19server.appspot.com/api/Users/logout?access_token=${userInfo.accessToken}`));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(null);
}

// inserts username to welcome message
var userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo == null || userInfo.expireTime <= (new Date()).getTime()) {
    localStorage.removeItem("userInfo");
    window.location.href = "login.html";
} else {
    welcome.innerHTML += userInfo.userName + "!";
}

// creates html list element to contain item list
var container = document.createElement('div'); // change to div?
container.setAttribute("id", "container");

// creates add button with event listener to open customDialog
var addBtn = document.createElement('button');
addBtn.innerHTML = "Add Item";
addBtn.addEventListener("click", () => { displayDialog("addItem", null) });
header.appendChild(addBtn);

// creates logout button with event listener to open customDialog
var logoutBtn = document.createElement('button');
logoutBtn.innerHTML = "Logout";
logoutBtn.addEventListener("click", () => { logoutUser(); });
header.appendChild(logoutBtn);

// new instance of CrudApp with container
var crudApp = new CrudApp(container);