let garmentsCart = [];

// Add garment to cart
function addGarment() {
  const garmentType = document.getElementById("garmentType").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity");
    return;
  }

  // If garment already exists, increase quantity
  const existingGarment = garmentsCart.find(
    (item) => item.type === garmentType
  );

  if (existingGarment) {
    existingGarment.quantity += quantity;
  } else {
    garmentsCart.push({
      type: garmentType,
      quantity: quantity,
    });
  }

  displayCart();

  // Clear quantity field
  document.getElementById("quantity").value = "";
}

// Display current cart
function displayCart() {
  const cart = document.getElementById("cart");

  if (garmentsCart.length === 0) {
    cart.innerHTML = "<p>No garments added yet.</p>";
    return;
  }

  cart.innerHTML = garmentsCart
    .map(
      (item, index) => `
        <div class="cart-item">
          <span>${item.type} - Quantity: ${item.quantity}</span>
          <button class="remove-btn" onclick="removeGarment(${index})">✕</button>
        </div>
      `
    )
    .join("");
}

// Remove garment from cart
function removeGarment(index) {
  garmentsCart.splice(index, 1);
  displayCart();
}

// Create final order
async function createOrder() {
  const customerName = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!customerName || !phone || garmentsCart.length === 0) {
    alert("Please fill customer details and add garments");
    return;
  }

  try {
    const response = await fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        phone,
        garments: garmentsCart,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Order Created! Total Bill: ₹${data.order.totalBill}`);

      // Reset form
      garmentsCart = [];
      displayCart();

      document.getElementById("customerName").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("quantity").value = "";

      // Auto refresh
      getOrders();
      getDashboard();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error while creating order");
  }
}

// Get all orders
async function getOrders() {
  const searchValue = document.getElementById("searchInput").value.trim();
  const statusValue = document.getElementById("statusFilter").value;

  let query = [];

  if (searchValue) {
    query.push(`search=${encodeURIComponent(searchValue)}`);
  }

  if (statusValue) {
    query.push(`status=${encodeURIComponent(statusValue)}`);
  }

  const queryString = query.length ? `?${query.join("&")}` : "";

  try {
    const response = await fetch(`/orders${queryString}`);
    const data = await response.json();

    const ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    if (!data.orders || data.orders.length === 0) {
      ordersList.innerHTML = "<p>No matching orders found.</p>";
      return;
    }

    data.orders.forEach((order) => {
      const garmentsDetails = order.garments
        .map((item) => `${item.type} (${item.quantity})`)
        .join(", ");

      const orderDiv = document.createElement("div");
      orderDiv.classList.add("order-card");

      orderDiv.innerHTML = `
        <strong>${order.customerName}</strong> (${order.phone})<br>
        <strong>Order ID:</strong> ${order._id}<br>
        <strong>Garments:</strong> ${garmentsDetails}<br>
        <strong>Total Bill:</strong> ₹${order.totalBill}<br>
        <strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}<br>
        <strong>Status:</strong> 
        <span class="badge badge-${order.status.toLowerCase()}">${order.status}</span><br><br>

        <select class="status-select" id="status-${order._id}">
          <option value="RECEIVED" ${order.status === "RECEIVED" ? "selected" : ""}>RECEIVED</option>
          <option value="PROCESSING" ${order.status === "PROCESSING" ? "selected" : ""}>PROCESSING</option>
          <option value="READY" ${order.status === "READY" ? "selected" : ""}>READY</option>
          <option value="DELIVERED" ${order.status === "DELIVERED" ? "selected" : ""}>DELIVERED</option>
        </select>

        <button onclick="updateOrderStatus('${order._id}')">
          Update Status
        </button>
      `;

      ordersList.appendChild(orderDiv);
    });
  } catch (error) {
    alert("Server error while fetching orders");
  }
}

// Update order status
async function updateOrderStatus(_id) {
  const newStatus = document.getElementById(`status-${_id}`).value;

  try {
    const response = await fetch(`/orders/${_id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Order status updated to ${newStatus}`);
      getOrders();
      getDashboard();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error while updating order status");
  }
}

// Get dashboard data
async function getDashboard() {
  try {
    const response = await fetch("/dashboard");
    const data = await response.json();

    const dashboardData = document.getElementById("dashboardData");

    dashboardData.innerHTML = `
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-value">${data.totalOrders}</div>
          <div class="stat-label">Total Orders</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">₹${data.totalRevenue}</div>
          <div class="stat-label">Revenue</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">${data.ordersPerStatus.RECEIVED}</div>
          <div class="stat-label">Received</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">${data.ordersPerStatus.PROCESSING}</div>
          <div class="stat-label">Processing</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">${data.ordersPerStatus.READY}</div>
          <div class="stat-label">Ready</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">${data.ordersPerStatus.DELIVERED}</div>
          <div class="stat-label">Delivered</div>
        </div>
      </div>
    `;
  } catch (error) {
    alert("Server error while loading dashboard");
  }
}

// Initialize on page load
displayCart();
getOrders();
getDashboard();