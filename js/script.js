// Load assignments
document.addEventListener("DOMContentLoaded", loadAssignments);

const form = document.querySelector("#assignment-form");
const list = document.querySelector("#assignment-list");

// Add assignment
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const date = document.querySelector("#date").value;

        let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
        assignments.push({ name, date });

        localStorage.setItem("assignments", JSON.stringify(assignments));

        form.reset();
        loadAssignments();

    });

}

// Show assignments
function loadAssignments() {
    if (!list) return;

    list.innerHTML = "";

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    assignments.forEach((a, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `

        ${a.name} - ${a.date}
        <button onclick="deleteAssignment(${index})" class="btn btn-danger btn-sm float-end">Delete</button>
        `;
        list.appendChild(li);
    });

    updateNextAssignment();
}

// Delete assignment
function deleteAssignment(index) {
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.splice(index, 1);
    localStorage.setItem("assignments", JSON.stringify(assignments));
    loadAssignments();
}

// Update next assignment on home page
function updateNextAssignment() {


    const next = document.querySelector("#next-assignment");
    if (!next) return;

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    if (assignments.length === 0) {
        next.textContent = "No assignments due!";
        return;
    }
    next.textContent = assignments[0].name + " - " + assignments[0].date;
}
