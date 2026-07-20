import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { clearError } from "@/shared/model";

export const GlobalErrorNotification = () => {
  const message = useAppSelector(state => state.error.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      notifications.show({
        title: "Error",
        message,
        color: "red",
        autoClose: 4000,
      });
      dispatch(clearError());
    }
  }, [message, dispatch]);

  return null;
};
