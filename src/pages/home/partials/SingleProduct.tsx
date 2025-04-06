import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBookmark } from "../../../store/products/actions";
import { RootState } from "../../../store/reducers";
import { IProduct } from "../../../interfaces/Product";

interface Props {
  product: IProduct;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  const bookmarkIds = useSelector(
    (state: RootState) => state.products.bookmarkedIds
  );
  const dispatch = useDispatch();

  const handleBookmarkChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleBookmark(product.id));
  };

  return (
    <div
      key={product.id}
      className="relative p-5 shadow hover:shadow-xl rounded-md"
    >
      {/* Bookmark Button */}
      <button
        className="absolute z-10 top-2 right-2 bg-white rounded-3xl"
        onClick={handleBookmarkChange}
      >
        {bookmarkIds.includes(product.id) ? (
          <HeartIconSolid className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
        ) : (
          <HeartIcon className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
        )}
      </button>

      {/* Product Image */}
      <div className="w-full min-h-60 bg-gray-200 rounded-md overflow-hidden lg:h-60">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-center object-fill lg:w-full lg:h-full"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col justify-between">
        <h3 className="text-sm text-gray-700 truncate" title={product.title}>
          <Link to={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>

        {/* Product Rating */}
        <div className="mt-1 flex gap-1 items-center text-sm text-gray-500">
          <span className="flex gap-1 items-center">
            {[0, 1, 2, 3, 4].map((index) => (
              <span key={index}>
                {Math.floor(product.ratingDto.rate) > index ? (
                  <StarIconSolid
                    className="h-5 w-5 text-yellow-300"
                    aria-hidden="true"
                  />
                ) : (
                  <StarIcon
                    className="h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                  />
                )}
              </span>
            ))}
          </span>
          <span>{product.ratingDto.count}</span>
        </div>

        {/* Product Price & Category */}
        <p className="text-sm mt-[5px] font-medium text-gray-900">
          ${product.price}
        </p>
        <p className="mt-1 text-sm text-green-600">
          {product.category.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
