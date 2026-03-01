import { Calendar, Clock, Video, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Meeting } from "../data/mockData";

interface SchedulingModuleProps {
  meetings: Meeting[];
  onSchedule?: () => void;
  onJoin?: (id: string) => void;
}

export default function SchedulingModule({ 
  meetings,
  onSchedule,
  onJoin
}: SchedulingModuleProps) {
  const upcomingMeetings = meetings.filter(m => m.status === "scheduled");
  const pastMeetings = meetings.filter(m => m.status === "completed");

  const getStatusBadge = (status: Meeting["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-slate-600">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-red-600">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Schedule New Meeting Button */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Schedule a Meeting</h3>
              <p className="text-sm text-slate-600">Request a time to meet with your attorney</p>
            </div>
          </div>
          <Button onClick={onSchedule} className="bg-blue-600 hover:bg-blue-700">
            Schedule
          </Button>
        </div>
      </Card>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-slate-700">Upcoming Meetings</h3>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 border-l-4 border-l-blue-600">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{meeting.title}</h4>
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.time}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      With: {meeting.participants.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onJoin?.(meeting.id)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-slate-700">Past Meetings</h3>
          <div className="space-y-3">
            {pastMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.time}
                      </div>
                    </div>
                    {meeting.hasTranscript && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Transcript available
                      </Badge>
                    )}
                  </div>
                  {meeting.hasTranscript && (
                    <Button variant="outline" size="sm">
                      View Transcript
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {meetings.length === 0 && (
        <Card className="p-8 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No meetings scheduled</p>
        </Card>
      )}
    </div>
  );
}
