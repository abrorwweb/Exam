import React, { useContext, useState } from "react";
// qora likee
import { FaHeart } from "react-icons/fa";
// oq like
import { FaRegHeart } from "react-icons/fa";
// download icon
import { MdOutlineFileDownload } from "react-icons/md";
// plus
import { FaPlus } from "react-icons/fa6";
import { GlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";
// import firebase
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

  const addLikeImage = () => {
    if (!authUser.emailVerified) {
      return toast.info("Please, verify your email, Go to profile page");
    }
    const alreadyAdded = likeImageArr.find((img) => {
      return img.id == imgData.id;
    });

    if (!alreadyAdded) {
      addDocument("likeImageArr", { ...imgData, uid: authUser.uid });
    } else {
      deleteDocument("likeImageArr", alreadyAdded._id);
    }
  };

  // const alreadyAdded = likeImageArr.find((img) => {
  //   return img.id == imgData.id;
  // });

  return (
<div className="group relative m-2">
  {/* Image */}
  <img className="block w-full rounded-lg shadow-lg" src={urls.regular} alt={alt_description} />

  {/* Hoverda chiqadigan tugmalar */}
  <div className="invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
    {/* Top Buttons */}
    <div className="absolute right-3 top-3 flex gap-3">
      {/* Like Button */}
      <div
        onClick={addLikeImage}
        className={`cursor-pointer rounded-lg p-2 text-white shadow-md transition-all ${
          likedImage ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        <FaHeart className={`${likedImage ? "text-white" : "text-black"}`} />
      </div>

      {/* Plus Button */}
      <div className="cursor-pointer rounded-lg bg-gray-300 p-2 shadow-md transition-all hover:bg-gray-400">
        <FaPlus className="text-black" />
      </div>
    </div>

    {/* Download Button (Bottom Right) */}
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
        <a href={links.download + "&force=true"} rel="nofollow" download target="_blank">
          <MdOutlineFileDownload className="text-2xl text-black" />
        </a>
      </div>
    </div>

    {/* User Profile (Bottom Left) */}
    <Link
      onClick={() => {
        setMore({
          alt,
          imageUrl: urls.regular,
          name: user.name,
        });
      }}
      to="/image-info"
      className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/50 p-2 shadow-md transition-all hover:bg-black/60"
    >
      {/* Profile Image */}
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={user.profile_image.small} alt={user.name} className="h-full w-full object-cover" />
      </div>

      {/* User Info */}
      <div className="max-w-[170px] text-white">
        <h4 className="truncate text-sm font-medium md:text-lg">{user.name}</h4>
      </div>
    </Link>
  </div>
</div>

  );
}

export default Images;
