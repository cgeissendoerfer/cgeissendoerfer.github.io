import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const journeyData = [
  { 
    stage: "Awareness", 
    title: "1. Awareness & Discovery", 
    focus: "Lead Source Attribution", 
    alignment: "Marketing", 
    friction: "Unmonitored ad channels",
    details: "Prospects discover the solution via content or referrals. Strategic focus is on ensuring marketing accurately tracks every acquisition source." 
  },
  { 
    stage: "Qualification", 
    title: "2. Qualification & Evaluation", 
    focus: "Speed to Lead", 
    alignment: "Marketing to Sales", 
    friction: "Lead decay after 48 hours",
    details: "Defining MQL/SQL criteria is critical here. Any delay in the handoff from marketing to sales results in significant funnel leakage." 
  },
  { 
    stage: "Commitment", 
    title: "3. Commitment & Negotiation", 
    focus: "Deal Velocity", 
    alignment: "Sales", 
    friction: "Inconsistent pricing data",
    details: "Finalizing pricing and legal contracts. Operational priority is monitoring the velocity and data integrity of the sales cycle." 
  },
  { 
    stage: "Closing", 
    title: "4. Closing", 
    focus: "Process Automation", 
    alignment: "Sales Operations", 
    friction: "Delayed onboarding kickoff",
    details: "The deal is formally won. Automation must immediately trigger the transition to the implementation phase to maintain momentum." 
  },
  { 
    stage: "Onboarding", 
    title: "5. Onboarding & Implementation", 
    focus: "Success Handoff", 
    alignment: "Sales to CS", 
    friction: "Manual handoff gaps",
    details: "Customer setup and training. This is a high-risk stage; if 'first value' isn't reached quickly, churn risk increases by 40%." 
  },
  { 
    stage: "Expansion", 
    title: "6. Support & Expansion", 
    focus: "Customer Health", 
    alignment: "Customer Success", 
    friction: "Siloed usage data",
    details: "Focusing on ongoing value realization. Health scores are used to proactively identify expansion opportunities or hidden churn risks." 
  },
  { 
    stage: "Renewal", 
    title: "7. Renewal or Churn", 
    focus: "Retention Analysis", 
    alignment: "GTM Leadership", 
    friction: "Lack of win-back strategy",
    details: "The final retention decision. Success is measured by renewal rates and the effectiveness of automated win-back campaigns." 
  }
];

export default function JourneyDashboard() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="bg-white min-h-screen p-8 font-mono text-black border-[12px] border-black selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b-[8px] border-black pb-6 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-7xl font-black uppercase tracking-tighter leading-none">GTM Journey</h1>
          <p className="text-xl mt-4 font-bold bg-blue-600 text-white inline-block px-3 py-1">CORE REVENUE FRAMEWORK</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="font-black text-sm uppercase">RevOps Interactive v1.0</p>
          <p className="font-bold text-xs">GRID SYSTEM 04-A</p>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Timeline Component */}
        <div className="lg:col-span-3 border-4 border-black p-8 bg-gray-50 relative">
          <h2 className="text-3xl font-black mb-16 uppercase italic">Process Timeline</h2>
          
          <div className="relative flex items-center justify-between mt-24 mb-24 px-4">
            {/* The Main Horizontal Axis */}
            <div className="absolute h-3 w-full bg-black top-1/2 transform -translate-y-1/2"></div>
            
            {journeyData.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveNode(item)}
                className={`z-10 w-16 h-16 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center justify-center ${
                  activeNode?.stage === item.stage ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 font-black text-xl">
                  {index + 1}
                </span>
                <div className={`w-4 h-4 rounded-full ${activeNode?.stage === item.stage ? 'bg-white' : 'bg-black'}`}></div>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] font-black uppercase tracking-widest leading-tight">
            {journeyData.map((item, index) => (
              <div key={index} className="px-1">{item.stage}</div>
            ))}
          </div>
        </div>

        {/* Side Panel (Details) */}
        <div className="lg:col-span-1 border-4 border-black p-8 bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="border-b-4 border-black pb-4">
                  <h3 className="text-4xl font-black leading-none uppercase italic">
                    {activeNode.stage}
                  </h3>
                </div>
                
                <section>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">Alignment</p>
                  <p className="text-xl font-bold uppercase">{activeNode.alignment}</p>
                </section>

                <section className="bg-black text-white p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Critical Friction</p>
                  <p className="text-lg font-bold">! {activeNode.friction}</p>
                </section>

                <section>
                  <p className="text-xs font-black uppercase tracking-widest mb-1">Strategic Focus</p>
                  <p className="text-lg font-bold underline decoration-blue-600 decoration-4">
                    {activeNode.focus}
                  </p>
                </section>

                <p className="text-sm leading-relaxed font-medium pt-4 border-t-2 border-black">
                  {activeNode.details}
                </p>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-center italic font-bold text-gray-400 uppercase text-sm">
                Select a stage node to view alignment details
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer System Info */}
      <footer className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black text-white p-6">
          <h4 className="font-black text-xl uppercase mb-2">Current State Analysis</h4>
          <p className="text-sm font-bold opacity-80 uppercase tracking-tighter">
            Identify broken handoffs, unmonitored processes, and data silos to define the baseline.
          </p>
        </div>
        <div className="border-4 border-black p-6">
          <h4 className="font-black text-xl uppercase mb-2">Future State Vision</h4>
          <p className="text-sm font-bold uppercase tracking-tighter">
            Automated segmentation, AI-driven routing, and single source of truth for cross-functional scale.
          </p>
        </div>
      </footer>
    </div>
  );
}