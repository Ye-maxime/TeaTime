import React from 'react';

const Loading = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div className="custom-content">Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div className="custom-content">Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default Loading;
