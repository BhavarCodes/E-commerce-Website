// JavaScript to handle toggling the edit forms for user info and payment methods

// Edit Info Form Toggle
const editInfoBtn = document.getElementById('editInfoBtn');
const saveInfoBtn = document.getElementById('saveInfoBtn');
const cancelInfoBtn = document.getElementById('cancelInfoBtn');
const editForm = document.getElementById('editForm');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userAddress = document.getElementById('userAddress');

editInfoBtn.addEventListener('click', () => {
    editForm.style.display = 'block';
});

saveInfoBtn.addEventListener('click', () => {
    // Update user info with values from inputs
    userName.textContent = document.getElementById('editName').value || userName.textContent;
    userEmail.textContent = document.getElementById('editEmail').value || userEmail.textContent;
    userPhone.textContent = document.getElementById('editPhone').value || userPhone.textContent;
    userAddress.textContent = document.getElementById('editAddress').value || userAddress.textContent;
    
    editForm.style.display = 'none'; // Hide the form after saving
});

cancelInfoBtn.addEventListener('click', () => {
    editForm.style.display = 'none'; // Hide the form without saving
});

// Manage Payment Form Toggle
const managePaymentBtn = document.getElementById('managePaymentBtn');
const paymentForm = document.getElementById('paymentForm');
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');

managePaymentBtn.addEventListener('click', () => {
    paymentForm.style.display = 'block';
});

cancelPaymentBtn.addEventListener('click', () => {
    paymentForm.style.display = 'none'; // Hide payment form
});
