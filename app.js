const defaultData = {
    profile: {
        nom: "Josue Adigoun",
        description: "Étudiant en troisième année de Licence en Système Informatique et Logiciel, passionné par le développement web, les applications sécurisées et les solutions numériques.",
        apropos: "Je suis étudiant en troisième année à SUPTELECOM, spécialisé en Système Informatique et Logiciel. Je développe des applications web avec PHP, MySQL, HTML, CSS et JavaScript. J’ai réalisé plusieurs projets académiques et personnels dans les domaines de la gestion universitaire, de l’archivage médical et de la transmission sécurisée des résultats électoraux.",
        email: "josueadigoun@icloud.com",
        whatsapp: "+229 01 69 07 89 65",
        linkedin: "www.linkedin.com/in/josue-adigoun-498553384",
        github: "Ajoute ton lien GitHub dans Modifier",
        background: ""
    },
    projects: [
        {
            title: "Secure Vote",
            description: "Application web de transmission sécurisée des résultats électoraux avec gestion des utilisateurs, saisie des résultats, transmission des PV et tableau de bord administrateur.",
            tech: "PHP • MySQL • HTML • CSS • JavaScript",
            link: "#",
            image: ""
        },
        {
            title: "Gestion Universitaire",
            description: "Plateforme de gestion des inscriptions universitaires avec préinscription, gestion des étudiants, filières, paiements et utilisateurs.",
            tech: "PHP • MySQL • Bootstrap • JavaScript",
            link: "#",
            image: ""
        },
        {
            title: "Archive Médicale",
            description: "Plateforme web de gestion et d’archivage des données médicales avec gestion des patients, dossiers médicaux, authentification et tableau de bord.",
            tech: "PHP • MySQL • Bootstrap • JavaScript",
            link: "#",
            image: ""
        }
    ]
};

function getData() {
    const saved = localStorage.getItem("portfolioData");
    if (!saved) {
        localStorage.setItem("portfolioData", JSON.stringify(defaultData));
        return JSON.parse(JSON.stringify(defaultData));
    }
    return JSON.parse(saved);
}

function saveData(data) {
    localStorage.setItem("portfolioData", JSON.stringify(data));
}

function renderPortfolio() {
    const data = getData();

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("nomHero", data.profile.nom);
    setText("nomCarte", data.profile.nom);
    setText("descriptionHero", data.profile.description);
    setText("aproposTexte", data.profile.apropos);
    setText("emailContact", data.profile.email);
    setText("whatsappContact", data.profile.whatsapp);
    setText("linkedinContact", data.profile.linkedin);
    setText("githubContact", data.profile.github);

    const hero = document.querySelector(".hero");
    if (hero && data.profile.background) {
        hero.style.backgroundImage = `url(${data.profile.background})`;
        hero.classList.add("has-bg");
    }

    const container = document.getElementById("projectsContainer");
    if (container) {
        container.innerHTML = "";
        data.projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            const imageBox = document.createElement("div");
            imageBox.className = "project-img";
            if (project.image) {
                imageBox.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
            } else {
                imageBox.textContent = project.title;
            }

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p class="tech">${project.tech}</p>
                <a href="${project.link || '#'}" class="project-link" target="_blank">Voir sur GitHub</a>
            `;
            card.prepend(imageBox);
            container.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", renderPortfolio);
