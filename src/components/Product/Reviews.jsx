import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import {
  useCreateReviewsMutation,
  useDeleteReviewsMutation,
  useSingleProductAllReviewsQuery,
} from "../../features/reviewSlice";
import Loading from "../utils/Loading";

const Reviews = ({ productId }) => {
  const [
    createReviews,
    { isLoading: createIsLoading, isError: createIsError, error: createError },
  ] = useCreateReviewsMutation();
  const {
    isLoading: getIsLoading,
    data: getData,
    isSuccess: getIsSuccess,
    error: getError,
    isError: getIsError,
  } = useSingleProductAllReviewsQuery(productId);
  const [deleteReviews, { isLoading, isError, error }] =
    useDeleteReviewsMutation();

  const [ratings, setRatings] = useState();
  const [comment, setComment] = useState("");
  const { allReviews } = getData || {};

  const token =
    Cookies.get("token") !== undefined
      ? "Bearer " + JSON.parse(Cookies.get("token")).token
      : null;

  const isExist = token ? jwt_decode(token) : null;

  const handleClick = async (e) => {
    e.preventDefault();
    if (!isExist) {
      toast.error("Please login first for access this service!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      await createReviews({ ratings, comment, productId });
      setComment("");
      setRatings("");
    }
  };
  const handleDelete = ({ _id }) => {
    deleteReviews({ productId, _id });
  };

  let content;
  if (getIsLoading || createIsLoading || isLoading) {
    content = <Loading />;
  } else if (getIsError || createIsError || isError) {
    // content = (
    //   <p>
    //     {getIsError
    //       ? getError?.data?.message
    //       : createError
    //       ? createError?.data?.message
    //       : error?.data?.message}
    //   </p>
    // );
  }

  return (
    <>
      {content && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>{content}</h3>
        </div>
      )}
      <div style={{ width: "80%", margin: "0 auto" }}>
        {allReviews?.reviews?.length > 0 ? (
          <div
            style={{ border: "1px solid rgb(218, 213, 213)", padding: "20px" }}
          >
            {getIsSuccess &&
              allReviews?.reviews?.map((item) => {
                const { _id } = item;
                return (
                  <div
                    style={{
                      border: "1px solid rgb(218, 213, 213)",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                    key={_id}
                  >
                    <span style={{ fontWeight: "bold" }}>{item.name}</span>
                    <span style={{ fontWeight: "400" }}>{item.comment}</span>
                    <Rate
                      value={item.ratings}
                      style={{ fontSize: "14px", color: "rgb(236, 101, 11)" }}
                    />
                    {item.user === isExist?.id ? (
                      <span
                        onClick={() => handleDelete({ _id })}
                        style={{ margin: "7px 0" }}
                      >
                        <Button type="primary" danger>
                          Delete
                        </Button>
                      </span>
                    ) : (
                      ""
                    )}

                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "gray",
                        position: "relative",
                        left: "50px",
                        top: "5px",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <AiOutlineClockCircle size={15} />
                      </span>
                      <span>{moment().startOf("hour").fromNow()}</span>
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            fontWeight: "700",
            margin: "30px 0",
          }}
        >
          <span>Your Rating*</span>
          <Rate
            allowClear={false}
            onChange={(value) => setRatings(value)}
            style={{ fontSize: "14px", color: "rgb(236, 101, 11)" }}
          />
        </div>
        <div>
          <TextArea
            rows={4}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment *"
          />
        </div>
        <div>
          <Button
            onClick={handleClick}
            style={{
              background: "rgb(236, 101, 11)",
              color: "white",
              width: "30%",
              margin: "1.5% 0",
            }}
          >
            Submit
          </Button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Reviews;
