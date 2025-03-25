import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import DownloadImages from "./DownloadImages";
import { Link } from "react-router-dom";

function Download() {
  const { downloadImagesArr } = useContext(GlobalContext);

  return (
    <div className="py-3 align-elements h-screen">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry className="w-full">
          {downloadImagesArr.length &&
            downloadImagesArr.map((item, index) => {
              return (
                <DownloadImages key={downloadImagesArr[index]} image={item} />
              );
            })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Download;
