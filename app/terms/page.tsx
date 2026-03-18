export const metadata = {
  title: 'Terms of Service — BellSense',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-1">Terms of Service</h1>
      <p className="text-sm text-[#9ca3af] mb-10">Effective Date: March 3, 2026</p>

      <p className="text-sm text-[#9ca3af] leading-relaxed mb-10">Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the BellSense mobile application. By accessing or using the App, you agree to be bound by these Terms.</p>

      {[
        {
          title: '1. Acceptance of Terms',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">By downloading, installing, or using the App, you confirm that you have read, understood, and agree to these Terms. We may update these Terms from time to time. Continued use after changes are posted at <strong className="text-[#f0f0f0]">bellsense.app/terms</strong> constitutes acceptance.</p>,
        },
        {
          title: '2. Description of Service',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">BellSense provides kettlebell training feedback using a Bluetooth Low Energy (BLE) connected IMU sensor mounted on a kettlebell. The App processes motion data to provide rep counting, quality scoring, and performance analytics.</p>,
        },
        {
          title: '3. Eligibility',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">You must be at least 13 years of age to use the App. BellSense does not knowingly collect information from children under 13.</p>,
        },
        {
          title: '4. Account Registration',
          content: (
            <div className="text-sm text-[#9ca3af] leading-relaxed">
              <p className="mb-2">To access certain features, you must create an account. You are responsible for:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Maintaining the confidentiality of your credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </div>
          ),
        },
        {
          title: '5. Acceptable Use',
          content: (
            <div className="text-sm text-[#9ca3af] leading-relaxed">
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Reverse engineer or decompile the App or its algorithms</li>
                <li>Copy, redistribute, or create derivative works from the App</li>
                <li>Interfere with or disrupt the App&apos;s infrastructure</li>
                <li>Use the App in any way that violates applicable laws</li>
              </ul>
            </div>
          ),
        },
        {
          title: '6. Health & Safety Disclaimer',
          content: (
            <div className="text-sm text-[#9ca3af] leading-relaxed space-y-2">
              <p><strong className="text-[#f0f0f0]">The App is not a medical device and does not provide medical advice.</strong> Information provided is for general fitness purposes only.</p>
              <p>Always consult a qualified physician before beginning any exercise program, especially if you have pre-existing medical conditions.</p>
              <p>Ensure the sensor is securely mounted before use. Stop exercising immediately if you experience pain, dizziness, or any discomfort.</p>
              <p>BellSense is not liable for any injury resulting from use of the App or participation in any exercise program.</p>
            </div>
          ),
        },
        {
          title: '7. Hardware',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">BellSense is not responsible for hardware defects, malfunctions, or failures, or for any injury resulting from improper mounting or use of the hardware sensor. You assume all risk associated with physical use of the hardware.</p>,
        },
        {
          title: '8. Intellectual Property',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">The App, including all software, algorithms, designs, and content, is owned by BellSense and protected by applicable intellectual property laws. All rights reserved. No license to copy, modify, or distribute the App is granted.</p>,
        },
        {
          title: '9. Disclaimers & Limitation of Liability',
          content: (
            <div className="text-sm text-[#9ca3af] leading-relaxed space-y-2">
              <p>THE APP IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND. BELLSENSE DISCLAIMS ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BELLSENSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE APP.</p>
            </div>
          ),
        },
        {
          title: '10. Changes to Terms & Contact',
          content: (
            <div className="text-sm text-[#9ca3af] leading-relaxed">
              <p className="mb-2">We may update these Terms at any time. Continued use after changes are posted constitutes acceptance.</p>
              <p>Questions? <a href="mailto:support@bellsense.app" className="text-[#e5322d]">support@bellsense.app</a></p>
            </div>
          ),
        },
      ].map((s) => (
        <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
          <h2 className="font-bold mb-3">{s.title}</h2>
          {s.content}
        </div>
      ))}
    </div>
  )
}
