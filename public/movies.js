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
        this.movies = JSON.parse(localStorage.getItem("movies"));
        if (this.movies === null) this.movies = defaultMovies;

        // adds listElement to the html page
        this.listElement = listElement;
        document.body.appendChild(listElement);

        // prints initial movie array
        this.read();
    }

    /**
     * Displays contents of movies array in listElement
     */
    read() {
        var data = '';

        // adds data from each movie to the html using the template string
        for (var i = 0; i < this.movies.length; i++) {

            // adds movie's data to a li element in the listElement
            data += `<li>${this.movies[i].title} (${this.movies[i].year}) - Rated: ${this.movies[i].rating}
                     <span onclick="displayDialog('editMovie', ${i});">Edit</span>
                     <span onclick="displayDialog('deleteMovie', ${i});">Delete</span> </li>`;
        }

        // sets the content of the list element to the generated html content
        this.listElement.innerHTML = data;
    }

    /**
     * Adds a movie to the list with title, year, and rating
     * @param {string} title Title of movie
     * @param {number} year year of movie
     * @param {string} rating rating of movie
     */
    add(title, year, rating) {

        // pushes new movie to the end of the list
        this.movies.push({'title' : title, 'year' : year, 'rating' : rating});

        // writes new movies list to local storage
        localStorage.setItem("movies", JSON.stringify(this.movies));

        // writes updated list to page
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

        // adds the edited values back to the same position in the list
        this.movies[index] = {'title' : title, 'year' : year, 'rating' : rating};

        // writes new movie list to local storage
        localStorage.setItem("movies", JSON.stringify(this.movies));

        // writes updated list to page
        this.read();
    }

    /**
     * Deletes movie at index
     * @param {number} index
     */
    delete(index) {

        // removes the movie from the list
        this.movies.splice(index, 1);

        // writes new movie list to local storage
        localStorage.setItem("movies", JSON.stringify(this.movies));

        // writes updated list to page
        this.read();
    }
}

// creates html list element to contain movie list
var listElement = document.createElement('ul');

// creates add button with event listener to open customDialog
var addBtn = document.createElement('button');
addBtn.innerHTML = "Add Movie";
addBtn.addEventListener("click", () => {displayDialog("addMovie", null)});

// new instance of CrudApp with listElement
var crudApp = new CrudApp(listElement);
document.body.appendChild(addBtn);