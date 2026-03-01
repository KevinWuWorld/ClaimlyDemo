import { Link, useNavigate } from "react-router";
import { Scale, Bell, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  type?: "plaintiff" | "firm";
  showNav?: boolean;
}

export default function Header({ type = "plaintiff", showNav = true }: HeaderProps) {
  const navigate = useNavigate();

  const plaintiffNav = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Settings", path: "/settings" }
  ];

  const firmNav = [
    { label: "Leads", path: "/firm/leads" },
    { label: "Profile", path: "/firm/profile" },
    { label: "Settings", path: "/firm/settings" }
  ];

  const navItems = type === "plaintiff" ? plaintiffNav : firmNav;
  const homePath = type === "plaintiff" ? "/dashboard" : "/firm/leads";

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={homePath} className="flex items-center gap-2 text-xl">
            <Scale className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-slate-900">
              {type === "plaintiff" ? "Claimly" : "Claimly - Firm Portal"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                  2
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(type === "plaintiff" ? "/settings" : "/firm/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}

          {/* Mobile Navigation */}
          {showNav && (
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-lg text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-lg"
                    onClick={() => navigate("/")}
                  >
                    Sign Out
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
