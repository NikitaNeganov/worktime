import React from "react";
import classes from "./Test.module.css";
import { Form, Field } from "react-final-form";

const sleep = ms => new Promise(res => setTimeout(res, ms));
const showResults = async values => {
  await sleep(1500);
  console.log(JSON.stringify(values, 0, 2));
};

const test = () => (
  <div className={classes.Home}>
    <Form
      onSubmit={showResults}
      initialValues={{
        startMinute: 30,
        startHour: 10,
        lengthMinute: 0,
        lengthHour: 8
      }}
    >
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <p>Please, enter the time your job starts. You can omit minutes.</p>
          <div className={classes.Start}>
            <Field
              className={classes.Input}
              name="startHour"
              placeholder="Hour"
            >
              {({ input, meta, placeholder, className }) => (
                <div className={classes.InputWrapper}>
                  <input
                    pattern="[0-9]*"
                    type="number"
                    {...input}
                    placeholder={placeholder}
                    className={className}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              className={classes.Input}
              name="startMinute"
              placeholder="Minute"
            >
              {({ input, meta, placeholder, className }) => (
                <div className={classes.InputWrapper}>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    {...input}
                    placeholder={placeholder}
                    className={className}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <p>Please, enter the length of your workday.</p>
          <div className={classes.Length}>
            <Field
              className={classes.Input}
              name="lengthHour"
              placeholder="Hour"
            >
              {({ input, meta, placeholder, className }) => (
                <div className={classes.InputWrapper}>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    {...input}
                    placeholder={placeholder}
                    className={className}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              className={classes.Input}
              name="lengthMinute"
              placeholder="Minute"
            >
              {({ input, meta, placeholder, className }) => (
                <div className={classes.InputWrapper}>
                  <input
                    {...input}
                    placeholder={placeholder}
                    className={className}
                    pattern="[0-9]*"
                    type="number"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <button disabled={submitting} type="submit">
            Sumbit
          </button>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  </div>
);

export default test;
