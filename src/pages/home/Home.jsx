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
    <div className="align-elements min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-6 py-6 md:px-12 lg:px-16 dark:from-gray-900 dark:to-gray-700">
      <div className="my-6">
        <form action="" className="mx-auto flex w-full max-w-96 gap-3">
          <label className="input input-sm input-bordered flex w-full items-center gap-2 rounded-xl border border-gray-400 bg-white px-4 py-2 shadow-md transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 dark:bg-gray-800 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-600">
            <input
              ref={searchValue}
              type="search"
              className="grow bg-transparent focus:outline-none dark:text-white"
              placeholder="Search..."
              name="search"
            />
            <FaSearch className="h-5 w-5 text-gray-500 opacity-70 dark:text-gray-300" />
          </label>
          <button
            onClick={searchFunck}
            className="btn btn-primary btn-sm rounded-xl px-5 py-2 font-semibold text-white shadow-lg transition hover:bg-blue-600 md:hidden dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Search
          </button>
        </form>
      </div>

      {/* Masonry Grid */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images &&
            images.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-xl dark:bg-gray-800"
              >
                <Images
                  imgData={item}
                  likedImage={likeImageArr.some(
                    (img) => img.urls.regular == item.urls.regular,
                  )}
                />
              </div>
            ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Load More Button */}
      <div className="m-8 flex items-center justify-center">
        <button
          onClick={() => {
            dispatch({ type: "PER_PAGE", payload: per_page + 10 });
          }}
          className="rounded-xl bg-gray-700 px-12 py-4 text-lg font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-black dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default Home;
