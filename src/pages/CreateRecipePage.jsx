import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../features/files/filesSlice";
import {
  createRecipe,
  createStep,
  editRecipe,
  editStep,
  handleChange,
} from "../features/singleRecipe/singleRecipeSlice";
import StepToggle from "../modals/StepToggle";

import Loading from "../utils/Loading";
import Tags from "../utils/Tags";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function CreateRecipesPage() {
  const [open, setOpen] = useState({ status: false, title: "" });
  const [newStep, setNewStep] = useState(true);
  const [editId, setEditId] = useState("");
  const [stepToEdit, setStepToEdit] = useState("");
  const [editingStep, setEditingStep] = useState(false);
  const [stepInput, setStepInput] = useState("");

  const { id } = useParams();
  const formData = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const ingredientRef = useRef(null);
  const equipmentRef = useRef(null);
  const recipeToEdit = JSON.parse(
    localStorage.getItem("Mama-recipe-edit-recipe")
  );
  const localStorageInfo = JSON.parse(
    localStorage.getItem("Mama-recipe-created")
  );
  const {
    isLoading,
    instructions,
    image: recipeImage,
    name,
    category,
    description,
    equipments,
    ingredients,
  } = useSelector((store) => store.singleRecipe);

  const { image, isLoading: imageLoading } = useSelector((s) => s.files);

  const handleEventChange = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
    if (value.includes(",")) {
      ingredientRef.current.value = "";
      equipmentRef.current.value = "";
    }
  };
  const handleImageUpload = (e) => {
    const input = e.target;
    const file = input.files[0];
    formData.append("image", file);
    dispatch(uploadImage(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeToEdit?.isEditing) {
      dispatch(
        editRecipe({
          editId: id,
          name,
          description,
          category,
          equipments,
          ingredients,
          instructions,
          image,
        })
      );
      localStorage.removeItem("Mama-recipe-edit-recipe");
    } else {
      dispatch(
        createRecipe({
          name,
          description,
          category,
          equipments,
          ingredients,
          instructions,
          image,
        })
      );
      setNewStep(true);
    }
  };

  useEffect(() => {
    if (editId && editingStep) {
      const { step } = instructions.find((item) => item.id === editId);
      ref.current.value = step;
    }
  }, [editId]);

  useEffect(() => {
    if (localStorageInfo) {
      if (id) {
        navigate(`/recipes/${id}`);
      } else {
        navigate(`/recipes`);
      }
      localStorage.removeItem("Mama-recipe-created");
    }
  }, [localStorageInfo]);
  useEffect(() => {
    if (window.location.pathname.includes("add")) {
      localStorage.removeItem("Mama-recipe-edit-recipe");
    }
  }, []);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <section className='max-w-xl   mx-auto  py-8  l{ useState }g:px-0 md:w-4/5 sm:w-9/12'>
      <Link
        to={recipeToEdit?.isEditing ? `/recipes/${id}` : "/recipes"}
        className='flex items-center  gap-3  text-orange my-5'
      >
        <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
        <span className='underline'>Back</span>
      </Link>
      <h3 className='text-3xl font-semibold capitalize text-center my-4 text-grey'>
        Create a New Recipe
      </h3>
      <div className='mb-10 w-28  aspect-square mx-auto flex items-center bg-orange mt-7 justify-center rounded-full'>
        {imageLoading ? (
          <Loading small={true} />
        ) : (
          <img
            src={`${image ? image : recipeToEdit?.image}`}
            alt=''
            className='object-cover h-full w-full rounded-full'
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='block'>
          <label htmlFor='file' className='text-grey mr-5  '>
            Recipe's Picture:{" "}
          </label>
          <input
            onChange={handleImageUpload}
            type='file'
            id='file'
            accept='.jpeg,.jpg,.png'
            name='image'
            readOnly={isLoading ? true : false}
            className=' sm:mt-3 w-4/6 md: mt-0 '
          />
        </div>

        <div className='mt-7 grid grid-cols-1 gap-8 relative'>
          <input
            type='text'
            onChange={(e) => handleEventChange(e.target)}
            name='name'
            value={name}
            placeholder="Recipe's Name*"
            className='text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
          />
          <input
            type='text'
            readOnly={isLoading ? true : false}
            onChange={(e) => handleEventChange(e.target)}
            value={description}
            name='description'
            placeholder='Short Description'
            className=' text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
          />
          <div>
            <Tags items={ingredients} type='ingredients' />
            <input
              type='text'
              name='ingredients'
              readOnly={isLoading ? true : false}
              ref={ingredientRef}
              onChange={(e) => handleEventChange(e.target)}
              placeholder='Ingredients*'
              className='text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
            />
            <h3 className='mt-2 text-xs opacity-90 text-grey '>
              Add a comma at the end of each item e.g meat,
            </h3>
          </div>
          <div>
            <Tags items={equipments} type='equipments' />
            <input
              type='text'
              readOnly={isLoading ? true : false}
              onChange={(e) => handleEventChange(e.target)}
              name='equipments'
              ref={equipmentRef}
              placeholder='Equipments*'
              className='text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
            />
            <h3 className='mt-2 text-xs opacity-90 text-grey '>
              Add a comma at the end of each item e.g meat,
            </h3>
          </div>
          <div className='relative flex'>
            <h3 className='text-center  text-grey text-xl font-extrabold '>
              Instructions
            </h3>
          </div>
          <div className=' relative pb-3'>
            {instructions?.map((instruction, index) => {
              const { id, step } = instruction;
              return (
                <div
                  key={id}
                  className='relative mb-1 text-grey   block bg-transparent  w-full  pb-3 px-3  flex gap-2 items-start'
                >
                  <AiOutlineCheck className='text-3xl text-green-600' />
                  <h3 className='text-orange font-bold'>Step{index + 1}:</h3>
                  <p className='break-all w-11/12 bg-transparent pr-8 resize-none'>
                    {step}
                  </p>
                  <div className='relative'>
                    <FiMoreHorizontal
                      className={`${
                        open.title === instruction.id
                          ? "text-orange text-xl"
                          : "text-grey text-xl"
                      }`}
                      onClick={() => {
                        setOpen({
                          status: !open.status,
                          title: instruction.id,
                        });
                      }}
                    />
                    {open.title === instruction.id && open.status === true && (
                      <StepToggle
                        id={instruction.id}
                        setEditId={setEditId}
                        setNewStep={setNewStep}
                        setEditingStep={setEditingStep}
                        setOpen={setOpen}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            {newStep && (
              <input
                name='steps'
                ref={ref}
                readOnly={isLoading ? true : false}
                defaultValue={`${editingStep ? stepToEdit : ""}`}
                onKeyUp={(e) => setStepInput(e.target.value)}
                placeholder='Type here...'
                className='mb-6 text-grey  block bg-transparent border-orange border-b-2  w-full rounded  pb-3 px-3  flex gap-2 items-center'
              ></input>
            )}
            {newStep ? (
              <button
                className='cursor-pointer text-center underline mx-auto flex'
                type='button'
                onClick={() => {
                  const newId = new Date(Date.now()).getTime();
                  setNewStep(false);
                  if (stepInput.length >= 1) {
                    if (editingStep) {
                      dispatch(editStep({ id: editId, step: stepInput }));
                      setEditId("");
                      setEditingStep(false);
                      ref.current.value = "";
                    } else {
                      dispatch(createStep({ id: newId, step: stepInput }));
                      ref.current.value = "";
                    }
                  }
                }}
              >
                {editingStep ? "Edit" : "Add"}
              </button>
            ) : (
              <h5
                onClick={() => {
                  setNewStep(true);
                  setStepInput("");
                }}
                className='flex items-center  gap-1 text-grey  cursor-pointer text-sm absolute right-0'
              >
                <AiFillPlusCircle className='text-xl opacity-70' />
                Add a step
              </h5>
            )}
          </div>
        </div>
        <button
          type='submit'
          disabled={isLoading ? true : false}
          className={
            "cursor-pointer capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-grey border-orange"
          }
        >
          {recipeToEdit?.isEditing ? "Save Recipe" : "Create Recipe"}
        </button>
      </form>
    </section>
  );
}
export default CreateRecipesPage;
