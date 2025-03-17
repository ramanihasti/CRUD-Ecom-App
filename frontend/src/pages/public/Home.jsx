import React, { useEffect, useState } from "react";
import Carousel from "../../components/public/page/Carousel";
import { getAllHomePages } from "../../services/apiServices";
import MessageBox from "../../components/common/MessageBox";
import { Spinner } from "flowbite-react";
import { HiExclamationCircle } from "react-icons/hi2";
import SubCategoryCard from "../../components/public/page/SubCategoryCard";

function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [error, setError] = useState("");

  async function fetchPage() {
    try {
      const result = await getAllHomePages();

      if (!result.success) {
        setError(result.msg);
        return;
      }
      setPage(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, []);

  if (loading) {
    return (
      <div>
        <MessageBox
          renderIcon={() => {
            return <Spinner />;
          }}
          message="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MessageBox icon={HiExclamationCircle} message={error} status="error" />
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* carousel */}
        <div className="mb-16">
          <Carousel images={page.images} />
        </div>

        {/* sub categories */}
        <div>
          <h2 className="text-4xl text-center mb-8">Shop by Categories</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 pt-0">
            {page.subCategories.map((subCategory) => {
              return <SubCategoryCard subCategory={subCategory} isHomePage />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
