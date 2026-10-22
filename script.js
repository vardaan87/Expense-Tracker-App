let editedIndex = null;

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const category = form.category.value;

  const expense = {
    amount: amount,
    description: description,
    category: category,
  };

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  if (editedIndex === null) {
    expenses.push(expense);
  } else {
    expenses[editedIndex] = expense;
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));

  editedIndex = null;

  form.reset();

  document.querySelector("#add_expense").innerHTML = "Add Expense";

  displayUser(expenses);
});

function displayUser(data) {
  const div = document.querySelector(".spcl");
  div.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "list-group list-group-numbered";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML =
      item.amount + " - " + item.description + " - " + item.category;
    li.className = "list-group-item h5 ";

    const delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.className = "btn btn-danger ms-5";

    delButton.addEventListener("click", () => {
      deleteExpense(index);
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.className = "btn btn-secondary ms-5";

    editButton.addEventListener("click", () => {
      editExpense(index);
    });

    li.appendChild(delButton);
    li.appendChild(editButton);
    li.appendChild(editButton);
    ul.appendChild(li);
  });

  div.appendChild(ul);
}

function deleteExpense(index) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayUser(expenses);
}

function editExpense(index) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expense = expenses[index];

  form.amount.value = expense.amount;
  form.description.value = expense.description;
  form.category.value = expense.category;

  editedIndex = index;

  document.querySelector("#add_expense").innerHTML = "Update Expense";
}

window.addEventListener("DOMContentLoaded", () => {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  displayUser(expenses);
});
