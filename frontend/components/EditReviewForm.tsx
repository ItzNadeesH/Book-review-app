import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Rating from "./Rating";
import axios from "axios";

interface Props {
  reviewId: string;
  cmt: string;
  rate: number;
  onUpdate: (updatedReview: {
    _id: string;
    rating: number;
    comment: string;
  }) => void;
}

const EditReviewForm = ({ reviewId, cmt, rate, onUpdate }: Props) => {
  const [rating, setRating] = useState<number>(rate);
  const [comment, setComment] = useState<string>(cmt);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          rating,
          comment,
        }
      );

      // Pass updated review data to the parent component
      console.log(response.data);
      onUpdate(response.data);

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="border-0 shadow-none bg-white shadow-0 hover:bg-white font-normal"
          variant="outline"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            Make changes to your review here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <Rating rating={rating} setRating={setRating} />
          </div>
          <div className="col-span-full mb-4">
            <label
              htmlFor="comment"
              className="mt-2 block text-sm/6 font-medium text-gray-900"
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

          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewForm;
