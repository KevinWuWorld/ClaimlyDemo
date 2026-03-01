import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageSquare, FileText, Calendar, Video, ArrowLeft, Flag } from "lucide-react";
import Header from "../../components/Header";
import ChatInterface from "../../components/ChatInterface";
import DocumentSharing from "../../components/DocumentSharing";
import SchedulingModule from "../../components/SchedulingModule";
import VideoCallModule from "../../components/VideoCallModule";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { mockMessages, mockDocuments, mockMeetings, mockLeads } from "../../data/mockData";
import { toast } from "sonner";

export default function FirmCaseWorkspace() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [activeTab, setActiveTab] = useState("chat");
  const [inCall, setInCall] = useState(false);
  const [caseStatus, setCaseStatus] = useState("Filed");
  const [updateNote, setUpdateNote] = useState("");

  const lead = mockLeads.find(l => l.id === caseId);

  const handleStatusUpdate = () => {
    if (!updateNote.trim()) {
      toast.error("Please add a note about this update");
      return;
    }
    toast.success(`Case status updated to: ${caseStatus}`);
    setUpdateNote("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header type="firm" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate("/firm/leads")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leads
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Workspace Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6 p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold">Case Workspace</h1>
                  <p className="text-sm text-slate-600">{lead?.plaintiff.name}</p>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <p className="text-sm text-slate-600">
                Case Type: {lead?.incidentType} • Case #: PI-2026-{caseId}
              </p>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger value="scheduling">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Meetings</span>
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="m-0">
                <Card className="h-[600px]">
                  <ChatInterface 
                    messages={mockMessages} 
                    placeholder="Type a message to the plaintiff..."
                  />
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="m-0">
                <Card className="p-6">
                  <DocumentSharing documents={mockDocuments} />
                </Card>
              </TabsContent>

              <TabsContent value="scheduling" className="m-0">
                <Card className="p-6">
                  <SchedulingModule meetings={mockMeetings} />
                </Card>
              </TabsContent>

              <TabsContent value="video" className="m-0">
                <VideoCallModule 
                  inCall={inCall}
                  onStartCall={() => setInCall(true)}
                  onEndCall={() => setInCall(false)}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Case Status Updates */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Flag className="h-5 w-5 text-blue-600" />
                Update Case Status
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Case Status</Label>
                  <Select value={caseStatus} onValueChange={setCaseStatus}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Filed">Filed</SelectItem>
                      <SelectItem value="Court date assigned">Court date assigned</SelectItem>
                      <SelectItem value="Awaiting verdict">Awaiting verdict</SelectItem>
                      <SelectItem value="Case won">Case won</SelectItem>
                      <SelectItem value="Remuneration received">Remuneration received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="note">Update Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Add a note about this status change..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    rows={3}
                  />
                </div>

                {caseStatus === "Case won" && (
                  <div>
                    <Label htmlFor="amount">Settlement Amount (Optional)</Label>
                    <Input
                      id="amount"
                      type="text"
                      placeholder="$50,000"
                    />
                  </div>
                )}

                <Button 
                  onClick={handleStatusUpdate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Post Update
                </Button>

                <p className="text-xs text-slate-500">
                  Updates will be visible to the plaintiff in their case timeline
                </p>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h2 className="font-semibold mb-4">Plaintiff Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Name</p>
                  <p className="font-medium">{lead?.plaintiff.name}</p>
                </div>
                <div>
                  <p className="text-slate-600">Email</p>
                  <p className="font-medium">{lead?.plaintiff.email}</p>
                </div>
                <div>
                  <p className="text-slate-600">Phone</p>
                  <p className="font-medium">{lead?.plaintiff.phone}</p>
                </div>
                <div>
                  <p className="text-slate-600">ZIP Code</p>
                  <p className="font-medium">{lead?.zip}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Case Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Incident Type</p>
                  <p className="font-medium">{lead?.caseSummary.incidentType}</p>
                </div>
                <div>
                  <p className="text-slate-600">Date of Incident</p>
                  <p className="font-medium">{lead?.caseSummary.incidentDate}</p>
                </div>
                <div>
                  <p className="text-slate-600">Estimated Value</p>
                  <p className="font-medium">{lead?.estimatedValue}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate(`/firm/lead/${caseId}`)}
              >
                View Full Case Details
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
