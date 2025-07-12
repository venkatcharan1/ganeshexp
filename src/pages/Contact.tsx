
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about dropshipping? Need help with your e-commerce journey? 
                We're here to help you succeed in your online business venture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
                  <p className="text-muted-foreground mb-6">
                    Whether you're a beginner looking to start your dropshipping journey or an experienced entrepreneur 
                    seeking advanced strategies, we're here to provide guidance and support.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's your message about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your dropshipping questions or how we can help you..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground mb-6">
                    Ready to transform your entrepreneurial dreams into reality? Connect with us through multiple channels 
                    and join our community of successful dropshipping entrepreneurs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-muted-foreground mb-2">
                        Get detailed answers to your dropshipping questions
                      </p>
                      <a href="mailto:support@ganeshdrsr.com" className="text-red-600 hover:text-red-700">
                        support@ganeshdrsr.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Consultation</h3>
                      <p className="text-muted-foreground mb-2">
                        Schedule a call for personalized dropshipping guidance
                      </p>
                      <a href="tel:+1-555-DROPSHIP" className="text-red-600 hover:text-red-700">
                        +1 (555) DROP-SHIP
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Address</h3>
                      <p className="text-muted-foreground mb-2">
                        Visit us for in-person consultations and workshops
                      </p>
                      <address className="text-muted-foreground not-italic">
                        123 E-commerce Boulevard<br />
                        Digital Business District<br />
                        Entrepreneurship City, EC 12345
                      </address>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Dropshipping Support Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Quick Response Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    We understand that timing is crucial in dropshipping. That's why we guarantee a response to all 
                    inquiries within 24 hours during business days. For urgent matters, please mention "URGENT" in your subject line.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">How quickly can I start dropshipping?</h3>
                    <p className="text-muted-foreground text-sm">
                      With our step-by-step guidance, most beginners can set up their first dropshipping store within 7-14 days. 
                      The timeline depends on your dedication and the complexity of your chosen niche.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Do I need a large budget to start?</h3>
                    <p className="text-muted-foreground text-sm">
                      One of the biggest advantages of dropshipping is its low startup cost. You can start with as little as $500-$1000 
                      for essential tools, advertising, and initial testing.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What makes your teaching different?</h3>
                    <p className="text-muted-foreground text-sm">
                      Our approach focuses on practical, tested strategies rather than theoretical concepts. We provide real case studies, 
                      current market insights, and hands-on guidance based on actual successful dropshipping businesses.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Is dropshipping still profitable in 2024?</h3>
                    <p className="text-muted-foreground text-sm">
                      Absolutely! While the market has become more competitive, there are still tremendous opportunities for those who 
                      understand current trends, consumer behavior, and effective marketing strategies.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer one-on-one mentoring?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer personalized mentoring sessions for serious entrepreneurs. These sessions include business analysis, 
                      strategy development, and ongoing support throughout your dropshipping journey.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Can I succeed without technical skills?</h3>
                    <p className="text-muted-foreground text-sm">
                      Definitely! Our tutorials are designed for complete beginners. We'll teach you everything from setting up your store 
                      to managing orders, with no technical background required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
