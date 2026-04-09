export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-muted/30">
      <main className="w-full max-w-2xl px-4 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Kelvin&apos;s Compliance Evaluator
          </h1>
          <p className="text-muted-foreground">
            Check whether an action complies with a guideline using AI-powered
            zero-shot classification.
          </p>
        </header>
      </main>
    </div>
  );
}
