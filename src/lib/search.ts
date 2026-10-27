import { simulatedChecks, type Application, type DocItem } from "@/lib/store";
import { RULES } from "@/lib/rules";

export type SearchResult =
  | {
      kind: "application";
      key: string;
      title: string;
      subtitle: string;
      appId: string;
    }
  | {
      kind: "document";
      key: string;
      title: string;
      subtitle: string;
      appId: string;
    }
  | {
      kind: "finding";
      key: string;
      title: string;
      subtitle: string;
      appId: string;
    }
  | {
      kind: "rule";
      key: string;
      title: string;
      subtitle: string;
      ruleId: string;
    };

export function searchRecords(
  applications: Application[],
  documents: DocItem[],
  query: string,
): SearchResult[] {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return [];
  const matches = (value: string) => !term || value.toLocaleLowerCase().includes(term);
  const applicationsById = new Map(
    applications.map((application) => [application.id, application]),
  );

  const applicationResults = applications
    .filter((application) =>
      matches(
        `${application.id} ${application.applicant} ${application.type} ${application.reference} ${application.description} ${application.status}`,
      ),
    )
    .slice(0, 5)
    .map((application): SearchResult => ({
      kind: "application",
      key: application.id,
      title: application.applicant,
      subtitle: `${application.id} · ${application.type} · ${application.status}`,
      appId: application.id,
    }));

  const documentResults = documents
    .filter((document) => {
      const application = applicationsById.get(document.appId);
      return matches(
        `${document.name} ${document.docType} ${document.status} ${document.appId} ${application?.applicant ?? ""}`,
      );
    })
    .slice(0, 5)
    .map((document): SearchResult => ({
      kind: "document",
      key: document.id,
      title: document.name,
      subtitle: `${document.docType} · ${applicationsById.get(document.appId)?.applicant ?? document.appId}`,
      appId: document.appId,
    }));

  const findingResults = applications
    .flatMap((application) => simulatedChecks(application).map((check) => ({ application, check })))
    .filter(
      ({ application, check }) =>
        check.result !== "Pass" &&
        matches(
          `${check.ruleId} ${check.name} ${check.finding} ${check.evidence} ${application.id} ${application.applicant}`,
        ),
    )
    .slice(0, 5)
    .map(({ application, check }): SearchResult => ({
      kind: "finding",
      key: `${application.id}-${check.ruleId}`,
      title: check.name,
      subtitle: `${check.ruleId} · ${check.result} · ${application.applicant}`,
      appId: application.id,
    }));

  const ruleResults = RULES.filter((rule) =>
    matches(`${rule.id} ${rule.title} ${rule.category} ${rule.description} ${rule.severity}`),
  )
    .slice(0, 5)
    .map((rule): SearchResult => ({
      kind: "rule",
      key: rule.id,
      title: rule.title,
      subtitle: `${rule.id} · ${rule.category} · ${rule.severity}`,
      ruleId: rule.id,
    }));

  return [...applicationResults, ...documentResults, ...findingResults, ...ruleResults];
}
