import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/globalContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import DownloadImages from "./DownloadImages";

function Download() {
  const { downloadImagesArr, dispatch } = useContext(GlobalContext);

  
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("downloadImagesArr"));
    if (savedImages) {
      dispatch({
        type: "DOWNLOAD_IMAGE_ARR",
        payload: savedImages,
      });
    }
  }, [dispatch]);

  return (
    <div className="py-3 align-elements h-screen">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry className="w-full">
          {downloadImagesArr.length > 0 ? (
            downloadImagesArr.map((item, index) => (
              <DownloadImages key={item} image={item} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No downloaded images</p>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Download;
