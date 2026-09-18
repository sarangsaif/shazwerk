import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint / Impressum",
  description: "Statutory Swiss Impressum and company details for SHAZWERK.",
};

export default function ImprintPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E5E5E0] pb-8 mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
            LEGAL NOTICE / IMPRESSUM
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C0E11] tracking-tight mb-4">
            Impressum (Legal Notice)
          </h1>
          <p className="text-xs font-mono text-[#6B7280]">
            Information in accordance with Swiss Commercial Law & Swiss Federal Act on Unfair Competition (UWG Art. 3 Abs. 1 Bst. s).
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs font-sans text-[#374151] leading-relaxed">
          <section className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E0E0DA]">
            <h2 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider">
              Company Information
            </h2>
            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Corporate Entity</span>
                <span className="font-bold text-[#0C0E11] text-sm">[LEGAL COMPANY NAME]</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Registered Address</span>
                <span className="text-[#0C0E11]">[REGISTERED ADDRESS], Switzerland</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Commercial Register Number / UID</span>
                <span className="text-[#0C0E11]">[UID/VAT NUMBER]</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Value Added Tax (MWST / VAT)</span>
                <span className="text-[#0C0E11]">[UID/VAT NUMBER] MWST</span>
              </div>
            </div>
          </section>

          <section className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E0E0DA]">
            <h2 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider">
              Contact Channels
            </h2>
            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Electronic Mail</span>
                <a href="mailto:contact@shazwerk.ch" className="font-bold text-[#0C0E11] hover:text-[#E30613]">
                  [EMAIL] / contact@shazwerk.ch
                </a>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[10px] uppercase">Official Website</span>
                <span className="text-[#0C0E11]">https://shazwerk.ch</span>
              </div>
            </div>
          </section>

          <section className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E0E0DA]">
            <h2 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider">
              Disclaimer & Intellectual Property
            </h2>
            <p className="mb-3">
              <strong>Content Liability:</strong> Although the information on this website is created with maximum technical care and diligence, SHAZWERK assumes no liability for the correctness, accuracy, timeliness, reliability, or completeness of the information. Liability claims against SHAZWERK for damages of a material or immaterial nature arising from access to or use or non-use of the published information are excluded within the framework of Swiss statutory law.
            </p>
            <p>
              <strong>Copyright:</strong> The copyright and all other rights to content, images, system architecture diagrams, or other files on this website belong exclusively to SHAZWERK or specifically named rights holders. Reproduction of any elements requires prior written consent from the copyright holder.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
