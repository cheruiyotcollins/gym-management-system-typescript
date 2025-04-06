import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct, toggleBookmark } from "../../store/products/actions";
import { RootState } from "../../store/reducers";
import Loader from "../../common/components/Loader";
import { IProduct } from "../../interfaces/Product";
import { addToCart } from "../../store/cart/actions";
import { useNavigate } from "react-router-dom";

const Details: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ State for dialog

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product: IProduct = useSelector(
    (state: RootState) => state.products.singleProduct
  );

  useEffect(() => {
    setLoading(true);
    dispatch(
      getSingleProduct(Number(params.id), () => {
        setLoading(false);
      })
    );
  }, [dispatch, params.id]);

  const handleAddToCart = () => {
    console.log("Product data before adding to cart:", product);
    if (!product || !product.id) {
      console.error("Error: Product is undefined or missing an ID.");
      return;
    }
    dispatch(addToCart(product));
    setIsDialogOpen(true); // Show the dialog box
  };
  const handleContinueShopping = () => {
    setIsDialogOpen(false); // Close modal
    navigate("/products");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="text-gray-700 overflow-hidden">
          <div className="container px-5 py-10 mx-auto bg-white">
            <div className="border-b border-gray-200 mb-10 text-xxl">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-5">
                {product?.title}
              </h1>
            </div>
            <div className="lg:w-full mx-auto flex flex-wrap">
              <div className="border border-gray-200 rounded p-[20px] shadow">
                <img
                  className="lg:w-[500px] h-[500px] w-full object-fill object-center"
                  src={product?.image}
                  alt={product?.title}
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product?.category.toUpperCase()}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product?.title}
                </h1>
                <p className="leading-relaxed">{product?.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product?.price}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="flex ml-auto text-white bg-indigo-600 border border-transparent py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ✅ Dialog Modal */}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Item Added to Cart
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your item has been added to the cart. Would you like to
                      continue shopping or go to the cart?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={handleContinueShopping} // ✅ Navigate to products
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={handleGoToCart} // ✅ Navigate to cart
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Go to Cart
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Details;
