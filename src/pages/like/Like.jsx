import React, { useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GlobalContext } from "../../context/globalContext";
import ImagesLikes from "./ImagesLikes";

function Like() {
  const { likeImageArr } = useContext(GlobalContext);

  return (
    <div className="align-elements h-screen py-3">
      {likeImageArr && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {likeImageArr.length &&
              likeImageArr.map((item, index) => {
                return <ImagesLikes key={likeImageArr[index]} image={item} />;
              })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}

export default Like;
//
//   urls={item.urls}
//   alt={item.alt_description}
