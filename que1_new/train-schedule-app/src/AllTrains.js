import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AllTrains = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('https://api.johndoe-railways.com/trains', {
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwNDE0NjgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZTRkZmNkNTEtMjc1Mi00ZjczLTgxZDAtZWExNTJkYjY5NzRhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDE5MjAxMzAwOTcifQ.Z25Of57YwK3e3lHKPeGMW-2qqVkYXfWLP1gkQJdWlTE', // Replace with your authentication token
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Trains Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train Number</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Destination</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map((train) => (
              <TableRow key={train.id}>
                <TableCell>
                  <Link to={`/trains/${train.id}`}>{train.trainNumber}</Link>
                </TableCell>
                <TableCell>{train.departure}</TableCell>
                <TableCell>{train.destination}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllTrains;
