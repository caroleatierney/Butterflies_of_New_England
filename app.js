// mockApi endpoint
const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

// Build Table
buildTable();
function buildTable() {
    $('#add').empty(); // remove add button
    $('#row').empty();
    $.get(URL_ENDPOINT).then(data => {
        data.map(newEnglandButterflies => {
        $('#row').append(
            $(`
                <div class = "col">
                    <div id="card" class="card" style="width: 18rem;">
                        <img class="card-img-top" src="./images/monarch_flower.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${newEnglandButterflies.name}</h5>
                            <p id="famName">Family Name: ${newEnglandButterflies.familyName}</p>
                            <p id="commExamp">Common Example: ${newEnglandButterflies.commonExample}</p>
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

        // $('tbody').empty();
             // $('tbody').append(

                    // <tr>
                    //     <td>${newEnglandButterflies.id}</td>
                    //     <td>${newEnglandButterflies.name}</td>
                    //     <td>${newEnglandButterflies.familyName}</td>
                    //     <td>${newEnglandButterflies.commonExample}</td>
                    //     <td><button id="updateButterfly" onclick="updateButterflyForm(${newEnglandButterflies.id})">Update</button></td>
                    //     <td><button id="deleteButterfly" onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button></td>
                    // </tr>


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
                <label for="name">Butterly Name</label>
                <input id ="name" placeholder="Butterly Name"/>
            </div>

            <div>
                <label for="familyName">Family Name</label>
                <input id ="familyName" placeholder="Family Name"/>
            </div>

            <div>
                <label for="commonExample">Common Example</label>
                <input id ="commonExample" placeholder="Common Example"/>
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
        name: $('#name').val(),
        familyName: $('#familyName').val(),
        commonExample: $('#commonExample').val()
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
        $("#updateName").val(newEnglandButterflies.name);
        $("#updateFamilyName").val(newEnglandButterflies.familyName);
        $("#updateCommonExample").val(newEnglandButterflies.commonExample);
    });

    $('#formCont').append( //add the form to the form container - not allowing id change
        $(`
        <form>
            <h1>Update a butterfly</h1>          
            <div>
                <label for="updateName">Butterly Name</label>
                <input id ="updateName" placeholder="Butterly Name"/>
            </div>
            <div>
                <label for="updateFamilyName">Family Name</label>
                <input id ="updateFamilyName" placeholder="Family Name"/>
            </div>

            <div>
                <label for="updateCommonExample">Common Example</label>
                <input id ="updateCommonExample" placeholder="Common Example"/>
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

    fetch(`${URL_ENDPOINT}/${id}`, {
        method: 'PUT',
        data: {
            name: $('#updateName').val(),
            familyName: $('#updateFamilyName').val(),
            commonExample: $('#updateCommonExample').val(),
        }
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