"use client";

import React from 'react'
import { Toaster } from 'react-hot-toast'

export function ClientProvider() {
  return (
    <div>
        <Toaster position='top-right' />
    </div>
  )
}