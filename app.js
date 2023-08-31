// mockApi endpoint
const URL_ENDPOINT = 'https://64f0d8b68a8b66ecf77a2cc1.mockapi.io/Butterflies_of_New_England_API/newEnglandButterflies'

// Build Table
buildTable();
function buildTable() {
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
                    <td><button onclick="updateButterfly(${newEnglandButterflies.id})">Update</button></td>
                    <td><button onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button></td>
                </tr>
                `)
            )
        })
    })
}

function addNewButterflyForm() {
    $('#add').remove();

    $('#formCont').append(
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


// add to db
function postButterfly() {

    $.post(URL_ENDPOINT, {
        name: $('#name').val(),
        familyName: $('#familyName').val(),
        commonExample: $('#commonExample').val()
    })
        .then(buildTable)
}

// update form
function updateButterfly(id) {
    $('#add').remove();

    $.get(URL_ENDPOINT + "/" + id, function (newEnglandButterflies) {
        $("#updateName").val(newEnglandButterflies.name);
        $("#updateFamilyName").val(newEnglandButterflies.familyName);
        $("#updateCommonExample").val(newEnglandButterflies.commonExample);
    });

    $('#formCont').append(
        $(`
        <form>
            <h1>Update a butterfly</h1>
            <div>
                <label for="updateId">Butterly Id</label>
                <input id ="updateId" placeholder="Butterly Id" value="${id}"/>
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

// function putButterfly(e, id) {
// e.preventDefault();

// update db
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

$("#addButterfly").on("click", e => {
    e.preventDefault()
    putButterfly()
})


// delete db
function deleteButterfly(id) {
    $('#add').remove();
    //     $.ajax(`${URL_ENDPOINT}/${id}`, {
    //         method: 'DELETE',
    //         headers: { 'content-type': 'application/json' },
    //     });
    // }
    // })

    // ===========================================================

    fetch(`${URL_ENDPOINT}/${id}`, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(task => {
        // Do something with deleted task
    }).catch(error => {
        // handle error
    })
}