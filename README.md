# Reviews Component

This is a React component that allows users to view, add, edit, and delete reviews for books. It uses the Next.js framework and Axios for API requests.

## Features

- **View Reviews**: Display all reviews for a specific book, including the rating, comment, and the date the review was last updated.
- **Add Reviews**: Users can submit a new review with a rating and comment.
- **Edit Reviews**: Users can update an existing review.
- **Delete Reviews**: Users can delete an existing review after confirmation.

## Installation

### Prerequisites

- Node.js installed on your machine.
- A running backend server to handle API requests.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directories>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Ensure your backend API is running and accessible at `http://localhost:5000`.

## Usage

- Navigate to the `/reviews` page in your application.
- Ensure the query parameters `title` and `author` are provided in the URL.
  Example: `http://localhost:3000/reviews?title=BookTitle&author=AuthorName`

## API Endpoints

### Fetch Reviews

- **Endpoint**: `POST /api/reviews/title`
- **Request Payload**:
  ```json
  {
    "title": "BookTitle"
  }
  ```
- **Response**: Array of reviews for the given book title.

### Add Review

- **Endpoint**: `POST /api/reviews`
- **Request Payload**:
  ```json
  {
    "bookTitle": "BookTitle",
    "author": "AuthorName",
    "rating": 5,
    "comment": "This is a great book!"
  }
  ```

### Edit Review

- **Endpoint**: `PUT /api/reviews/:id`
- **Request Payload**:
  ```json
  {
    "rating": 4,
    "comment": "Updated comment"
  }
  ```

### Delete Review

- **Endpoint**: `DELETE /api/reviews/:id`

## Component Structure

### Main Component

`Reviews.tsx`

- Displays the book title, author, and reviews.
- Allows users to add, edit, and delete reviews.

### Sub-Components

- **Rating**: Displays a star-based rating UI.
- **AlertDialog**: Used for confirming review deletion.

## Dependencies

- **Next.js**: Framework for server-side rendering and routing.
- **Axios**: Library for making HTTP requests.
- **ShadCN UI**: UI components for dialogs and alerts.

## Development Notes

- Ensure the backend API is operational.
- Replace hardcoded backend URLs with environment variables for deployment.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [ShadCN UI Documentation](https://shadcn.dev/)
