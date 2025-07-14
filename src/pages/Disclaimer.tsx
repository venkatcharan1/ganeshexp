
import Footer from "@/components/Footer";
import { Youtube, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-white">
              <Youtube className="h-6 md:h-8 w-6 md:w-8 text-red-600" />
              <span>Dropshipping Academy</span>
            </div>
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Home</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Contact</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Terms & Conditions</Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Disclaimer</Link>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <details className="dropdown">
                <summary className="text-white cursor-pointer list-none">
                  <Menu className="h-6 w-6" />
                </summary>
                <div className="absolute right-4 top-16 bg-slate-900 rounded-lg p-4 space-y-2 border border-white/10">
                  <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
                  <Link to="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                  <Link to="/terms-conditions" className="block text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
                  <Link to="/disclaimer" className="block text-gray-300 hover:text-white transition-colors">Disclaimer</Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Disclaimer</h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-6">
              
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">Educational Purpose Only</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information provided on Dropshipping Academy's educational website is for general informational and educational purposes only. 
                  Our content, including videos, tutorials, and written materials, should not be considered as professional business advice, 
                  financial advice, or guaranteed strategies for success.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  While we strive to provide accurate and up-to-date information about dropshipping, e-commerce, and online business strategies, 
                  the digital marketplace is constantly evolving, and what works today may not work tomorrow. Always conduct your own research 
                  and consider consulting with qualified professionals before making business decisions.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">No Guarantee of Results</h2>
                <p className="text-gray-300 leading-relaxed">
                  Dropshipping Academy makes no representations or warranties regarding the outcome of following our dropshipping education and strategies. 
                  Business success depends on numerous factors including but not limited to market conditions, individual effort, starting capital, 
                  business acumen, and external economic factors beyond our control.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Any income examples, success stories, or case studies presented in our content are individual results and should not be interpreted 
                  as typical or average results. Your results may vary significantly, and there is no guarantee that you will achieve similar outcomes 
                  by implementing the strategies discussed in our educational materials.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Risk Acknowledgment</h2>
                <p className="text-gray-300 leading-relaxed">
                  Dropshipping and e-commerce businesses involve inherent risks, including but not limited to financial loss, market volatility, 
                  competition, supplier issues, and changing consumer preferences. You acknowledge and accept these risks when implementing any 
                  strategies or advice from our educational content.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Financial investment may result in partial or total loss</li>
                  <li>• Market conditions can change rapidly and unpredictably</li>
                  <li>• Competition in dropshipping markets is intense</li>
                  <li>• Supplier relationships may be unreliable or change</li>
                  <li>• Legal and regulatory requirements vary by jurisdiction</li>
                  <li>• Platform policies (like Facebook, Google) can change affecting marketing strategies</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Third-Party Information and Links</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website may contain references to third-party tools, platforms, suppliers, or services. These references are provided for 
                  educational purposes only and do not constitute endorsements. We are not responsible for the accuracy, reliability, or performance 
                  of any third-party services or products mentioned in our content.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  External links to other websites are provided for convenience and informational purposes only. We do not control the content 
                  of these external sites and are not responsible for their content, privacy policies, or business practices.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Legal and Compliance Responsibility</h2>
                <p className="text-gray-300 leading-relaxed">
                  Users are solely responsible for ensuring their business practices comply with all applicable laws, regulations, and platform policies 
                  in their jurisdiction. This includes but is not limited to business registration, tax obligations, consumer protection laws, 
                  advertising standards, and international trade regulations.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Dropshipping Academy does not provide legal advice and strongly recommends consulting with qualified legal and tax professionals before 
                  starting any dropshipping or e-commerce business. Laws and regulations vary significantly by location and are subject to change.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Platform and Technology Changes</h2>
                <p className="text-gray-300 leading-relaxed">
                  The digital landscape, including social media platforms, advertising networks, e-commerce platforms, and search engines, 
                  frequently updates their algorithms, policies, and features. Strategies that are effective at the time of our content creation 
                  may become less effective or obsolete due to these changes.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We cannot predict or control changes made by third-party platforms and are not responsible for any negative impact these changes 
                  may have on your business operations or the effectiveness of strategies taught in our educational materials.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Personal Responsibility</h2>
                <p className="text-gray-300 leading-relaxed">
                  By using our educational content, you acknowledge that you are solely responsible for your business decisions and their consequences. 
                  You agree to conduct due diligence, seek professional advice when appropriate, and make informed decisions based on your specific 
                  circumstances and risk tolerance.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Dropshipping Academy encourages continuous learning, adaptation, and ethical business practices. Success in dropshipping requires dedication, 
                  continuous effort, and the ability to adapt to changing market conditions and consumer needs.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Content Accuracy and Updates</h2>
                <p className="text-gray-300 leading-relaxed">
                  While we make every effort to ensure the accuracy and relevance of our educational content, information may become outdated as 
                  the dropshipping and e-commerce landscape evolves. We reserve the right to modify, update, or remove content without prior notice.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Users should verify current information and best practices independently, especially regarding platform policies, tools, 
                  and market conditions before implementing any strategies discussed in our educational materials.
                </p>
              </section>

              <div className="mt-12 p-6 bg-blue-600/20 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Last Updated:</strong> December 2024<br/>
                  <strong>Important:</strong> This disclaimer is an integral part of our Terms of Service. By using our website and educational content, 
                  you acknowledge that you have read, understood, and agreed to this disclaimer.
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

export default Disclaimer;
