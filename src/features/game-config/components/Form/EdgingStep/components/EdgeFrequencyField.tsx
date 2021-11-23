import { Field } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@material-ui/core";

import { FormikSlider } from "@/components/Form";

const marks = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

export default function EdgeFrequencyField() {
  return (
    <FormControl>
      <FormLabel id="edge-frequency">Edge Frequency</FormLabel>
      <Field
        name="edgeFrequency"
        aria-labelledby="edge-frequency"
        component={FormikSlider}
        marks={marks}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
      <FormHelperText>Increases the frequency of edges.</FormHelperText>
    </FormControl>
  );
}
