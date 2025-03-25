import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Images from "./Images";
import { FcSearch } from "react-icons/fc";
import { toast } from "react-toastify";
import Search from "../../components/Search";
import { useActionData } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// export const action = async ({ request }) => {
//   let formData = await request.formData();
//   let search = formData.get("search");
//   return search;
// };

function Home() {
  const { images, setPageNum, pageNum, per_page, likeImageArr, dispatch } =
    useContext(GlobalContext);
  // const val = useActionData();
  // console.log(val);

  const searchValue = useRef();

  function searchFunck(e) {
    e.preventDefault();
    if (searchValue.current.value) {
      dispatch({ type: "SEARCH_VALUE", payload: searchValue.current.value });
    } else if (!searchValue.current.value) {
      toast.error("maydonni to'ldiring!");
    }
  }

  return (
    <div className="align-elements py-3 px-4 md:px-8 lg:px-12">
  <div className="my-4">
    <form action="" className="mx-auto flex w-full max-w-96 gap-3">
      <label className="input input-sm input-bordered flex w-full items-center gap-2 rounded-lg border border-gray-400 bg-gray-100 px-3 py-2 shadow-md focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-300 transition-all">
        <input
          ref={searchValue}
          type="search"
          className="grow bg-transparent focus:outline-none"
          placeholder="Search..."
          name="search"
        />
        <FaSearch className="h-5 w-5 opacity-70 text-gray-500" />
      </label>
      <button
        onClick={searchFunck}
        className="btn btn-primary btn-sm md:hidden px-4 py-2 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  </div>

  {/* Masonry Grid */}
  <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
    <Masonry gutter="15px">
      {images &&
        images.map((item) => {
          return (
            <Images
              key={item.id}
              imgData={item}
              likedImage={likeImageArr.some(
                (img) => img.urls.regular == item.urls.regular
              )}
            />
          );
        })}
    </Masonry>
  </ResponsiveMasonry>

  {/* Load More Button */}
  <div className="m-5 flex items-center justify-center">
    <button
      onClick={() => {
        dispatch({ type: "PER_PAGE", payload: per_page + 10 });
      }}
      className="rounded-lg bg-gray-600 px-10 py-3 text-lg text-white font-semibold shadow-md transition-all hover:bg-black hover:scale-105"
    >
      Read more
    </button>
  </div>
</div>

  );
}

export default Home;
