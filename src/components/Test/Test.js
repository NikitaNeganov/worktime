import React from "react";
import classes from "./Test.module.css";
import s from "../UI/Switch/Switch.module.css";
import { Form, Field } from "react-final-form";

const test = props => {
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  const showResults = async values => {
    await sleep(300);
    const data = {};
    Object.keys(values).forEach(key => {
      if (key !== "lunch") {
        data[key] = parseInt(values[key]);
      } else {
        data[key] = values[key];
      }
    });
    console.log(data);
    props.handleTest(data);
  };
  return (
    <div className={classes.Home}>
      <Form
        onSubmit={showResults}
        initialValues={{
          startMinute: 0,
          startHour: 9,
          lengthMinute: 0,
          lengthHour: 8,
          lunch: false
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
                      min="0"
                      max="24"
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
                      min="0"
                      max="59"
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
                      min="0"
                      max="24"
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
                      min="0"
                      max="59"
                      type="number"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div>
              <Field name="lunch" component="input" type="checkbox">
                {({ input, meta }) => (
                  <div className={classes.ToggleContainer}>
                    <label className={s.Switch}>
                      <input {...input} type="checkbox" />
                      <span className={s.Slider} />
                    </label>
                    <p style={{ margin: "0px 0px 0px 13px" }}>Lunch?</p>
                  </div>
                )}
              </Field>
            </div>
            <div className={classes.ButtonContainer}>
              <button
                className={classes.Button}
                disabled={submitting}
                type="submit"
              >
                Done!
              </button>
            </div>

            <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </form>
        )}
      </Form>
    </div>
  );
};

export default test;
