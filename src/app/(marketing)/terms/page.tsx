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
              Last updated: March 2026
            </p>

            <h2>1. Scope and Application</h2>
            <p>
              1.1 These Terms and Conditions (&quot;T&amp;Cs&quot;) apply to and
              form an integral part of all offers, quotations, purchase orders,
              sales orders, confirmations, contracts, invoices, and any other
              agreements (collectively &quot;Contracts&quot;) for the sale or
              purchase of goods (&quot;Materials&quot;) by ASZ Company FZCO
              (&quot;ASZ&quot;), whether ASZ is the seller or the buyer.
            </p>
            <p>
              1.2 These T&amp;Cs shall prevail over any contrary or additional
              terms proposed by the counterparty, whether in their general terms
              and conditions or otherwise, unless expressly accepted in writing
              by ASZ.
            </p>
            <p>
              1.3 A reference to these T&amp;Cs in any quotation, offer, sales
              order, purchase order, invoice, or other contractual document
              issued by ASZ is sufficient to incorporate them into the Contract
              in full.
            </p>
            <p>
              1.4 These T&amp;Cs apply to both transactions where ASZ is the
              seller and where ASZ is the buyer, unless otherwise expressly
              agreed in writing.
            </p>
            <p>
              1.5 Any deviation from these T&amp;Cs must be agreed in writing by
              an authorised signatory of ASZ. No verbal statements, informal
              agreements, or conduct shall amend or waive these T&amp;Cs.
            </p>

            <h2>2. Contract Formation</h2>
            <p>
              2.1 A Contract shall be formed only when ASZ issues a written order
              confirmation, pro forma invoice, or other written acceptance of the
              counterparty&apos;s order.
            </p>
            <p>
              2.2 Any quotations, offers, or price indications issued by ASZ are
              non-binding and subject to change until confirmed in writing by
              ASZ.
            </p>
            <p>
              2.3 No order placed by the counterparty shall be deemed accepted
              until confirmed in writing by ASZ.
            </p>
            <p>
              2.4 ASZ&apos;s confirmation shall incorporate these T&amp;Cs in
              full, and any terms proposed by the counterparty that conflict with
              or supplement these T&amp;Cs shall be void unless expressly
              accepted in writing by an authorised signatory of ASZ.
            </p>
            <p>
              2.5 ASZ may revoke or amend any offer prior to acceptance without
              liability.
            </p>
            <p>
              2.6 If no validity period is stated in the offer, the price shall
              be subject to reconfirmation by ASZ prior to acceptance.
            </p>

            <h2>3. Price and Payment</h2>
            <p>
              3.1 The price of the Materials shall be as stated in the Contract.
              Unless otherwise agreed in writing, prices are: (a) exclusive of
              VAT, duties, taxes, customs charges, and other governmental levies,
              all of which shall be for the counterparty&apos;s account; and (b)
              based on the agreed delivery term as defined by the latest
              Incoterms.
            </p>
            <p>
              3.2 All payments shall be made in full, without set-off, deduction,
              counterclaim, or withholding of any kind, in the currency stated in
              the Contract, to the bank account specified by ASZ.
            </p>
            <p>
              3.3 Payment shall be deemed received only when cleared funds are
              credited to ASZ&apos;s nominated bank account.
            </p>
            <p>
              3.4 Unless otherwise agreed in writing, payment terms are three (3)
              days from the date of invoice.
            </p>
            <p>
              3.5 If payment is not received by the due date, ASZ shall be
              entitled, without prejudice to any other rights, to: (a) suspend
              further deliveries under any Contract until payment is made in
              full; (b) charge interest on overdue amounts at the rate of 1% per
              month (or the maximum permitted by law, if lower), calculated daily
              from the due date until payment in full, with such interest to
              accrue and compound monthly; (c) recover from the counterparty all
              costs of collection, including legal fees and debt recovery
              charges; and (d) declare all outstanding amounts under any Contract
              immediately due and payable.
            </p>
            <p>
              3.6 If any change occurs in applicable taxes, duties, or other
              governmental charges between the date of the Contract and the
              delivery date, the price shall be adjusted accordingly.
            </p>
            <p>
              3.7 Suspension of Quotation / Market Disruption &ndash; If the
              reference price, index, or quotation specified in the Contract is
              suspended, discontinued, unavailable, or in ASZ&apos;s reasonable
              opinion fails to reflect prevailing market conditions, then: (a)
              ASZ may determine an alternative pricing source that most closely
              reflects the original quotation, having regard to relevant market
              practices; or (b) if no such source is available, the price shall
              be determined in good faith by ASZ based on prevailing market value
              at the time of shipment or delivery, taking into account prices for
              comparable materials, freight, premiums/discounts, and other
              relevant factors. The parties agree that ASZ&apos;s determination
              under this Clause shall be final and binding, absent manifest
              error.
            </p>
            <p>
              3.8 No Set-Off &ndash; The counterparty shall pay all amounts due
              to ASZ in full without any deduction, set-off, counterclaim, or
              withholding of any kind, whether in respect of any alleged claim,
              cross-claim, right of retention, or otherwise, and whether arising
              under the Contract or otherwise. Any breach of this obligation
              shall constitute an event of default under Clause 9.
            </p>

            <h2>4. Delivery and Risk</h2>
            <p>
              4.1 Delivery shall be made in accordance with the delivery term
              stated in the Contract, which shall be interpreted in accordance
              with the latest version of Incoterms published by the
              International Chamber of Commerce, unless otherwise agreed in
              writing.
            </p>
            <p>
              4.2 Any delivery dates or schedules provided by ASZ are estimates
              only. Time for delivery shall not be of the essence unless
              expressly agreed in writing by ASZ.
            </p>
            <p>
              4.3 ASZ shall not be liable for any delay in delivery caused by:
              (a) events beyond its reasonable control, including Force Majeure
              as defined in Clause 7; (b) delays caused by the
              counterparty&apos;s failure to provide necessary information,
              instructions, permits, or approvals; or (c) the
              counterparty&apos;s failure to make payment when due.
            </p>
            <p>
              4.4 Partial deliveries are permitted and may be invoiced
              separately. Each delivery shall be treated as a separate contract,
              and failure to make one delivery shall not affect other deliveries
              under the same or other contracts.
            </p>
            <p>
              4.5 Risk of loss or damage to the Materials shall pass to the
              counterparty in accordance with the agreed delivery term under
              Incoterms, notwithstanding the retention of title provisions in
              Clause 5.
            </p>
            <p>
              4.6 If the counterparty fails to take delivery on the agreed date:
              (a) risk shall pass to the counterparty on the agreed date; (b)
              ASZ may store the Materials at the counterparty&apos;s cost and
              risk; and (c) the counterparty shall reimburse ASZ for all costs
              of storage, handling, insurance, and any additional transport.
            </p>

            <h2>5. Retention of Title</h2>
            <p>
              5.1 Title to the Materials shall remain with ASZ until the earliest
              of: (a) ASZ&apos;s receipt in full (in cleared funds) of all
              amounts owed by the counterparty to ASZ under the Contract and any
              other contract between ASZ and the counterparty, whether or not
              such amounts are then due; or (b) the physical release of the
              Materials to the counterparty or its agent at the agreed delivery
              point.
            </p>
            <p>
              5.2 Risk of loss or damage to the Materials shall pass to the
              counterparty in accordance with the agreed Incoterms, but such
              transfer of risk shall not affect the retention of title provisions
              in this Clause.
            </p>
            <p>
              5.3 Until title passes to the counterparty, the counterparty
              shall: (a) store the Materials separately from other goods and
              clearly identify them as the property of ASZ; (b) maintain the
              Materials in good condition and insure them for their full
              replacement value against all usual risks, with ASZ&apos;s interest
              noted on the policy; and (c) not pledge, encumber, sell, or
              otherwise dispose of the Materials except in the ordinary course of
              business as fiduciary agent for ASZ.
            </p>
            <p>
              5.4 If the counterparty processes, transforms, incorporates, or
              consumes the Materials before payment in full, such action shall
              not extinguish ASZ&apos;s ownership rights. Title shall extend to
              the new products and/or proceeds of sale, which the counterparty
              shall hold on trust for ASZ, and any such proceeds shall be kept in
              a separate bank account for ASZ&apos;s benefit.
            </p>
            <p>
              5.5 ASZ may, at any time and without prejudice to any other rights,
              require the counterparty to deliver up the Materials (or any
              products incorporating them) and/or enter the counterparty&apos;s
              premises to recover them at the counterparty&apos;s expense if: (a)
              payment is overdue; (b) the counterparty becomes insolvent, enters
              into liquidation, or suffers any similar event; or (c) ASZ
              reasonably believes that payment is at risk.
            </p>
            <p>
              5.6 The counterparty&apos;s rights to possess and deal in the
              Materials shall cease immediately upon the occurrence of any event
              listed in Clause 5.5.
            </p>

            <h2>6. Weight, Quality and Claims</h2>
            <p>
              6.1 The weight stated on the shipping documents issued or certified
              by the loading port, weighbridge, or warehouse shall be final and
              binding unless a claim is lodged in accordance with Clause 6.3.
            </p>
            <p>
              6.2 Quality shall be determined in accordance with the Certificate
              of Analysis (&quot;COA&quot;) issued by the producer or an
              independent, internationally recognised laboratory agreed between
              the parties. Where ASZ provides a producer&apos;s COA, such COA
              shall be deemed conclusive and binding unless a claim is made in
              accordance with Clause 6.3.
            </p>
            <p>
              6.3 The counterparty shall have the right to lodge: (a) a weight
              claim within ten (10) calendar days of release of the Materials;
              and (b) a quality claim within twenty (20) calendar days of release
              of the Materials.
            </p>
            <p>
              6.4 All claims must be made in writing and must specify the exact
              nature of the discrepancy, supported by appropriate documentation.
            </p>
            <p>
              6.5 Any claim in respect of quality or weight shall be subject to
              joint inspection, sampling, and assaying in accordance with MMTA
              guidelines, to be performed by a mutually acceptable,
              internationally recognised independent surveyor or laboratory. The
              findings shall be final and binding. The costs of such procedure
              shall be borne by the losing party.
            </p>
            <p>
              6.6 Materials subject to a claim must be kept intact, unused, and
              stored under cover until inspection and sampling are completed. Any
              consumption or alteration of the Materials prior to inspection will
              invalidate the claim.
            </p>
            <p>
              6.7 Non-Conforming or Unspecified Standard Materials &ndash; Where
              ASZ supplies Materials that do not conform to MMTA specifications
              or other widely recognised industry standards, or where the
              Contract does not specify a recognised quality standard, such
              Materials are sold strictly on an &quot;as is&quot; basis, with all
              faults, and without any representation, warranty, condition or
              guarantee of any kind, whether express or implied. No quality
              claims will be accepted under any circumstances, and the
              counterparty irrevocably agrees that the sale is final, binding,
              and not subject to reversal, rejection, offset, or reduction of the
              purchase price.
            </p>

            <h2>7. Force Majeure</h2>
            <p>
              7.1 Neither party shall be liable for any failure or delay in
              performing its obligations under the Contract (other than payment
              obligations) if such failure or delay is caused by an event or
              circumstance beyond its reasonable control (&quot;Force Majeure
              Event&quot;).
            </p>
            <p>
              7.2 Force Majeure Events include, but are not limited to: (a) acts
              of God, natural disasters, extreme weather, earthquakes, floods,
              droughts, epidemics, pandemics; (b) war, armed conflict, terrorism,
              civil commotion, riots, embargoes, or sanctions; (c) strikes,
              lockouts, industrial disputes (whether involving the workforce of a
              party or any other party); (d) accidents, fires, explosions,
              breakdowns of plant, equipment, or transportation; (e) shortages or
              failures of supply of raw materials, utilities, or transportation;
              and (f) any change in laws, regulations, or governmental orders
              preventing performance.
            </p>
            <p>
              7.3 For the avoidance of doubt, commodity market price changes,
              fluctuations in exchange rates, or other market volatility shall
              not constitute a Force Majeure Event.
            </p>
            <p>
              7.4 The party affected shall: (a) promptly notify the other party
              in writing of the Force Majeure Event and its expected duration;
              and (b) use reasonable efforts to mitigate the effects of the
              event.
            </p>
            <p>
              7.5 Performance of the affected obligations shall be suspended for
              the duration of the Force Majeure Event and the time for
              performance shall be extended accordingly.
            </p>
            <p>
              7.6 If the Force Majeure Event continues for more than sixty (60)
              consecutive days, either party may terminate the Contract without
              liability, except that the counterparty shall remain liable to pay
              for any Materials already delivered.
            </p>

            <h2>8. Adverse Change</h2>
            <p>
              8.1 If, in ASZ&apos;s reasonable opinion, there is a material
              adverse change in the counterparty&apos;s financial condition,
              creditworthiness, ability to perform its obligations, or in
              relevant market conditions, ASZ may, without prejudice to any other
              rights, immediately: (a) suspend performance of the Contract; (b)
              demand immediate payment of all amounts owed; (c) require
              prepayment, cash on delivery, or the provision of security
              satisfactory to ASZ; and/or (d) terminate the Contract in whole or
              in part.
            </p>
            <p>
              8.2 Failure of the counterparty to comply with any demand made
              under this Clause shall constitute an event of default under Clause
              9 (Default, Price Volatility &amp; Remedies).
            </p>

            <h2>9. Default, Price Volatility &amp; Remedies</h2>
            <p>
              9.1 Events of Default &ndash; The counterparty shall be deemed in
              default if it: (a) fails to make payment in accordance with Clause
              3; (b) fails to take delivery, or deliver (if ASZ is the buyer),
              in accordance with the Contract; (c) breaches any other material
              term of the Contract; (d) becomes insolvent, bankrupt, enters into
              liquidation, or has a receiver, administrator, or similar officer
              appointed over its assets; or (e) indicates, whether verbally or in
              writing, an intention not to perform, or is otherwise unable to
              perform its contractual obligations.
            </p>
            <p>
              9.2 ASZ Remedies &ndash; Upon any default by the counterparty, ASZ
              may, without prejudice to any other rights, at its sole discretion:
              (a) terminate the Contract in whole or in part; (b) suspend further
              performance under any Contract; (c) resell or purchase equivalent
              goods in the open market (or close out any hedges or forward
              contracts entered into in connection with the Contract) and recover
              from the counterparty all losses, damages, costs, and expenses
              arising therefrom, including losses due to adverse price movements;
              (d) recover from the counterparty all costs of storage, handling,
              transport, insurance, and other expenses reasonably incurred as a
              result of the default; and (e) enforce ASZ&apos;s retention of
              title rights under Clause 5 and repossess the Materials without
              prior notice.
            </p>
            <p>
              9.3 Price Volatility Protection &ndash; If the Contract is
              terminated or the counterparty defaults while ASZ holds or has
              committed to purchase the Materials, the counterparty shall be
              liable for: (a) the difference between the Contract price and the
              price at which ASZ is able to resell or purchase replacement goods
              in the market; (b) any loss arising from the close-out or early
              termination of any related hedge, futures, or forward contract; and
              (c) any other consequential losses directly arising from market
              price changes due to the counterparty&apos;s default.
            </p>
            <p>
              9.4 Mitigation &ndash; ASZ shall act in good faith to mitigate
              losses but shall have sole discretion in selecting the method,
              timing, and manner of any resale, repurchase, or hedge close-out.
              The counterparty shall have no right to challenge ASZ&apos;s
              determination of such losses.
            </p>
            <p>
              9.5 All amounts payable under this Clause 9 shall be payable
              immediately upon demand and shall bear interest in accordance with
              Clause 3.5 from the date incurred until paid in full.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              10.1 To the fullest extent permitted by law, ASZ shall not be
              liable to the counterparty for any indirect, incidental, special,
              punitive, exemplary, or consequential loss or damage, including but
              not limited to loss of profit, loss of revenue, loss of anticipated
              savings, loss of use, loss of production, or loss of business
              opportunity, whether arising in contract, tort (including
              negligence), or otherwise, even if advised of the possibility of
              such loss.
            </p>
            <p>
              10.2 ASZ&apos;s total aggregate liability to the counterparty
              under any Contract, whether arising in contract, tort (including
              negligence), strict liability, statute, or otherwise, shall in no
              event exceed the Contract price for the specific shipment of
              Materials giving rise to the claim.
            </p>
            <p>
              10.3 The counterparty shall not be entitled to withhold, defer, set
              off, or deduct any amounts from sums due to ASZ in respect of any
              alleged claim, and any breach of this obligation shall constitute a
              material default under Clause 9.
            </p>
            <p>
              10.4 ASZ shall not be liable for any defect, shortfall, or
              non-conformity in the Materials arising from: (a) normal wear and
              tear; (b) misuse, mishandling, improper storage, or failure to
              follow ASZ&apos;s or the manufacturer&apos;s instructions; (c)
              processing, alteration, or resale of the Materials after delivery;
              or (d) specifications, instructions, or materials provided by the
              counterparty.
            </p>
            <p>
              10.5 Nothing in this Clause shall exclude or limit liability for:
              (a) death or personal injury caused by negligence; (b) fraud or
              fraudulent misrepresentation; or (c) any other liability that
              cannot be excluded or limited under applicable law.
            </p>
            <p>
              10.6 Any claim against ASZ, whether in contract, tort, statute, or
              otherwise, must be notified in writing within six (6) months of the
              date on which the cause of action arose and in any event prior to
              resale, consumption, or processing of the Materials, failing which
              the claim shall be deemed irrevocably waived.
            </p>

            <h2>11. Governing Law &amp; Dispute Resolution</h2>
            <p>
              11.1 This Contract, and any non-contractual obligations arising out
              of or in connection with it, shall be governed by and construed in
              accordance with the laws of England and Wales, without regard to
              conflict of laws principles.
            </p>
            <p>
              11.2 Default Arbitration Forum &ndash; MMTA Unless otherwise
              specified in the Contract, any dispute, controversy, or claim
              arising out of or relating to this Contract, including its
              validity, interpretation, breach, or termination, shall be resolved
              by arbitration in accordance with the Arbitration Rules of the
              Minor Metals Trade Association (MMTA), as in force on the date of
              commencement of the arbitration, which rules are deemed
              incorporated by reference into this clause. (a) The seat (legal
              place) of arbitration shall be England, and the arbitration shall
              be conducted in the English language. (b) Unless otherwise agreed
              in writing, the arbitration shall be conducted: (i) under the
              Short-Form Arbitration Rules where the total value of the claim
              does not exceed USD 250,000 (or such other limit as in force in the
              MMTA Rules at the time of the dispute); and (ii) under the
              Long-Form Arbitration Rules where the total value of the claim
              exceeds that limit or the dispute is otherwise complex, in which
              case the tribunal shall consist of one arbitrator unless the
              parties agree to three.
            </p>
            <p>
              11.3 Option for LCIA Arbitration For disputes exceeding USD
              5,000,000, or where either party reasonably considers the matter to
              be complex or multi-jurisdictional, ASZ may, at its sole
              discretion, require the dispute to be referred instead to
              arbitration under the Rules of the London Court of International
              Arbitration (LCIA). (a) The LCIA Rules are deemed incorporated by
              reference into this clause. (b) The seat (legal place) of
              arbitration shall be London, England, and the language of the
              arbitration shall be English. (c) The tribunal shall consist of one
              arbitrator unless the parties agree to three.
            </p>
            <p>
              11.4 The decision and award of the arbitrator(s) in either forum
              shall be final and binding on the parties, and judgment on the
              award may be entered and enforced in any court of competent
              jurisdiction.
            </p>
            <p>
              11.5 Notwithstanding Clauses 11.2 and 11.3, ASZ may, at its sole
              discretion, bring proceedings for payment or recovery of amounts
              owed in any court of competent jurisdiction, including the courts
              where the counterparty is incorporated, carries on business, or has
              assets.
            </p>
            <p>
              11.6 The losing party in any dispute shall pay all reasonable
              legal, arbitration, and enforcement costs of the prevailing party.
            </p>

            <h2>12. Notices &amp; Communications</h2>
            <p>
              12.1 Any notice or other communication given under or in connection
              with the Contract shall be in writing and in English.
            </p>
            <p>
              12.2 Notices shall be deemed validly given if delivered by: (a)
              hand, (b) courier, (c) registered or recorded delivery post, or
              (d) email (with delivery/read receipt or confirmation from the
              receiving server), to the address or email address stated in the
              Contract or such other address as may be notified in writing.
            </p>
            <p>
              12.3 Notices shall be deemed to have been received: (a) if
              delivered by hand or courier, at the time of delivery; (b) if sent
              by registered or recorded delivery post, on the second business day
              after posting; and (c) if sent by email, at the time of
              transmission, provided no error or &quot;non-delivery&quot; message
              is received.
            </p>
            <p>
              12.4 For the purposes of this Clause, &quot;business day&quot;
              means a day other than a Saturday, Sunday, or public holiday in the
              place of receipt.
            </p>
            <p>
              12.5 The counterparty shall ensure that ASZ is kept informed at all
              times of its current contact details, including a valid email
              address for contractual correspondence.
            </p>

            <h2>13. Miscellaneous / General Provisions</h2>
            <p>
              13.1 Assignment &ndash; The counterparty shall not assign,
              transfer, charge, or otherwise dispose of any of its rights or
              obligations under the Contract without the prior written consent of
              ASZ. ASZ may assign or subcontract any of its rights or obligations
              at its discretion.
            </p>
            <p>
              13.2 Waiver &ndash; No failure or delay by ASZ in exercising any
              right, power, or remedy shall operate as a waiver of it, nor shall
              any single or partial exercise preclude any further exercise of
              that or any other right, power, or remedy.
            </p>
            <p>
              13.3 Severability &ndash; If any provision of the Contract is or
              becomes invalid, illegal, or unenforceable in any respect under any
              applicable law, the validity, legality, and enforceability of the
              remaining provisions shall not in any way be affected or impaired.
              The parties shall negotiate in good faith to replace the invalid or
              unenforceable provision with a valid provision that most closely
              reflects the original intent and economic effect.
            </p>
            <p>
              13.4 Entire Agreement &ndash; The Contract (including these
              T&amp;Cs) constitutes the entire agreement between the parties and
              supersedes any prior understandings, agreements, negotiations, or
              communications, whether written or oral, relating to its subject
              matter. Each party acknowledges that it has not relied on any
              statement, representation, assurance, or warranty other than as
              expressly set out in the Contract.
            </p>
            <p>
              13.5 Amendments &ndash; No amendment or variation to the Contract
              shall be binding unless made in writing and signed by duly
              authorised representatives of both parties.
            </p>
            <p>
              13.6 Third Party Rights &ndash; A person who is not a party to the
              Contract shall have no rights to enforce any term of the Contract
              under the Contracts (Rights of Third Parties) Act 1999 or
              otherwise.
            </p>
            <p>
              13.7 Counterparts &ndash; The Contract may be executed in
              counterparts, each of which shall be deemed an original, but all of
              which together shall constitute one and the same instrument.
            </p>

            <h2>14. Confidentiality</h2>
            <p>
              14.1 The counterparty shall keep strictly confidential and shall
              not disclose to any third party, without ASZ&apos;s prior written
              consent, any information relating to: (a) the Contract and its
              terms, including pricing, quantities, specifications, and payment
              terms; (b) the Materials; or (c) ASZ&apos;s business affairs,
              operations, or customers.
            </p>
            <p>
              14.2 This obligation does not apply to information that: (a) is or
              becomes public knowledge through no fault of the counterparty; (b)
              is lawfully obtained from a third party without breach of
              confidentiality; or (c) is required to be disclosed by law,
              regulation, or a competent authority, provided that the counterparty
              (where legally permitted) promptly notifies ASZ of such requirement
              before disclosure.
            </p>
            <p>
              14.3 The confidentiality obligations under this Clause shall
              survive termination or completion of the Contract for a period of
              five (5) years.
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
