export const metadata = {
  title: 'Privacy Policy — BellSense',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-1">Privacy Policy</h1>
      <p className="text-sm text-[#9ca3af] mb-10">Effective Date: February 27, 2026 — Last Updated: March 16, 2026</p>

      <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">BellSense (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the BellSense mobile application (the &ldquo;App&rdquo;). This Privacy Policy explains how we collect, use, store, and safeguard your information when you use the App.</p>
      <p className="text-sm text-[#9ca3af] leading-relaxed mb-10">We may update this policy periodically. Continued use of the App after changes are posted constitutes your acceptance of the updated policy.</p>

      {[
        {
          title: '1. Overview',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">This Privacy Policy describes how BellSense collects, uses, and protects your data in connection with the use of the App and related hardware.</p>,
        },
        {
          title: '2. Information We Collect',
          content: (
            <div className="space-y-4 text-sm text-[#9ca3af]">
              <div>
                <h3 className="font-semibold text-[#f0f0f0] uppercase tracking-wider text-xs mb-2">A. Account Information</h3>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Name</li><li>Email address</li><li>Login credentials</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f0f0f0] uppercase tracking-wider text-xs mb-2">B. Workout &amp; Sensor Data</h3>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Repetition counts</li>
                  <li>Exercise type</li>
                  <li>Session duration and timestamps</li>
                  <li>Performance metrics derived from motion sensor (IMU) data</li>
                  <li>Heart rate data when a compatible Bluetooth heart rate monitor is connected</li>
                </ul>
                <p className="mt-2">If you enable the optional &ldquo;Contribute Training Data&rdquo; setting, a raw binary recording of sensor readings may be uploaded to our secure cloud infrastructure. This feature is off by default and entirely opt-in.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#f0f0f0] uppercase tracking-wider text-xs mb-2">C. User Feedback Data</h3>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Subjective workout feel ratings (1–5 scale)</li>
                  <li>Free-text notes</li>
                  <li>Manual rep count corrections</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f0f0f0] uppercase tracking-wider text-xs mb-2">D. Device &amp; Diagnostic Data</h3>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Device model</li><li>iOS version</li><li>App version</li><li>Crash reports</li><li>Performance logs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f0f0f0] uppercase tracking-wider text-xs mb-2">E. Analytics Data</h3>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Usage behavior</li><li>Feature interaction</li><li>Aggregated analytics via Firebase</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          title: '3. Services Used',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">BellSense uses Google Firebase for authentication, cloud data storage, file storage, analytics, and crash reporting. This includes Firebase Authentication, Firestore, Firebase Storage, and Crashlytics. Data may be processed on secure cloud infrastructure operated by Google.</p>,
        },
        {
          title: '4. How We Use Information',
          content: (
            <ul className="list-disc list-inside space-y-1 text-sm text-[#9ca3af] leading-relaxed">
              <li>Provide workout tracking functionality</li>
              <li>Generate performance analytics</li>
              <li>Sync workout history across devices</li>
              <li>Improve rep detection and fatigue prediction accuracy</li>
              <li>Build personalized movement baselines</li>
              <li>Debug crashes and improve stability</li>
              <li>Communicate product updates</li>
              <li>Respond to support inquiries</li>
            </ul>
          ),
        },
        {
          title: '5. Optional Training Data Contribution',
          content: (
            <div className="space-y-3 text-sm text-[#9ca3af] leading-relaxed">
              <p>You may opt in to contribute anonymized sensor data to help improve exercise detection accuracy. This feature is <strong className="text-[#f0f0f0]">disabled by default</strong> and can be enabled via <strong className="text-[#f0f0f0]">Settings → Personal Info → Contribute Training Data</strong>.</p>
              <p>Uploaded recordings contain motion sensor data only — no audio, video, location, or personal identifiers. Files are stored under your account ID and are not shared with third parties.</p>
              <p>Disabling the toggle stops all future captures immediately. To request early deletion of uploaded sensor files, contact <a href="mailto:support@bellsense.app" className="text-[#e5322d]">support@bellsense.app</a>.</p>
            </div>
          ),
        },
        {
          title: '6. Data Storage',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">Workout and account data are stored locally on your device and in secure cloud infrastructure. Reasonable administrative, technical, and physical safeguards are implemented to protect your data.</p>,
        },
        {
          title: '7. Data Sharing',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">We do not sell personal information. Data may be shared with service providers strictly for hosting, analytics, or infrastructure support, or if required by law.</p>,
        },
        {
          title: '8. Data Retention & Deletion',
          content: (
            <div className="space-y-2 text-sm text-[#9ca3af] leading-relaxed">
              <p>We retain data only as long as necessary to provide services.</p>
              <p>Users may delete their account and all associated data at any time via <strong className="text-[#f0f0f0]">Settings → Delete Account</strong>, or by contacting <a href="mailto:support@bellsense.app" className="text-[#e5322d]">support@bellsense.app</a>.</p>
            </div>
          ),
        },
        {
          title: '9. Beta Testing',
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">During beta testing via TestFlight, Apple may provide crash logs and limited diagnostic information. This section will be removed upon full App Store release.</p>,
        },
        {
          title: "10. Children's Privacy",
          content: <p className="text-sm text-[#9ca3af] leading-relaxed">BellSense is not intended for individuals under 13 years of age. We do not knowingly collect data from children.</p>,
        },
        {
          title: '11. Contact',
          content: (
            <div className="text-sm text-[#9ca3af]">
              <p>For privacy-related inquiries: <a href="mailto:support@bellsense.app" className="text-[#e5322d]">support@bellsense.app</a></p>
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
