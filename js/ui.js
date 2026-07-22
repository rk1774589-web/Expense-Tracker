const CATEGORIES = {
  groceries: { label: "Groceries", color: "#10B981", icon: "🛒" },
  entertainment: { label: "Entertainment", color: "#8B5CF6", icon: "🎬" },
  tech: { label: "Tech & Electronics", color: "#3B82F6", icon: "💻" },
  dining: { label: "Dining Out", color: "#EC4899", icon: "🍕" },
  bills: { label: "Bills & Utilities", color: "#F59E0B", icon: "⚡" },
  salary: { label: "Salary & Income", color: "#06B6D4", icon: "💰" },
};

// 1. Helper: Format numbers to USD currency ($1,250.50)
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// 2. Render Transaction List
export function renderTransactions(transactions) {
  const listContainer = document.querySelector("#transaction-list");

  if (transactions.length === 0) {
    listContainer.innerHTML = `<li class="empty-state">No transactions found.</li>`;
    return;
  } else {
    listContainer.innerHTML = ""; // Clear existing content
    transactions.map((transaction) => {
      const { description, amount, category, date } = transaction;
      listContainer.innerHTML += `<li class="transaction-item">
          <div class="transaction-info">
            <span class="transaction-title">${description}</span>
            <span class="transaction-date">${date}</span>
            <span class="transaction-category" style="color: ${CATEGORIES[category].color}">
              ${CATEGORIES[category].icon} ${CATEGORIES[category].label}
            </span>
          </div>
          <div class="transaction-amount" style="color: ${amount > 0 ? "#10B981" : "#EF4444"}">
            ${formatCurrency(amount)}
          </div>
        </li>`;
    });
  }
}

// 3. Render Metric Cards
export function renderSummaryTotals(balance, income, expenses) {
  // TODO: Update textContent for #net-balance, #total-income, and #total-expenses
}

// 4. Extract Form Data from Modal
export function getFormData() {
  // TODO: Return a new transaction object using input values from #transaction-form
  // Hint: Convert income/expense type to positive or negative number!
}
