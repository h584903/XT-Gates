export function packProject(id, title, progress, plannedDate, POdate,
     status, pem, comment) {

const myProject = {
    id: id,
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
