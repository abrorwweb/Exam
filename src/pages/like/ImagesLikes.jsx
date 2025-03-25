import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "../../context/globalContext";
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";

function ImagesLikes({ image }) {
  const { likeImageArr, dispatch } = useContext(GlobalContext);
  const { addDocument, deleteDocument } = useFirestore();

  const alreadyAdded = likeImageArr.find((img) => {
    return img.id == image.id;
  });

  return (
    <div className="group relative left-0 top-0 m-2">
      <img className="block w-full" src={image.urls.regular} />

      <div className="invisibile group-hover:visibile opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="topBtn absolute right-3 top-3 flex gap-4">
          <div
            className="cursor-pointer rounded-md border-2 bg-gray-200 p-2"
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
