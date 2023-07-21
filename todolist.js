// タスクの連番を管理するための変数
let taskId = 0;
const tasks = [];

// createTaskItem関数はタスク項目の要素を作成
// 連番をインクリメントしながらタスクのテキストとボタンを含むHTMLを生成し作成した要素を返す
const createTaskItem = (text) => {
  taskId++;
  const task = {
    id: taskId,
    text: text,
    status: "作業中",
  };
  tasks.push(task);

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.id = `task_${task.id}`;

  const taskText = document.createElement("span");
  taskText.textContent = `${taskId} ${task.text}`; // 連番と入力したテキストを表示
  taskItem.appendChild(taskText);

  const statusButton = document.createElement("input");
  statusButton.type = "button";
  statusButton.value = "作業中";
  taskItem.appendChild(statusButton);

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "削除";
  // deleteButtonがクリックされたときのイベントハンドラがdeleteTask関数を呼び出し削除対象のidを渡す
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  taskItem.textContent = `${task.id} ${task.text}`;
  taskItem.appendChild(statusButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
};

// タスク項目を追加する処理
const appendResult = (item) => {
  const resultHolder = document.getElementById("result");
  resultHolder.appendChild(item);
};

// タスクの追加処理
const addTask = () => {
  const inputTask = document.getElementById("input_task");
  const taskText = inputTask.value;
  inputTask.value = "";

  const taskItem = createTaskItem(taskText);
  appendResult(taskItem);
};

// タスクの削除処理
const deleteTask = (taskId) => {
  const index = tasks.findIndex((t) => {
    return t.id === taskId;
  });
  if (index !== -1) {
    tasks.splice(index, 1);
    const taskItem = document.getElementById("task_" + taskId);
    if (taskItem) {
      taskItem.remove();
    }
  }
};

// 追加ボタンのクリックイベントをハンドリング
const addButton = document.getElementById("add_button");
addButton.addEventListener("click", addTask);
