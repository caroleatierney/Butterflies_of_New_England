// mockApi endpoint
// const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

const URL_ENDPOINT = 'http://localhost:3000/newEnglandButterflies'

// Build Table
buildTable();
function buildTable() {
    $('#add').empty(); // remove add button
    $('#row').empty();
    $.get(URL_ENDPOINT).then(data => {
        data.map(newEnglandButterflies => {
        $('#row').append(
            $(`
                <div id="column" class = "col-sm-4">
                    <div id="card" class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${newEnglandButterflies.image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${newEnglandButterflies.name}</h5>
                            <p id="famName">Family Name: ${newEnglandButterflies.familyName}</p>
                            <p id="commExamp">Butterfly Observed: ${newEnglandButterflies.butterflyObserved}</p>
                            <button id="updateButterfly" onclick="updateButterflyForm(${newEnglandButterflies.id})">Update</button></td>
                            <button id="deleteButterfly" onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button>
                        </div>
                    </div>
                </div>  
            `)
        )
    })
        $('#add').append(
            $(`
                <button onclick = "addNewButterflyForm()">Add a new butterfly</button>
            `)
        );
    })
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = =  Add Butterfly logic  = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function addNewButterflyForm() {
    $('#add').empty(); // remove add button
    $('#formCont').empty(); // do not allow form to keep adding if user keeps clicking it
    $('#formCont').append( //add the form to the form container
        $(`
        <form>
        <h1>Add a new butterfly</h1>
            <div>
                <label for="image">Butterly Image</label>
                <input id ="image" placeholder="Butterfly Image">
            </div>

            <div>
                <label for="name">Butterly Name</label>
                <input id ="name" placeholder="Butterfly Name"/>
            </div>

            <div>
                <label for="familyName">Family Name</label>
                <input id ="familyName" placeholder="Family Name"/>
            </div>

            <div>
                <label for="butterflyObserved">Butterfly Observed</label>
                <input id ="butterflyObserved" placeholder="Butterfly Observed"/>
            </div>

            <button id="addButterfly">Submit</button>
        </form>
        `)
    )
    $("#addButterfly").on("click", e => {
        e.preventDefault()
        postButterfly()
    })
}

function postButterfly() {

    $.post(URL_ENDPOINT, {
        image: "./images/Temp_Butterfly_Image.jpg",
        name: $('#name').val(),
        familyName: $('#familyName').val(),
        butterflyObserved: $('#butterflyObserved').val()
    })
    .then(buildTable)
    $('#formCont').empty()
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = =   Update Butterfly logic  = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function updateButterflyForm(id) {
    $('#add').empty(); // remove add button
    $('#formCont').empty(); // do not allow form to keep adding if user keeps clicking buttons

    // Set data in form to what is stored in db
    $.get(`${URL_ENDPOINT}/${id}`, function (newEnglandButterflies) {
        $("#updateImage").val(newEnglandButterflies.image);
        $("#updateName").val(newEnglandButterflies.name);
        $("#updateFamilyName").val(newEnglandButterflies.familyName);
        $("#updateButterflyObserved").val(newEnglandButterflies.butterflyObserved);
    });

    $('#formCont').append( //add the form to the form container - not allowing id change
        $(`
        <form>
            <h1>Update a butterfly</h1>          
            <div>
                <label for="updateImage">Butterly Image</label>
                <input id ="updateImage" placeholder="Butterfly Image"/>
            </div>
            <div>
                <label for="updateName">Butterly Name</label>
                <input id ="updateName" placeholder="Butterly Name"/>
            </div>
            <div>
                <label for="updateFamilyName">Family Name</label>
                <input id ="updateFamilyName" placeholder="Family Name"/>
            </div>

            <div>
                <label for="updateButterflyObserved">Butterfly Observed</label>
                <input id ="updateButterflyObserved" placeholder="Butterfly Observed"/>
            </div>
            <button onclick="putButterfly(${id})">Submit</button>
        </form>
        `)
    )
 
    $("#updateButterfly").on("click", e => {
        e.preventDefault()
        putButterfly()
    })
}

function putButterfly(id) {

    const postData = {
        image: $('#updateImage').val(),
        name: $('#updateName').val(),
        familyName: $('#updateFamilyName').val(),
        butterflyObserved: $('#updateButterflyObserved').val(),
    }

    fetch(`${URL_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(buildTable)
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = =   Delete Butterfly logic  = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// using id from delete button, set an event for delete
// prevent default of button refresh
$("#deleteButterfly").on("click", e => {
    e.preventDefault()
    deleteButterfly()
})

function deleteButterfly(id) {
    $('#formCont').empty(); // do not allow form to keep adding if user keeps clicking buttons

    fetch(`${URL_ENDPOINT}/${id}`, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    })  .then(buildTable)
}