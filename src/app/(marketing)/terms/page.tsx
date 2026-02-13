import type { Metadata } from "next";
import { PageHeader } from "@/components/shared";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the sale and purchase of materials by ASZ Company FZCO.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="Terms and conditions governing the sale and purchase of materials by ASZ Company FZCO."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose-custom">
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Last updated: February 2026
            </p>

            <h2>1. Scope and Application</h2>
            <p>
              These Terms and Conditions (&quot;T&amp;Cs&quot;) apply to all
              contracts for the sale and purchase of materials
              (&quot;Materials&quot;) by ASZ Company FZCO (&quot;ASZ&quot;),
              whether ASZ acts as seller or buyer. These T&amp;Cs take
              precedence over any terms proposed by the counterparty unless
              expressly accepted in writing by an authorised representative of
              ASZ.
            </p>

            <h2>2. Contract Formation</h2>
            <p>
              Contracts are formed only upon written confirmation by ASZ. All
              quotations issued by ASZ are non-binding and subject to change
              without notice. No order placed by the counterparty shall be
              deemed accepted until confirmed in writing by ASZ.
            </p>

            <h2>3. Price and Payment</h2>
            <p>
              All prices are quoted exclusive of VAT, duties, and other
              applicable taxes unless otherwise stated. Payment terms are three
              (3) days from the date of invoice unless otherwise agreed in
              writing. Late payments shall incur interest at a rate of 1% per
              month on the outstanding balance. ASZ reserves the right to
              suspend deliveries in the event of non-payment.
            </p>
            <p>
              In the event that any reference index or pricing mechanism becomes
              unavailable or ceases to be representative, ASZ may determine
              alternative pricing at its reasonable discretion.
            </p>

            <h2>4. Delivery and Risk</h2>
            <p>
              All delivery dates are estimates and time shall not be of the
              essence. Risk in the Materials shall pass to the counterparty in
              accordance with the applicable Incoterms, notwithstanding any
              retention of title. ASZ shall not be liable for delays caused by
              force majeure events or failures attributable to the counterparty.
              Partial deliveries are permitted.
            </p>

            <h2>5. Retention of Title</h2>
            <p>
              Title in the Materials shall remain with ASZ until full payment
              has been received. The counterparty shall store the Materials
              separately, maintain appropriate insurance, and shall not dispose
              of the Materials without prior authorisation from ASZ.
            </p>

            <h2>6. Quality and Claims</h2>
            <p>
              Weight claims must be submitted within ten (10) calendar days from
              the date of release. Quality claims must be submitted within
              twenty (20) calendar days from the date of release. Materials
              subject to a claim must be kept intact, unused, and stored under
              cover until inspection by ASZ or its appointed agent.
              Non-conforming materials sold on an &quot;as is&quot; basis carry
              no quality guarantees.
            </p>

            <h2>7. Force Majeure</h2>
            <p>
              Neither party shall be liable for failure to perform its
              obligations where such failure results from events beyond
              reasonable control, including but not limited to acts of God,
              government actions, war, civil unrest, fire, flood, epidemic,
              labour disputes, or supply chain disruptions. Performance shall be
              suspended for a period of up to sixty (60) days. Market price
              changes and exchange rate fluctuations shall not constitute force
              majeure.
            </p>

            <h2>8. Adverse Change</h2>
            <p>
              ASZ may immediately suspend performance or demand payment in full
              if the counterparty&apos;s financial condition deteriorates
              materially or if ASZ has reasonable grounds to believe the
              counterparty will be unable to fulfil its obligations.
            </p>

            <h2>9. Default and Remedies</h2>
            <p>
              Events of default include non-payment, failure to take delivery,
              insolvency, or material breach of contract. In the event of
              default, ASZ may terminate the contract, resell the Materials at
              the counterparty&apos;s cost, and recover all market losses and
              expenses incurred.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              ASZ&apos;s total liability under any contract shall not exceed the
              contract price. ASZ excludes liability for consequential,
              indirect, or special damages, except in cases of death, personal
              injury, fraud, or where such exclusion is prohibited by applicable
              law.
            </p>

            <h2>11. Governing Law and Dispute Resolution</h2>
            <p>
              These T&amp;Cs shall be governed by and construed in accordance
              with the laws of England and Wales. Any dispute arising out of or
              in connection with these T&amp;Cs shall be referred to arbitration
              in accordance with the rules of the Minor Metals Trade Association
              (MMTA), to be conducted in England in the English language.
              Alternatively, for disputes exceeding $5,000,000, the London Court
              of International Arbitration (LCIA) rules shall apply. ASZ
              reserves the right to pursue court action for payment recovery.
            </p>

            <h2>12. Notices</h2>
            <p>
              All notices and communications shall be in writing and in the
              English language, delivered by hand, courier, registered mail, or
              email to the addresses specified in the contract.
            </p>

            <h2>13. General Provisions</h2>
            <p>
              Neither party may assign or transfer any rights or obligations
              under the contract without the prior written consent of the other
              party. Confidentiality obligations shall survive for a period of
              five (5) years following the termination of the contract. These
              T&amp;Cs constitute the entire agreement between the parties and
              supersede all prior negotiations, representations, or agreements.
              No waiver of any provision shall be effective unless made in
              writing and signed by the waiving party.
            </p>

            <h2>Contact</h2>
            <p>
              For any questions regarding these Terms and Conditions, please
              contact us at{" "}
              <a href="mailto:general@aszcompany.com">
                general@aszcompany.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
