import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-light-grey min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
        <p className="text-sm text-dark-grey mb-6">
          <Link to="/" className="text-blue hover:underline">
            Home
          </Link>
          <span className="mx-2 text-grey">/</span>
          <span>Privacy Policy</span>
        </p>

        <div className="privacy-policy-doc bg-white rounded-xl border border-grey/25 shadow-sm px-6 py-8 md:px-10 md:py-10">
          <h1 className="privacy-policy-h1">
            Privacy Policy
            <span>Last Updated On 27-July-2026</span>
            <span>Effective Date 27-July-2026</span>
          </h1>

          <p className="privacy-policy-p">
            This Privacy Policy explains how CertChamps, Ireland, email: ben.long@certchamps.ie, collects, uses,
            stores and shares personal information when you use our websites, applications and related services (
            <a href="https://www.certchamps.ie/" className="privacy-policy-a" target="_blank" rel="noopener noreferrer">
              https://www.certchamps.ie/
            </a>
            ) (the “Service”). This Policy is a transparency notice. Where we rely on consent for a particular
            activity, we will ask for it separately; other processing may be necessary to provide the Service,
            comply with law or pursue a legitimate interest.
          </p>

          <p className="privacy-policy-p">
            We may update this Privacy Policy as the Service and our processing change. We will publish the revised
            Policy with a new effective date and provide additional notice where a change is material or the law
            requires it.
          </p>

          <ol className="privacy-policy-ol privacy-policy-ol-main">
            <li>
              <h2 className="privacy-policy-h2">Information We Collect:</h2>
              <p className="privacy-policy-p">Depending on how you use the Service, we may collect:</p>
              <ol className="privacy-policy-ol">
                <li>account information, such as username, email address, profile image and sign-in provider;</li>
                <li>study activity, progress, saved questions, decks, subjects and preferences;</li>
                <li>content you create or upload, including posts, replies, drawings, whiteboards and attachments;</li>
                <li>AI requests, relevant question context, images supplied to AI features and generated responses;</li>
                <li>subscription status and transaction identifiers supplied by payment providers;</li>
                <li>support messages, feedback and communications with us;</li>
                <li>technical information needed to operate and secure the Service; and</li>
                <li>information received from services you choose to connect, such as Google, Apple or Spotify.</li>
              </ol>
            </li>

            <li>
              <h2 className="privacy-policy-h2">How We Use Your Information:</h2>
              <p className="privacy-policy-p">We use personal information to:</p>
              <ol className="privacy-policy-ol">
                <li>create, authenticate and maintain accounts;</li>
                <li>provide study, progress, community, whiteboard and AI-assisted features;</li>
                <li>save preferences and synchronise content across devices;</li>
                <li>process and manage subscriptions and purchases;</li>
                <li>moderate content, prevent misuse and protect the security of the Service;</li>
                <li>respond to support requests and communicate important service information;</li>
                <li>understand performance and improve the Service; and</li>
                <li>comply with legal obligations and enforce our Terms of Service.</li>
              </ol>
              <p className="privacy-policy-p">
                The legal basis used depends on the activity and may include performance of our contract with you,
                compliance with a legal obligation, our legitimate interests or your consent. Where processing is
                based on consent, you may withdraw that consent without affecting earlier lawful processing.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">How We Share Your Information:</h2>
              <p className="privacy-policy-p">
                We share information only where needed to provide and protect the Service, complete a transaction,
                follow your instructions or comply with law. Provider access is limited to the relevant service.
              </p>
              <ol className="privacy-policy-ol">
                <li>Google Firebase and related cloud services for authentication, databases, storage and hosting;</li>
                <li>OpenRouter and selected AI model providers for AI-assisted requests;</li>
                <li>Stripe, Apple and RevenueCat for purchases, subscription status and billing management;</li>
                <li>Spotify when you choose to connect Spotify features;</li>
                <li>service providers supporting security, communications or technical operations; and</li>
                <li>authorities or professional advisers where disclosure is required or permitted by law.</li>
              </ol>
              <p className="privacy-policy-p">
                We do not sell personal information. Some providers may process information outside Ireland or the
                European Economic Area. Where required, we use an appropriate transfer mechanism or rely on another
                lawful safeguard.
              </p>
              <p className="privacy-policy-p">
                We may also disclose your personal information for the following: (1) to comply with applicable law,
                regulation, court order or other legal process; (2) to enforce your agreements with us, including this
                Privacy Policy; or (3) to respond to claims that your use of the Service violates any third-party
                rights. If the Service or our company is merged or acquired with another company, your information will
                be one of the assets that is transferred to the new owner.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Retention:</h2>
              <p className="privacy-policy-p">
                We retain account information and user content while your account is active and for as long as needed
                to provide the Service. Some information may be retained for longer where necessary for security,
                dispute resolution, payment records or legal compliance. When information is no longer needed, we
                delete or anonymise it in line with our operational and legal requirements.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Your Rights:</h2>
              <p className="privacy-policy-p">
                Depending on the law that applies, you may have a right to access and rectify or erase your personal data
                or receive a copy of your personal data, restrict or object to the active processing of your data, ask
                us to share (port) your personal information to another entity, withdraw any consent you provided to us
                to process your data, a right to lodge a complaint with a statutory authority and such other rights as
                may be relevant under applicable laws. To exercise these rights, you can write to us at{" "}
                <a href="mailto:ben.long@certchamps.ie" className="privacy-policy-a">
                  ben.long@certchamps.ie
                </a>
                . We will respond to your request in accordance with applicable law.
              </p>
              <p className="privacy-policy-p">
                Do note that if you do not allow us to collect or process the required personal information or withdraw
                the consent to process the same for the required purposes, you may not be able to access or use the
                services for which your information was sought.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Cookies Etc.</h2>
              <p className="privacy-policy-p">
                We use cookies, local storage and similar technologies where needed to keep you signed in, remember
                settings, secure the Service and provide requested functionality. We also use Google Analytics to
                understand how the marketing site and web app are used. Analytics cookies are only stored after you
                accept them in the consent banner. You can decline analytics; essential cookies for sign-in and
                security continue to work either way.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Security:</h2>
              <p className="privacy-policy-p">
                The security of your information is important to us and we will use reasonable security measures to
                prevent the loss, misuse or unauthorized alteration of your information under our control. However,
                given the inherent risks, we cannot guarantee absolute security and consequently, we cannot ensure or
                warrant the security of any information you transmit to us and you do so at your own risk.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">Contact and Data Protection Queries:</h2>
              <p className="privacy-policy-p">
                If you have any queries or concerns about the processing of your information that is available with us,
                you may email CertChamps at ben.long@certchamps.ie. We will address your concerns in accordance with
                applicable law.
              </p>
            </li>
          </ol>

        </div>
      </div>
    </div>
  );
}
