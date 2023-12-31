// mockApi endpoint
const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

// const URL_ENDPOINT = 'http://localhost:3000/newEnglandButterflies'

// Build Table
buildTable();
function buildTable() {
    $('#indexRow').empty();
    $('#addForm').hide()
    $('#updateForm').hide()
    $.get(URL_ENDPOINT).then(data => {
        data.map(newEnglandButterflies => {
            $('#indexRow').append(
                $(`
                    <div id="column" class = "col-sm-4">
                        <div id="card" class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${newEnglandButterflies.image}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${newEnglandButterflies.name}</h5>
                                <p id="famName">Family Name: ${newEnglandButterflies.familyName}</p>
                                <p id="butterflyObserved">Butterfly Observed: ${newEnglandButterflies.butterflyObserved}</p>
                                <div class="col" id="cardButtons">
                                    <button id="updateButterfly" onclick="updateButterflyForm(${newEnglandButterflies.id})">Update</button>
                                    <button id="deleteButterfly" onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button>
                                </div>
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
        butterflyObserved: $('#bFObserved').val()
    })
    .then(buildTable)
    $('#formCont').empty()
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = =   Update Butterfly logic  = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function updateButterflyForm(BFid) {
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