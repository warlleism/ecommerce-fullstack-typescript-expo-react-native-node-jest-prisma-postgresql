import { useEffect, useState } from "react";

export default function useGetProducts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://carolinaiv.vercel.app/product/products?page=1&pagesize=10');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const resJson = await response.json();
                setData(resJson.products);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error as string);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return { data, loading, error }
}