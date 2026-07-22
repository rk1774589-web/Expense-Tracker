const addTransactionBtn = document.getElementById("open-modal-btn");
const addTransactionModal = document.getElementById("transaction-modal");

addTransactionBtn.addEventListener("click", () => {
  addTransactionModal.showModal();
});
