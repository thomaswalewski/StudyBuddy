async function markComplete(id) {
    const url = 'http://localhost:5555/markTaskComplete/';
    let result;
    try {
        const response = await fetch(url, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
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


export default markComplete;