"use client";
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styling

const LoadingSkeleton = () => {
  return (
    <div className='bg-white' style={{ padding: '20px' }}>
      {/* Header */}
      <Skeleton className='w-full h-11 bg-white' style={{ marginBottom: '20px' }} />

      {/* Hero Section */}
      <Skeleton height={200} width="100%" style={{ marginBottom: '20px' }} />

      {/* Main Content */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 '>
        <Skeleton height={200} className='w-full px-2' style={{ marginBottom: '20px' }} />
        <Skeleton height={200} className='w-full px-2' style={{ marginBottom: '20px' }} />
        <Skeleton height={200} className='w-full px-2' style={{ marginBottom: '20px' }} />
        <Skeleton height={200} className='w-full px-2' style={{ marginBottom: '20px' }} />
        <Skeleton height={200} className='w-full px-2' style={{ marginBottom: '20px' }} />
        <Skeleton height={200} className='w-full px-2'style={{ marginBottom: '20px' }} />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
