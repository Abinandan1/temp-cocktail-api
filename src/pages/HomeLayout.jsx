import { Link, Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      <Navbar />
      <section className="page">
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <Outlet context={{ isLoading }} />
        )}
      </section>
    </div>
  );
};
export default HomeLayout;
