# Week-12-Project

### Coding Steps:
- Create a full CRUD application of your choice using an API or JSON Server.
- Use JQuery/AJAX to interact with the API. 
- Use a form to post new entities.
- Build a way for users to update or delete entities.
- Include a way to get entities from the API.
- Use Bootstrap and CSS to style your project.

Mock API
https://mockapi.io/projects/64f0d8b68a8b66ecf77a2cc2

** Later if I wanted add an array of sub family names with names & images

Use this to rehresh mockapi database
[
 {
  "name": "Skippers",
  "familyName": "Hesperiidae",
  "commonExample": "Hobomok Skipper",
  "id": 1
 },
 {
  "name": "Swallowtails",
  "familyName": "Papilioninae",
  "commonExample": "Eastern Tiger Swallowtail",
  "id": 2
 },
 {
  "name": "Gossamer-wing",
  "familyName": "Lycaenidae",
  "commonExample": "American Copper",
  "id": 3
 },
 {
  "name": "Brush-footed",
  "familyName": "Nymphalidae",
  "commonExample": "Monarch",
  "id": 4
 },
 {
  "name": "Whites and Sulphurs",
  "familyName": "Pieridae",
  "commonExample": "Orange-barred Sulphur",
  "id": 5
 }
]


                    <tr>
                        <td>${newEnglandButterflies.id}</td>
                        <td>${newEnglandButterflies.name}</td>
                        <td>${newEnglandButterflies.familyName}</td>
                        <td>${newEnglandButterflies.commonExample}</td>
                        <td><button id="updateButterfly" onclick="updateButterflyForm(${newEnglandButterflies.id})">Update</button></td>
                        <td><button id="deleteButterfly" onclick="deleteButterfly(${newEnglandButterflies.id})">Delete</button></td>
                    </tr>