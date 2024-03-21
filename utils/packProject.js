export function packProject(title, progress, plannedDate, POdate,
     status, pem, comment) {

const myProject = {
    ID: 0,
    title: title,
    progress: progress,
    plannedDate: plannedDate,
    POdate: POdate,
    status: status,
    pem: pem,
    comment: comment
};

return myProject;
}
