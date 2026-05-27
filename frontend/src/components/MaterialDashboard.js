import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, List, ListItem, Snackbar, Alert } from '@mui/material';

function MaterialDashboard() {
    const [patientId, setPatientId] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleFetch = async () => {
        if (!patientId) {
            setSnackbarMessage('Please enter a Patient ID!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            // Simulated API call
            const response = await fetch(`/insurance/recommendations/${patientId}`);
            const data = await response.json();
            setRecommendations(data.recommendations);
            setSnackbarMessage('Recommendations fetched successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setSnackbarMessage('Failed to fetch recommendations. Try again!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="h4">Dashboard</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Patient ID"
                    variant="outlined"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" onClick={handleFetch}>
                    Fetch Recommendations
                </Button>
            </Grid>

            <Grid item xs={12}>
                {recommendations.length > 0 ? (
                    <List>
                        {recommendations.map((rec, index) => (
                            <ListItem key={index}>
                                Plan: {rec.plan}, Coverage: {rec.coverage}, Premium: ${rec.premium}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">No recommendations available.</Typography>
                )}
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default MaterialDashboard;