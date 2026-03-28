"use client";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import * as motion from "motion/react-client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pb-20">


      {/* Contact Section */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-8 max-w-6xl mx-auto">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4">Get in Touch</h2>
                <div className="flex flex-row flex-wrap lg:flex-col gap-4 md:space-y-4">
                  <div className="flex items-start gap-3 w-full sm:w-[calc(50%-0.5rem)] lg:w-full">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Our Office</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        11-B/ 18, DADANAGAR <br />
                        KANPUR UTTAR PRADESH 208022
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 w-full sm:w-[calc(50%-0.5rem)] lg:w-full">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Phone</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        +91 8318005329<br />
                        Mon-Fri, 9am - 6pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 w-full sm:w-[calc(50%-0.5rem)] lg:w-full">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Email</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        info@vsenterprises.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-3 bg-white dark:bg-zinc-950 p-6 rounded-[2rem] border border-border shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4">Send us a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-xs font-medium text-foreground">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First name"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-xs font-medium text-foreground">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last name"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-medium text-foreground">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-xs font-medium text-foreground">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-medium text-foreground">Message</label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Write your message here..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={() => alert("This is a dummy contact form for demonstration.")}
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
