import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type IData } from "./types";
import { BACKEND_URL } from "../utils/getUrl";

export function useFetch(
  link: string,
  page: number,
  limit: number,
  filter: string = "home",
  search: string,
) {
  const [data, setData] = useState<IData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const timerRef = useRef<NodeJS.Timeout>(null);
  const isFirstSearchRender = useRef(true);

  async function fetchData() {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/${link}?filter=${filter}&search=${search}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token") || "",
          },
        },
      );

      let data: IData | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        if (data) {
          if (!data.success) {
            toast.error(data.error || data.msg);
            if (data.error?.includes("jwt")) {
              localStorage.removeItem("token");
              navigate("/signin");
              return;
            }
            return;
          }
        }
        toast.error("failed to get content");
        return;
      }

      if (data && data.success) {
        setData(data);
        return;
      }
    } catch (err) {
      setError(true);
      if (err instanceof TypeError) {
        return toast.error("network error");
      }
      return toast.error(
        data?.error ||
          data?.msg ||
          (err instanceof Error ? err.message : "something went wrong"),
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [link, page, filter]);

  useEffect(() => {
    if (isFirstSearchRender.current) {
      isFirstSearchRender.current = false;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [search]);

  return { isLoading, error, data, fetchData };
}
