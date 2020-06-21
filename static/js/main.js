d3.json("/tasks").then((tasks) => {
  var list = d3.select("#tasks");

  tasks.forEach((task) => {
    var item = list.append("li");
    item.text(task.description);
  });
});
