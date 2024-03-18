import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const useCrud = (
  BASEURL: string
): [
  any,
  (path: string) => void,
  (path: string, data: any) => void,
  (path: string, id: number) => void,
  (path: string, id: number, data: any) => void,
  any,
  any
] => {
  const [response, setResponse] = useState<any>();
  const [hasError, setHasError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getApi = (path: string): void => {
    setIsLoading(true);
    const url: string = `${BASEURL}${path}`;
    axios
      .get(url)
      .then((res: AxiosResponse<any>) => {
        setResponse(res.data);
        setHasError(false);

        setTimeout(() => {
          setHasError(null);
        }, 1000);
      })
      .catch((err: any) => {
        console.log(err);

        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createApi = (path: string, data: any) => {
    const url = `${BASEURL}${path}`;
    axios
      .post(url, data)
      .then((res: AxiosResponse<any>) => {
        setResponse([...response, res.data]);

        setHasError(false);
        setTimeout(() => {
          setHasError(null);
        }, 1000);
      })
      .catch((err: any) => {
        console.log(err);

        setHasError(true);
        setTimeout(() => {
          setHasError(null);
        }, 1000);
      });
  };

  const deleteApi = (path: string, id: number) => {
    const url: string = `${BASEURL}${path}${id}/`;
    axios
      .delete(url)
      .then((res: AxiosResponse<any>) => {
        console.log(res.data);
        setResponse(response.filter((e: any) => e.id !== id));
      })
      .catch((err: any) => console.log(err));
  };

  const updateApi = (path: string, id: number, data: any) => {
    const url: string = `${BASEURL}${path}${id}/`;
    axios
      .put(url, data)
      .then((res: AxiosResponse<any>) => {
        setResponse(response.map((e: any) => (e.id === id ? res.data : e)));

        setHasError(false);
        setTimeout(() => {
          setHasError(null);
        }, 1000);
      })
      .catch((err: any) => {
        console.log(err);

        setHasError(true);
        setTimeout(() => {
          setHasError(null);
        }, 1000);
      });
  };

  return [
    response,
    getApi,
    createApi,
    deleteApi,
    updateApi,
    hasError,
    isLoading,
  ];
};

export default useCrud;
