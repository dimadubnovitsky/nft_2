import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import parseFieldValue from '../../../../utils/parseFieldValue';
import { renderSwitch, renderTextField } from '../../../../utils/form';
import GridImage from '../assets/images/grid.png';
import styles from './styles/Edit.module.scss';

const BlockEdit = ({ onCancel, onSubmit, initialValues, isOwned }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ invalid, pristine, values, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <div className={styles.title}>NFT Property Details</div>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.logo}>
                <img src={initialValues.image} alt="Logo" />
                {!isOwned && (
                  <img className={styles.grid} src={GridImage} alt="Grid" />
                )}
              </div>
              <div className={styles.date}>{initialValues.date}</div>
              <Field name="image">
                {({ input: { value, onChange, ...input } }) => (
                  <>
                    <input
                      {...input}
                      id="file"
                      type="file"
                      onChange={({ target }) => {
                        onChange(target.files);
                      }}
                      className={styles.imageInput}
                    />
                    <label htmlFor="file" className={styles.imageLabel}>
                      Choose file...
                    </label>
                  </>
                )}
              </Field>
            </div>
            <div className={styles.info}>
              <Grid container spacing={5}>
                <Grid item>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Field
                        name="title"
                        label="Title"
                        component={renderTextField}
                        parse={(value) => parseFieldValue(value)}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Field
                        name="owner"
                        label="Owner"
                        component={renderTextField}
                        parse={(value) => parseFieldValue(value)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        name="website"
                        label="Link"
                        component={renderTextField}
                        parse={(value) => parseFieldValue(value)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        name="description"
                        label="Description"
                        component={renderTextField}
                        parse={(value) => parseFieldValue(value)}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Field
                        name="availableForSale"
                        label="Available for sale"
                        type="checkbox"
                        component={renderSwitch}
                      />
                    </Grid>
                    {values.availableForSale && (
                      <Grid item md={6} xs={12}>
                        <Field
                          name="price"
                          label="Minimum Price"
                          component={renderTextField}
                          parse={(value) => parseFieldValue(value)}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <div className={styles.buttonSave} onClick={handleSubmit}>
                        Save Changes
                      </div>
                    </Grid>
                    <Grid item>
                      <div className={styles.buttonCancel} onClick={onCancel}>
                        Cancel
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <FormSpy
          subscription={{ submitSucceeded: true }}
          onChange={(spyProps) => spyProps.submitSucceeded && onCancel()}
        />
      </form>
    )}
  </Form>
);
export default BlockEdit;
