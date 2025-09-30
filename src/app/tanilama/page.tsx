'use client';

import React from 'react';

// Static export optimization
export const dynamic = 'force-static';

// NEW: Mobile-first 3-section form for elderly users
import NewZaritForm from '@/components/tanilama/NewZaritForm';

export default function TanilamaPage() {
  return <NewZaritForm />;
}
