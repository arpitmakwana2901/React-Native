import {useCallback, useEffect, useState} from 'react';
import api from '../services/api';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(url);

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetch;