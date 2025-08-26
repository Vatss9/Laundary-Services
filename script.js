let cart = [];

function toggleItem(name, price, btn) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        cart = cart.filter(item => item.name !== name); // Remove item
        btn.textContent = 'Add Item ➕';
        btn.classList.remove('remove');
    } else {
        cart.push({ name, price }); // Add item
        btn.textContent = 'Remove Item ➖';
        btn.classList.add('remove');
    }

    updateCart();
}

function updateCart() {
    const tbody = document.getElementById('cart-body');
    const totalEl = document.getElementById('total-amount');

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No items added</td></tr>`;
        totalEl.textContent = `₹0.00`;
        return;
    }

    tbody.innerHTML = cart.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price}.00</td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.textContent = `₹${total}.00`;
}

document.getElementById('bookBtn').addEventListener('click', function(){
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!fullName || !email || !phone){
        alert("Please fill all fields!");
        return;
    }

    const templateParams = {
        full_name : fullName,
        email_id : email,
        phone_number : phone
    };

    emailjs.send('service_5kxmv5l', 'template_bwfqv7z', templateParams)
    .then(() => {
        document.getElementById("confirmation-msg").style.display = 'block';
        document.getElementById("bookBtn").disabled = true;
    })
    .catch(error => {
        console.error('EmailJS Error:', error);
        alert("Something went wrong please try again later")
    });
});
