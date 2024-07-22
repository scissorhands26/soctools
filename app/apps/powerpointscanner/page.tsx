import PowerPointScanner from "@/components/FileScanner/PowerPointScanner";

export default async function PowerPointScannerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PowerPointScanner />
    </main>
  );
}
