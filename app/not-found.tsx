"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
          OOPS!
        </h1>

        <div className="relative group">
          <Image
            src="/404.png"
            alt="404"
            className="mx-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 group-hover:shadow-3xl"
            width={400}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-8">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
            >
              Go Home
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
