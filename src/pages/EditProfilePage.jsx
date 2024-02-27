import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage } from "../features/files/filesSlice";
import { editUser, setUserEdited } from "../features/users/userSlice";
import Loading from "../utils/Loading";
import { getFromLocalStorage } from "../utils/localStorage";

function EditProfilePage() {
  const user = getFromLocalStorage();
  const [value, setValue] = useState(user);
  const dispatch = useDispatch();
  const { image, isLoading: imageLoading } = useSelector((s) => s.files);
  const { isEdited } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const formData = new FormData();

  const handleChange = (input) => {
    const name = input.name;
    const newValue = input.value;
    setValue((oldValues) => {
      oldValues[name] = newValue;
      return oldValues;
    });
  };

  const handleSubmit = () => {
    value._id = user._id;
    if (image) {
      value.profileImage = image;
    }
    dispatch(editUser(value));
  };

  const handleImageUpload = (e) => {
    const input = e.target;
    const file = input.files[0];
   formData.append("image", file);
    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    if (isEdited) {
      navigate(`/profile/${value._id}`);
      dispatch(setUserEdited());
    }
  }, [isEdited]);

  useEffect(() => {
    if (image) {
      value.profileImage = image;
    }
  }, [image]);

  return (
    <section className='max-w-xl   mx-auto  py-8  lg:px-0 md:w-4/5 sm:w-9/12'>
      <Link
        to={`/profile/${user?._id}`}
        className='flex items-center  gap-3  text-orange my-5'
      >
        <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
        <span className='underline'>Back</span>
      </Link>
      <h3 className=' text-3xl font-semibold capitalize text-center my-4 text-grey'>
        Edit Profile{" "}
      </h3>
      <div className='mb-10 w-28 aspect-square mx-auto flex items-center bg-orange mt-7 justify-center rounded-full'>
        {image ? (
          imageLoading ? (
            <Loading small={true} />
          ) : (
            <img
              src={image}
              alt=''
              className='object-cover h-full w-full rounded-full'
            />
          )
        ) : (
          <img
            src={user?.profileImage}
            alt=''
            className='object-cover h-full w-full rounded-full'
          />
        )}{" "}
      </div>
      <label htmlFor='file' className='text-grey mr-5  '>
        Profile Picture:{" "}
      </label>
      <input
        type='file'
        id='file'
        onChange={handleImageUpload}
        className='sm:mt-3 w-4/6 md: mt-0 '
      />
      <div className='mt-6 grid lg:grid-cols-2 sm:grid-cols-1 gap-10'>
        <input
          type='text'
          defaultValue={user?.firstName}
          name='firstName'
          onChange={(e) => handleChange(e.target)}
          placeholder='First Name'
          className='mb-5 text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          type='text'
          placeholder='Last Name'
          name='lastName'
          defaultValue={user?.lastName}
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          type='text'
          placeholder='Username'
          defaultValue={user?.displayName}
          name='displayName'
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
        />
        <input
          name='bio'
          defaultValue={user?.bio}
          type='text'
          placeholder='Bio'
          onChange={(e) => handleChange(e.target)}
          className='mb-5 text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
        />
      </div>
      <button
        onClick={handleSubmit}
        className='capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-grey border-orange'
      >
        Save
      </button>
    </section>
  );
}

export default EditProfilePage;
