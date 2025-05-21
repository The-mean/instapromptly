import React from "react";

interface ResultCardProps {
    titles?: string[];
    hashtags?: string[];
    cta?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ titles = [], hashtags = [], cta = "" }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hashtags.join(" "));
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-md">
            {/* Başlıklar */}
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Başlık Önerileri</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {titles.map((title, i) => (
                        <li key={i}>{title}</li>
                    ))}
                </ul>
            </div>
            {/* Hashtagler */}
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Hashtag Önerileri</h2>
                    <button
                        onClick={handleCopy}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                        {copied ? "Kopyalandı!" : "Kopyala"}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, i) => (
                        <span key={i} className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm">{tag}</span>
                    ))}
                </div>
            </div>
            {/* CTA */}
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">CTA Önerisi</h2>
                <div className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-center font-medium">
                    {cta}
                </div>
            </div>
        </div>
    );
};

export default ResultCard; 