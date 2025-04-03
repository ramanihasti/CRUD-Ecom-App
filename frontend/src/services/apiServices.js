// Categories
export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return await response.json();
}

export async function getSingleCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  return await response.json();
}

export async function addCategory(body) {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    body: body,
  });
  return await response.json();
}

export async function updateCategory(id, body) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PATCH",
    body,
  });
  return await response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
// End Categories

// Sub-Categories
export async function getAllSubCategories() {
  const response = await fetch(`${BASE_URL}/subCategories`);
  return await response.json();
}

export async function getSingleSubCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`);
  return await response.json();
}

export async function addSubCategory(body) {
  const response = await fetch(`${BASE_URL}/subCategories`, {
    method: "POST",
    body: body,
  });
  return await response.json();
}

export async function updateSubCategory(id, body) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
    method: "PATCH",
    body,
  });
  return await response.json();
}

export async function deleteSubCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

export async function getAllSubCategoriesByCategorySlug(categorySlug) {
  const response = await fetch(
    `${BASE_URL}/subCategories/category/slug/${categorySlug}`
  );
  return await response.json();
}

export async function getAllSubCategoriesByCategoryId(categoryId) {
  const response = await fetch(
    `${BASE_URL}/subCategories/category/${categoryId}`
  );
  return await response.json();
}
// End Sub-Category

// Product
export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return await response.json();
}

export async function getSingleProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return await response.json();
}

export async function addProduct(body) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: body,
  });
  return await response.json();
}

export async function updateProduct(id, body) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    body: body,
  });
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

export async function getAllProductsBySubCategorySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/subCategory/${slug}`);
  const data = await response.json();
  return data;
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/slug/${slug}`);
  const data = await response.json();
  return data;
}
// End Product

// page
export async function getAllPages() {
  const response = await fetch(`${BASE_URL}/pages`);
  return await response.json();
}

export async function getSinglePage(id) {
  const response = await fetch(`${BASE_URL}/pages/${id}`);
  return await response.json();
}

export async function addPage(body) {
  const response = await fetch(`${BASE_URL}/pages`, {
    method: "POST",
    body,
  });
  return await response.json();
}

export async function updatePage(id, body) {
  const response = await fetch(`${BASE_URL}/pages/${id}`, {
    method: "PATCH",
    body: body,
  });
  return await response.json();
}

export async function deletePage(id) {
  const response = await fetch(`${BASE_URL}/pages/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${BASE_URL}/pages/slug/${slug}`);
  const data = await response.json();
  return data;
}

export async function getAllHomePages() {
  const response = await fetch(`${BASE_URL}/homePages`);
  return await response.json();
}

export async function addHomePage(body) {
  const response = await fetch(`${BASE_URL}/homePages`, {
    method: "POST",
    body: body,
  });
  return await response.json();
}

export async function updateHomePage(id, body) {
  const response = await fetch(`${BASE_URL}/homePages/${id}`, {
    method: "PATCH",
    body,
  });
  return await response.json();
}
//End page

// Auth
export async function register(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function login(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

//User
export async function getUser() {
  const response = await fetch(`${BASE_URL}/auth/getUser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}
//Admin
export async function getAdmin() {
  const response = await fetch(`${BASE_URL}/auth/getAdmin`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

//Order
export async function createOrder(data) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

export async function updateOrderStatus(id, data) {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}

export async function getAllOrders(data) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
}
//End Order
//koi bhi from input ko handle karne ke liye teen chize honi zaruri hain: id. name, onchange
// frontend se backend tak data bhej ne ke liye ye current folder yani ki apiServices ke function ka use karna zaruri hain.
//inse aap frontend se backend par req bhej sakte hain.

// CORS policy ki error:
// Access to fetch at 'http://localhost/5000/categories' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

//'http://localhost/5000/categories' se jo request 'http://localhost:5173' pe jo request bheji hain wo CORS policy દ્વારા block kari hain.
//ye error ko soul kar ne ke liye aapko backend me ek package install karna padega.
// npm i cors
