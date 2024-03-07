import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUser, setUserEdited } from "../features/users/userSlice";
import { getFromLocalStorage } from "../utils/localStorage";
import { convertFileToBAse64 } from "../utils/utils";

function EditProfilePage() {
  const user = getFromLocalStorage();
  const [value, setValue] = useState({ ...user });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const { isEdited, isLoading } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const formData = new FormData();

  const handleChange = (input) => {
    const name = input.name;
    const newValue = input.value;
    setValue({ ...value, [name]: newValue });
  };

  const handleSubmit = () => {
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("displayName", value.displayName);
    formData.append("email", value.email);
    formData.append("bio", value.bio);
    if (file) {
      formData.append("profileImage", file);
    } else {
      formData.append("profileImage", JSON.stringify(value.profileImage));
    }
    dispatch(editUser({ id: value._id, formData }));
  };

  const handleImageUpload = (e) => {
    const input = e.target;
    const file = input.files[0];
    convertFileToBAse64(file)
      .then((result) => {
        setImagePreview(result);
      })
      .catch((err) => console.log(err));
    setFile(file);
  };

  useEffect(() => {
    if (isEdited) {
      navigate(`/profile/${value?._id}`);
      dispatch(setUserEdited());
    }
  }, [isEdited]);

  return (
    <section className='max-w-xl   mx-auto  py-8  lg:px-0 md:w-4/5 sm:w-9/12'>
      <Link
        to={`/profile/${user?._id}`}
        className='flex items-center  gap-3  text-dark-green my-5'
      >
        <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
        <span className='underline'>Back</span>
      </Link>
      <h3 className=' text-3xl font-semibold capitalize text-center my-4 text-zinc-800'>
        Edit Profile{" "}
      </h3>
      <div className='mb-10 w-28 aspect-square mx-auto flex items-center bg-dark-green mt-7 justify-center rounded-full'>
        <img
          src={imagePreview ? imagePreview : value?.profileImage?.url}
          alt=''
          className='object-cover h-full w-full rounded-full'
        />
      </div>
      <label htmlFor='file' className='text-zinc-800 mr-5  '>
        Profile Picture:{" "}
      </label>
      <input
        type='file'
        id='file'
        name='profileImage'
        onChange={handleImageUpload}
        className='sm:mt-3 w-4/6 md: mt-0 '
      />
      <div className='mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-10'>
        <input
          type='text'
          value={value?.firstName}
          name='firstName'
          onChange={(e) => handleChange(e.target)}
          placeholder='First Name'
          className='mb-5 text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={value?.lastName}
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          type='text'
          placeholder='Username'
          value={value?.displayName}
          name='displayName'
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          name='bio'
          value={value?.bio}
          type='text'
          placeholder='Bio'
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
        />
      </div>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className='capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-dark-green border-dark-green'
      >
        {isLoading ? "Editing..." : "Edit"}
      </button>
    </section>
  );
}

export default EditProfilePage;
