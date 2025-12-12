import React from "react";

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-green-200 rounded-full opacity-40"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-r-emerald-500 border-l-green-400 animate-spin" />
      </div>
      <h1 className="text-3xl font-bold text-green-700 animate-pulse">Checking your session...</h1>
      <p className="mt-2 text-sm text-green-600 italic">Please wait a moment</p>
    </div>
  );
}