import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from '@/services/config';
import firebaseInstance from '@/services/firebase';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import { removeProduct } from '@/redux/actions/productActions';
import { ImageLoader } from '@/components/common';
import { BasketItem } from '@/components/basket';
import { BasketItemControl } from '@/components/basket';
import { useDispatch } from 'react-redux';
import Total from './Total';
import Firebase from 'firebase/firebase';



const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should be at least 4 characters.')
    .required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date()
    .required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  type: Yup.string().required('Please select payment mode')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Check Out Final Step | Nexus');
  useScrollTop();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
  
    firebase.firestore().collection("products").doc(product.id).delete(); 
    window.location.replace('https://firebasestorage.googleapis.com/v0/b/nexxus-9c882.appspot.com/o/Order%20placed%20successfully!.jpg?alt=media&token=ddee9904-33d9-42b1-ab40-004e0344a3ca');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            
            
              //firebase.firestore().collection("products").doc(product.id).delete(); 
              //firebase.firestore().collection("users").doc("AoUYMIQk8CaGLnoFOzKgE75czaM2").delete({basket: items}); 
              //this.db.collection("users").doc(userId).update({ basket: items });
          //app.collection('products').where(firebase.firestore.FieldPath.documentId(), '==', '5XWn70TK8V1CkXHuLq9K').delete();
            
            window.location.replace('https://firebasestorage.googleapis.com/v0/b/nexxus-9c882.appspot.com/o/Order%20placed%20successfully!.jpg?alt=media&token=ddee9904-33d9-42b1-ab40-004e0344a3ca');
          }
        }}
        
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
