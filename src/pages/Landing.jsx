import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // const searchTerm = request.url.split("=")[1];

    let searchTerm = new URL(request.url).searchParams.get("search");
    searchTerm = searchTerm ? searchTerm : "";
    const isCachedData = await queryClient.ensureQueryData(
      searchCocktailsQuery(searchTerm)
    );
    // console.log(isCachedData);

    return { searchTerm };
  };
const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  // if (isLoading) return <h4>Loading...</h4>;
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
