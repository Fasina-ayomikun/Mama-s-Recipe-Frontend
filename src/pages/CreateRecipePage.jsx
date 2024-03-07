import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearState,
  createRecipe,
  editRecipe,
  handleChange,
} from "../features/singleRecipe/singleRecipeSlice";
import Loading from "../utils/Loading";
import Tags from "../utils/Tags";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { convertFileToBAse64 } from "../utils/utils";
import { toast } from "react-toastify";
import SingleInstruction from "../components/SingleInstruction";
import StepInputSection from "../components/StepInputSection";

function CreateRecipesPage() {
  const recipeToEdit = JSON.parse(
    localStorage.getItem("Mama-recipe-edit-recipe")
  );

  const [creatingNewStep, setCreatingNewStep] = useState(true);
  const [stepToEditIndex, setStepToEditIndex] = useState("");
  const [editingStep, setEditingStep] = useState(false);
  const [files, setFiles] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const { id } = useParams();
  const formData = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const ingredientRef = useRef(null);
  const equipmentRef = useRef(null);
  const localStorageInfo = JSON.parse(
    localStorage.getItem("Mama-recipe-created")
  );
  const {
    isLoading,
    instructions,
    name,
    description,
    equipments,
    ingredients,
    images,
  } = useSelector((store) => store.singleRecipe);

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
    setImagesList([]);
    const input = e.target;
    const files = input.files;
    if (files.length > 4) {
      toast.error("Images should not be more than 5");
      return;
    }
    if (files.length < 2) {
      toast.error("Images should  be more than 1");
      return;
    }
    setFiles(files);
    for (let i = 0; i < files.length; i++) {
      convertFileToBAse64(files[i])
        .then((result) => {
          setImagesList((old) => {
            return [...old, { url: result }];
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`images`, files[i]);
      }
    }

    formData.append("name", name);
    formData.append("description", description);
    equipments.forEach((item) => {
      formData.append("equipments", item);
    });
    ingredients.forEach((item) => {
      formData.append("ingredients", item);
    });
    formData.append(`instructions`, JSON.stringify(instructions));
    if (recipeToEdit?.isEditing) {
      dispatch(
        editRecipe({
          editId: id,
          formData,
        })
      );
      localStorage.removeItem("Mama-recipe-edit-recipe");
    } else {
      dispatch(createRecipe(formData));
      setCreatingNewStep(true);
    }
  };

  useEffect(() => {
    if (stepToEditIndex && editingStep) {
      const { details } = instructions.find(
        (item) => item.step === stepToEditIndex
      );
      ref.current.value = details;
    }
  }, [stepToEditIndex]);

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
      dispatch(clearState());
      setImagesList(images);
    } else {
      setImagesList(recipeToEdit.images);
    }
  }, []);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <section className='max-w-xl   mx-auto  py-8  l{ useState }g:px-0 md:w-4/5 sm:w-9/12'>
      <Link
        to={recipeToEdit?.isEditing ? `/recipes/${id}` : "/recipes"}
        className='flex items-center  gap-3  text-dark-green my-5'
      >
        <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
        <span className='underline'>Back</span>
      </Link>
      <h3 className='text-3xl font-semibold capitalize text-center my-4 text-zinc-800'>
        Create a New Recipe
      </h3>
      <div className='flex items-center gap-3 flex-wrap  justify-center my-10'>
        {imagesList.map((image) => (
          <div className=' w-28  aspect-square  flex items-center justify-center rounded'>
            <img
              src={`${image.url}`}
              alt=''
              className='object-cover h-full w-full'
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='block'>
          <label htmlFor='file' className='text-zinc-800 mr-5  '>
            Recipe's Picture:{" "}
          </label>
          <input
            onChange={handleImageUpload}
            type='file'
            id='file'
            maxLength={5}
            multiple={true}
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
            className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
          />
          <input
            type='text'
            readOnly={isLoading ? true : false}
            onChange={(e) => handleEventChange(e.target)}
            value={description}
            name='description'
            placeholder='Short Description'
            className=' text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
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
              className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
            />
            <h3 className='mt-2 text-xs opacity-90 text-zinc-800 '>
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
              className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
            />
            <h3 className='mt-2 text-xs opacity-90 text-zinc-800 '>
              Add a comma at the end of each item e.g meat,
            </h3>
          </div>
          <div className='relative flex'>
            <h3 className='text-center  text-zinc-800 text-xl font-extrabold '>
              Instructions
            </h3>
          </div>
          <div className=' relative pb-3'>
            {instructions?.map((instruction, index) => {
              return (
                <SingleInstruction
                  key={index}
                  instruction={instruction}
                  setStepToEditIndex={setStepToEditIndex}
                  setCreatingNewStep={setCreatingNewStep}
                  setEditingStep={setEditingStep}
                />
              );
            })}
            {creatingNewStep ? (
              <StepInputSection
                setCreatingNewStep={setCreatingNewStep}
                stepToEditIndex={stepToEditIndex}
                setStepToEditIndex={setStepToEditIndex}
                setEditingStep={setEditingStep}
                editingStep={editingStep}
              />
            ) : (
              <h5
                onClick={() => {
                  setCreatingNewStep(true);
                }}
                className='flex items-center  gap-1 text-zinc-800  cursor-pointer text-sm absolute right-0'
              >
                <AiFillPlusCircle className='text-xl opacity-70' />
                Add a step
              </h5>
            )}
          </div>
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className={
            "cursor-pointer capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-zinc-800 border-dark-green"
          }
        >
          {recipeToEdit?.isEditing ? "Save Recipe" : "Create Recipe"}
        </button>
      </form>
    </section>
  );
}
export default CreateRecipesPage;
