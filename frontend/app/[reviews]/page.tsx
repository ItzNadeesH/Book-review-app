"use client";

import Rating from "@/components/Rating";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditReviewForm from "@/components/EditReviewForm";

const Reviews = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const author = searchParams.get("author");

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/reviews/title`,
          { title }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    if (title) {
      fetchReviews();
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData = {
      bookTitle: title,
      author,
      rating,
      comment,
    };

    try {
      console.log(reviewData);
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        reviewData
      );

      const newReview = response.data;
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      setComment("");
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (updatedReview: {
    _id: string;
    rating: number;
    comment: string;
  }) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === updatedReview._id
          ? { ...review, ...updatedReview }
          : review
      )
    );
  };

  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0
  );

  return (
    <div className="mt-4 max-w-screen-xl mx-auto p-5">
      <h2 className="font-bold text-xl">{title}</h2>
      <div className="flex items-center">
        <p className="mr-4 font-semibold">{author}</p>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ms-2 text-sm font-bold text-gray-900">
            {(totalRating / reviews.length).toFixed(2).toString()}
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline"
          >
            {reviews.length} reviews
          </a>
        </div>
      </div>
      <h3 className="mt-2 mb-4 font-bold">Reviews</h3>
      {reviews &&
        reviews.map((item) => (
          <div key={item._id} className="mb-6">
            <p className="text-sm font-semibold">
              {item.updatedAt.split("T")[0]}
            </p>
            <div className="flex">
              <div className="flex items-center -ml-1.5">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ms-1 ${
                      index < item.rating ? "text-yellow-300" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>

              <EditReviewForm
                reviewId={item._id}
                cmt={item.comment}
                rate={item.rating}
                onUpdate={handleUpdate}
              />
              <AlertDialog>
                <AlertDialogTrigger className="text-sm">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your review
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await axios.delete(
                          "http://localhost:5000/api/reviews/" + item._id
                        );

                        setReviews((prevReviews) =>
                          prevReviews.filter(
                            (review) => review._id !== item._id
                          )
                        );
                      }}
                      className="bg-red-700 hover:bg-red-900"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="text-sm">{item.comment}</p>
          </div>
        ))}

      <form className="mt-4" onSubmit={handleSubmit}>
        <h4 className="font-semibold">Add a review</h4>
        <div className="flex items-center mt-4">
          <Rating rating={rating} setRating={setRating} />
        </div>
        <div className="mt-3 col-span-full">
          <label
            htmlFor="comment"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Comment
          </label>
          <div className="mt-1">
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></textarea>
          </div>
        </div>
        <button
          className="mt-2 bg-indigo-600 text-white py-1.5 px-4 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reviews;
