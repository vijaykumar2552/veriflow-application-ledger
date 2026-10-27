import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";

export function AppPicker({
  value,
  onChange,
  filter,
}: {
  value: string;
  onChange: (v: string) => void;
  filter?: (s: string) => boolean;
}) {
  const { apps } = useStore();
  const list = filter ? apps.filter((a) => filter(a.status)) : apps;
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-96" aria-label="Select an application">
        <SelectValue placeholder="Select an application" />
      </SelectTrigger>
      <SelectContent>
        {list.map((a) => (
          <SelectItem key={a.id} value={a.id}>
            {a.id} — {a.applicant}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
