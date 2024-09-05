fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Nettverksresponsen var ikke ok');
        }
        return response.json();
    })
    .then(data => {
        const projectList = document.getElementById('project-liste');
        
        data.forEach(project => {
            const listItem = document.createElement('li');
            listItem.textContent = `${project.name}: ${project.description}`;
            projectList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Det oppsto en feil:', error);
    });