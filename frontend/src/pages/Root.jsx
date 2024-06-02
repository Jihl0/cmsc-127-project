import { Link } from 'react-router-dom';

import '../style/root_page.css';
import '../style/default.css';

export default function Root() {
  return (
    <div className="root-container">
      <img
        src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?cs=srgb&dl=pexels-reneasmussen-1581384.jpg&fm=jpg"
        alt="image-decor"
      />
      <div className="root-column">
        <h1>Welcome to FoodieReviews!</h1>
        <p>
          Discover and share your food experiences with FoodieReviews, the
          ultimate platform for food lovers built using the MERN stack (MariaDB,
          Express.js, React.js, and Node.js).
        </p>
        <div className="same-line">
          <Link to="/signin">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
