const STORAGE_KEY = "pulse_transactions";

export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transactions to localStorage:", error);
  }
}

export function loadTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading transactions from localStorage:", error);
    return [];
  }
}

export function deleteTransactionFromStorage(id) {
  try {
    const transactions = loadTransactions();
    const updatedTransactions = transactions.filter((tx) => tx.id !== id);
    saveTransactions(updatedTransactions);
  } catch (error) {
    console.error("Error deleting transaction from localStorage:", error);
  }
}
