// mockApi endpoint
// const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

const URL_ENDPOINT = 'http://localhost:3000/newEnglandButterflies'

// const URL_ENDPOINT = 'https://930cb8e9-c84a-4334-8eb8-e2977e73002e.mock.pstmn.io/newEnglandButterflies'


// Build Table
buildTable();
function buildTable() {
    $('#row').empty();
    $('#addForm').hide()
    $('#updateForm').hide()
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
    })
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = =  Add Butterfly logic  = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function addNewButterflyForm() {
    $('#addButton').hide(); // hide add button
    $('#addForm').show()
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
    $('#addButton').hide(); // hide add button
    $('#idHolder').hide(); // hide id
    $('#updateForm').show()

    // Set data in form to what is stored in db
    $.get(`${URL_ENDPOINT}/${id}`, function (newEnglandButterflies) {
        $("#updateId").val(newEnglandButterflies.id);
        $("#updateImage").val(newEnglandButterflies.image);
        $("#updateName").val(newEnglandButterflies.name);
        $("#updateFamilyName").val(newEnglandButterflies.familyName);
        $("#updateButterflyObserved").val(newEnglandButterflies.butterflyObserved);
    });

    $("#updateButterfly").on("click", e => {
        e.preventDefault()
        putButterfly()
    })
}

function putButterfly() {
    let id = $("#updateId").val();
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