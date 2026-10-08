'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Link as LinkIcon, ArrowRight, Loader2, Check } from 'lucide-react';

export default function Home() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const shortenUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        const normalized = url.trim();
        if (!normalized) return;

        try {
            const parsed = new URL(normalized);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                throw new Error('Only HTTP and HTTPS URLs are supported.');
            }
        } catch {
            setError('Enter a valid HTTP or HTTPS URL.');
            return;
        }

        setIsLoading(true);
        setError('');
        setShortUrl('');

        try {
            const controller = new AbortController();
            const timeout = window.setTimeout(() => controller.abort(), 8000);
            let response;
            try {
                response = await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(normalized), {
                    signal: controller.signal,
                    headers: { Accept: 'text/plain' }
                });
            } finally {
                window.clearTimeout(timeout);
            }

            if (!response.ok) throw new Error('Failed to shorten URL');
            const result = (await response.text()).trim();
            if (!/^https?:\/\//i.test(result)) throw new Error('Invalid short URL returned by provider');
            setShortUrl(result);
        } catch (err) {
            setError(err instanceof DOMException && err.name === 'AbortError'
                ? 'The shortening service timed out. Please try again.'
                : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setError('Clipboard access was blocked. Copy the link manually.');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center py-12 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                        Top Rated URL Shortener
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Shorten Your Links <br />
                    <span className="text-indigo-500">Simplify Your Sharing</span>
                </h1>
                <div className="mt-6 text-lg leading-8 text-slate-400">
                    Transform long, ugly links into short, memorable ones. <br />
                    No login required. 100% Free.
                </div>

                <div className="mt-10 w-full max-w-md mx-auto">
                    <form onSubmit={shortenUrl} className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            type="url"
                            placeholder="Paste your long link here..."
                            className="h-12 bg-slate-900 border-slate-700 text-lg"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <Button type="submit" size="lg" className="h-12 px-8 text-lg gap-2" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Shorten'}
                            {!isLoading && <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </form>

                    {error && (
                        <p className="mt-4 text-sm text-red-400">{error}</p>
                    )}

                    {shortUrl && (
                        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-4 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                                        <LinkIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col items-start overflow-hidden">
                                        <span className="text-sm text-slate-400 truncate w-full text-left">Original Link</span>
                                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:underline truncate w-full text-left">
                                            {shortUrl}
                                        </a>
                                    </div>
                                </div>
                                <Button size="icon" variant="secondary" onClick={copyToClipboard} className={copied ? "text-green-400" : ""}>
                                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-20 border-t border-slate-800 pt-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-indigo-400 mb-4">
                                <LinkIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Instant Shortening</h3>
                            <p className="mt-2 text-sm text-slate-400">No account needed. Just paste and go.</p>
                        </div>
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-indigo-400 mb-4">
                                <Check className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Reliable</h3>
                            <p className="mt-2 text-sm text-slate-400">Powered by trusted infrastructure.</p>
                        </div>
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-indigo-400 mb-4">
                                <Copy className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Easy Sharing</h3>
                            <p className="mt-2 text-sm text-slate-400">Copy with one click and share anywhere.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-4 text-center text-xs text-slate-600">
                &copy; {new Date().getFullYear()} Linkly. Built by <a href="https://github.com/suryaprabhaz" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 underline">@suryaprabhaz</a>.
            </footer>
        </main>
    );
}
