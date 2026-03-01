import { Video, Mic, MicOff, VideoOff, PhoneOff, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface VideoCallModuleProps {
  inCall?: boolean;
  onStartCall?: () => void;
  onEndCall?: () => void;
}

export default function VideoCallModule({ 
  inCall = false, 
  onStartCall,
  onEndCall 
}: VideoCallModuleProps) {
  if (!inCall) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Video className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Start Video Call</h3>
            <p className="text-sm text-slate-600 mb-4">
              Connect with your attorney via secure video call
            </p>
          </div>
          <Button onClick={onStartCall} className="bg-blue-600 hover:bg-blue-700">
            <Video className="h-4 w-4 mr-2" />
            Start Call
          </Button>
          <p className="text-xs text-slate-500 mt-2">
            Calls are automatically transcribed for your records
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Video Display */}
      <div className="bg-slate-900 aspect-video flex items-center justify-center relative">
        <div className="text-white text-center">
          <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm opacity-75">Video call in progress...</p>
        </div>
        
        {/* Call Duration */}
        <Badge className="absolute top-4 left-4 bg-red-600">
          <span className="inline-block w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
          15:32
        </Badge>

        {/* Participant Info */}
        <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-2">
          <p className="text-white text-sm">Sarah Johnson (Attorney)</p>
        </div>

        {/* Small Self View */}
        <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-700 rounded-lg border-2 border-white/20" />
      </div>

      {/* Call Controls */}
      <div className="bg-slate-100 p-4 flex items-center justify-center gap-3">
        <Button variant="outline" size="icon" className="rounded-full">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Video className="h-5 w-5" />
        </Button>
        <Button 
          onClick={onEndCall}
          size="icon" 
          className="rounded-full bg-red-600 hover:bg-red-700"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>

      {/* Transcription Notice */}
      <div className="bg-blue-50 border-t border-blue-100 p-3 text-center">
        <p className="text-xs text-blue-800">
          This call is being transcribed. Transcript will be available after the call ends.
        </p>
      </div>
    </Card>
  );
}
