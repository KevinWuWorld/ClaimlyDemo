import { useState } from "react";
import { Building2, MapPin, Award, Save } from "lucide-react";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";

export default function FirmProfileEdit() {
  const [profile, setProfile] = useState({
    firmName: "Johnson & Associates",
    description: "Johnson & Associates has been serving the community for 18 years, specializing in personal injury cases with a focus on auto accidents and workplace injuries.",
    yearsExperience: "18",
    specialties: ["Auto Accidents", "Personal Injury", "Slip and Fall"],
    locations: ["Downtown Office - 123 Main St", "West Side Branch - 456 Oak Ave"],
    contactEmail: "contact@johnsonassociates.com",
    contactPhone: "(555) 987-6543"
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Firm profile updated successfully");
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, newSpecialty.trim()]
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter((_, i) => i !== index)
    });
  };

  const addLocation = () => {
    if (newLocation.trim()) {
      setProfile({
        ...profile,
        locations: [...profile.locations, newLocation.trim()]
      });
      setNewLocation("");
    }
  };

  const removeLocation = (index: number) => {
    setProfile({
      ...profile,
      locations: profile.locations.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header type="firm" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Firm Profile</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="firmName">Firm Name</Label>
                <Input
                  id="firmName"
                  value={profile.firmName}
                  onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  rows={4}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  This description will be shown to plaintiffs viewing your profile
                </p>
              </div>

              <div>
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={profile.yearsExperience}
                  onChange={(e) => setProfile({ ...profile, yearsExperience: e.target.value })}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Specialties */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Specialties</h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm px-3 py-1 cursor-pointer hover:bg-red-50"
                    onClick={() => removeSpecialty(index)}
                  >
                    {specialty} ×
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a specialty..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSpecialty();
                    }
                  }}
                />
                <Button type="button" onClick={addSpecialty} variant="outline">
                  Add
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Click on a specialty to remove it
              </p>
            </div>
          </Card>

          {/* Locations */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Office Locations</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                {profile.locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 rounded p-3"
                  >
                    <span className="text-sm">{location}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add an office location..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLocation();
                    }
                  }}
                />
                <Button type="button" onClick={addLocation} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={profile.contactPhone}
                  onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
            <Button type="button" variant="outline">
              Preview Profile
            </Button>
          </div>
        </form>

        {/* Stats Notice */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-100">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Case statistics (win rate, total cases, average settlement) 
            are automatically calculated from your case history and cannot be manually edited.
          </p>
        </Card>
      </div>
    </div>
  );
}
