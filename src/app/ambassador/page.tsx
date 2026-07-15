"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, Trophy } from "lucide-react";

const leaderboardData = [
  { name: "Abelrahman Sayed Shamardn", referrals: 37, points: 1850 },
  { name: "Habiba Hossam Ashraf", referrals: 11, points: 550 },
  { name: "Joudy walid abdelmonem mohamed", referrals: 9, points: 450 },
];

export default function AmbassadorPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateLink = () => {
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferralLink(
        `https://register.eycc.stemeghackclub.org?ref=${code}`
      );
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section-frame">
      <div className="section-inner">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker">// ambassador program</span>
            <h1 className="section-title mt-3">Ambassador Program</h1>
            <p className="section-copy mx-auto">
              Join as an ambassador, receive a unique referral code, and earn
              points for successful registrations.
            </p>
          </div>

          {/* Form */}
          <div className="panel mx-auto mt-10 max-w-lg p-6 md:p-8">
            <h2 className="text-lg font-semibold">Join as Ambassador</h2>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                onClick={generateLink}
                disabled={!name.trim() || !email.trim() || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Referral Link"
                )}
              </Button>
            </div>

            {referralLink && (
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                <p className="text-xs text-muted-foreground">
                  Your referral link
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 truncate text-sm text-primary">
                    {referralLink}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-border/60 hover:bg-secondary"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Check */}
          <div className="panel mx-auto mt-8 max-w-lg p-6 md:p-8">
            <h2 className="text-lg font-semibold">Check Ambassador Stats</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your referral code to check your stats.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Referral Code"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button variant="outline">Load Leaderboard</Button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="panel mt-8 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/60 p-4">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Ambassador Leaderboard</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/50">
                    <th className="px-4 py-3 text-left font-mono text-xs text-muted-foreground">
                      #
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-xs text-muted-foreground">
                      Ambassador
                    </th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">
                      Successful Referrals
                    </th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, i) => (
                    <tr
                      key={entry.name}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            i === 0
                              ? "bg-yellow-400/20 text-yellow-400"
                              : i === 1
                                ? "bg-gray-400/20 text-gray-400"
                                : i === 2
                                  ? "bg-amber-600/20 text-amber-600"
                                  : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{entry.name}</td>
                      <td className="px-4 py-3 text-right">{entry.referrals}</td>
                      <td className="px-4 py-3 text-right font-mono text-primary">
                        {entry.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
