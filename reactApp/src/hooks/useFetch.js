import { useEffect, useState } from 'react';
import api from '../services/api';

const useFetch = (endpoint, key) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);

      if (key) {
        setData(response.data[key]);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    refreshing,
    onRefresh,
  };
};

export default useFetch;