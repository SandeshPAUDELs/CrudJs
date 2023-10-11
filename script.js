// document.addEventListener("DOMContentLoaded", function () {
//     const dataForm = document.getElementById("dataForm");
//     const dataTable = document.getElementById("dataTable");
//     const data = []; 
//     let editIndex = -1;

//     // Function to update the table with data
//     function updateTable() {
//         const tbody = dataTable.querySelector("tbody");
//         tbody.innerHTML = '';

//         data.forEach((formData, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${formData.name}</td>
//                 <td>${formData.email}</td>
//                 <td>
//                     <button data-index="${index}" class="update-button">Update</button>
//                     <button data-index="${index}" class="remove-button">Remove</button>
//                 </td>
//             `;

//             tbody.appendChild(row);

//             row.querySelector(".update-button").addEventListener("click", function () {
//                 editData(index);
//             });

//             row.querySelector(".remove-button").addEventListener("click", function () {
//                 removeData(index);
//             });
//         });
//     }

//     function addData(formData) {
//         data.push(formData);
//         updateTable();
//     }

//     function removeData(index) {
//         data.splice(index, 1);
//         updateTable();
//     }

//     function editData(index) {
//         const formData = data[index];
//         document.getElementById("name").value = formData.name;
//         document.getElementById("email").value = formData.email;
//         editIndex = index;
//         dataForm.querySelector("button[type=submit]").textContent = "Update";
//     }

//     dataForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;

//         if (name && email) {
//             const formData = { name, email };
//             if (editIndex !== -1) {
//                 data[editIndex] = formData;
//                 dataForm.reset();
//                 editIndex = -1;
//                 dataForm.querySelector("button[type=submit]").textContent = "Submit";
//                 updateTable();
//             } else {
//                 addData(formData);
//                 dataForm.reset();
//             }
//         }
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    const dataForm = document.getElementById("dataForm");
    const dataTable = document.getElementById("dataTable");
    const data = JSON.parse(localStorage.getItem("formData")) || []; 
    let editIndex = -1;

    function updateTable() {
        const tbody = dataTable.querySelector("tbody");
        tbody.innerHTML = '';

        data.forEach((formData, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formData.name}</td>
                <td>${formData.email}</td>
                <td>
                    <button data-index="${index}" class="update-button">Update</button>
                    <button data-index="${index}" class="remove-button">Remove</button>
                </td>
            `;

            tbody.appendChild(row);

            row.querySelector(".update-button").addEventListener("click", function () {
                editData(index);
            });

            row.querySelector(".remove-button").addEventListener("click", function () {
                removeData(index);
            });
        });
    }

    function saveToLocalStorage(data) {
        localStorage.setItem("formData", JSON.stringify(data));
    }

    function addData(formData) {
        data.push(formData);
        saveToLocalStorage(data); 
        updateTable();
    }

    function removeData(index) {
        data.splice(index, 1);
        saveToLocalStorage(data); 
        updateTable();
    }

    function editData(index) {
        const formData = data[index];
        document.getElementById("name").value = formData.name;
        document.getElementById("email").value = formData.email;
        editIndex = index;
        dataForm.querySelector("button[type=submit]").textContent = "Update";
    }

    dataForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (name && email) {
            const formData = { name, email };
            if (editIndex !== -1) {
                data[editIndex] = formData;
                saveToLocalStorage(data);
                dataForm.reset();
                editIndex = -1;
                dataForm.querySelector("button[type=submit]").textContent = "Submit";
                updateTable();
            } else {
                addData(formData);
                dataForm.reset();
            }
        }
    });

    updateTable();
});