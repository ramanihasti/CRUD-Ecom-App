//import { CustomFlowbiteTheme } from "flowbite-react";

const customTheme = {
  button: {
    gradientDuoTone: {
      primary:
        "bg-gradient-to-br from-green-400 to-cyan-600 text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          primary:
            "border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-400 focus:ring-teal-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-400",
        },
      },
    },
  },
  fileInput: {
    field: {
      input: {
        colors: {
          primary:
            "border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500",
        },
      },
    },
  },
  alert: {
    color: {
      primary:
        "border-violet-500 bg-violet-100 text-violet-700 dark:bg-violet-200 dark:text-violet-800",
    },
    icon: "mr-3 inline h-6 w-6 flex-shrink-0",
  },
};

export { customTheme };
