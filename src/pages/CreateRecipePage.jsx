import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { convertFileToBAse64 } from "../utils/utils";
import { toast } from "react-toastify";

function CreateRecipesPage() {
  const [openStepModal, setOpenStepModal] = useState({
    status: false,
    stepIndex: "",
  });
  const [creatingNewStep, setCreatingNewStep] = useState(true);
  const [stepToEditIndex, setStepToEditIndex] = useState("");
  const [editingStep, setEditingStep] = useState(false);
  const [stepText, setStepText] = useState("");
  const [files, setFiles] = useState(null);
  const [imagesList, setImagesList] = useState([]);
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
            return [...old, result];
          });
        })
        .catch((err) => console.log(err));
    }
    console.log(input.files);
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
    setImagesList(images);
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
        className='flex items-center  gap-3  text-dark-green my-5'
      >
        <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
        <span className='underline'>Back</span>
      </Link>
      <h3 className='text-3xl font-semibold capitalize text-center my-4 text-zinc-800'>
        Create a New Recipe
      </h3>
      {imagesList.map((image) => (
        <div className='mb-10 w-28  aspect-square mx-auto flex items-center bg-dark-green mt-7 justify-center rounded-full'>
          <img
            src={`${image ? image : recipeToEdit?.image}`}
            alt=''
            className='object-cover h-full w-full rounded-full'
          />
        </div>
      ))}
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
              const { step, details } = instruction;

              return (
                <div
                  key={step}
                  className='relative mb-1 text-zinc-800    bg-transparent  w-full  pb-3 px-3  flex gap-2 items-start'
                >
                  <AiOutlineCheck className='text-3xl text-green-600' />
                  <h3 className='text-dark-green font-bold'>
                    Step{index + 1}:
                  </h3>
                  <p className='break-all w-11/12 bg-transparent pr-8 resize-none'>
                    {details}
                  </p>
                  <div className='relative'>
                    <FiMoreHorizontal
                      className={`${
                        openStepModal.stepIndex === instruction.step &&
                        openStepModal.status
                          ? "text-dark-green text-xl"
                          : "text-zinc-800 text-xl"
                      }`}
                      onClick={() => {
                        setOpenStepModal({
                          status: !openStepModal.status,
                          stepIndex: instruction.step,
                        });
                      }}
                    />
                    {openStepModal.stepIndex === instruction.step &&
                      openStepModal.status && (
                        <StepToggle
                          step={instruction.step}
                          setStepToEditIndex={setStepToEditIndex}
                          setCreatingNewStep={setCreatingNewStep}
                          setEditingStep={setEditingStep}
                          setOpenStepModal={setOpenStepModal}
                        />
                      )}
                  </div>
                </div>
              );
            })}
            {creatingNewStep ? (
              <>
                <input
                  ref={ref}
                  readOnly={isLoading}
                  onKeyUp={(e) => setStepText(e.target.value)}
                  placeholder='Type here...'
                  className='mb-6 text-zinc-800   bg-transparent border-dark-green border-b-2  w-full rounded  pb-3 px-3  flex gap-2 items-center'
                ></input>

                <button
                  className='cursor-pointer text-center underline mx-auto flex'
                  type='button'
                  onClick={() => {
                    console.log(instructions);
                    setCreatingNewStep(false);
                    if (!(stepText.length >= 1)) return;
                    if (editingStep) {
                      dispatch(
                        editStep({ step: stepToEditIndex, details: stepText })
                      );
                      setStepToEditIndex("");
                      setEditingStep(false);
                    } else {
                      dispatch(
                        createStep({
                          step: instructions.length + 1,
                          details: stepText,
                        })
                      );
                    }
                    ref.current.value = "";
                  }}
                >
                  {editingStep ? "Edit" : "Add"}
                </button>
              </>
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
