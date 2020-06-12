// default movies if no movies saved in local storage
const defaultMovies =
    [{"title" : "Star Wars", "year" : 1977, "rating" : "PG"},
    {"title" : "The Empire Strikes Back", "year" : 1980, "rating" : "PG"},
    {"title" : "The Revenge of the Jedi", "year" : 1983, "rating" : "PG"}];

/** movies crud application class */
class CrudApp {

    /**
     * Constructs a new crud app
     * @param {object} listElement html li element to contain movie list
     */
    constructor(listElement) {

        // reads movies from localStorage or creates a new array if no movies key
        this.movies = JSON.parse(localStorage.getItem("styledmovies"));
        if (this.movies === null) this.movies = defaultMovies;

        // adds listElement to the html page
        this.listElement = listElement;
        container.appendChild(listElement);

        // prints initial movie array
        this.read();
    }

    /**
     * Displays movies array in listElement
     */
    read() {
        // table start and header
        var data = '<table class="movieTable"> <thead><tr><th>Title</th><th>Year</th><th>Rating</th><th></th><th></th></tr></thead> <tbody>';

        // adds data from each movie to the html using the template string
        for (var i = 0; i < this.movies.length; i++) {

            // adds movie's data to a row element in the table
            data += `<tr><td><b>${this.movies[i].title}</b></td><td><i>${this.movies[i].year}</i></td><td>${this.movies[i].rating}</td>
                     <td class="edit" onclick="displayDialog('editMovie', ${i});">&#x270f;</td>
                     <td class="delete" onclick="displayDialog('deleteMovie', ${i});">&#x1f5d1;</td></tr>`;
        }

        data += '</tbody></table>';

        // saves table content to the listElement
        this.listElement.innerHTML = data;
    }

    /**
     * Adds a movie to the list with title, year, and rating
     * @param {string} title Title of movie
     * @param {number} year year of movie
     * @param {string} rating rating of movie
     */
    add(title, year, rating) {
        console.log(`crudApp.add ${title} ${year} ${rating}`);

        this.movies.push({'title' : title, 'year' : year, 'rating' : rating});
        localStorage.setItem("styledmovies", JSON.stringify(this.movies));
        this.read();
    }

    /**
     * Replaces values of movie at index i with title, year, rating
     * @param {string} title Title of movie
     * @param {number} year Year of movie
     * @param {string} rating Rating of movie
     * @param {number} index Index of movie in movies array
     */
    edit(title, year, rating, index) {
        console.log(`crudApp.edit ${title} ${year} ${rating} ${index}`);

        this.movies[index] = {'title' : title, 'year' : year, 'rating' : rating};
        localStorage.setItem("styledmovies", JSON.stringify(this.movies));
        this.read();
    }

    /**
     * Deletes movie at index
     * @param {number} index
     */
    delete(index) {
        console.log(`crudApp.delete ${index}`);

        // removes the movie from the list
        this.movies.splice(index, 1);

        // writes new movie list to local storage
        localStorage.setItem("styledmovies", JSON.stringify(this.movies));

        // writes new
        this.read();
    }
}

// container object for table and button
var container = document.createElement('main');
document.body.appendChild(container);

// creates html list element to contain movie list
var listElement = document.createElement('table');
listElement.className = "movieTable";

// creates add button with event listener to open customDialog
var addBtn = document.createElement('button');
addBtn.innerHTML = "Add Movie";
addBtn.addEventListener("click", () => {displayDialog("addMovie", null)});

// new instance of CrudApp with listElement
var crudApp = new CrudApp(listElement);
container.appendChild(addBtn);