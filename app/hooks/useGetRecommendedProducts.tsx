import { useEffect, useState } from "react";

export default function useGetRecommendedProducts({ refreshing }: any) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://carolinaiv.vercel.app/product/getRecommended');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const resJson = await response.json();
                setData(resJson.products);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
        };
    }, [refreshing]);

    return { data, loading, error };
}