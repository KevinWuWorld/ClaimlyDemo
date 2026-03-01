import { useState } from "react";
import { useNavigate } from "react-router";
import { Scale, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";

export default function FirmLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/firm/leads");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Scale className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Law Firm Portal</h1>
          <p className="text-slate-600">
            Sign in to manage your leads and cases
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="firm@example.com"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <Button variant="link" className="p-0 h-auto">
              Forgot password?
            </Button>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-slate-600 mb-3">
            Don't have an account?
          </p>
          <Button variant="outline" className="w-full">
            Request Firm Access
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-2 justify-center text-xs text-slate-500">
          <Lock className="h-3 w-3" />
          <span>Secure encrypted connection</span>
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="link" 
            className="text-sm"
            onClick={() => navigate("/")}
          >
            ← Back to Plaintiff Portal
          </Button>
        </div>
      </Card>
    </div>
  );
}
