const primary = '#DC6962';
// const secondary = '#F9F7F1'
const tertiary = 'white';
const fontFamily = 'Arial';
export const customTheme = {
  token: {
    colorPrimary: primary,
    // colorBgBase : secondary,
    colorBgContainer: tertiary,
    fontFamily: fontFamily,
    borderRadius: 0,
  },
  // Wants to change the styling of any specific component, then use method mentioned below
  components: {
    Input : {
      borderRadius: 6
    },
    Card : {
      borderRadiusLG: 10,
      colorBorder: 'red'
    },
    Button : {
      borderRadiusLG: 8
    },
  },
};
