import { useState, useEffect } from 'react';

import api from '../services/api';

const useFetch = (endpoint, key) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);

      setData(response.data[key]);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return {
    data,
    loading,
    refreshing,
    onRefresh,
  };
};

export default useFetch;