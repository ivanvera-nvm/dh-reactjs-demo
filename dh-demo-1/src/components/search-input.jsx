import { Form, useNavigation } from "react-router-dom";
import { Loader } from "./ui";

export const SearchInput = () => {
  const navigation = useNavigation();

  return (
    <Form
      action="/items"
      // role="search"
      id="search-form"
      aria-label="Buscar productos"
    >
      <input name="search" type="search" placeholder="laptops,smartphones..." />
      <button type="submit" value="Search">
        {navigation.state === "loading" ? <Loader /> : "Buscar"}
      </button>
    </Form>
  );
};
