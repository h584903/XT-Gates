export function packProject(id, title, progress, plannedDate, POdate,
     status, pem, comment) {

    console.log(pem);
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
    console.log(myProject);

return myProject;
}
