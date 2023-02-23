import { useCallback, useState } from "react";

const useDisclosure = () => {
  const [isOpen, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    onClose,
    onOpen,
    isOpen,
  };
};

export default useDisclosure;
