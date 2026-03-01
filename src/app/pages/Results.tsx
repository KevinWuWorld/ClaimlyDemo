import { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, Clock, DollarSign, Info, MapPin, Award, Briefcase, Edit, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { mockFirms, mockCaseProjection, mockCaseSummary } from "../data/mockData";

export default function Results() {
  const navigate = useNavigate();
  const [selectedFirms, setSelectedFirms] = useState<string[]>([]);

  const toggleFirmSelection = (firmId: string) => {
    if (selectedFirms.includes(firmId)) {
      setSelectedFirms(selectedFirms.filter(id => id !== firmId));
    } else if (selectedFirms.length < 3) {
      setSelectedFirms([...selectedFirms, firmId]);
    }
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header showNav={false} />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {/* Case Projections */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Case Analysis</h1>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{mockCaseProjection.howEstimated}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Win Probability</p>
                <p className="text-3xl font-bold text-green-600">{mockCaseProjection.winProbability}%</p>
                <Progress value={mockCaseProjection.winProbability} className="mt-3 h-2" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{mockCaseProjection.howEstimated}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Projected Timeline</p>
                <p className="text-xl font-bold">{mockCaseProjection.projectedTimeline}</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{mockCaseProjection.howEstimated}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Projected Settlement</p>
                <p className="text-xl font-bold">{mockCaseProjection.projectedReimbursement}</p>
              </div>
            </Card>
          </div>

          {/* Important Disclaimer */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> These projections are estimates based on similar cases and are not guaranteed outcomes. 
              Actual results may vary. This is not legal advice.
            </p>
          </Card>
        </div>

        {/* Case Summary */}
        <Card className="p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold">Case Summary</h2>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600">Incident Type</p>
              <p className="font-medium">{mockCaseSummary.incidentType}</p>
            </div>
            <div>
              <p className="text-slate-600">Date of Incident</p>
              <p className="font-medium">{mockCaseSummary.incidentDate}</p>
            </div>
            <div>
              <p className="text-slate-600">Location</p>
              <p className="font-medium">{mockCaseSummary.location}</p>
            </div>
            <div>
              <p className="text-slate-600">Injuries</p>
              <p className="font-medium">{mockCaseSummary.injuries}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-600 mb-1">Description</p>
              <p className="font-medium">{mockCaseSummary.description}</p>
            </div>
          </div>
        </Card>

        {/* Matched Firms */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Top Matched Law Firms</h2>
              <p className="text-sm text-slate-600">Select up to 3 firms to send your case</p>
            </div>
            {selectedFirms.length > 0 && (
              <Badge className="bg-blue-600 text-white">
                Selected {selectedFirms.length}/3
              </Badge>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {mockFirms.map((firm, index) => (
              <Card key={firm.id} className={`p-6 transition-all ${selectedFirms.includes(firm.id) ? 'border-blue-600 border-2' : ''}`}>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">#{index + 1} Match</Badge>
                          <h3 className="font-semibold text-lg">{firm.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {firm.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {firm.similarCases} similar cases
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-600">Success Rate</p>
                        <p className="text-lg font-semibold text-green-600">{firm.winRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Predicted Timeline</p>
                        <p className="text-lg font-semibold">{firm.predictedTimeline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Projected Range</p>
                        <p className="text-sm font-semibold">{firm.projectedReimbursement}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Why recommended:</p>
                      <ul className="space-y-1">
                        {firm.whyRecommended.map((reason, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex gap-2">
                            <Award className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/firm/${firm.id}`)}
                      >
                        View Profile
                      </Button>
                      <Button
                        onClick={() => toggleFirmSelection(firm.id)}
                        size="sm"
                        className={selectedFirms.includes(firm.id) ? 'bg-blue-600 hover:bg-blue-700' : ''}
                        variant={selectedFirms.includes(firm.id) ? 'default' : 'outline'}
                        disabled={!selectedFirms.includes(firm.id) && selectedFirms.length >= 3}
                      >
                        {selectedFirms.includes(firm.id) ? 'Selected ✓' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedFirms.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t p-4 shadow-lg">
              <div className="container mx-auto max-w-6xl flex items-center justify-between">
                <div>
                  <p className="font-semibold">{selectedFirms.length} firm{selectedFirms.length > 1 ? 's' : ''} selected</p>
                  <p className="text-sm text-slate-600">Your case will be sent to these firms</p>
                </div>
                <Button 
                  onClick={handleContinue}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
