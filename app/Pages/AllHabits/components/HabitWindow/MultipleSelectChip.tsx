import * as React from "react";
import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

function getStyles(
  name: string,
  selectedNames: readonly string[],
  theme: Theme
) {
  return {
    fontWeight: selectedNames.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({
  onChange,
}: {
  onChange: (selectedAreasItems: any) => void;
}) {
  const theme = useTheme();
  const {
    allAreasObject,
    selectedItemsObject,
    darkModeObject,
    habitWindowObject,
  } = useGlobalContextProvider();
  const { allAreas } = allAreasObject;
  const { selectedItems } = selectedItemsObject;
  const { isDarkMode } = darkModeObject;
  const { openHabitWindow } = habitWindowObject;

  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
  const [selectedAreasItems, setSelectedAreasItems] = useState<any>([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //   filter out the "All content"
  const filteredAreas = allAreas.filter((area) => area.name !== "All");

  React.useEffect(() => {
    const selectedAreaObjects = selectedAreas.map((selectedArea) => {
      return allAreas.find((area) => area.name === selectedArea);
    });

    setSelectedAreasItems(selectedAreaObjects);
  }, [selectedAreas]);

  // use the callback function onChange to pass up the selectedAreasItem to the parent

  React.useEffect(() => {
    onChange(selectedAreasItems);
  }, [selectedAreasItems]);

  React.useEffect(() => {
    // if we want to edit a habit
    if (selectedItems) {
      const habitSelected = selectedItems as HabitType;
      const { areas } = habitSelected;

      const selectedArea = areas.map((area) => {
        return area.name;
      });

      setSelectedAreas(selectedArea);
    } else {
      // when we open the habit window, empty the selectedAreas
      setSelectedAreas([]);
    }
  }, [openHabitWindow]);

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          "&. Mui.focused .MuiInputLabel-root": {
            color: defaultColor.default,
          },
          "&. Mui.focused .MuiOutLinedInput-notchedOutline": {
            borderColor: defaultColor.default,
          },
        }}
      >
        <InputLabel
          sx={{
            m: 1,
            width: 300,
            "&. Mui.focused": {
              color: defaultColor.default,
            },
          }}
          id="demo-multiple-chip-label"
        >
          Choose your area
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedAreas}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                "&. Mui.focused": {
                  borderColor: defaultColor.default,
                },
              }}
              id="select-multiple-chip"
              label="Choose your area"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: isDarkMode
                      ? defaultColor.textColor
                      : defaultColor[100],
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredAreas.map((area) => (
            <MenuItem
              key={area._id}
              value={area.name}
              style={getStyles(area.name, selectedAreas, theme)}
              sx={{
                color: isDarkMode
                  ? darkModeColor.textColor
                  : defaultColor.textColor,
              }}
            >
              <FontAwesomeIcon
                className="text-blue-500"
                icon={area.icon}
                style={{ marginRight: 8 }}
              />
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
