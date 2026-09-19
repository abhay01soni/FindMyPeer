'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Filter,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface BookingRecord {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  service_id: string;
  service_title: string;
  service_duration: number;
  slot_start: string;
  slot_end: string;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  meet_link?: string | null;
  created_at: string;
}

interface BookingsSectionProps {
  bookings: BookingRecord[];
  onUpdateStatus?: (bookingId: string, newStatus: 'completed' | 'cancelled' | 'no_show') => Promise<void>;
  isLoading?: boolean;
}

export default function BookingsSection({
  bookings,
  onUpdateStatus,
  isLoading = false,
}: BookingsSectionProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const now = new Date();

  // Upcoming: confirmed & slot_start >= now (or pending_payment)
  const upcomingBookings = bookings.filter(
    (b) => (b.status === 'confirmed' || b.status === 'pending_payment') && new Date(b.slot_start) >= new Date(now.getTime() - 24 * 3600 * 1000)
  );

  // Past: completed, cancelled, no_show OR slot_start < now
  const pastBookings = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled' || b.status === 'no_show' || (b.status === 'confirmed' && new Date(b.slot_start) < new Date(now.getTime() - 24 * 3600 * 1000))
  );

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleStatusChange = async (id: string, status: 'completed' | 'cancelled' | 'no_show') => {
    if (!onUpdateStatus) return;
    setUpdatingId(id);
    await onUpdateStatus(id, status);
    setUpdatingId(null);
  };

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            CONFIRMED
          </span>
        );
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
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-dark-750 text-techGray-400 border border-dark-700">
            NO SHOW
          </span>
        );
      case 'pending_payment':
      default:
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            PENDING PAYMENT
          </span>
        );
    }
  };

  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl space-y-0">
      
      {/* Tab Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-6 bg-dark-950 border-b border-dark-800 gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-coral-400" />
          <span className="text-white font-bold text-sm font-sans tracking-tight">1:1 Client Bookings</span>
        </div>

        {/* Upcoming vs Past Tabs */}
        <div className="bg-dark-850 p-1 rounded-lg border border-dark-750 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-coral-500 text-dark-950 font-bold shadow'
                : 'text-techGray-400 hover:text-white'
            }`}
          >
            <span>Upcoming</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded ${
              activeTab === 'upcoming' ? 'bg-dark-950/20 text-dark-950' : 'bg-dark-800 text-coral-400'
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'past'
                ? 'bg-coral-500 text-dark-950 font-bold shadow'
                : 'text-techGray-400 hover:text-white'
            }`}
          >
            <span>Past / History</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded ${
              activeTab === 'past' ? 'bg-dark-950/20 text-dark-950' : 'bg-dark-800 text-techGray-300'
            }`}>
              {pastBookings.length}
            </span>
          </button>
        </div>
      </div>

      {/* Bookings List / Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-16 text-center font-mono text-xs text-techGray-400 space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-coral-500 border-t-transparent rounded-full mx-auto" />
            <div>LOADING_CLIENT_BOOKINGS...</div>
          </div>
        ) : displayedBookings.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-white font-sans font-bold text-base">
              No {activeTab} bookings found
            </div>
            <p className="text-techGray-400 text-xs font-sans max-w-sm mx-auto">
              {activeTab === 'upcoming'
                ? 'When clients schedule a 1:1 consultation, their Google Meet links and session times will appear here.'
                : 'Completed and past session logs will be archived in this tab.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-dark-950/60 border-b border-dark-800 font-mono text-[11px] text-techGray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">CLIENT & EMAIL</th>
                <th className="py-3.5 px-4">SERVICE TITLE</th>
                <th className="py-3.5 px-4">DATE & TIME</th>
                <th className="py-3.5 px-4 text-center">STATUS</th>
                <th className="py-3.5 px-5 text-right">GOOGLE MEET & ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {displayedBookings.map((b) => {
                const startDate = new Date(b.slot_start);
                const endDate = new Date(b.slot_end);

                return (
                  <tr key={b.id} className="hover:bg-dark-850/50 transition-colors">
                    
                    {/* Client Name & Avatar */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {b.client_name ? b.client_name.substring(0, 2).toUpperCase() : 'CL'}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{b.client_name || 'Client'}</div>
                          <div className="font-mono text-xs text-techGray-400">{b.client_email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Service Title */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="font-medium text-white">{b.service_title}</div>
                      <div className="font-mono text-[11px] text-techGray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-coral-400" />
                        <span>{b.service_duration} minutes 1:1</span>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4 font-mono text-xs">
                      <div className="text-white font-medium">
                        {startDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-techGray-400">
                        {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Meet Button & Status Update dropdown */}
                    <td className="py-4 px-5 text-right font-mono text-xs">
                      <div className="flex items-center justify-end gap-2">
                        {b.meet_link ? (
                          <a
                            href={b.meet_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all shadow cursor-pointer text-xs"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Meet</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-techGray-500 text-[11px]">No link</span>
                        )}

                        {activeTab === 'upcoming' && b.status === 'confirmed' && (
                          <div className="relative inline-block text-left">
                            <select
                              disabled={updatingId === b.id}
                              onChange={(e) => {
                                const val = e.target.value as any;
                                if (val) handleStatusChange(b.id, val);
                              }}
                              defaultValue=""
                              className="bg-dark-800 border border-dark-700 text-techGray-300 hover:text-white text-[11px] rounded px-2 py-1 focus:outline-none font-mono cursor-pointer"
                            >
                              <option value="" disabled>Update Status...</option>
                              <option value="completed">Mark Completed ✓</option>
                              <option value="no_show">Mark No-Show</option>
                              <option value="cancelled">Mark Cancelled</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
