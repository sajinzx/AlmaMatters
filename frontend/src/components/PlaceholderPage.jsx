import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#2c3e50' }}>{title}</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>This page is currently under construction.</p>
      <button
        onClick={() => navigate(`/${username}/home`)}
        style={{
          padding: '10px 20px',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}