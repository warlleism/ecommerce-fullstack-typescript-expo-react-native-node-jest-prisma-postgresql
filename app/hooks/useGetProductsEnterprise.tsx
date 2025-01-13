import { useEffect, useState } from "react";

export default function useGetProductsEnterprise({ enterprise }: any) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://carolinaiv.vercel.app/product/getEnterprise?enterprise=${enterprise}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const resJson = await response.json();
                setData(resJson.products);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error as string);
            } finally {
                setTimeout(() => setLoading(false), 1000)
            }
        }

        fetchData();
    }, [enterprise])

    return { data, loading, error }
}