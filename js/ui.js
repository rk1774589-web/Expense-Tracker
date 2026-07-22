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
  }

  // Use .map().join('') for clean, high-performance rendering
  listContainer.innerHTML = transactions
    .map((transaction) => {
      const { title, amount, category, date } = transaction;
      const catInfo = CATEGORIES[category] || {
        label: category,
        color: "#9CA3AF",
        icon: "💳",
      };
      const isIncome = amount > 0;

      return `
        <li class="transaction-item">
          <div class="tx-details">
            <div class="tx-icon" style="background-color: ${catInfo.color}20">
              ${catInfo.icon}
            </div>
            <div>
              <div class="tx-title">${title}</div>
              <div class="tx-meta">${date} • ${catInfo.label}</div>
            </div>
          </div>
          <div class="tx-amount ${isIncome ? "text-income" : "text-expense"}">
            ${isIncome ? "+" : ""}${formatCurrency(amount)}
          </div>
        </li>
      `;
    })
    .join("");
}

// 3. Render Metric Cards
export function renderSummaryTotals(balance, income, expenses) {
  document.getElementById("net-balance").textContent = formatCurrency(balance);
  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expenses").textContent =
    formatCurrency(expenses);
}

// 4. Extract Form Data from Modal
export function getFormData() {
  const txTitle = document.getElementById("tx-title").value;
  const txAmount = parseFloat(document.getElementById("tx-amount").value);
  const txCategory = document.getElementById("tx-category").value;
  const txDate = document.getElementById("tx-date").value;
  const txType = document.getElementById("tx-type").value;

  return {
    id: Date.now().toString(),
    type: txType,
    title: txTitle,
    amount: txType === "expense" ? -Math.abs(txAmount) : Math.abs(txAmount),
    category: txCategory,
    date: txDate,
  };
}

// 5. Render Category Spending Breakdown Progress Bars
export function renderCategoryProgress(transactions) {
  const container = document.querySelector("#category-progress-list");
  if (!container) return;

  // Filter for expenses only
  const expenses = transactions.filter((tx) => tx.amount < 0);
  const totalExpense = expenses.reduce(
    (sum, tx) => sum + Math.abs(tx.amount),
    0,
  );

  if (expenses.length === 0 || totalExpense === 0) {
    container.innerHTML = `<p class="empty-state">No expense data available.</p>`;
    return;
  }

  // Calculate totals per category
  const categoryTotals = expenses.reduce((acc, tx) => {
    const cat = tx.category;
    acc[cat] = (acc[cat] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  // Generate progress bars HTML
  container.innerHTML = Object.entries(categoryTotals)
    .map(([category, amount]) => {
      const catInfo = CATEGORIES[category] || {
        label: category,
        color: "#9CA3AF",
        icon: "💳",
      };
      const percentage = ((amount / totalExpense) * 100).toFixed(0);

      return `
        <div class="category-item" style="margin-bottom: 12px;">
          <div class="category-info" style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
            <span>${catInfo.icon} ${catInfo.label}</span>
            <span style="font-weight: 600;">${formatCurrency(amount)} (${percentage}%)</span>
          </div>
          <div class="progress-bar-bg" style="background: rgba(255,255,255,0.08); height: 8px; border-radius: 4px; overflow: hidden;">
            <div class="progress-bar-fill" style="width: ${percentage}%; background-color: ${catInfo.color}; height: 100%; border-radius: 4px; transition: width 0.3s ease;"></div>
          </div>
        </div>
      `;
    })
    .join("");
}
