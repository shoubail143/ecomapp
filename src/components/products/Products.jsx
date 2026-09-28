import React from "react";
const productsData = [
  {
    id: 1,
    img: Img1,
    title: "Women Ethnic",
    rating: 5.0,
    author: GiWhiteBook,
    aosDelay: 0,
  },
  {
    id: 2,
    img: Img2,
    title: "Westren",
    rating: 4.0,
    author: Red,
    aosDelay: 200,
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    rating: 4.4,
    author: Brown,
    aosDelay: 200,
  },
];

const Products = () => {
  return (
    <div className="mt-12 mb-14">
      <div className="container">
        {/* Headers*/}
        <div className="text-center max-w-[600px] text-2xl mx-auto mb-10">
          <p className="text-bold text-orange-700 ">TOP PRODUCTS</p>
          <h1 className="font-bold text-3xl">Trending Products</h1>
          <p className="text-gray-500 font-bold text-3xl">
            All your needs just a click aways!!
          </p>
        </div>
        {/*Products card */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
