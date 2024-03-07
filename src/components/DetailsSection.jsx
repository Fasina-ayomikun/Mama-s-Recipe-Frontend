import React from "react";
import ImgContainer from "../utils/ImgContainer";
import { MdEmail } from "react-icons/md";
import Loading from "../utils/Loading";
import ShowRecipe from "./ShowRecipe";
import SingleStep from "../utils/SingleStep";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailsSection = ({ openReviewsList }) => {
  const { ingredients, equipments, instructions, user } = useSelector(
    (store) => store.singleRecipe
  );
  const { recipes, isLoading: isRecipesLoading } = useSelector(
    (store) => store.recipes
  );

  const navigate = useNavigate();
  return (
    <div className={`${openReviewsList ? "hidden" : " block"}`}>
      <div className='flex-wrap flex items-start justify-evenly my-10 gap-5'>
        <div>
          <h3 className='text-xl font-extrabold tracking-wide mb-3'>
            Ingredients:
          </h3>
          <ol className='list-inside list-decimal'>
            {ingredients?.length < 1 ? (
              <li>No Ingredients</li>
            ) : (
              ingredients?.map((i, index) => {
                return <li key={index}>{i}</li>;
              })
            )}
          </ol>
        </div>{" "}
        <div>
          <h3 className='text-xl font-extrabold tracking-wide mb-3'>
            Equipments
          </h3>
          <ol className='list-inside list-decimal'>
            {equipments?.length < 1 ? (
              <li>No Equipments</li>
            ) : (
              equipments?.map((i, index) => {
                return <li key={index}>{i}</li>;
              })
            )}
          </ol>
        </div>{" "}
      </div>
      <h3 className='text-center text-2xl underline font-extrabold tracking-wide mb-3'>
        Instructions
      </h3>
      {instructions?.length < 1 ? (
        <p>No Instructions to display</p>
      ) : (
        instructions?.map((instruction, index) => {
          return <SingleStep key={index} instruction={instruction} />;
        })
      )}
      <h3 className='text-start mt-20 text-2xl  font-extrabold tracking-wide my-5'>
        Author
      </h3>
      <div className='flex flex-col lg:flex-row items-start gap-5'>
        <div
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
          className='w-20 border-4 border-dark-green border-opacity-60 rounded-full'
        >
          <ImgContainer user={user} small={true} />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <p className='text-gray-500 text-sm'>Added by</p>
          <h4 className='text-zinc-800 capitalize text-2xl font-bold break-all'>
            {user.firstName + " " + user.lastName}
          </h4>
          <p className='text-sm text-zinc-600 break-all'>{user?.bio}</p>
          <a
            href={`mailto:${user.email}?subject=Hello I really love your recipe`}
          >
            <MdEmail className='text-2xl text-dark-green' />
          </a>
        </div>
      </div>
      <h3 className='text-start mt-20 text-2xl  font-extrabold tracking-wide my-5'>
        Other Recipes
      </h3>
      {isRecipesLoading ? (
        <Loading small={true} />
      ) : (
        <div className=' grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3 items-center justify-between mt-16 w-full '>
          {recipes.length < 1 ? (
            <p className='text-zinc-800 h-48'>No recipes to display.</p>
          ) : (
            recipes.map((recipe) => {
              return <ShowRecipe key={recipe._id} recipe={recipe} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
