import { useState } from "react";
import { useNavigate } from "react-router";
import { MessageSquare, FileText, Calendar, Video, ArrowLeft, Clock } from "lucide-react";
import Header from "../components/Header";
import ChatInterface from "../components/ChatInterface";
import DocumentSharing from "../components/DocumentSharing";
import SchedulingModule from "../components/SchedulingModule";
import VideoCallModule from "../components/VideoCallModule";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { mockMessages, mockDocuments, mockMeetings, mockCaseTimeline } from "../data/mockData";

export default function CaseWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const [inCall, setInCall] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Workspace Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6 p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold">Case Workspace</h1>
                  <p className="text-sm text-slate-600">Johnson & Associates</p>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <p className="text-sm text-slate-600">
                Attorney: Sarah Johnson • Case #: PI-2026-001234
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
                    placeholder="Type a message to your attorney..."
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

          {/* Sidebar - Case Status & Updates */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="font-semibold mb-4">Case Status</h2>
              <div className="space-y-4">
                {mockCaseTimeline.map((status, index) => (
                  <div key={status.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        status.completed 
                          ? 'bg-green-600 text-white' 
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {status.completed ? '✓' : index + 1}
                      </div>
                      {index < mockCaseTimeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          status.completed ? 'bg-green-600' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`font-medium ${
                        status.completed ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {status.label}
                      </p>
                      {status.timestamp && (
                        <p className="text-xs text-slate-500 mt-1">{status.timestamp}</p>
                      )}
                      {status.note && (
                        <p className="text-xs text-slate-600 mt-2 bg-slate-50 rounded p-2">
                          {status.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate("/timeline/1")}
              >
                <Clock className="h-4 w-4 mr-2" />
                View Full Timeline
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Latest Updates</h2>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5" />
                    <div className="flex-1">
                      <p className="font-medium">Initial claim filed</p>
                      <p className="text-xs text-slate-500">Feb 5, 2026</p>
                    </div>
                  </div>
                  <p className="text-slate-600 ml-4">
                    Your attorney has filed the initial claim with the insurance company.
                  </p>
                </div>
                <div className="text-sm">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5" />
                    <div className="flex-1">
                      <p className="font-medium">Case assigned</p>
                      <p className="text-xs text-slate-500">Feb 1, 2026</p>
                    </div>
                  </div>
                  <p className="text-slate-600 ml-4">
                    Sarah Johnson has been assigned as your attorney.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
