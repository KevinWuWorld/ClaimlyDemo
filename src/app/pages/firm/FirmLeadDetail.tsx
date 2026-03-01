import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, User, MapPin, Calendar, FileText, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { mockLeads, mockIntakeQuestions } from "../../data/mockData";
import { toast } from "sonner";

export default function FirmLeadDetail() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const lead = mockLeads.find(l => l.id === leadId);
  const [status, setStatus] = useState(lead?.status || "New");

  if (!lead) {
    return <div>Lead not found</div>;
  }

  const handleStatusChange = (newStatus: typeof status) => {
    setStatus(newStatus);
    toast.success(`Lead marked as ${newStatus}`);
    if (newStatus === "Contract signed") {
      setTimeout(() => {
        navigate(`/firm/case/${leadId}`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header type="firm" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/firm/leads")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leads
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{lead.incidentType}</h1>
                  <p className="text-sm text-slate-600">Received {lead.timeReceived}</p>
                </div>
                <Badge 
                  className={
                    status === "New" ? "bg-blue-600" :
                    status === "Contacted" ? "bg-purple-600" :
                    status === "Contract signed" ? "bg-green-600" :
                    "bg-red-600"
                  }
                >
                  {status}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Estimated Value</p>
                  <p className="font-semibold text-lg">{lead.estimatedValue}</p>
                </div>
                <div>
                  <p className="text-slate-600">Location (ZIP)</p>
                  <p className="font-semibold text-lg">{lead.zip}</p>
                </div>
              </div>
            </Card>

            {/* Case Summary */}
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Case Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Incident Type</p>
                  <p className="font-medium">{lead.caseSummary.incidentType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Date of Incident</p>
                  <p className="font-medium">{lead.caseSummary.incidentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="font-medium">{lead.caseSummary.location}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Injuries</p>
                  <p className="font-medium">{lead.caseSummary.injuries}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Medical Treatment</p>
                  <p className="font-medium">{lead.caseSummary.medicalTreatment}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Insurance Information</p>
                  <p className="font-medium">{lead.caseSummary.insuranceInfo}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Description</p>
                  <p className="font-medium text-slate-700 bg-slate-50 p-4 rounded-lg">
                    {lead.caseSummary.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Full Intake Transcript */}
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Full Intake Transcript
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="transcript">
                  <AccordionTrigger>View Complete Chat Transcript</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 mt-4">
                      {mockIntakeQuestions.map((q, idx) => (
                        <div key={q.id} className="space-y-2">
                          <div className="bg-slate-100 rounded-lg p-3">
                            <p className="text-sm font-medium text-slate-700">AI: {q.question}</p>
                          </div>
                          <div className="bg-blue-600 text-white rounded-lg p-3 ml-8">
                            <p className="text-sm">User: [Sample answer {idx + 1}]</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          {/* Sidebar - Plaintiff Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Plaintiff Contact */}
            <Card className="p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Plaintiff Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Name</p>
                  <p className="font-medium">{lead.plaintiff.name}</p>
                </div>
                <div>
                  <p className="text-slate-600">Email</p>
                  <p className="font-medium">{lead.plaintiff.email}</p>
                </div>
                <div>
                  <p className="text-slate-600">Phone</p>
                  <p className="font-medium">{lead.plaintiff.phone}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={status === "Contract signed"}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Plaintiff
              </Button>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Lead Actions</h2>
              <div className="space-y-3">
                {status === "New" && (
                  <>
                    <Button 
                      onClick={() => handleStatusChange("Contacted")}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Contacted
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange("Declined")}
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline Lead
                    </Button>
                  </>
                )}

                {status === "Contacted" && (
                  <>
                    <Button 
                      onClick={() => handleStatusChange("Contract signed")}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Contract Signed
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange("Declined")}
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline Lead
                    </Button>
                  </>
                )}

                {status === "Contract signed" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-medium">
                      Contract signed! Case workspace is now active.
                    </p>
                    <Button 
                      onClick={() => navigate(`/firm/case/${leadId}`)}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700"
                    >
                      Open Workspace
                    </Button>
                  </div>
                )}

                {status === "Declined" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-red-800">
                      This lead has been declined.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Important Notice */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> Plaintiff contact information is confidential. 
                Use only for case-related communication.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
