function deleteTask(id) {
  d3.json(`/task/${id}`, {
    method: "DELETE",
  }).then(() => {
    fetchTasks();
  });
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

d3.select("#add-new-task").on("click", () => {
  var input = d3.select("#new-task");
  var value = input.property("value");
  var data = {
    task: value,
  };

  d3.json("/task", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(() => {
    fetchTasks();
  });
});
