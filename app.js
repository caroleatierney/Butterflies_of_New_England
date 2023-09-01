// mockApi endpoint
const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

// Build Table
buildTable();
function buildTable() {
    $('#add').empty(); // remove add button
    $.get(URL_ENDPOINT).then(data => {
        $('tbody').empty();
        data.map(newEnglandButterflies => {

            $('tbody').append(
                $(`
                    <tr>
                        <td>${newEnglandButterflies.id}</td>
                        <td>${newEnglandButterflies.name}</td>
                        <td>${newEnglandButterflies.familyName}</td>
                        <td>${newEnglandButterflies.commonExample}</td>
                        <td><button id="updateButterfly" onclick="updateButterfly(${newEnglandButterflies.id})">Update</button></td>
                        <td><button id="deleteButterfly" onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button></td>
                    </tr>
                `))
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

function updateButterfly(id) {
    $('#add').empty(); // remove add button
    $('#formCont').empty(); // do not allow form to keep adding if user keeps clicking buttons

    $.get(URL_ENDPOINT + "/" + id, function (newEnglandButterflies) { //get data to pre-populate form
        $("#updateName").val(newEnglandButterflies.name);
        $("#updateFamilyName").val(newEnglandButterflies.familyName);
        $("#updateCommonExample").val(newEnglandButterflies.commonExample);
    });

    $('#formCont').append( //add the form to the form container
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

            <button onclick="putButterfly(id)">Submit</button>

        </form>
        `)
    )
    // <button id="updateButterfly" onclick="putButterfly(e, '${id}')">Submit</button>
    // $("#updateButterfly").on("click", e => {
    //     e.preventDefault()
    //     putButterfly()
    // })

}

function putButterfly(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'PUT',
        data: {
            name: $('#updateName').val(),
            familyName: $('#updateFamilyName').val(),
            commonExample: $('#updateCommonExample').val()
        }
    })
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