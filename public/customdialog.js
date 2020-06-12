// adds dialog html element to body of page
var customDialog = document.createElement('dialog');
document.body.appendChild(customDialog);

var imageString = "";

/**
 * Populates and displays the custom dialog element
 * @param {string} type Type of dialog to be shown
 * @param {*} toHide Result box to be hidden or index of edited movie
 */
function displayDialog(type, toHide) {
    // hides previous result content if it exists
    if (typeof toHide === 'object' && toHide != null) toHide.style.visibility = "hidden";

    // populates dialog tag with correct content and displays the dialog
    setTimeout(() => {

        // populates customDialog tag
        if (type.includes("Movie")) getMovieDialogContent(type, toHide);
        else if (type.includes("Item")) getItemDialogContent(type, toHide);
        else getDialogContent(type);

        // opens dialog
        customDialog.showModal();
    }, 0);
}

/**
 * Displays result of confirm dialog in resultContent
 * @param {boolean} okPressed true if ok was pressed, false if cancel was pressed
 */
function confirmResult(okPressed) {

    // closes dialog
    customDialog.close();

    // adds result into output tag
    resultContent.innerHTML = `Confirm result: ${okPressed}`;
    resultContent.style.visibility = "visible";
}

/**
 * Displays result of prompt dialog in resultContent
 * @param {boolean} okPressed true if ok was pressed, false if cancel was pressed
 * @param {boolean} safe true if safePrompt dialog, false if prompt dialog
 */
function promptResult(okPressed, safe) {

    // closes dialog
    customDialog.close();

    // gets result value from promptInput
    var result = okPressed ? (safe ? DOMPurify.sanitize(promptInput.value) : promptInput.value) : "";

    // adds result into output tag
    resultContent.innerHTML = `Prompt result: ${result === "" ? "User didn't input anything" : result}`;
    resultContent.style.visibility = "visible";
}

/**
 * Gets values of the movie and adds them to the movie array in the crud app
 * @param {boolean} okPressed
 */
function addMovieResult(okPressed) {

    // closes dialog box
    customDialog.close();

    // calls the CrudApp add function to add the movie
    if (okPressed) {
        crudApp.add(DOMPurify.sanitize(titleIn.value), yearIn.value, ratingIn.value);
    }
}

/**
 * Gets values of the movie and adds them to the movie array in the crud app
 * @param {boolean} okPressed
 * @param {int} index
 */
function editMovieResult(okPressed, index) {

    // closes dialog box
    customDialog.close();

    // calls the CrudApp add function to add the movie
    if (okPressed) {
        crudApp.edit(DOMPurify.sanitize(titleIn.value), yearIn.value, ratingIn.value, index);
    }
}

/**
 * Displays result of confirm dialog in resultContent
 * @param {boolean} okPressed true if ok was pressed, false if cancel was pressed
 */
function deleteMovieResult(okPressed, index) {

    // closes dialog
    customDialog.close();

    // adds result into output tag
    if (okPressed) {
        crudApp.delete(index)
    }
}

/**
 * Gets values of the movie and adds them to the movie array in the crud app
 * @param {boolean} okPressed
 */
function addItemResult(okPressed) {
    // closes dialog box
    customDialog.close();

    // calls the CrudApp add function to add the movie
    if (okPressed) {
        crudApp.add(DOMPurify.sanitize(itemName.value), price.value, DOMPurify.sanitize(category.value), window.atob(imageString), DOMPurify.sanitize(comment.value));
    }
}

/**
 * Gets values of the movie and adds them to the movie array in the crud app
 * @param {boolean} okPressed
 * @param {int} index
 */
function editItemResult(okPressed, index) {
    // closes dialog box
    customDialog.close();

    // calls the CrudApp add function to add the movie
    if (okPressed) {
        crudApp.edit(DOMPurify.sanitize(itemName.value), price.value, DOMPurify.sanitize(category.value), window.atob(imageString), DOMPurify.sanitize(comment.value), index);
    }
}

/**
 * Displays result of confirm dialog in resultContent
 * @param {boolean} okPressed true if ok was pressed, false if cancel was pressed
 */
function deleteItemResult(okPressed, itemID) {

    // closes dialog
    customDialog.close();

    // adds result into output tag
    if (okPressed) {
        crudApp.delete(itemID)
    }
}

/**
 * Populates customDialog element with correct contents according to type
 * @param {string} type Type of dialog to be shown
 */
function getDialogContent(type) {

    // gets the html code for the dialog
    customDialog.innerHTML = customDialogContent[type.includes("Prompt") ? "prompt" : type];

    // chooses dialog box content based on type
    switch (type) {

        // alert type dialog box
        case "alert":
            // event listener for ok button, closes dialog box when clicked
            alertOk.addEventListener("click", () => { customDialog.close() });
            break;

            // confirm type dialog box
        case "confirm":
            // event listeners for ok and cancel buttons, call confirmResult when clicked
            confirmOk.addEventListener("click", () => { confirmResult(true); });
            confirmCancel.addEventListener("click", () => { confirmResult(false); });
            break;

            // prompt type dialog boxes
        case "prompt":
        case "saferPrompt":
            // event listeners for ok and cancel buttons, call promptResult when clicked
            promptOk.addEventListener("click", () => { promptResult(true, type === "saferPrompt"); });
            promptCancel.addEventListener("click", () => { promptResult(false, type === "saferPrompt"); });
            break;
    }
}

/**
 * Displays the movie dialog
 * @param {string} type type of dialog to display
 * @param {number} i Index of movie in crudApp movies array
 */
function getMovieDialogContent(type, i) {

    // gets the html code for the dialog
    customDialog.innerHTML = customDialogContent[type.includes("delete") ? type : "movie"];

    // choose movie dialog box content based on type
    switch (type) {

        // add movie dialog box content
        case "addMovie":
            // event listeners for ok and cancel buttons, call addMovieResult
            movieOk.addEventListener("click", () => { addMovieResult(true); });
            movieCancel.addEventListener("click", () => { addMovieResult(false); });
            break;

        case "editMovie":
            // sets the initial values to be edited
            ratingIn.value = crudApp.movies[i].rating;
            titleIn.value = crudApp.movies[i].title;
            yearIn.value = crudApp.movies[i].year;

            // event listeners for ok and cancel buttons, call editMovieResult
            movieOk.addEventListener("click", () => { editMovieResult(true, i); });
            movieCancel.addEventListener("click", () => { editMovieResult(false, i); });
            break;

        case "deleteMovie":
            confirmOk.addEventListener("click", () => { deleteMovieResult(true, i); });
            confirmCancel.addEventListener("click", () => { deleteMovieResult(false, i); });

            break;
    }
}

/**
 * Displays the movie dialog
 * @param {string} type type of dialog to display
 * @param {number} i Index of movie in crudApp movies array
 */
function getItemDialogContent(type, itemID) {

    // gets the html code for the dialog
    customDialog.innerHTML = customDialogContent[type.includes("delete") ? type : "item"];

    // choose movie dialog box content based on type
    switch (type) {

        // add movie dialog box content
        case "addItem":
            // event listeners for ok and cancel buttons
            itemOk.addEventListener("click", () => { addItemResult(true); });
            itemCancel.addEventListener("click", () => { addItemResult(false); });
            imageString = "";
            image.addEventListener("change", readFile);
            break;

        case "editItem":
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    itemName.value = JSON.parse(this.responseText).item;
                    price.value = JSON.parse(this.responseText).price;
                    category.value = JSON.parse(this.responseText).category;
                    comment.value = JSON.parse(this.responseText).comment;
                    imageString = window.btoa(JSON.parse(this.responseText).image);
                }
            });
            xhr.open("GET", encodeURI(`https://fa19server.appspot.com/api/wishlists/${itemID}?access_token=${userInfo.accessToken}`));
            xhr.send(null);

            // event listeners for ok and cancel buttons, call addMovieResult
            itemOk.addEventListener("click", () => { editItemResult(true, itemID); });
            itemCancel.addEventListener("click", () => { editItemResult(false, itemID); });
            image.addEventListener("change", readFile);
            break;

        case "deleteItem":
            confirmOk.addEventListener("click", () => { deleteItemResult(true, itemID); });
            confirmCancel.addEventListener("click", () => { deleteItemResult(false, itemID); });
            break;
    }
}

// html code for each type of dialog
const customDialogContent = {
    "alert": "<h1>Alert Pressed</h1> \
    <button id='alertOk'>Ok</button>",
    "confirm": "<h1>Do you confirm this?</h1> \
    <button id='confirmCancel'>Cancel</button> \
    <button id='confirmOk'>Ok</button>",
    "prompt": "<h1>What is your name? </h1> \
    <input type='text' id='promptInput'> \
    <button id='promptCancel'>Cancel</button> \
    <button id='promptOk'>Ok</button>",
    "movie": "<label for='titleIn'>Title: </label> <input id='titleIn' type='text' required><br> \
    <label for='yearIn'>Year of Release: </label> <input id='yearIn' type='number' required><br> \
    <label for='ratingIn'>Rating: </label> <select id='ratingIn'> \
        <option value='G'>G</option> \
        <option value='PG'>PG</option> \
        <option value='PG13'>PG13</option> \
        <option value='R'>R</option> \
        <option value='NR'>NR</option> \
    </select><br> \
    <button id='movieCancel'>Cancel</button> \
    <button id='movieOk'>Ok</button>",
    "deleteMovie": "<h2>Delete movie?</h2> \
    <button id='confirmCancel'>Cancel</button> \
    <button id='confirmOk'>Ok</button>",

    "item": "  \
    <table> \
        <tr><td><label for='itemName'>Item:</label></td> <td><input id='itemName' type='text' required></td></tr> \
        <tr><td><label for='price'>Price:</label></td> <td><input id='price' type='number' required></td></tr> \
        <tr><td><label for='category'>Category:</label></td> <td><input id='category' type='text' required></td></tr> \
        <tr><td><label for='image'>Image:</label></td> <td><input id='image' type='file' required></td></tr> \
        <tr><td><label for='comment'>Comment:</label></td> <td><input id='comment' type='text' ></td></tr> </table>\
        <button id='itemCancel'>Cancel</button> \
        <button id='itemOk'>Ok</button> \
    ",

    "deleteItem": "<h2>Delete item?</h2> \
    <button id='confirmCancel'>Cancel</button> \
    <button id='confirmOk'>Ok</button>",
}

function readFile() {
    if (this.files && this.files[0]) {

        var fileReader = new FileReader();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        fileReader.addEventListener("load", function(e) {
            var img = new Image();

            img.onload = () => {
                if (img.height > img.width) {
                    canvas.height = img.height > 500 ? 500 : img.height;
                    canvas.width = canvas.height * (img.width / img.height);
                } else {
                    canvas.width = img.width > 500 ? 500 : img.width;
                    canvas.height = canvas.width * (img.height / img.width);
                }

                var oc = document.createElement('canvas');
                var octx = oc.getContext('2d');

                oc.width = img.width * 0.5;
                oc.height = img.height * 0.5;
                octx.drawImage(img, 0, 0, oc.width, oc.height);
                octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
                ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);

                imageString = window.btoa(canvas.toDataURL("image/jpeg").split("+").join("<PLUS>"));
            }
            img.src = e.target.result;
        });

        fileReader.readAsDataURL(this.files[0]);
    }
}