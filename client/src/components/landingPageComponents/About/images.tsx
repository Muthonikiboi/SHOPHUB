
import React from "react";

const ImageGallery = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <img
        src="https://img.freepik.com/free-vector/beach-seascape-scenery_603843-2331.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
        alt=""
        className="row-span-2 col-span-2 w-full h-full object-cover"
      />
      <img
        src="https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
        alt=""
        className="w-full h-full object-cover col-span-1"
      />
      <img
        src="https://img.freepik.com/free-photo/landscape-hills-covered-greenery-with-rocky-mountains-cloudy-sky_181624-9192.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
        alt=""
        className="w-full h-full object-cover col-span-1"
      />
      <img
        src="https://img.freepik.com/free-vector/summer-natural-landscape-with-meadow-mountains_107791-24623.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
        alt=""
        className="w-full h-full object-cover col-span-3"
      />
    </div>
  );
};

export default ImageGallery;
              