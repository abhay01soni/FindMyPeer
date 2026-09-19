'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  X, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClientPastBooking {
  id: string;
  professional_id: string;
  professional_name: string;
  professional_title: string;
  professional_photo?: string | null;
  service_id: string;
  service_title: string;
  duration_minutes: number;
  slot_start: string;
  slot_end: string;
  status: 'completed' | 'cancelled' | 'no_show';
  review?: {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
  } | null;
}

interface PastBookingsProps {
  bookings: ClientPastBooking[];
  onSubmitReview: (bookingId: string, professionalId: string, rating: number, comment: string) => Promise<boolean>;
  isLoading?: boolean;
}

export default function PastBookings({
  bookings,
  onSubmitReview,
  isLoading = false,
}: PastBookingsProps) {
  const [selectedReviewBooking, setSelectedReviewBooking] = useState<ClientPastBooking | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenReview = (b: ClientPastBooking) => {
    setSelectedReviewBooking(b);
    setRating(5);
    setComment('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReviewBooking) return;

    setIsSubmitting(true);
    const success = await onSubmitReview(
      selectedReviewBooking.id,
      selectedReviewBooking.professional_id,
      rating,
      comment
    );
    setIsSubmitting(false);

    if (success) {
      setSelectedReviewBooking(null);
    }
  };

  const getStatusBadge = (status: ClientPastBooking['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            COMPLETED
          </span>
        );
      case 'cancelled':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            CANCELLED
          </span>
        );
      case 'no_show':
      default:
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-dark-750 text-techGray-400 border border-dark-700">
            NO SHOW
          </span>
        );
    }
  };

  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl space-y-0 font-sans">
      
      {/* Header */}
      <div className="p-4 sm:px-6 bg-dark-950 border-b border-dark-800 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-coral-400" />
          <span className="text-white font-bold text-sm font-sans tracking-tight">Past Session History & Reviews</span>
        </div>
        <span className="text-techGray-400 font-bold">
          {bookings.length} ARCHIVED CALLS
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="py-16 text-center font-mono text-xs text-techGray-400 space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-coral-500 border-t-transparent rounded-full mx-auto" />
            <div>LOADING_PAST_BOOKINGS...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-white font-sans font-bold text-base">No past sessions yet</div>
            <p className="text-techGray-400 text-xs font-sans max-w-sm mx-auto">
              Completed 1:1 consultation logs and feedback ratings will be stored in this section.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const startDate = new Date(b.slot_start);

              return (
                <div
                  key={b.id}
                  className="bg-dark-850 border border-dark-750 p-5 rounded-xl space-y-4 shadow-lg hover:border-dark-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {b.professional_photo ? (
                          <img src={b.professional_photo} alt={b.professional_name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{b.professional_name ? b.professional_name.substring(0, 2).toUpperCase() : 'PRO'}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">{b.professional_name}</h4>
                          {getStatusBadge(b.status)}
                        </div>
                        <div className="font-mono text-xs text-techGray-400">{b.service_title} • {b.duration_minutes} mins</div>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-techGray-400">
                      {startDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  {/* Review Section Condition: Completed with existing review vs Completed with no review */}
                  {b.status === 'completed' && (
                    <div className="pt-3 border-t border-dark-800">
                      {b.review ? (
                        /* Existing Review Display Card */
                        <div className="p-3.5 bg-dark-900/80 rounded-lg border border-dark-750 space-y-1.5 font-sans">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <div className="flex items-center gap-1 text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < b.review!.rating ? 'fill-amber-400 text-amber-400' : 'text-dark-700'
                                  }`}
                                />
                              ))}
                              <span className="text-white font-bold ml-1">{b.review.rating}.0 ★</span>
                            </div>
                            <span className="text-techGray-500 text-[11px]">Submitted Review</span>
                          </div>
                          <p className="text-techGray-200 text-xs italic">
                            &ldquo;{b.review.comment}&rdquo;
                          </p>
                        </div>
                      ) : (
                        /* Leave a Review Button */
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-techGray-400">How was your 1:1 call with {b.professional_name}?</span>
                          <button
                            onClick={() => handleOpenReview(b)}
                            className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Leave a Review</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReviewBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-900 border border-dark-750 max-w-lg w-full p-6 rounded-xl shadow-2xl space-y-5 font-sans relative"
            >
              <div className="flex items-center justify-between border-b border-dark-800 pb-3 font-mono text-xs">
                <span className="text-coral-400 font-bold flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-current" /> LEAVE 1:1 SESSION REVIEW
                </span>
                <button
                  onClick={() => setSelectedReviewBooking(null)}
                  className="text-techGray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1 text-center">
                  <h4 className="text-white font-bold text-lg">
                    Rate call with {selectedReviewBooking.professional_name}
                  </h4>
                  <p className="text-techGray-400 text-xs font-mono">
                    {selectedReviewBooking.service_title}
                  </p>
                </div>

                {/* 1-5 Star Interactive Selector */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                      key={starIndex}
                      type="button"
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starIndex)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || rating) >= starIndex
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-dark-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    FEEDBACK & TESTIMONIAL <span className="text-coral-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe how the advisor helped solve your problem, key takeaways, and deck/architecture feedback..."
                    className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-sm focus:border-coral-500 focus:outline-none font-sans"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedReviewBooking(null)}
                    className="bg-dark-800 text-techGray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !comment.trim()}
                    className="bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-dark-950 font-bold px-5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
