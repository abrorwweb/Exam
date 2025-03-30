import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "../../context/globalContext";
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";

function ImagesLikes({ image }) {
  const { likeImageArr, dispatch } = useContext(GlobalContext);
  const { addDocument, deleteDocument } = useFirestore();

  const alreadyAdded = likeImageArr.find((img) => img.id === image.id);

  return (
    <div
      className={`group relative left-0 top-0 m-2 overflow-hidden rounded-lg transition-all duration-300 ${
        alreadyAdded ? "border-4 border-red-500 shadow-lg scale-105" : ""
      }`}
    >
      <img
        className={`block w-full rounded-md transition-all duration-300 ${
          alreadyAdded ? "opacity-90 hover:opacity-100" : ""
        }`}
        src={image.urls.regular}
      />

      <div className="invisible group-hover:visible opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="topBtn absolute right-3 top-3 flex gap-4">
          <div
            className="cursor-pointer rounded-md border-2 bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => {
              deleteDocument("likeImageArr", alreadyAdded._id);
              toast.success("You deleted this image 🗑");
            }}
          >
            <MdDelete className="text-2xl text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesLikes;
