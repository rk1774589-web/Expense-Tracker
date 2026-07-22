// 1. Core State Object
export const appState = {
  transactions: [],
  activeTimeframe: "1M",
  searchQuery: "",
};

// Helper function to check if a date string falls inside the timeframe
function isWithinTimeframe(dateString, timeframe) {
  const txDate = new Date(dateString);
  const now = new Date();
  const diffInDays = (now - txDate) / (1000 * 60 * 60 * 24);

  if (timeframe === "1W") return diffInDays <= 7;
  if (timeframe === "1M") return diffInDays <= 30;
  if (timeframe === "3M") return diffInDays <= 90;
  if (timeframe === "YTD") return txDate.getFullYear() === now.getFullYear();

  return true; // Fallback to show all
}

// 2. Mutators (Functions that modify state)
export function addTransaction(transaction) {
  // unshift puts the newest expense at the top of the list!
  appState.transactions.unshift(transaction);
}

export function deleteTransaction(id) {
  appState.transactions = appState.transactions.filter((tx) => tx.id !== id);
}

export function setTimeframe(timeframe) {
  appState.activeTimeframe = timeframe;
}

export function setSearchQuery(query) {
  appState.searchQuery = query;
}

// 3. Derived Data Getters (Calculations)
export function getFilteredTransactions() {
  const { transactions, activeTimeframe, searchQuery } = appState;

  return transactions.filter((tx) => {
    const matchesTimeframe = isWithinTimeframe(tx.date, activeTimeframe);
    const matchesSearchQuery = tx.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTimeframe && matchesSearchQuery;
  });
}

export function getNetBalance() {
  return appState.transactions.reduce((total, tx) => total + tx.amount, 0);
}

export function getTotalIncome() {
  return appState.transactions
    .filter((tx) => tx.amount > 0)
    .reduce((total, tx) => total + tx.amount, 0);
}

export function getTotalExpenses() {
  return appState.transactions
    .filter((tx) => tx.amount < 0)
    .reduce((total, tx) => total + tx.amount, 0);
}
