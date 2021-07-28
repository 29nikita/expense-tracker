const headingElement = document.querySelector("#headingTotal");
const inputElement = document.querySelector("#inputExpense");
const btnAddToTotal = document.querySelector("#addExpense");
const expenseDesc = document.querySelector("#inputExpenseDesc");
const expenseTable = document.querySelector("#tableElement");

let totalExpense = 0;
let allExpenses = [];

function addToTotal() {
  if (
    expenseDesc.value == "" ||
    inputElement.value == "" ||
    (expenseDesc.value == "" && inputElement.value == "")
  ) {
    alert("please enter valid values");
  } else {
    const expenseObject = {};
    let inputExpenseAmount = inputElement.value; //taking value from input field
    let inputExpenseDesc = expenseDesc.value; //taking value from input field
    let expense = parseInt(inputExpenseAmount, 10); //converting it into number

    //adding objects to expenseObject
    expenseObject.expense = expense;
    expenseObject.desc = inputExpenseDesc;
    expenseObject.moment = new Date();

    //pushing object in allExpenses array
    allExpenses.push(expenseObject);

    totalExpense = totalExpense + expense; //adding the expense
    const someText = `Total: ${totalExpense}`;
    headingElement.textContent = someText; //displaying the value in view

    renderList(allExpenses);
  }

  //clearing input fields after button click
  inputElement.value = "";
  expenseDesc.value = "";
}

btnAddToTotal.addEventListener("click", addToTotal, false);

function createListItem({ desc, expense, moment }) {
  return `<li class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
      ${desc}
      <small class="text-muted">${getDateString(moment)}</small>
    </div>
    <div>
      <span class="px-5">
        ${expense}
      </span>
      <button
      type="button"
      class="btn btn-outline-danger btn-sm"
      onClick="deleteItem(${moment.valueOf()})">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </li>`;
}

//get date string
function getDateString(moment) {
  return moment.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

//delete item
function deleteItem(dateValue) {
  for (let i = 0; i < allExpenses.length; i++) {
    if (allExpenses[i].moment.valueOf() === dateValue) {
      totalExpense = totalExpense - allExpenses[i].expense * 1;
      const someText = `Total: ${totalExpense}`;
      headingElement.textContent = someText;
      allExpenses.splice(i, 1);
      i--;
    }
  }
  renderList(allExpenses);
}

//mapping to display all the expenses in view automatically
function renderList(arrOfList) {
  const allExpenseHTML = arrOfList.map((expense) => createListItem(expense));
  const joinedExpenseHTML = allExpenseHTML.join(""); //join to convert array into string
  expenseTable.innerHTML = joinedExpenseHTML;
}
