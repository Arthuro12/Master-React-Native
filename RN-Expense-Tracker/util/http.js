const API_URL = "https://react-native-course-7e033-default-rtdb.firebaseio.com";

export async function deleteExpense(id) {
  await fetch(`${API_URL}/expenses/${id}.json`, {
    method: "DELETE",
  });
}

export async function updateExpense(id, expenseData) {
  await fetch(`${API_URL}/expenses/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });
}

export async function fetchExpenses() {
  const response = await fetch(`${API_URL}/expenses.json`);

  if (!response.ok) {
  }

  const data = await response.json();

  const expenses = [];
  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function storeExpense(expenseData) {
  const response = await fetch(`${API_URL}/expenses.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
  }

  const data = response.json();
  const id = data.name;
  return id;
}
