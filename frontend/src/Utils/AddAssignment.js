async function addAssignment(name, hours, due_date, feeling, breaks, user_id) {
    const url = 'http://localhost:5555/newTask/';
    let result;
    try {
        const response = await fetch(url, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                hours: hours,
                due_date: due_date,
                feeling: feeling,
                total_breaks: breaks,
                user_id: user_id,
            }),
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}: ${response.statusText}`);
        }
        result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
    return result;
}


export default addAssignment;