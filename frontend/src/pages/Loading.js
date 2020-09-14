import React from 'react';

const Loading = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div className="custom-content">Loading...</div>;
    }
    if (error) {
    // Handle the error state
        return <div className="custom-content">Sorry, there was a problem loading the page.</div>;
    }

    return null;
};

export default Loading;
