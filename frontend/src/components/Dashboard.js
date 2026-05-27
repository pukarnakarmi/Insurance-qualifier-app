import React, { useState } from 'react';

function Dashboard() {
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
        <div>
            <h2>Insurance Recommendations</h2>
            <label>Patient ID:
                <input
                    type="number"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />
            </label>
            <button onClick={handleFetch}>Get Recommendations</button>

            <div>
                <h3>Recommendations:</h3>
                {recommendations.length > 0 ? (
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>
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

export default Dashboard;