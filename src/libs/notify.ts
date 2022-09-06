import React from "react";
import { toast, ToastOptions } from "react-toastify";

type NotifyOptions = ToastOptions & {
  fontSize?: React.CSSProperties["fontSize"];
  fontWeight?: React.CSSProperties["fontWeight"];
  padding?: React.CSSProperties["padding"];
};

export const notify = (text: string, options?: NotifyOptions) => {
  return toast(text, {
    draggable: false,

    autoClose: 6000,

    theme: "colored",
    type: "error",

    bodyStyle: {
      fontSize: options?.fontSize || "16px",
      fontWeight: options?.fontWeight || 700,
      padding: options?.padding || "10px 5px",
    },

    progressStyle: {
      height: "4px",
    },

    closeButton: false,

    icon: false,

    ...options,
  });
};
