import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";

import type { RootState } from "@/app/store/store.tsx";
import { clearError } from "@/shared/model";

export const GlobalErrorNotification = () => {
  const message = useSelector((state: RootState) => state.error.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      notifications.show({
        title: "Xatolik!",
        message,
        color: "red",
        autoClose: 4000,
      });
      dispatch(clearError());
    }
  }, [message]);

  return null;
};
