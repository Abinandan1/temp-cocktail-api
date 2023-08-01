import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchForm";

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form className="form">
        <input
          type="search"
          className="form-input"
          defaultValue={searchTerm}
          name="search"
        />
        <button disabled={isSubmitting} type="submit" className="btn">
          {isSubmitting ? "searching" : "search"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default SearchForm;
