import { Link, useLoaderData, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const searchSingleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      console.log(data);
      return data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    // const { data } = ;
    await queryClient.ensureQueryData(searchSingleCocktailQuery(id));
    return { id };
  };
const Cocktail = () => {
  const { id } = useLoaderData();
  const { data: drinks } = useQuery(searchSingleCocktailQuery(id));

  if (!drinks) {
    return <Navigate to="/" />;
  }
  const singleDrink = drinks[0];
  //   const strIngredient = "strIngredient";
  //   let ingredients = [];

  //   for (let i = 0; i < 16; i++) {
  //     console.log(singleDrink[strIngredient + (i + 1)]);
  //     if (singleDrink[strIngredient + (i + 1)]) {
  //       ingredients[i] = singleDrink[strIngredient + (i + 1)];
  //     } else {
  //       ingredients = ingredients
  //         .map((item) => {
  //           return item;
  //         })
  //         .join(", ");
  //       break;
  //     }
  //   }
  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((item) => singleDrink[item])
    .join(", ");
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;
  //   const
  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
