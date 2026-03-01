import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockCaseTimeline } from "../data/mockData";

export default function CaseTimeline() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/case/1")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workspace
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Case Timeline</h1>
          <p className="text-slate-600">Track the progress of your case from start to finish</p>
        </div>

        <Card className="p-8">
          <div className="space-y-8">
            {mockCaseTimeline.map((status, index) => (
              <div key={status.id} className="flex gap-6">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center border-4 ${
                    status.completed 
                      ? 'bg-green-600 border-green-100' 
                      : 'bg-white border-slate-200'
                  }`}>
                    {status.completed ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Clock className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  {index < mockCaseTimeline.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[80px] ${
                      status.completed ? 'bg-green-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      status.completed ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {status.label}
                    </h3>
                    {status.completed ? (
                      <Badge className="bg-green-600">Completed</Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>

                  {status.timestamp && (
                    <p className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {status.timestamp}
                    </p>
                  )}

                  {status.note && (
                    <div className="bg-slate-50 rounded-lg p-4 mt-3">
                      <p className="text-sm text-slate-700">{status.note}</p>
                    </div>
                  )}

                  {!status.completed && index === mockCaseTimeline.findIndex(s => !s.completed) && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-3">
                      <p className="text-sm text-blue-800">
                        <strong>Next step:</strong> Your attorney is working on this phase. 
                        You'll be notified when there's an update.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 pt-8 border-t">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {mockCaseTimeline.filter(s => s.completed).length}
                </p>
                <p className="text-sm text-slate-600">Steps Completed</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {mockCaseTimeline.filter(s => !s.completed).length}
                </p>
                <p className="text-sm text-slate-600">Steps Remaining</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((mockCaseTimeline.filter(s => s.completed).length / mockCaseTimeline.length) * 100)}%
                </p>
                <p className="text-sm text-slate-600">Progress</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
