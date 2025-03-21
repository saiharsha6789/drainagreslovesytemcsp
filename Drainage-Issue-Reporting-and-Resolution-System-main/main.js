document.getElementById("issueForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("responseMsg").innerText = "Issue reported successfully!";
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("issueForm");
    const responseMsg = document.getElementById("responseMsg");
    const table = document.getElementById("issuesTable");

    // Function to load stored issues into status.html
    function loadIssues() {
        let issues = JSON.parse(localStorage.getItem("issues")) || [];

        if (table) {  // Check if we're on status.html
            issues.forEach((issue, index) => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${issue.address}</td>
                    <td>${issue.description}</td>
                    <td style="color: red; font-weight: bold;">Pending</td>
                `;
            });
        }
    }

    // If form exists, handle form submission
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let address = document.getElementById("address").value.trim();
            let description = document.getElementById("description").value.trim();

            if (!name || !address || !description) {
                responseMsg.textContent = "All fields are required!";
                responseMsg.style.color = "red";
                return;
            }

            // Store in local storage
            let issues = JSON.parse(localStorage.getItem("issues")) || [];
            issues.push({ name, address, description });
            localStorage.setItem("issues", JSON.stringify(issues));

            responseMsg.textContent = "Issue submitted successfully!";
            responseMsg.style.color = "green";

            // Clear form fields
            form.reset();
        });
    }

    // Load issues when status.html is opened
    loadIssues();
});
