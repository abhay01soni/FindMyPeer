'use client';

import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Percent, 
  Receipt,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export interface PaymentRecord {
  id: string;
  booking_id: string;
  client_name: string;
  service_title: string;
  amount_inr: number;
  commission_inr: number;
  net_inr: number;
  payout_status: 'pending' | 'paid' | 'processed';
  status: 'created' | 'paid' | 'failed' | 'refunded';
  created_at: string;
}

interface EarningsSectionProps {
  payments: PaymentRecord[];
  isLoading?: boolean;
}

export default function EarningsSection({
  payments,
  isLoading = false,
}: EarningsSectionProps) {
  // Summary calculations
  const totalGross = payments.reduce((acc, p) => acc + (p.amount_inr || 0), 0);
  const totalCommission = payments.reduce((acc, p) => acc + (p.commission_inr || (p.amount_inr * 0.12)), 0);
  const totalNet = totalGross - totalCommission;

  const totalPaidOut = payments
    .filter((p) => p.payout_status === 'paid')
    .reduce((acc, p) => acc + (p.amount_inr - (p.commission_inr || p.amount_inr * 0.12)), 0);

  const totalPending = payments
    .filter((p) => p.payout_status === 'pending')
    .reduce((acc, p) => acc + (p.amount_inr - (p.commission_inr || p.amount_inr * 0.12)), 0);

  return (
    <div className="space-y-6">
      
      {/* Financial Summary Stat Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Gross */}
        <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl space-y-1 shadow-xl">
          <div className="font-mono text-[10px] text-techGray-400 uppercase">GROSS BOOKING VALUE</div>
          <div className="text-xl font-bold font-mono text-white">₹{totalGross.toLocaleString()}</div>
          <div className="text-[11px] font-sans text-techGray-400">Total client payments</div>
        </div>

        {/* Commission (12%) */}
        <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl space-y-1 shadow-xl">
          <div className="font-mono text-[10px] text-coral-400 uppercase flex items-center justify-between">
            <span>PLATFORM FEE</span>
            <span className="bg-coral-500/20 text-coral-400 text-[9px] px-1 py-0.2 rounded">12%</span>
          </div>
          <div className="text-xl font-bold font-mono text-coral-400">-₹{totalCommission.toLocaleString()}</div>
          <div className="text-[11px] font-sans text-techGray-400">FindMyPeer service fee</div>
        </div>

        {/* Net Earnings */}
        <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl space-y-1 shadow-xl">
          <div className="font-mono text-[10px] text-emerald-400 uppercase">TOTAL NET EARNINGS</div>
          <div className="text-xl font-bold font-mono text-emerald-400">₹{totalNet.toLocaleString()}</div>
          <div className="text-[11px] font-sans text-techGray-400">Your total take-home</div>
        </div>

        {/* Paid Out */}
        <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl space-y-1 shadow-xl">
          <div className="font-mono text-[10px] text-blue-400 uppercase">ALREADY PAID OUT</div>
          <div className="text-xl font-bold font-mono text-blue-400">₹{totalPaidOut.toLocaleString()}</div>
          <div className="text-[11px] font-sans text-techGray-400">Transferred to bank</div>
        </div>

        {/* Pending Payout */}
        <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl space-y-1 shadow-xl">
          <div className="font-mono text-[10px] text-amber-400 uppercase">PENDING PAYOUT</div>
          <div className="text-xl font-bold font-mono text-amber-400">₹{totalPending.toLocaleString()}</div>
          <div className="text-[11px] font-sans text-techGray-400">Scheduled for Monday</div>
        </div>

      </div>

      {/* Notice Banner */}
      <div className="bg-dark-850 border border-dark-750 p-3.5 rounded-lg flex items-center justify-between text-xs font-mono text-techGray-300">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-coral-400 shrink-0" />
          <span>AUTOMATIC PAYOUTS: Net earnings are deposited directly to your bank account every Monday at 10:00 AM IST.</span>
        </div>
        <span className="text-[11px] text-techGray-500 hidden md:inline-block">MVP READ-ONLY</span>
      </div>

      {/* Payments Ledger Table */}
      <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:px-6 bg-dark-950 border-b border-dark-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold text-sm font-sans tracking-tight">Earnings & Payout Ledger</span>
          </div>
          <span className="text-techGray-400">{payments.length} transaction entries</span>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-16 text-center font-mono text-xs text-techGray-400 space-y-2">
              <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto" />
              <div>LOADING_PAYMENT_TRANSACTIONS...</div>
            </div>
          ) : payments.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono">
              <div className="w-12 h-12 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div className="text-white font-sans font-bold text-base">No payment records yet</div>
              <p className="text-techGray-400 text-xs font-sans max-w-sm mx-auto">
                When clients book and complete 1:1 sessions, your earnings breakdown and payout status will log automatically here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-dark-950/60 border-b border-dark-800 font-mono text-[11px] text-techGray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">DATE</th>
                  <th className="py-3.5 px-4">CLIENT & SERVICE</th>
                  <th className="py-3.5 px-4 text-right">GROSS AMOUNT</th>
                  <th className="py-3.5 px-4 text-right">COMMISSION (12%)</th>
                  <th className="py-3.5 px-4 text-right">NET PAYOUT</th>
                  <th className="py-3.5 px-5 text-center">PAYOUT STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {payments.map((p) => {
                  const comm = p.commission_inr || p.amount_inr * 0.12;
                  const net = p.amount_inr - comm;

                  return (
                    <tr key={p.id} className="hover:bg-dark-850/50 transition-colors">
                      
                      {/* Date */}
                      <td className="py-4 px-5 font-mono text-xs text-techGray-300">
                        {new Date(p.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Client & Service */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm">{p.client_name || 'Client'}</div>
                        <div className="font-mono text-xs text-techGray-400">{p.service_title}</div>
                      </td>

                      {/* Gross */}
                      <td className="py-4 px-4 text-right font-mono text-white font-medium">
                        ₹{p.amount_inr.toLocaleString()}
                      </td>

                      {/* Commission */}
                      <td className="py-4 px-4 text-right font-mono text-coral-400">
                        -₹{comm.toLocaleString()}
                      </td>

                      {/* Net Payout */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-emerald-400">
                        ₹{net.toLocaleString()}
                      </td>

                      {/* Payout status */}
                      <td className="py-4 px-5 text-center font-mono text-xs">
                        {p.payout_status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> PAID OUT
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                            <Clock className="w-3 h-3" /> PENDING
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>

              {/* Summary Footer Row */}
              <tfoot>
                <tr className="bg-dark-950 font-mono text-xs text-white border-t-2 border-dark-750">
                  <td colSpan={2} className="py-4 px-5 font-bold uppercase text-coral-400">
                    TOTAL LEDGER SUMMARY
                  </td>
                  <td className="py-4 px-4 text-right font-bold">
                    ₹{totalGross.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-coral-400">
                    -₹{totalCommission.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-emerald-400 text-sm">
                    ₹{totalNet.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-center text-techGray-400">
                    {payments.length} total
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
