function loadAdmin() {
    const data = getData();

    document.getElementById("nomInput").value = data.profile.nom;
    document.getElementById("descriptionInput").value = data.profile.description;
    document.getElementById("aproposInput").value = data.profile.apropos;
    document.getElementById("emailInput").value = data.profile.email;
    document.getElementById("whatsappInput").value = data.profile.whatsapp;
    document.getElementById("linkedinInput").value = data.profile.linkedin;
    document.getElementById("githubInput").value = data.profile.github;

    renderAdminProjects();
}

function saveProfile() {
    const data = getData();

    data.profile.nom = document.getElementById("nomInput").value;
    data.profile.description = document.getElementById("descriptionInput").value;
    data.profile.apropos = document.getElementById("aproposInput").value;
    data.profile.email = document.getElementById("emailInput").value;
    data.profile.whatsapp = document.getElementById("whatsappInput").value;
    data.profile.linkedin = document.getElementById("linkedinInput").value;
    data.profile.github = document.getElementById("githubInput").value;

    saveData(data);
    alert("Informations enregistrées !");
}

document.getElementById("backgroundInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = getData();
        data.profile.background = e.target.result;
        saveData(data);
        alert("Image de fond ajoutée !");
    };
    reader.readAsDataURL(file);
});

function removeBackground() {
    const data = getData();
    data.profile.background = "";
    saveData(data);
    alert("Image de fond retirée !");
}

function saveProjectForm() {
    const title = document.getElementById("projectTitle").value.trim();
    const description = document.getElementById("projectDescription").value.trim();
    const tech = document.getElementById("projectTech").value.trim();
    const link = document.getElementById("projectLink").value.trim();
    const file = document.getElementById("projectImage").files[0];
    const editingIndex = document.getElementById("editingIndex").value;

    if (!title || !description || !tech) {
        alert("Remplis au moins le nom, la description et les technologies.");
        return;
    }

    function saveFinalProject(imageData, keepOldImage = false) {
        const data = getData();

        const projectData = {
            title,
            description,
            tech,
            link: link || "#",
            image: imageData || ""
        };

        if (editingIndex !== "") {
            const index = Number(editingIndex);
            if (keepOldImage) {
                projectData.image = data.projects[index].image || "";
            }
            data.projects[index] = projectData;
            alert("Projet modifié avec succès !");
        } else {
            data.projects.push(projectData);
            alert("Projet ajouté avec succès !");
        }

        saveData(data);
        clearProjectForm();
        renderAdminProjects();
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveFinalProject(e.target.result, false);
        };
        reader.readAsDataURL(file);
    } else {
        saveFinalProject("", editingIndex !== "");
    }
}

function editProject(index) {
    const data = getData();
    const project = data.projects[index];

    document.getElementById("editingIndex").value = index;
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDescription").value = project.description;
    document.getElementById("projectTech").value = project.tech;
    document.getElementById("projectLink").value = project.link;
    document.getElementById("projectImage").value = "";

    document.getElementById("projectFormTitle").textContent = "Modifier le projet";
    document.getElementById("saveProjectBtn").textContent = "Enregistrer les modifications";

    window.scrollTo({ top: document.getElementById("projectFormTitle").offsetTop - 100, behavior: "smooth" });
}

function clearProjectForm() {
    document.getElementById("editingIndex").value = "";
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectTech").value = "";
    document.getElementById("projectLink").value = "";
    document.getElementById("projectImage").value = "";
    document.getElementById("projectFormTitle").textContent = "Ajouter un projet";
    document.getElementById("saveProjectBtn").textContent = "Ajouter le projet";
}

function cancelEdit() {
    clearProjectForm();
}

function renderAdminProjects() {
    const data = getData();
    const list = document.getElementById("adminProjectsList");
    list.innerHTML = "";

    data.projects.forEach((project, index) => {
        const div = document.createElement("div");
        div.className = "admin-project-item";

        const image = project.image
            ? `<img src="${project.image}" alt="${project.title}">`
            : project.title;

        div.innerHTML = `
            <div class="admin-thumb">${image}</div>
            <div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Technologies :</strong> ${project.tech}</p>
                <p><strong>Lien :</strong> ${project.link}</p>
                <div class="admin-actions">
                    <button onclick="editProject(${index})" class="btn primary">Modifier</button>
                    <button onclick="deleteProject(${index})" class="btn danger-btn">Supprimer</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function deleteProject(index) {
    if (!confirm("Supprimer ce projet ?")) return;
    const data = getData();
    data.projects.splice(index, 1);
    saveData(data);
    renderAdminProjects();
}

function resetPortfolio() {
    if (!confirm("Voulez-vous vraiment réinitialiser tout le portfolio ?")) return;
    localStorage.removeItem("portfolioData");
    location.reload();
}

document.addEventListener("DOMContentLoaded", loadAdmin);
