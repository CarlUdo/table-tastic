// Post request - "Menu already exists."
const postReq = {
  name: "Breakfast Menu",
  dishes: ["Milkshake", "Orange juice"],
};

// Post request - "Invalid menu format."
const postReq = {
  dishes: ["Milkshake", "Orange juice"],
};

// Put request - Returns updated menu - 9de3faf7-36f3-4449-b4b5-7c3393f00e10 (exists)
const postReq = {
  name: "Breakfast Menu",
  dishes: ["Milkshake", "Orange juice"],
};

// Put request - "Menu not found." - 9de3faf7-36f3-4449-b4b5-7c3393f00e11 (doesn't exist)
const postReq = {
  name: "Breakfast Menu",
  dishes: ["Milkshake", "Orange juice"],
};

// Put request - "Menu not found." - 123456 (invalid uuid)
const postReq = {
  name: "Breakfast Menu",
  dishes: ["Milkshake", "Orange juice"],
};

// Delete request - Returns deleted menu - 9de3faf7-36f3-4449-b4b5-7c3393f00e10 (exists)
const postReq = {
  name: "Breakfast Menu",
  dishes: ["Milkshake", "Orange juice"],
};
