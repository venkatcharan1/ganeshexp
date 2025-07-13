
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              Dropshipping Academy
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
                <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Privacy Policy</h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                <p className="text-gray-300 leading-relaxed">
                  At our Dropshipping Academy, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This privacy policy outlines how we collect, use, and protect your data when you visit our dropshipping educational website and access our free course materials.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We may collect the following types of information: personal identification information (name, email address, phone number), 
                  demographic information, and technical information about your device and browsing behavior to improve our dropshipping content, course delivery, and user experience.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information we collect is used to enhance your learning experience on our dropshipping platform and provide you with the best educational content. We use your data to:
                  personalize dropshipping course recommendations, send educational newsletters about the latest dropshipping strategies and market trends, respond to your dropshipping-related inquiries, 
                  and improve our website functionality and course content quality.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Provide personalized dropshipping tutorials and course recommendations</li>
                  <li>• Send updates about new video content and proven dropshipping strategies</li>
                  <li>• Respond to your dropshipping questions and provide educational support</li>
                  <li>• Analyze website usage to improve your learning experience</li>
                  <li>• Ensure website security and prevent fraudulent activities</li>
                  <li>• Deliver our free dropshipping course materials effectively</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Data Protection and Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. 
                  Our dropshipping educational platform uses industry-standard encryption and security protocols to safeguard your data and ensure your learning experience is secure.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We regularly update our security measures and conduct security audits to ensure the highest level of protection for our dropshipping students' 
                  information. Your trust is essential to our mission of providing quality dropshipping education and free course materials.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Cookies and Tracking</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website uses cookies to enhance your browsing experience and provide personalized dropshipping content. These cookies help us understand 
                  your preferences for dropshipping topics, course progress, and improve our content delivery. You can control cookie settings through your browser preferences.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We may use analytics tools to track website usage patterns, popular dropshipping course modules, and user engagement metrics. 
                  This information helps us create better educational content, improve our free course materials, and enhance our platform's functionality.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Third-Party Services</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may integrate with third-party services such as YouTube for hosting our dropshipping tutorial videos, social media platforms for community building, and analytics providers to enhance our 
                  dropshipping educational content. These services have their own privacy policies, and we encourage you to review them.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We do not sell, trade, or transfer your personal information to third parties without your consent, except as described in this policy 
                  or when required by law to protect our rights or comply with legal obligations related to our dropshipping educational services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Your Rights and Choices</h2>
                <p className="text-gray-300 leading-relaxed">
                  You have the right to access, update, or delete your personal information. You can unsubscribe from our educational newsletters about dropshipping 
                  at any time and request removal of your data from our systems. We respect your privacy choices and will honor your requests promptly while ensuring you can still access our free course materials.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this privacy policy or how we handle your information in relation to our dropshipping courses, please contact us through our website's 
                  contact form. We are committed to transparency and will address your concerns regarding your privacy and data protection.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Updates to This Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this privacy policy periodically to reflect changes in our practices, new course offerings, or legal requirements. 
                  Any significant changes will be communicated to our dropshipping students through email notifications or website announcements.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By continuing to use our dropshipping educational platform and accessing our free course materials, you acknowledge that you have read and understood this privacy policy 
                  and agree to our data handling practices as described herein.
                </p>
              </section>

              <div className="mt-12 p-6 bg-blue-600/20 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Last Updated:</strong> December 2024<br/>
                  <strong>Contact:</strong> For privacy-related inquiries about our dropshipping courses, please use our contact form or reach out at telugudropshipper@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
