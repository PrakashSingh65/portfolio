import React from 'react';
import IntroClient from './_components/IntroClient';
import { getIntroData } from '@/lib/data';

export const dynamic = "force-dynamic";

export default async function IntroPage() {
  const data = await getIntroData();
  return <IntroClient data={data} />;
}