import {useEffect, useState} from "react"
import { CatalogItemProps } from "../components/CatalogItemsProps";
import axios from "axios";

export default function useData(url: string) {
    const [data, setData] = useState<CatalogItemProps[]>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const loadData = (url: string) => {
        setLoading(true);
        axios(url)
        .then(res => res.data)
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError(error);
        });
    }

    useEffect(() => loadData(url),[url]);

    return [{data,isLoading,error}];
}