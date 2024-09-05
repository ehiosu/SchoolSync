"use client";
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react'
type Props = {
    children:React.ReactNode
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export const ConvexClientProvider = (props: Props) => {
  return (
    <ConvexProvider client={convex}>
        {props.children}
    </ConvexProvider>
  )
}