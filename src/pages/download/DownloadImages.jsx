import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { MdDelete } from "react-icons/md";

function DownloadImages({ image }) {
  const { downloadImagesArr, dispatch } = useContext(GlobalContext);

  const isDownloaded = downloadImagesArr.includes(image);

  return (
    <div
      className={`relative top-0 left-0 m-2 overflow-hidden rounded-lg transition-all duration-300 ${
        isDownloaded ? "border-4 border-blue-500 shadow-lg scale-105" : ""
      }`}
    >
      <img
        className={`block w-full rounded-md transition-all duration-300 ${
          isDownloaded ? "opacity-90 hover:opacity-100" : ""
        }`}
        src={image}
      />

      <div className="invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <div className="topBtn absolute top-3 right-3 flex gap-4">
          <div
            className="bg-gray-200 border-2 cursor-pointer p-2 rounded-md hover:bg-gray-300"
            onClick={() => {
              if (isDownloaded) {
                const updatedArr = downloadImagesArr.filter((img) => img !== image);
                dispatch({
                  type: "DOWNLOAD_IMAGE_ARR",
                  payload: updatedArr,
                });
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
