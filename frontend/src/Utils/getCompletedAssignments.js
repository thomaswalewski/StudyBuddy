async function getCompletedAssignments(id) {
    const url = 'http://localhost:5555/user/' + id + '/completedAssignments';
    const data = await fetch(url)
        .then((response) => response.json())
        .catch((err) => alert(err));
    console.log(data);
    return data;
}

export default getCompletedAssignments;