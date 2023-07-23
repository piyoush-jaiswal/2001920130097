import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const SingleTrain = () => {
  const { id } = useParams();
  const [train, setTrain] = useState({});

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`https://api.johndoe-railways.com/trains/${id}`, {
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwNDE0NjgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZTRkZmNkNTEtMjc1Mi00ZjczLTgxZDAtZWExNTJkYjY5NzRhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDE5MjAxMzAwOTcifQ.Z25Of57YwK3e3lHKPeGMW-2qqVkYXfWLP1gkQJdWlTE', // Replace with your authentication token
          },
        });
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrain();
  }, [id]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Single Train Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Train Number: {train.trainNumber}
      </Typography>
      <Typography gutterBottom>
        Departure: {train.departure}
      </Typography>
      <Typography gutterBottom>
        Destination: {train.destination}
      </Typography>
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleTrain;
