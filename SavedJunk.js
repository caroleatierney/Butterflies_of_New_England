// set up local endpoint

const URL_ENDPOINT = 'http://localhost:3000/newEnglandButterflies'

//  get and display file (to see if it is linked)
// $.get(URL_ENDPOINT).then(data => console.log(data))

// Build Table
$.get(URL_ENDPOINT).then(data => {
    data.map(newEnglandButterflies => {
        $('tbody').append(
            $(`
            <tr>
                <td>${newEnglandButterflies.id}</td>
                <td>${newEnglandButterflies.name}</td>
                <td>${newEnglandButterflies.familyName}</td>
                <td>${newEnglandButterflies.commonExample}</td>
                <td><button onclick="updateButterflyForm(${newEnglandButterflies.id})">Update</button></td>
                <td><button onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button></td>
            </tr>
            `)
        )
    })
})

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

            <button onclick="postButterfly()">Submit</button>
        </form>
        `)
    )
}

// add to db
function postButterfly() {
    $.post(URL_ENDPOINT, {
        name: $('#name').val(),
        familyName: $('#familyName').val(),
        commonExample: $('#commonExample').val()
    })
}

// update form
function updateButterflyForm(id) {
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
                // <input id ="updateName" placeholder="Butterly Name" value="${id}"/>
                <input id ="updateName" placeholder="Butterly Name"/>
            </div>
            <div>
                <label for="updateFamilyName">Family Name</label>
                <input id ="updateFamilyName" placeholder="Family Name" value="${id}"/>
            </div>

            <div>
                <label for="updateCommonExample">Common Example</label>
                <input id ="updateCommonExample" placeholder="Common Example" value="${id}"/>
            </div>

            <button onclick="putButterfly(id)">Submit</button>
        </form>
        `)
    )
}

// update db
function putButterfly(id) {
    $.ajax(`{$URL_ENDPOINT}/${id}`, {
        method: 'PUT',
        data: {
            name: $('#name').val(),
            familyName: $('#familyName').val(),
            commonExample: $('#commonExample').val()
        }
    })
}

// delete db
function deleteButterfly(id) {
    $('#add').remove();

    // works
    // let del = $.ajax(`{URL_ENDPOINT}/${id}`)
    // console.log('del', del)

    $.ajax(`{URL_ENDPOINT}/${id}`, {
        method: 'DELETE',
    });
}


    // $.get(URL_ENDPOINT + "/" + id, function (newEnglandButterflies) { //get data to pre-populate form
    //     $("#updateName").val(newEnglandButterflies.name);
    //     $("#updateFamilyName").val(newEnglandButterflies.familyName);
    //     $("#updateCommonExample").val(newEnglandButterflies.commonExample);
    // });

    // $.get(URL_ENDPOINT + "/" + id, function (newEnglandButterflies) { //get data to pre-populate form
    //     $("#updateName").val(newEnglandButterflies.name);
    //     $("#updateFamilyName").val(newEnglandButterflies.familyName);
    //     $("#updateCommonExample").val(newEnglandButterflies.commonExample);
    // });

    // update db
    // function putButterfly(id) {
    //     $.ajax(`{$URL_ENDPOINT}/${id}`, {
    //         method: 'PUT',
    //         data: {
    //             name: $('#updateName').val(),
    //             familyName: $('#updateFamilyName').val(),
    //             commonExample: $('#updateCommonExample').val()
    //         }
    //     })
    // }

    //     $.put(URL_ENDPOINT/id, {
//         name: $('#updateName').val(),
//         familyName: $('#updateFamilyName').val(),
//         commonExample: $('#updateCommonExample').val()
//     })
//     .then(buildTable)
//     $('#formCont').empty()
// }

    // function putButterfly(id) {
    //     $.put(`${URL_ENDPOINT}/${id}`, {
    //         id: $('#id').val(),
    //         name: $('#updateName').val(),
    //         familyName: $('#updateFamilyName').val(),
    //         commonExample: $('#updateCommonExample').val()
    //     })
    //     .then(buildTable)
    //     $('#formCont').empty()
    // }


// function putButterfly(id) {
//     $.ajax(`${URL_ENDPOINT}/${id}`, {
//         method: 'PUT',
//         data: {
//             name: $('#updateName').val(),
//             familyName: $('#updateFamilyName').val(),
//             commonExample: $('#updateCommonExample').val(),
//         }
//     })
// }
