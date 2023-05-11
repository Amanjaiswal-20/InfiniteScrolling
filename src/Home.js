import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://randomuser.me/api/?results=500');
      const data = await response.json();
      setUsers(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Reached the bottom of the page, load more users
        setIsLoading(true);
        setTimeout(() => {
          fetchUsers();
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const renderUsers = () => {
    return users.map((user, index) => (
      <div key={index} className="user">
        <img src={user.picture.thumbnail} alt="User Thumbnail" />
        <span>{`${user.name.first} ${user.name.last}`}</span>
      </div>
    ));
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="user-list">{renderUsers()}</div>
      {isLoading && <div>Loading...</div>}
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Home;
