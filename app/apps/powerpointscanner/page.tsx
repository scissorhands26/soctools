import PowerPointScanner from "@/components/tools/PowerPointScanner";

export default async function PowerPointScannerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <PowerPointScanner />
    </main>
  );
}
