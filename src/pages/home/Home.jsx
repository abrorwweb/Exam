import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Images from "./Images";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import Carousel from "../../components/Carusel";

function Home() {
  const { images, setPageNum, per_page, likeImageArr, dispatch } =
    useContext(GlobalContext);
  const searchValue = useRef();
  const [loading, setLoading] = useState(false);

  async function searchFunck(e) {
    e.preventDefault();
    const query = searchValue.current.value.trim();

    if (!query) {
      toast.error("Maydonni to'ldiring!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=${per_page}&client_id=YOUR_ACCESS_KEY`
      );

      const data = await res.json();

      if (data.results) {
        dispatch({ type: "SET_IMAGES", payload: data.results });
        dispatch({ type: "SEARCH_VALUE", payload: query });
      }
    } catch (error) {
      toast.error("Qidiruvda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="align-elements min-h-screen">
      <div className="my-6">
        <form className="mx-auto flex w-full max-w-96 gap-3">
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
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images?.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-xl dark:bg-gray-800"
            >
              <Images
                imgData={item}
                likedImage={likeImageArr.some(
                  (img) => img.urls.regular === item.urls.regular
                )}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Carousel />

      
      <div className="m-8 flex items-center justify-center">
        <button
          onClick={() => {
            dispatch({ type: "PER_PAGE", payload: per_page + 10});
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
