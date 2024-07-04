import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { Alert } from "react-native";

// Fetch payment sheet parameters
const fetchPaymentSheetParams = async (amount: number) => {
  console.log("🚀 ~ fetchPaymentSheetParams ~ amount:", amount);
  
  try {
    // Create payment session for our customer
    const { data, error } = await supabase.functions.invoke('payment-sheet', {
      body: { amount },
    });
    
    if (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        console.error('Function returned an error', errorMessage);
        throw new Error(errorMessage.message);
      } else {
        throw new Error(error.message);
      }
    }
    
    console.log("🚀 ~ fetchPaymentSheetParams ~ data:", data);
    return data;
  } catch (err) {
    console.error('Error fetching payment sheet params', err);
    throw err;
  }
};

// Initialize payment sheet
export const initializePaymentSheet = async (amount: number) => {
  console.log("🚀 ~ initializePaymentSheet ~ amount:", amount);

  try {
    // const data = await fetchPaymentSheetParams(amount);
    // console.log("🚀 ~ initializePaymentSheet ~ data:", data);
    
    // // Assuming the data contains `paymentIntent` and `publishableKey`
    // const { paymentIntent, publishableKey } = data;
    // if (!publishableKey || !paymentIntent) {
    //   throw new Error('Missing publishableKey or paymentIntent');
    // }


    // Initialize payment sheet (uncomment and use the actual method from your payment library)
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      paymentIntentClientSecret: 'pi_3PYkM2RpNGYU0VhQ0JWBx668_secret_wbuedLsCufz4TCwHHJEm8jXPv',
      defaultBillingDetails: {
        name: 'DB',
      },
    });

    if (error) {
      console.error('Error initializing payment sheet', error);
      throw error;
    }
  } catch (err) {
    console.error('Error initializing payment sheet', err);
    // Handle the error (e.g., show an alert to the user)
  } finally {
    // setLoading(false); // Uncomment if you have a loading state
  }
};

// Open payment sheet (uncomment and use the actual method from your payment library)
export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
    return false;
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
    return true;
  }
};
