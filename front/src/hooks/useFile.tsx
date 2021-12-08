import { useCallback, useState } from 'react';

const useFile = (initialValue: any) => {
  const [ value, setValue ] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue((e.target.files[0]));
  },[])
  return [value, handler, setValue];
};

export default useFile;

