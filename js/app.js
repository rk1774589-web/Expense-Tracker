// 1. Imports
import {
  appState,
  addTransaction,
  deleteTransaction,
  setTimeframe,
  setSearchQuery,
  getFilteredTransactions,
  getNetBalance,
  getTotalIncome,
  getTotalExpenses,
} from "./state.js";
import { renderTransactions, renderSummaryTotals, getFormData } from "./ui.js";
import { saveTransactions, loadTransactions } from "./storage.js";
import { initChart, updateChart } from "./chart.js";

// Global variable to keep track of our Chart instance
let chartInstance = null;

// 2. Helper: Re-render the entire app UI based on current state
function updateAppUI() {
  const filteredTransactions = getFilteredTransactions();

  renderTransactions(filteredTransactions);
  renderSummaryTotals(getNetBalance(), getTotalIncome(), getTotalExpenses());
  updateChart(chartInstance, filteredTransactions);

  saveTransactions(appState.transactions);
}

// 3. Event Listeners Setup
function setupEventListeners() {
  const modal = document.querySelector("#transaction-modal");
  const openModalBtn = document.querySelector("#open-modal-btn");
  const closeModalBtn = document.querySelector("#close-modal-btn");
  const form = document.querySelector("#transaction-form");
  const searchInput = document.querySelector("#search-input");
  const timeframeBtns = document.querySelectorAll(".filter-btn");

  // Modal Open/Close
  openModalBtn.addEventListener("click", () => modal.showModal());
  closeModalBtn.addEventListener("click", () => modal.close());

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTransaction(getFormData());
    updateAppUI();
    form.reset();
    modal.close();
  });

  // Search Input Filter
  searchInput.addEventListener("input", (e) => {
    setSearchQuery(e.target.value);
    updateAppUI();
  });

  // Timeframe Pill Filters
  timeframeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Update visual active state
      timeframeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 2. Update state and re-render
      setTimeframe(btn.dataset.timeframe);
      updateAppUI();
    });
  });
}

// 4. Initialization (Runs when DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const savedTransactions = loadTransactions();
  appState.transactions.push(...savedTransactions);
  chartInstance = initChart();
  setupEventListeners();
  updateAppUI();
});
