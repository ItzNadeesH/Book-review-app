const mongoose = require("mongoose");
const Review = require("../models/review");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    if (reviews.length === 0)
      return res.status(200).json({ msg: "No reviews found" });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

const createReview = async (req, res) => {
  try {
    const { bookTitle, author, rating, comment } = req.body;

    if (!bookTitle || !author || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new Review({
      bookTitle,
      author,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(200)
      .json({ message: "Review deleted successfully", deletedReview });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
