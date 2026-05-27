import React, { useState } from 'react';
import './StyledDashboard.css';

function StyledDashboard() {
    const [patientId, setPatientId] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleFetch = async () => {
        try {
            const response = await fetch(`/insurance/recommendations/${patientId}`);
            const data = await response.json();
            setRecommendations(data.recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Insurance Recommendations</h2>
            <div className="input-group">
                <label>Patient ID:</label>
                <input
                    type="number"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />
                <button onClick={handleFetch} className="fetch-btn">Get Recommendations</button>
            </div>

            <div className="recommendations-container">
                <h3>Recommendations:</h3>
                {recommendations.length > 0 ? (
                    <ul className="recommendations-list">
                        {recommendations.map((rec, index) => (
                            <li key={index} className="recommendation-item">
                                Plan: {rec.plan} - Coverage: {rec.coverage} - Premium: ${rec.premium}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendations found.</p>
                )}
            </div>
        </div>
    );
}

export default StyledDashboard;