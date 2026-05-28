"use client";

import { useState, useEffect } from "react";
import { Navbar }          from "@/components/layout/Navbar";
import { CommandPalette }  from "@/components/search/CommandPalette";
import { useAuthStore }    from "@/lib/store/authStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  // Restore session from JWT cookie on every fresh page load
  useEffect(() => { fetchMe(); }, [fetchMe]);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      {children}
    </>
  );
}
