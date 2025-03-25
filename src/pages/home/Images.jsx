import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { GlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { toast } from "react-toastify";

function Images({ imgData, likedImage }) {
  const {
    likeImageArr,
    downloadImagesArr,
    dispatch,
    setMore,
    user: authUser,
  } = useContext(GlobalContext);

  const { addDocument, deleteDocument } = useFirestore();
  const { urls, alt_description, user, links } = imgData;

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const addLikeImage = () => {
    if (!authUser.emailVerified) {
      return toast.info("Please, verify your email, Go to profile page");
    }
    const alreadyAdded = likeImageArr.find((img) => img.id == imgData.id);
    if (!alreadyAdded) {
      addDocument("likeImageArr", { ...imgData, uid: authUser.uid });
    } else {
      deleteDocument("likeImageArr", alreadyAdded._id);
    }
  };

  return (
    <div
      className={`group relative m-2 cursor-pointer transition-transform duration-300 ${
        isClicked ? "scale-105" : "scale-100"
      }`}
      onClick={handleClick}
    >
      <img
        className="block w-full rounded-lg shadow-lg"
        src={urls.regular}
        alt={alt_description}
      />

      {isClicked && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-sm">{alt_description}</p>
        </div>
      )}

      <div className="invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <div className="absolute right-3 top-3 flex gap-3">
          <div
            onClick={addLikeImage}
            className={`cursor-pointer rounded-lg p-2 text-white shadow-md transition-all ${
              likedImage
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <FaHeart className={`${likedImage ? "text-white" : "text-black"}`} />
          </div>

          <div className="cursor-pointer rounded-lg bg-gray-300 p-2 shadow-md transition-all hover:bg-gray-400">
            <FaPlus className="text-black" />
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
          <div
            onClick={() => {
              if (!downloadImagesArr.includes(urls.regular)) {
                dispatch({
                  type: "DOWNLOAD_IMAGE_ARR",
                  payload: [...downloadImagesArr, urls.regular],
                });
              } else {
                const index = downloadImagesArr.indexOf(urls.regular);
                if (index !== -1) {
                  downloadImagesArr.splice(index, 1);
                  dispatch({
                    type: "DOWNLOAD_IMAGE_ARR",
                    payload: [...downloadImagesArr],
                  });
                }
              }
            }}
            className="cursor-pointer rounded-lg bg-gray-300 p-2 shadow-md transition-all hover:bg-gray-400"
          >
            <a
              href={links.download + "&force=true"}
              rel="nofollow"
              download
              target="_blank"
            >
              <MdOutlineFileDownload className="text-2xl text-black" />
            </a>
          </div>
        </div>

        <Link
          onClick={() => {
            setMore({
              alt: alt_description,
              imageUrl: urls.regular,
              name: user.name,
            });
          }}
          to="/image-info"
          className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/50 p-2 shadow-md transition-all hover:bg-black/60"
        >
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={user.profile_image.small}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="max-w-[170px] text-white">
            <h4 className="truncate text-sm font-medium md:text-lg">
              {user.name}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Images;
