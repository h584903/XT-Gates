export function packProject(title, progress, plannedDate, POdate,
     status, person) {

const myProject = {
    title: title,
    progress: progress,
    plannedDate: plannedDate,
    POdate: POdate,
    status: status,
    person: person
};

return myProject;
}