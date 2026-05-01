import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/store";

import { authApi, type LoginDto } from "../api/auth-api";
import { logout, setCredentials } from "./auth-slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken: _refreshToken, ...user } = data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken }));
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
