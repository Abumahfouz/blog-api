# blog-api
This project is a RESTful backend API built with Node.js and Express.js for managing a personal or multi-user blog platform. It handles user authentication, blog post creation and management, comments, and basic content moderation. The backend interacts with MongoDB to store and retrieve data, ensuring secure and efficient operations. It includes features such as JWT-based authentication for secure sessions, input validation, and error handling, to provide a robust foundation for a frontend application (e.g., React) to consume the API.
The API is designed to be scalable, with potential extensions for features like search functionality, pagination, and integration with third-party services (e.g., email notifications).

# Key technologies used:
Node.js: Runtime environment for server-side JavaScript.
Express.js: Web framework for building APIs.
MongoDB/Mongoose: For data persistence.
JWT: For authentication and authorization.
Other dependencies: bcrypt for password hashing, multer for file uploads.

# Purpose
The primary purpose of this backend is to provide a secure and efficient server-side infrastructure for a blog application. It enables users to:

### Endpoint List
**Authentication Endpoints:**

- POST /api/auth/register: Registers a new user with username, email, and password. Returns a JWT token.
- POST /api/auth/login: Authenticates a user with email and password. Returns a JWT token.
- POST /api/auth/logout: Invalidates the current session (client-side token removal recommended).
- GET /api/auth/me: Retrieves the authenticated user's profile. (Requires authentication)

**Blog Post Endpoints:**

- GET /api/posts: Retrieves a list of all published posts (with pagination and filtering options, e.g., by category or tag).
- GET /api/posts/:id: Retrieves a single post by ID, including details like author and comments.
- POST /api/posts: Creates a new blog post with title, content, and optional images/tags. (Requires authentication)
- PUT /api/posts/:id: Updates an existing post by ID. (Requires authentication and ownership)
- DELETE /api/posts/:id: Deletes a post by ID. (Requires authentication and ownership or admin role)

**Comment Endpoints:**

- GET /api/posts/:postId/comments: Retrieves all comments for a specific post.
- POST /api/posts/:postId/comments: Adds a new comment to a post. (Requires authentication)
- PUT /api/comments/:id: Updates a comment by ID. (Requires authentication and ownership)
- DELETE /api/comments/:id: Deletes a comment by ID. (Requires authentication and ownership or admin role)

**User Management Endpoints:**

- GET /api/users: Retrieves a list of users (admin only, with filters).
- GET /api/users/:id: Retrieves a user's public profile by ID.
- PUT /api/users/:id: Updates a user's profile (e.g., bio, avatar). (Requires authentication and ownership)
- DELETE /api/users/:id: Deletes a user account. (Requires authentication and ownership or admin role)
