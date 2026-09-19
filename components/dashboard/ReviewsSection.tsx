'use client';

import React from 'react';
import { Star, MessageSquare, User, Calendar, Award } from 'lucide-react';

export interface ReviewRecord {
  id: string;
  booking_id: string;
  client_id: string;
  client_name: string;
  client_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsSectionProps {
  reviews: ReviewRecord[];
  ratingAvg: number;
  isLoading?: boolean;
}

export default function ReviewsSection({
  reviews,
  ratingAvg,
  isLoading = false,
}: ReviewsSectionProps) {
  // Sort most recent first
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Score Summary */}
      <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-sans">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-2xl flex flex-col items-center justify-center shrink-0">
            <span>{ratingAvg > 0 ? ratingAvg.toFixed(1) : '5.0'}</span>
            <div className="flex text-[10px] text-amber-400">★</div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span>Client Ratings & Reviews</span>
              <span className="text-xs font-mono text-coral-400 bg-dark-850 px-2 py-0.5 rounded border border-dark-750">
                VERIFIED CALL FEEDBACK
              </span>
            </h3>
            <p className="text-techGray-300 text-xs sm:text-sm mt-0.5">
              Based on {reviews.length} completed 1:1 consultation calls across product, tech, and fundraising topics.
            </p>
          </div>
        </div>

        <div className="font-mono text-xs text-techGray-400 bg-dark-850 p-3 rounded-lg border border-dark-750 shrink-0">
          <div className="text-white font-bold text-sm">{reviews.length} Total Reviews</div>
          <div className="text-emerald-400 text-[11px] mt-0.5">100% Verified Clients</div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:px-6 bg-dark-950 border-b border-dark-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-coral-400" />
            <span className="text-white font-bold text-sm font-sans tracking-tight">Recent Client Testimonials</span>
          </div>
          <span className="text-techGray-400">Most recent first</span>
        </div>

        <div>
          {isLoading ? (
            <div className="py-16 text-center font-mono text-xs text-techGray-400 space-y-2">
              <div className="animate-spin w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full mx-auto" />
              <div>LOADING_REVIEWS...</div>
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono">
              <div className="w-12 h-12 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-white font-sans font-bold text-base">No reviews received yet</div>
              <p className="text-techGray-400 text-xs font-sans max-w-sm mx-auto">
                After clients complete a 1:1 session with you, their ratings and detailed feedback will be published here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-dark-800">
              {sortedReviews.map((rev) => (
                <div key={rev.id} className="p-5 sm:p-6 hover:bg-dark-850/40 transition-colors space-y-3 font-sans">
                  
                  {/* Rating + Client + Date header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {rev.client_name ? rev.client_name.substring(0, 2).toUpperCase() : 'CL'}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{rev.client_name || 'Verified Client'}</div>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-dark-700'
                              }`}
                            />
                          ))}
                          <span className="text-white font-bold ml-1">{rev.rating}.0</span>
                        </div>
                      </div>
                    </div>

                    <span className="font-mono text-xs text-techGray-400">
                      {new Date(rev.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-techGray-200 text-sm leading-relaxed pl-12">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
