// AXIOS GLOBALS

axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
function getTodos() {
  //way 1
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/posts",
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((response) => {
  //     showOutput(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // way 2
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      params: { _limit: 5 },
    })
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// POST REQUEST
function addTodo() {
  // way 1
  // axios({
  //   method: "post",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //     title: "venkatesh",
  //     completed: false,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // way 2
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "venky",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((error) => {
      console.log(error);
    });
  console.log("POST Request");
}

// PUT/PATCH REQUEST
function updateTodo() {
  // put reqeust

  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "updated Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((error) => {
      console.log(error);
    });
  console.log("PUT/PATCH Request");
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((e) => console.log(e));
  console.log("DELETE Request");
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    ])
    .then(
      axios.spread((posts, todos) => {
        console.log(posts);
        console.log(todos);
      })
    )
    .catch((e) => console.log(e));
  console.log("Simultaneous Request");
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "token-1780",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "venky",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((error) => {
      console.log(error);
    });
  console.log("Custom Headers");
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "tranform venky",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
  axios
    .get("https://jsonplaceholder.typicode.com/postss")
    .then((res) => showOutput(res))
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
      if (error.response.status === 404) {
        alert("Page is not responding");
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("request Cancelled", thrown.message);
      }
    });
  if (true) {
    source.cancel("request cancelled!!!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

const axiosInstances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// axiosInstances
//   .get("/comments")
//   .then((res) => showOutput(res))
//   .catch((e) => console.log(e.message));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
