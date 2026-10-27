import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PageHeader, Panel } from "@/components/shared";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme-context";
import { isThemePreference } from "@/lib/theme-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — VeriFlow AI" },
      { name: "description", content: "Demo settings and reset options for the prototype." },
      { property: "og:title", content: "Settings — VeriFlow AI" },
      { property: "og:description", content: "Prototype settings." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const { officer, setOfficer, reset } = useStore();
  const { preference, setPreference } = useTheme();
  const [name, setName] = useState(officer);

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Reviewer profile and demo data are saved in this browser. Additional validation preferences are not configured in this prototype."
      />
      <div className="grid max-w-3xl gap-6">
        <Panel title="Appearance">
          <div className="flex flex-wrap items-center justify-between gap-5 p-5">
            <div className="space-y-1">
              <Label htmlFor="theme-preference">Theme preference</Label>
              <p className="text-sm text-muted-foreground">
                Choose a theme or follow your operating system setting.
              </p>
            </div>
            <Select
              value={preference}
              onValueChange={(value) => {
                if (!isThemePreference(value)) return;
                try {
                  setPreference(value);
                } catch (error) {
                  toast.error("Could not save your appearance preference.");
                  console.error("Could not persist theme preference.", error);
                }
              }}
            >
              <SelectTrigger id="theme-preference" className="w-full sm:w-48">
                <SelectValue aria-label="Theme preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System / Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Panel>
        <Panel title="Reviewer Profile">
          <div className="flex flex-wrap items-end gap-3 p-5">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="reviewer-name">Display name</Label>
              <Input
                id="reviewer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </div>
            <Button
              onClick={() => {
                if (name.trim().length < 3) {
                  toast.error("Name too short");
                  return;
                }
                setOfficer(name.trim());
                toast.success("Profile updated");
              }}
            >
              Save
            </Button>
          </div>
        </Panel>
        <Panel title="Demo Data">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <p className="text-sm text-muted-foreground">
              Restore the original sample applications, documents and logs. Your changes will be
              lost.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <RotateCcw className="h-4 w-4" /> Reset Demo Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset demo data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    All locally created applications, documents, comments and logs will be replaced
                    with the original sample data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      reset();
                      setName("Officer V. Kumar");
                      toast.success("Demo data reset");
                    }}
                  >
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Panel>
      </div>
    </>
  );
}
