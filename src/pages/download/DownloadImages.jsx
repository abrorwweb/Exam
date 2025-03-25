import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { MdDelete } from "react-icons/md";

function DownloadImages({ image }) {
  const { downloadImagesArr, dispatch } = useContext(GlobalContext);
  return (
    <div className="m-2 relative top-0 left-0 group">
      <img className="block w-full" src={image} />

      <div className="invisibile opacity-0 group-hover:visibile group-hover:opacity-100 transition-all duration-300">
        <div className="topBtn absolute top-3 right-3 flex gap-4">
          <div
            className="bg-gray-200 border-2 cursor-pointer p-2 rounded-md"
            onClick={() => {
              if (downloadImagesArr.includes(image)) {
                const index = downloadImagesArr.indexOf(image);

                if (index !== -1) {
                  downloadImagesArr.splice(index, 1);
                  dispatch({
                    type: "DOWNLOAD_IMAGE_ARR",
                    payload: [...downloadImagesArr],
                  });
                }
              }
            }}
          >
            <MdDelete className="text-red-700 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadImages;
