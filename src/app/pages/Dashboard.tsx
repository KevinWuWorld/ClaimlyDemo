import { useNavigate } from "react-router";
import { Clock, CheckCircle, XCircle, FileText, ArrowRight, Bell } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockFirms } from "../data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock case requests
  const requests = [
    { firmId: "1", status: "Contract signed" as const, timestamp: "Feb 1, 2026" },
    { firmId: "2", status: "Contacted" as const, timestamp: "Feb 1, 2026" },
    { firmId: "3", status: "Sent" as const, timestamp: "Feb 1, 2026" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sent</Badge>;
      case "Contacted":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Contacted</Badge>;
      case "Declined":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declined</Badge>;
      case "Contract signed":
        return <Badge className="bg-green-600 text-white">Contract Signed</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sent":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "Contacted":
        return <Bell className="h-5 w-5 text-purple-600" />;
      case "Declined":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "Contract signed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-slate-600">Track your case requests and communications</p>
        </div>

        {/* What to Expect Next */}
        <Card className="p-6 mb-8 bg-blue-50 border-blue-100">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            What to Expect Next
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-semibold">•</span>
              Law firms typically respond within 24-48 hours
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-semibold">•</span>
              You'll receive notifications when firms review your case
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-semibold">•</span>
              Once a contract is signed, your case workspace will become available
            </li>
          </ul>
        </Card>

        {/* Case Requests */}
        <div>
          <h2 className="font-semibold mb-4">Your Case Requests</h2>
          <div className="space-y-4">
            {requests.map((request) => {
              const firm = mockFirms.find(f => f.id === request.firmId)!;
              
              return (
                <Card key={request.firmId} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          {getStatusIcon(request.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{firm.name}</h3>
                          <p className="text-sm text-slate-600">Sent {request.timestamp}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-4">
                        {getStatusBadge(request.status)}
                        {request.status === "Contract signed" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Workspace Active
                          </Badge>
                        )}
                      </div>

                      {request.status === "Contract signed" && (
                        <p className="text-sm text-green-700 bg-green-50 rounded p-3 mb-4">
                          <CheckCircle className="h-4 w-4 inline mr-2" />
                          Your attorney has been assigned. You can now communicate and share documents in your case workspace.
                        </p>
                      )}

                      {request.status === "Contacted" && (
                        <p className="text-sm text-purple-700 bg-purple-50 rounded p-3 mb-4">
                          <Bell className="h-4 w-4 inline mr-2" />
                          {firm.name} has reviewed your case and will be in touch soon via email or phone.
                        </p>
                      )}

                      {request.status === "Sent" && (
                        <p className="text-sm text-blue-700 bg-blue-50 rounded p-3 mb-4">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Your case has been sent to {firm.name}. They typically respond within 24-48 hours.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 sm:items-end">
                      {request.status === "Contract signed" && (
                        <Button 
                          onClick={() => navigate("/case/1")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Open Workspace
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/firm/${firm.id}`)}
                      >
                        View Firm Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Empty State (if no requests) */}
        {requests.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="font-semibold text-lg mb-2">No Case Requests Yet</h3>
            <p className="text-slate-600 mb-6">
              Start by completing your case intake to get matched with law firms
            </p>
            <Button onClick={() => navigate("/intake")} className="bg-blue-600 hover:bg-blue-700">
              Start Case Intake
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
