import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function TimeSlot() {
  const initialValues = {
    day: '',
    startTime: '',
    endTime: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    console.log(values);
    resetForm();
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.day) {
      errors.day = 'Required';
    }
    if (!values.startTime) {
      errors.startTime = 'Required';
    }
    if (!values.endTime) {
      errors.endTime = 'Required';
    }

    if (values.startTime && values.endTime) {
      const startTime = new Date(`2000-01-01T${values.startTime}`);
      const endTime = new Date(`2000-01-01T${values.endTime}`);

      const diffInMinutes = Math.abs(endTime - startTime) / (1000 * 60);
      if (diffInMinutes !== 60) {
        errors.endTime = 'Time slot should be exactly 1 hour';
      }
    }

    return errors;
  };

  return (
    <div>
      <h2>Add Time Slots</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="day">Day:</label>
              <Field as="select" id="day" name="day">
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Field>
              <ErrorMessage name="day" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="startTime">Start Time:</label>
              <Field type="time" id="startTime" name="startTime" />
              <ErrorMessage name="startTime" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="endTime">End Time:</label>
              <Field type="time" id="endTime" name="endTime" />
              <ErrorMessage name="endTime" component="div" className="error" />
            </div>
            <button type="submit">Add Slot</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TimeSlot;
