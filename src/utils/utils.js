export const autoResize = (input) => {
  input.style.height = "60px";
  input.style.height = input.scrollHeight + "px";
};
export const initialValue = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  bio: "",
  profileImage: "",
  password: "",
  password2: "",
};
export const convertFileToBAse64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
export const navLinks = [
  { name: "home", url: "/" },
  { name: "recipes", url: "/recipes" },
  { name: "contact", url: "/contact" },
  { name: "about", url: "/about" },
];
export const initialQuery = {
  search: "",
  equipment: "",
  ingredient: "",
  sort: "latest",
  minLikes: 0,
  minReviews: 0,
  creator: "",
  page: 1,
};
export const numberList = [5, 10, 20, 50, 100, 200, 500];
