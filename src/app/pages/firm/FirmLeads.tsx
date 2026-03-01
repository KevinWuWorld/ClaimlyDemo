import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Eye, MapPin, DollarSign, Clock } from "lucide-react";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockLeads } from "../../data/mockData";

export default function FirmLeads() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", "New", "Contacted", "Contract signed", "Declined"];

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.incidentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.zip.includes(searchTerm);
    const matchesFilter = activeFilter === "All" || lead.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-600">New</Badge>;
      case "Contacted":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Contacted</Badge>;
      case "Declined":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declined</Badge>;
      case "Contract signed":
        return <Badge className="bg-green-600">Contract Signed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header type="firm" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Lead Inbox</h1>
          <p className="text-slate-600">Review and manage incoming case leads</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by incident type or ZIP code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Status Tabs */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-6">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full">
            {filterOptions.map((filter) => (
              <TabsTrigger key={filter} value={filter}>
                {filter}
                {filter === "New" && (
                  <Badge className="ml-2 bg-blue-600 text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {mockLeads.filter(l => l.status === "New").length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {lead.status === "New" && (
                      <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{lead.incidentType}</h3>
                        {getStatusBadge(lead.status)}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          ZIP: {lead.zip}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Est. Value: {lead.estimatedValue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lead.timeReceived}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 text-sm">
                    <p className="text-slate-700">
                      <strong>Injuries:</strong> {lead.caseSummary.injuries}
                    </p>
                    <p className="text-slate-600 mt-1">
                      {lead.caseSummary.description}
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <Button
                    onClick={() => navigate(`/firm/lead/${lead.id}`)}
                    className="flex-1 lg:flex-initial bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {lead.status === "Contract signed" && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/firm/case/${lead.id}`)}
                      className="flex-1 lg:flex-initial"
                    >
                      Open Workspace
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredLeads.length === 0 && (
            <Card className="p-12 text-center">
              <Search className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="font-semibold text-lg mb-2">No Leads Found</h3>
              <p className="text-slate-600">
                {searchTerm 
                  ? "Try adjusting your search terms" 
                  : `No ${activeFilter.toLowerCase()} leads at this time`}
              </p>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4">Lead Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {mockLeads.filter(l => l.status === "New").length}
              </p>
              <p className="text-sm text-slate-600">New Leads</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {mockLeads.filter(l => l.status === "Contacted").length}
              </p>
              <p className="text-sm text-slate-600">Contacted</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {mockLeads.filter(l => l.status === "Contract signed").length}
              </p>
              <p className="text-sm text-slate-600">Active Cases</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-600">
                {mockLeads.length}
              </p>
              <p className="text-sm text-slate-600">Total Leads</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
