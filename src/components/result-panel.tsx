import React from "react";
import ResultCard from "@/components/ResultCard";

type ResultPanelProps = {
    results: { titles: string[]; hashtags: string[]; cta: string } | null;
    loading: boolean;
};

const ResultPanel: React.FC<ResultPanelProps> = ({ results, loading }) => {
    if (loading) {
        return (
            <div className="w-full max-w-md flex justify-center items-center py-10">
                <span className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></span>
            </div>
        );
    }
    if (!results) return null;
    return <ResultCard titles={results.titles} hashtags={results.hashtags} cta={results.cta} />;
};

export default ResultPanel; 