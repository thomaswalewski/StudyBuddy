
export async function checkLogin() {
  console.log("checking login");
  let result;
  await fetch("http://localhost:5555/loginState", {
    mode: "cors",
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.isLoggedIn);
      result = data;
    });
  console.log(result);
  return result;
}

export async function login(email, password) {
  console.log("logging in");
  console.log(email);
  console.log(password);
  try {
    const response = await fetch("http://localhost:5555/login", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log("login data:");
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error during login:");
    console.log(error);
    return null;
  }
}


export async function logout() {
  console.log("logging out");
  const response = await fetch("http://localhost:5555/logout", {
    mode: "cors",
    method: "POST",
    credentials: "include",
  });
  console.log(response.ok);
}


