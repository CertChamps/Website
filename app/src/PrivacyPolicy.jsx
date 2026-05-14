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
            <span>Last Updated On 14-May-2026</span>
            <span>Effective Date 14-May-2026</span>
          </h1>

          <p className="privacy-policy-p">
            This Privacy Policy describes the policies of CertChamps, Ireland, email: ben.long@certchamps.ie, on the
            collection, use and disclosure of your information that we collect when you use our website (
            <a href="https://www.certchamps.ie/" className="privacy-policy-a" target="_blank" rel="noopener noreferrer">
              https://www.certchamps.ie/
            </a>
            ). By accessing or using the Service, you are consenting to the collection, use
            and disclosure of your information in accordance with this Privacy Policy. If you do not consent to the
            same, please do not access or use the Service.
          </p>

          <p className="privacy-policy-p">
            We may modify this Privacy Policy at any time without any prior notice to you and will post the revised
            Privacy Policy on the Service. The revised Policy will be effective 180 days from when the revised Policy
            is posted in the Service and your continued access or use of the Service after such time will constitute
            your acceptance of the revised Privacy Policy. We therefore recommend that you periodically review this
            page.
          </p>

          <ol className="privacy-policy-ol privacy-policy-ol-main">
            <li>
              <h2 className="privacy-policy-h2">How We Collect Your Information:</h2>
              <p className="privacy-policy-p">We collect/receive information about you in the following manner:</p>
              <ol className="privacy-policy-ol">
                <li>When a user fills up the registration form or otherwise submits personal information</li>
                <li>Interacts with the website</li>
                <li>From public sources</li>
              </ol>
            </li>

            <li>
              <h2 className="privacy-policy-h2">How We Use Your Information:</h2>
              <p className="privacy-policy-p">We will use the information that we collect about you for the following purposes:</p>
              <ol className="privacy-policy-ol">
                <li>Creating user account</li>
                <li>Processing payment</li>
              </ol>
              <p className="privacy-policy-p">
                If we want to use your information for any other purpose, we will ask you for consent and will use your
                information only on receiving your consent and then, only for the purpose(s) for which you grant consent
                unless we are required to do otherwise by law.
              </p>
            </li>

            <li>
              <h2 className="privacy-policy-h2">How We Share Your Information:</h2>
              <p className="privacy-policy-p">
                We will not transfer your personal information to any third party without seeking your consent, except
                in limited circumstances as described below:
              </p>
              <ol className="privacy-policy-ol">
                <li>Payment recovery services</li>
              </ol>
              <p className="privacy-policy-p">
                We require such third parties to use the personal information we transfer to them only for the purpose
                for which it was transferred and not to retain it for longer than is required for fulfilling the said
                purpose.
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
                To learn more about how we use these and your choices in relation to these tracking technologies, please
                refer to our{" "}
                <a href="https://www.certchamps.ie/privacy" className="privacy-policy-a">
                  Cookie Policy.
                </a>
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
              <h2 className="privacy-policy-h2">Grievance / Data Protection Officer:</h2>
              <p className="privacy-policy-p">
                If you have any queries or concerns about the processing of your information that is available with us,
                you may email our Grievance Officer at CertChamps, email: ben.long@certchamps.ie. We will address your
                concerns in accordance with applicable law.
              </p>
            </li>
          </ol>

        </div>
      </div>
    </div>
  );
}
