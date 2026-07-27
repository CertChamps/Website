import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="w-full bg-light-grey min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
        <p className="text-sm text-dark-grey mb-6">
          <Link to="/" className="text-blue hover:underline">Home</Link>
          <span className="mx-2 text-grey">/</span>
          <span>Terms of Service</span>
        </p>

        <article className="privacy-policy-doc bg-white rounded-xl border border-grey/25 shadow-sm px-6 py-8 md:px-10 md:py-10">
          <h1 className="privacy-policy-h1">
            Terms of Service
            <span>Last Updated On 27-July-2026</span>
            <span>Effective Date 27-July-2026</span>
          </h1>

          <p className="privacy-policy-p">
            These Terms of Service (“Terms”) govern your access to and use of the CertChamps
            websites, applications and related services (together, the “Service”). The Service is
            operated by CertChamps in Ireland. By creating an account or using the Service, you
            agree to these Terms.
          </p>

          <ol className="privacy-policy-ol privacy-policy-ol-main">
            <li>
              <h2 className="privacy-policy-h2">Eligibility and accounts</h2>
              <p className="privacy-policy-p">
                You must provide accurate account information and keep your sign-in details secure.
                You are responsible for activity carried out through your account. If you are under
                18, you confirm that a parent or guardian has reviewed these Terms and permitted you
                to use the Service. Contact us promptly if you believe your account has been accessed
                without permission.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Educational service</h2>
              <p className="privacy-policy-p">
                CertChamps provides study tools, practice materials, progress features, whiteboards,
                community features and AI-assisted educational support. The Service is a study aid
                and does not replace teaching, official examination guidance or professional advice.
                We do not guarantee any examination result.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">AI-assisted features</h2>
              <p className="privacy-policy-p">
                AI-generated explanations, marking, matching and feedback may be incomplete or
                incorrect. You should check important answers against trusted course materials,
                marking schemes or a teacher. Usage allowances and fair-use limits may apply and may
                differ between free and paid plans.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Acceptable use</h2>
              <p className="privacy-policy-p">You must not:</p>
              <ol className="privacy-policy-ol">
                <li>use the Service unlawfully, fraudulently or to harm another person;</li>
                <li>harass users or upload abusive, infringing or inappropriate material;</li>
                <li>attempt to bypass access controls, usage limits or security measures;</li>
                <li>scrape, copy or redistribute substantial parts of the Service or question bank;</li>
                <li>interfere with the Service or use automated systems in a way that creates unreasonable load; or</li>
                <li>share, sell or transfer an account without our permission.</li>
              </ol>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Your content</h2>
              <p className="privacy-policy-p">
                You retain ownership of content you create or upload. You give CertChamps a
                non-exclusive licence to host, store, process, reproduce and display that content
                only as needed to operate, secure and improve the Service and provide features you
                request. Content you choose to post publicly may be seen and shared by other users.
                You must have the rights required to upload your content.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">CertChamps content</h2>
              <p className="privacy-policy-p">
                The Service, software, branding, interface and original materials are owned by or
                licensed to CertChamps. We grant you a personal, limited, revocable,
                non-transferable right to use the Service for your own educational purposes. This
                does not transfer ownership of any CertChamps intellectual property.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Subscriptions and payments</h2>
              <p className="privacy-policy-p">
                Paid plans are billed at the price and interval shown before purchase. Unless stated
                otherwise, subscriptions renew automatically until cancelled. You can cancel through
                the payment provider used for the purchase, such as the Stripe billing portal or
                Apple App Store subscription settings. Cancellation normally takes effect at the end
                of the current paid period.
              </p>
              <p className="privacy-policy-p">
                Refunds and withdrawal rights are handled in accordance with applicable consumer law
                and, where relevant, the rules of the payment provider. Nothing in these Terms limits
                your mandatory consumer rights.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Availability and changes</h2>
              <p className="privacy-policy-p">
                We work to keep the Service available but cannot promise uninterrupted or error-free
                operation. We may maintain, update, replace or discontinue features. Where a change
                materially affects a paid Service or these Terms, we will provide reasonable notice
                where required.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Third-party services</h2>
              <p className="privacy-policy-p">
                Some features depend on third parties, including identity, payment, music, hosting
                and AI providers. Their own terms may apply when you use those services. CertChamps
                is not responsible for third-party services outside our control.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Suspension and termination</h2>
              <p className="privacy-policy-p">
                You may stop using the Service or delete your account through account settings. We
                may restrict or suspend access where reasonably necessary to protect users, comply
                with law, address non-payment or respond to a serious or repeated breach of these
                Terms. Where appropriate, we will provide notice and an opportunity to resolve the
                issue.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Liability</h2>
              <p className="privacy-policy-p">
                To the extent permitted by law, CertChamps is not responsible for indirect or
                unforeseeable losses arising from use of the Service. We do not exclude or limit
                liability where doing so would be unlawful, including liability for fraud or any
                mandatory rights available to consumers.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Privacy</h2>
              <p className="privacy-policy-p">
                Our{" "}
                <Link to="/privacy" className="privacy-policy-a">
                  Privacy Policy
                </Link>{" "}
                explains how we collect and use personal information.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Changes to these Terms</h2>
              <p className="privacy-policy-p">
                We may update these Terms as the Service changes. We will identify the current
                version by its effective date and, for material changes, ask registered users to
                review and accept the updated Terms before continuing.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Governing law and contact</h2>
              <p className="privacy-policy-p">
                These Terms are governed by Irish law, without depriving consumers of mandatory
                protections that apply where they live. Questions about these Terms can be sent to{" "}
                <a href="mailto:ben.long@certchamps.ie" className="privacy-policy-a">
                  ben.long@certchamps.ie
                </a>.
              </p>
            </li>
          </ol>
        </article>
      </div>
    </div>
  );
}
