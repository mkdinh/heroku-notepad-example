function deleteTask(id) {
  d3.json(`/task/${id}`, {
    method: "DELETE",
  }).then(() => {
    fetchTasks();
  });
}

function addTask(task) {
  var data = {
    task: task,
  };

  d3.json("/task", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(() => {
    fetchTasks();
  });
}

function onSubmit() {
  d3.event.preventDefault();
  var input = d3.select("#new-task");
  var value = input.property("value");
  if (value.trim() === "") {
    return;
  }

  input.property("value", "");
  addTask(value);
}

function fetchTasks() {
  d3.json("/tasks").then((tasks) => {
    var list = d3.select("#tasks");
    list.html("");

    tasks.forEach((task) => {
      var item = list.append("li");
      item.classed("list-group-item", true);
      item.text(task.description);

      var button = item.append("button");
      button.classed("btn btn-danger float-right del-btn", true);
      button.text("Remove");
      button.on("click", () => deleteTask(task.id));
    });
  });
}

fetchTasks();

d3.select("#add-new-task").on("click", onSubmit);
d3.select("#task-form").on("submit", onSubmit);

setInterval(() => fetchTasks(), 500);
