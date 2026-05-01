import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/store";

import { authApi, type LoginDto } from "../api/auth-api";
import { type AuthUser, logout, setCredentials } from "./auth-slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: data => {
      const user: AuthUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      };
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken: data.accessToken }));
      navigate("/");
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    queryClient.clear();
    navigate("/");
  }, [dispatch, navigate, queryClient]);
};
