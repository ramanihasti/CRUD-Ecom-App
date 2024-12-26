// Categories

import { BASE_URL } from "../consts";

async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

function getSingleCategory() {}

async function addCategory(body) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      body: body,
    });
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}
function updateCategory() {}
function deleteCategory() {}

export {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

// End Categories
//koi bhi from input ko handle karne ke liye teen chize honi zaruri hain: id. name, onchange
// frontend se backend tak data bhej ne ke liye ye current folder yani ki apiServices ke function ka use karna zaruri hain.
//inse aap frontend se backend par req bhej sakte hain.

// CORS policy ki error:
// Access to fetch at 'http://localhost/5000/categories' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

//'http://localhost/5000/categories' se jo request 'http://localhost:5173' pe jo request bheji hain wo CORS policy દ્વારા block kari hain.
//ye error ko soul kar ne ke liye aapko backend me ek package install karna padega.
// npm i cors
