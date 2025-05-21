import React from "react";

type PromptInputProps = {
    topic: string;
    setTopic: (val: string) => void;
    tone: string;
    setTone: (val: string) => void;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
};

const PromptInput: React.FC<PromptInputProps> = ({ topic, setTopic, tone, setTone, loading, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 mb-8">
        <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Video konusu girin..."
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
        />
        <select
            value={tone}
            onChange={e => setTone(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
            <option value="eğlenceli">Eğlenceli</option>
            <option value="ciddi">Ciddi</option>
            <option value="ilham verici">İlham Verici</option>
        </select>
        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                    Yükleniyor...
                </span>
            ) : (
                "Başlık ve Hashtag Öner"
            )}
        </button>
    </form>
);

export default PromptInput; 