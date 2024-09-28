'use client'

import React from 'react'
import LoadingComponent from '@/components/loadingComponent'

export default function LoadingPage() {
  const handleLoadComplete = () => {
    // Handle what happens after loading is complete
    console.log('Loading complete. Proceed to the next page.');
  }

  return <LoadingComponent onLoadComplete={handleLoadComplete} />
}
