let projects = [];

function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; 

    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = `${project.name}: ${project.description}`;
        projectList.appendChild(listItem);
    });
}

document.getElementById('project-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const newProject = {
        id: projects.length + 1,
        name: name,
        description: description
    };

    projects.push(newProject);

    displayProjects();

    document.getElementById('project-form').reset();
});

displayProjects();