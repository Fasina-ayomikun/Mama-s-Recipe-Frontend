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
    let result = "";
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
  { name: "contact", url: "/contact" },
  { name: "about", url: "/about" },
  { name: "recipes", url: "/recipes" },
];
