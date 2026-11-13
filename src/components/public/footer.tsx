export function Footer() {
  return (
    <footer className="py-8 border-t border-editorial-border flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-mono text-editorial-muted">
      <div>
        <span>© 2026 Software Engineer. All rights reserved.</span>
      </div>
      <div className="flex items-center space-x-6">
        <span>Editorial Design Direction</span>
        <span>•</span>
        <span>Built with Next.js & Supabase</span>
      </div>
    </footer>
  );
}
