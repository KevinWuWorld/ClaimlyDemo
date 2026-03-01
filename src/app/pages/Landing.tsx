import { useNavigate } from "react-router";
import { ArrowRight, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">PI Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/firm-login")}>
              Law Firm Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Get Expert Legal Help for Your Personal Injury Case
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect with top-rated personal injury attorneys in your area. 
            Get your case evaluated and matched with the right legal representation.
          </p>
          <Button 
            onClick={() => navigate("/intake")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg h-14 px-8"
          >
            Start Free Case Intake
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-slate-500 mt-4">
            Takes 3-5 minutes • 100% confidential • No obligation
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Quick & Easy Process</h3>
            <p className="text-sm text-slate-600">
              Our AI-powered intake takes just minutes to complete
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Matched to Top Firms</h3>
            <p className="text-sm text-slate-600">
              Get connected with experienced attorneys who specialize in your case type
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">No Fees Unless You Win</h3>
            <p className="text-sm text-slate-600">
              Most personal injury attorneys work on contingency
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tell Us About Your Case</h3>
                <p className="text-slate-600">
                  Answer a few questions about your injury and incident details
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">See Your Case Projections</h3>
                <p className="text-slate-600">
                  View estimated timelines and potential outcomes based on similar cases
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Connect with Top Attorneys</h3>
                <p className="text-slate-600">
                  Review matched law firms and send your case to up to 3 firms
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Your Case</h3>
                <p className="text-slate-600">
                  Communicate, share documents, and track progress all in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-slate-500 space-y-2">
            <p className="font-medium text-slate-700">Important Legal Information</p>
            <p>
              This platform provides information and connections to legal professionals 
              but does not provide legal advice.
            </p>
            <p>
              Your information is confidential and protected. We never sell your data.
            </p>
            <p className="text-xs mt-4">
              © 2026 PI Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
