import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FactCard({
  title,
  bullets,
}: {
  title?: string;
  bullets: string[];
}) {
  if (!bullets || bullets.length === 0) return null;
  
  return (
    <Card className="mt-8">
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "pt-0" : ""}>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}


