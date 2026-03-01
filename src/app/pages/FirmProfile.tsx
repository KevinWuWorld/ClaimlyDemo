import { useParams, useNavigate } from "react-router";
import { MapPin, Award, Briefcase, TrendingUp, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockFirms } from "../data/mockData";

export default function FirmProfile() {
  const { firmId } = useParams();
  const navigate = useNavigate();
  const firm = mockFirms.find(f => f.id === firmId);

  if (!firm) {
    return <div>Firm not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header showNav={false} />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>

        <Card className="p-8 mb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{firm.name}</h1>
            <div className="flex flex-wrap gap-4 text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {firm.distance} away
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                {firm.stats.yearsExperience} years experience
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{firm.winRate}%</p>
              <p className="text-sm text-slate-600 mt-1">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{firm.stats.casesWon}</p>
              <p className="text-sm text-slate-600 mt-1">Cases Won</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{firm.stats.totalCases}</p>
              <p className="text-sm text-slate-600 mt-1">Total Cases</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <p className="text-xl font-bold text-emerald-600">{firm.stats.avgSettlement}</p>
              <p className="text-sm text-slate-600 mt-1">Avg Settlement</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">About</h2>
            <p className="text-slate-700 leading-relaxed">{firm.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {firm.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">Office Locations</h2>
            <div className="space-y-2">
              {firm.locations.map((location) => (
                <div key={location} className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {location}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">For Your Case</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Predicted Timeline</p>
                <p className="font-semibold">{firm.predictedTimeline}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Projected Settlement</p>
                <p className="font-semibold">{firm.projectedReimbursement}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Similar Cases</p>
                <p className="font-semibold">{firm.similarCases} handled</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-900">
              <strong>Disclaimer:</strong> The information provided is for informational purposes only and does not constitute legal advice. 
              Projected outcomes are estimates based on historical data and may vary.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => navigate(-1)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Connect with This Firm
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
