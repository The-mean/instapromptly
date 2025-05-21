'use client';

import React, { useEffect, useState } from "react";
import PromptInput from "@/components/PromptInput";
import ResultPanel from "@/components/result-panel";

const DAILY_LIMIT = 3;
const STORAGE_KEY = "instapromptly_usage";

function getToday() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("eğlenceli");
  const [results, setResults] = useState<{
    titles: string[];
    hashtags: string[];
    cta: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // Pro kullanıcı kontrolü
  useEffect(() => {
    if (typeof window === "undefined") return;
    const proEmail = localStorage.getItem("proEmail");
    if (proEmail === "lutbal3@gmail.com") {
      setIsPro(true);
      setLimitReached(false);
      return;
    }
    if (proEmail) {
      fetch(`/api/check-pro?email=${encodeURIComponent(proEmail)}`)
        .then(res => res.json())
        .then(data => {
          if (data.isPro) {
            setIsPro(true);
            setLimitReached(false);
          }
        })
        .catch(() => { });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.date === getToday()) {
          setUsage(parsed.count);
          setLimitReached(parsed.count >= DAILY_LIMIT && !isPro);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getToday(), count: 0 }));
          setUsage(0);
          setLimitReached(false);
        }
      } catch {
        setUsage(0);
        setLimitReached(false);
      }
    }
  }, [isPro]);

  const incrementUsage = () => {
    const newCount = usage + 1;
    setUsage(newCount);
    setLimitReached(newCount >= DAILY_LIMIT && !isPro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getToday(), count: newCount }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) return;
    setLoading(true);
    setResults(null);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bir hata oluştu.");
      }
      const data = await res.json();
      setResults({
        titles: [data.headline],
        hashtags: data.hashtags,
        cta: data.cta,
      });
      incrementUsage();
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">InstaPromptly</h1>
      {limitReached && !isPro && (
        <div className="text-red-600 mb-4 font-semibold">
          Daily limit reached.
        </div>
      )}
      <PromptInput
        topic={topic}
        setTopic={setTopic}
        tone={tone}
        setTone={setTone}
        loading={loading || (limitReached && !isPro)}
        handleSubmit={handleSubmit}
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <ResultPanel results={results} loading={loading} />
      {!isPro && (
        <div className="mt-4 text-sm text-gray-500">Free uses left: {Math.max(0, DAILY_LIMIT - usage)}</div>
      )}
      <a
        href="https://buymeacoffee.com/lutbal3j/membership"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-6 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
      >
        🔓 Go Pro (BuyMeACoffee)
      </a>
      {isPro && (
        <div className="mt-4 text-green-600 font-semibold">Pro membership active. Unlimited usage unlocked! 🎉</div>
      )}
    </div>
  );
}
