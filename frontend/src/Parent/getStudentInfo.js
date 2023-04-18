async function getStudentInfo(id) {
    const url = 'http://localhost:5555/parentInfo/' + id;
    const data = await fetch(url)
        .then((response) => response.json())
        .catch((err) => alert(err));
    console.log(data);
    return data;
}
export default getStudentInfo;