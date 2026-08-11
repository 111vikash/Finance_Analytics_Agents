import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center py-3 font-semibold text-[0.65rem] text-[#9aa0ad] bg-bgbase border-t ">
      © {new Date().getFullYear()} Capgemini. All rights reserved.
    </footer>
  );
}