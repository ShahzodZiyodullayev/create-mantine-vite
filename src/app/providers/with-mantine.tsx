import { type ComponentType, createElement } from "react";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { createTheme, List, MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";

export const withMantine = (component: ComponentType) => () => {
  const theme = createTheme({
    fontFamily: "Manrope, serif",
    components: {
      List: List.extend({
        styles: () => ({
          root: {
            listStyle: "none",
          },
        }),
      }),
    },
  });

  return (
    <MantineProvider
      theme={theme}
      withCssVariables
      defaultColorScheme="light"
      stylesTransform={emotionTransform}>
      <MantineEmotionProvider>{createElement(component)}</MantineEmotionProvider>
    </MantineProvider>
  );
};
