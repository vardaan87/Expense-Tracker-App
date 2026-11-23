const url = "http://localhost:3000/expense/";

let editId = null;

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const category = form.category.value;

  const expense = {
    amount: amount,
    description: description,
    category: category,
  };

  if (editId === null) {
    await axios.post(`${url}add`, expense);
  } else {
    await axios.put(`${url}edit/${editId}`, expense);
    editId = null;
  }

  const { data } = await axios.get(url);

  form.reset();

  document.querySelector("#add_expense").innerHTML = "Add Expense";

  displayUser(data);
});

function displayUser(data) {
  const div = document.querySelector(".spcl");
  div.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "list-group list-group-numbered";

  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.amount} - ${item.description} - ${item.category}`;
    li.className = "list-group-item h5 ";

    const delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.className = "btn btn-danger ms-5";

    delButton.addEventListener("click", () => {
      deleteExpense(item.id);
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.className = "btn btn-secondary ms-5";

    editButton.addEventListener("click", () => {
      editExpense(item.id);
    });

    li.appendChild(delButton);
    li.appendChild(editButton);
    ul.appendChild(li);
  });

  div.appendChild(ul);
}

async function deleteExpense(id) {
  try {
    await axios.delete(`${url}delete/${id}`);

    const { data } = await axios.get(url);
    displayUser(data);
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
}

async function editExpense(id) {
  const { data } = await axios.get(`${url}${id}`);

  form.amount.value = data.amount;
  form.description.value = data.description;
  form.category.value = data.category;

  editId = id;

  document.querySelector("#add_expense").innerHTML = "Update Expense";
}

window.addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get(url);
  displayUser(data);
});
